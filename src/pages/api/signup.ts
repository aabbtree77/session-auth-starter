import { lucia } from "../../lib/auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db } from "../../lib/db";
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

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    db.prepare("INSERT INTO user (id, username, password) VALUES(?, ?, ?)").run(
      userId,
      userName,
      hashedPassword
    );

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return new Response();
  } catch (e) {
    if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return new Response(
        JSON.stringify({
          error: "Username already used",
        }),
        {
          status: 400,
        }
      );
    }
    return new Response(
      JSON.stringify({
        error: "An unknown error occurred",
      }),
      {
        status: 500,
      }
    );
  }
}
