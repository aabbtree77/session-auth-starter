import { lucia } from "../../lib/auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db } from "../../lib/db";
import type { DatabaseUser } from "../../lib/db";
import { SqliteError } from "better-sqlite3";

import type { APIContext } from "astro";
import { z } from "zod";

// Define the Zod schema for form validation
const userSchema = z.object({
  userName: z
    .string()
    .min(1, "Username is required")
    .refine(
      (userName) => userName.trim().length > 0,
      "Username cannot consist solely of spaces"
    ),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(context: APIContext): Promise<Response> {
  const payload = await context.request.json();

  const parsedPayload = userSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return new Response(JSON.stringify({ error: parsedPayload.error.errors }), {
      status: 400,
    });
  }

  const { userName, password } = parsedPayload.data;

  const existingUser = db
    .prepare("SELECT * FROM user WHERE username = ?")
    .get(userName) as DatabaseUser | undefined;
  if (!existingUser) {
    return new Response(
      JSON.stringify({
        error: "Incorrect username or password",
      }),
      {
        status: 400,
      }
    );
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password
  );
  if (!validPassword) {
    return new Response(
      JSON.stringify({
        error: "Incorrect username or password",
      }),
      {
        status: 400,
      }
    );
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response();
}

