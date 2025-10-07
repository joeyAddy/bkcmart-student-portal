"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLoginMutation } from "@/lib/store/api/auth";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/lib/store/slices/authSlice";
import { InputField } from "@/components/custom/inputs";

// Login form schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormData) {
    try {
      dispatch(loginStart());

      const response = await login(values).unwrap();

      if (response.success) {
        dispatch(
          loginSuccess({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );

        toast.success(response.message || "Login successful!");

        // Redirect based on user role
        const redirectPath = getRedirectPath(response.data.user.role);
        router.push(redirectPath);
        return;
      }

      // If API returned success: false
      throw new Error(response.message || "Login failed");
    } catch (err: unknown) {
      // safe stringify helper
      const safeStringify = (v: unknown) => {
        try {
          return JSON.stringify(v, Object.getOwnPropertyNames(v as object), 2);
        } catch {
          try {
            return String(v);
          } catch {
            return "[unserializable error]";
          }
        }
      };

      // Log error for debugging
      console.error("Login error (raw):", err);
      console.error("Login error (json):", safeStringify(err));

      let errorMessage = "Login failed. Please try again.";

      // Normalize RTK Query style error: { status, data: { message } }
      if (err && typeof err === "object") {
        const obj = err as Record<string, unknown>;

        if ("data" in obj && obj.data && typeof obj.data === "object") {
          const data = obj.data as Record<string, unknown>;
          if (typeof data.message === "string") {
            errorMessage = data.message;
          } else if (typeof obj.status === "number") {
            const status = obj.status as number;
            if (status === 401) errorMessage = "Invalid email or password";
            else if (status === 403) errorMessage = "Account access denied";
            else if (status === 404) errorMessage = "User not found";
            else if (status >= 500)
              errorMessage = "Server error. Please try again later.";
          }
        } else if ("message" in obj && typeof obj.message === "string") {
          errorMessage = obj.message as string;
        }
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      // Update state and notify user
      toast.error(errorMessage);
      dispatch(loginFailure(errorMessage));

      // Developer debug
      console.debug("Login error details:", safeStringify(err));
    }
  }

  function getRedirectPath(role: string): string {
    switch (role) {
      case "ADMIN":
        return "/dashboard";
      case "STUDENT":
        return "/student/dashboard";
      case "STAFF":
      case "FACULTY":
        return "/staff/dashboard";
      default:
        return "/dashboard";
    }
  }

  function handleDemoLogin() {
    try {
      dispatch(loginStart());

      // Simulate demo user data
      const demoUser = {
        id: "demo_admin_123",
        email: "admin@demo.com",
        firstName: "Demo",
        lastName: "Admin",
        role: "ADMIN" as const,
        status: "ACTIVE" as const,
        emailVerified: true,
        phoneVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(
        loginSuccess({
          user: demoUser,
          accessToken: "demo_access_token_123",
          refreshToken: "demo_refresh_token_123",
        })
      );

      toast.success("Demo login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Demo login error:", error);
      dispatch(loginFailure("Demo login failed"));
      toast.error("Demo login failed");
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your credentials below to access your account
          </p>
        </div>

        <div className="grid gap-6">
          <InputField
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            control={form.control as any}
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-sm underline-offset-4 hover:underline text-muted-foreground"
              >
                Forgot password?
              </a>
            </div>

            <div className="relative">
              <InputField
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                control={form.control as any}
                name="password"
                label=""
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          {/* Demo login button for testing */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            Demo Login (Admin)
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/register"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Sign up
          </a>
        </div>
      </form>
    </Form>
  );
}
