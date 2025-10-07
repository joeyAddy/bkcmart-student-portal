"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/custom/inputs";
import { useResetPasswordMutation } from "@/lib/store/api/auth";
import { ApiResponse, ApiError } from "@/lib/store/api/base";

const schema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string().min(8, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type FormValues = z.infer<typeof schema>;

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: "", confirmNewPassword: "" },
  });

  async function onSubmit(values: FormValues) {
    if (!token) {
      toast.error(
        "Invalid or missing token. Please use the link from your email."
      );
      return;
    }

    try {
      const res = (await resetPassword({
        token,
        newPassword: values.newPassword,
      }).unwrap()) as ApiResponse<null>;
      if (res && res.success) {
        toast.success(res.message || "Password updated. Please log in.");
        router.push("/login");
        return;
      }

      toast.error(res?.message || "Failed to reset password.");
    } catch (err: unknown) {
      let msg = "Failed to reset password.";
      if (err && typeof err === "object") {
        const maybe = err as ApiError | Record<string, unknown>;
        if (maybe.data && typeof maybe.data === "object") {
          const d = maybe.data as { message?: string };
          if (d.message && typeof d.message === "string") msg = d.message;
        } else {
          const m = maybe as Record<string, unknown>;
          if (typeof m.message === "string") msg = m.message as string;
        }
      } else if (typeof err === "string") msg = err;

      toast.error(msg || "Failed to reset password.");
      console.error("Reset password error:", err);
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
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your new password below to update your account password.
          </p>
        </div>

        <div className="grid gap-6 mt-6">
          <InputField
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            control={form.control as any}
            name="newPassword"
            label="New Password"
            placeholder="Enter your new password"
            type="password"
          />

          <InputField
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            control={form.control as any}
            name="confirmNewPassword"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            type="password"
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update password"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ResetPasswordForm;
