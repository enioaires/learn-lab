import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { prisma } from "@/lib/db";
import { otpEmailTemplate } from "./email-templates";
import { env } from "./env";
import { resend } from "./resend";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  rateLimit: {
    enabled: true,
    window: 60,
    max: 5,
    customRules: {
      "/api/auth/send-verification-otp": {
        window: 300,
        max: 3
      }
    },
    storage: "database",
    modelName: "rateLimit"
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const { data, error } = await resend.emails.send({
          from: "Learn Lab <onboarding@resend.dev>",
          to: [email],
          subject: "[Learn Lab] Verificação de email",
          html: otpEmailTemplate(otp),
        });
      },
      expiresIn: 300,
      allowedAttempts: 3,
      otpLength: 6,
    }),
  ],
});
