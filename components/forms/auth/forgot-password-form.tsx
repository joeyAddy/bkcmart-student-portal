"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/custom/inputs";
import { useRequestPasswordResetMutation } from "@/lib/store/api/auth";
import { ApiResponse, ApiError } from "@/lib/store/api/base";

// Schema
// Common RFC 5322-ish email regex (reasonable balance between strictness and permissiveness)
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const forgotSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .regex(EMAIL_REGEX, "Please enter a valid email address"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotFormValues) {
    try {
      const res = (await requestPasswordReset(
        values
      ).unwrap()) as ApiResponse<null>;

      if (res && res.success) {
        toast.success(res.message || "Password reset email sent.");
        form.reset();
        return;
      }

      toast.error(res?.message || "Failed to send password reset email.");
    } catch (err: unknown) {
      // Prefer backend message when available
      let message = "Failed to send password reset. Please try again.";
      if (err && typeof err === "object") {
        const maybeApiErr = err as ApiError | Record<string, unknown>;
        if (
          typeof maybeApiErr.status === "number" &&
          maybeApiErr.data &&
          typeof maybeApiErr.data === "object"
        ) {
          const data = maybeApiErr.data as { message?: string };
          if (data.message) message = data.message;
        } else if (
          "message" in maybeApiErr &&
          typeof maybeApiErr.message === "string"
        ) {
          message = maybeApiErr.message;
        }
      } else if (typeof err === "string") message = err;

      toast.error(message);
      console.error("Forgot password error:", err);
    }
  }

  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email address and we&apos;ll send you instructions to
            reset your password.
          </p>
        </div>

        <div className="grid gap-6 mt-6">
          <InputField
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            control={form.control as any}
            name="email"
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ForgotPasswordForm;
