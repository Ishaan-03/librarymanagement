import { AuthForm } from "@/components/auth-form"

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <AuthForm mode="signup" />
    </main>
  )
}
