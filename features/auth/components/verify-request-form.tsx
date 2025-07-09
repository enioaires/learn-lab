"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { CheckCircleIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type VerifyRequestFormProps = {
  email: string;
};

function VerifyRequestForm({ email }: VerifyRequestFormProps) {
  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();

  const verifyRequest = () => {
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Conta verificada com sucesso!");
          },
          onError: () => {
            toast.error("Erro ao verificar, tente novamente mais tarde.");
          }
        }
      })
    })
  }

  const verifyButtonContent = isPending ? (
    <Spinner variant="ring" />
  ) : (
    <>
      <CheckCircleIcon className="size-4" />
      Verificar
    </>
  )

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Por favor, verifique seu email</CardTitle>
        <CardDescription>
          Um email de verificação foi enviado para <b>{email}</b>. Cole o código de
          verificação abaixo para continuar.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground text-center">
            Digite o código de 6 dígitos que você recebeu.
          </p>
        </div>

        <Button
          onClick={verifyRequest}
          className="w-full">
          {verifyButtonContent}
        </Button>
      </CardContent>
    </Card>
  )
}

export { VerifyRequestForm };