import ForgotPasswordForm from "@/components/forms/auth/forgot-password-form";
import Image from "next/image";

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.jpeg"
              alt="Logo"
              width={45}
              height={45}
            />
            <div className="flex flex-col max-w-3xs">
              <span className="text-xs font-bold text-gray-900 leading-tight">
                BK COLLEGE OF MODERN ART AND TECHNOLOGY
              </span>
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/assets/images/smiley-teacher-classroom.webp"
          alt="Image"
          width={1920}
          height={1080}
          priority
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
