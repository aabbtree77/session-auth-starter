import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//import fetch from "isomorphic-fetch";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// Define the Zod schema for form validation
const schema = z.object({
  userName: z
    .string()
    .min(1, "Username is required")
    .refine(
      (userName) => userName.trim().length > 0,
      "Username cannot consist solely of spaces"
    ),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Define the form data interface
// Here I could have used
// type FormData = z.infer<typeof schema>;
// but let us be explicit.

interface FormData {
  userName: string;
  password: string;
}

// Define the signup form component
const SigninForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signinStatus, setSigninStatus] = useState("Sign in");

  // Initialize the form using react-hook-form and zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);

    // Process userName by stripping spaces and converting to lowercase
    const processedUserName = data.userName.trim().toLowerCase();

    // Prepare payload for the API request
    const payload = {
      userName: processedUserName,
      password: data.password,
      loggedInAt: Date.now().toString(),
    };

    //https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0

    try {
      // Send a POST request to the server API endpoint
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        //console.log("Promise resolved and HTTP status is successful");
        // Handle successful signup
        setSigninStatus("Success. Logging you in...");
        window.location.href = "/user";
      } else {
        //console.error("Promise resolved but HTTP status failed");

        //The second await is weird, but shows that
        //a) the value of the await expression becomes that of the fulfilled promise,
        //which could be another promise. This is done so that
        //b) fetch receives response header first in an async manner, then a payload.
        const responseData = await response.json();

        setSigninStatus(responseData.error || "Failed to sign in");
        setIsSubmitting(false);
      }
    } catch {
      //console.error("Promise rejected, network or cors issues.");
      setSigninStatus("Check Network or CORS.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="card shadow-lg p-6 max-w-md w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Terms of Service */}
        <div className="mb-4">
          <div className="text-center mb-2">
            <p className="text-2xl font-bold text-center">{signinStatus}</p>
          </div>
        </div>

        {/* Username input */}
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="userName">
            Username:
          </label>
          <div className="relative mt-1">
            <input
              id="userName"
              type="text"
              {...register("userName")}
              className="input input-bordered w-full"
              disabled={isSubmitting}
            />
            {errors.userName && (
              <span className="text-red-500 text-xs absolute right-2 mt-1">
                {errors.userName.message}
              </span>
            )}
          </div>
        </div>

        {/* Password input */}
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="password">
            Password:
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              {...register("password")}
              className="input input-bordered w-full pr-10"
              disabled={isSubmitting}
            />
            <div
              className="absolute right-0 inset-y-0 flex items-center pr-2 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <EyeIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="w-5 h-5 text-gray-500" />
              )}
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs absolute right-2 mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
