import { SignupForm } from "@/components/modules/authentication/signup-form";

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-sm flex flex-col justify-center min-h-screen">
      <div>
        <SignupForm />
      </div>
    </div>
  );
}
