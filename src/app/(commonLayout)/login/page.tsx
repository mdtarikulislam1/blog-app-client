import { LoginForm } from "@/components/modules/authentication/login-form";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-sm flex flex-col justify-center min-h-screen">
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
