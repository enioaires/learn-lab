"use client"
import { GithubIcon, SendIcon } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function SignInForm() {
  const router = useRouter();
  const [isGithubPending, startGithubTransition] = useTransition();
  const [isEmailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const signInWithGithub = () => {
    if (honeypot) return;

    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Login com sucesso!");
          },
          onError: () => {
            toast.error("Erro ao logar, tente novamente mais tarde.");
          },
        },
      });
    });
  };

  const sendEmailOTP = () => {
    if (honeypot) {
      toast.error("Erro de validação.");
      return;
    }

    if (cooldown > 0) return;

    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verificação enviada com sucesso!");
            setCooldown(60);
            const params = new URLSearchParams({ email });
            router.push(`/verify-request?${params.toString()}`);
          },
          onError: (context) => {
            const error = context.error;
            if (error.status === 429) {
              toast.error("Muitas tentativas. Tente novamente em alguns minutos.");
              setCooldown(300);
            } else {
              toast.error("Erro ao enviar OTP, tente novamente mais tarde.");
            }
          },
        }
      })
    })
  }

  const githubButtonContent = isGithubPending ? (
    <Spinner variant="ring" />
  ) : (
    <>
      <GithubIcon className="size-4" />
      Entre com o Github
    </>
  );

  const emailButtonContent = isEmailPending ? (
    <Spinner variant="ring" />
  ) : cooldown > 0 ? (
    `Aguarde ${cooldown}s`
  ) : (
    <>
      <SendIcon className="size-4" />
      <span>Continuar com o Email</span>
    </>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Bem vindo de volta!</CardTitle>
        <CardDescription>
          Entre com suas credenciais para continuar.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{
            position: 'absolute',
            left: '-9999px',
            opacity: 0,
            pointerEvents: 'none',
            height: 0,
            width: 0,
            border: 'none',
            outline: 'none'
          }}
          tabIndex={-1}
          autoComplete="nope"
          aria-hidden="true"
        />

        <Button
          onClick={signInWithGithub}
          className="w-full"
          variant="outline"
          disabled={isGithubPending}
        >
          {githubButtonContent}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
              type="email"
              id="email"
            />
          </div>

          <Button
            onClick={sendEmailOTP}
            disabled={isEmailPending || cooldown > 0 || !email}
          >
            {emailButtonContent}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { SignInForm };