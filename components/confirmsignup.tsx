"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ConfirmSignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [resendStatus, setResendStatus] = useState("")

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    try {
      await confirmSignUp({ username: email, confirmationCode: code })
      setSuccess("Account confirmed. You can now log in.")
      router.push("/login")
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Confirmation failed")
    }
  }

  const handleResend = async () => {
    setResendStatus("Resending...")
    try {
      await resendSignUpCode({ username: email })
      setResendStatus("Confirmation code resent!")
    } catch (err: any) {
      console.error(err)
      setResendStatus("Failed to resend code")
    }
  }

  return (
    <form
      onSubmit={handleConfirm}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Confirm your account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and the code you received
        </p>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label htmlFor="code">Confirmation Code</Label>
        <Input
          id="code"
          type="text"
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      {resendStatus && <p className="text-sm">{resendStatus}</p>}

      <div className="flex flex-col gap-3">
        <Button type="submit" className="w-full">
          Confirm
        </Button>
        <Button type="button" variant="outline" onClick={handleResend}>
          Resend Code
        </Button>
      </div>

      <p className="text-sm text-center">
        Already confirmed?{" "}
        <a href="/login" className="underline underline-offset-4">
          Log in
        </a>
      </p>
    </form>
  )
}
