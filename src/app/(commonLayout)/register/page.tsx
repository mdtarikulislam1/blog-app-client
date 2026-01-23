import { SignupForm } from "@/components/modules/authentication/signup-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-fit mx-auto items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
