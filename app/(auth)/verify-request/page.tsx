import { VerifyRequestForm } from "@/features/auth/components/verify-request-form";
import { redirect } from "next/navigation";


type VerifyRequestPageProps = {
  searchParams: {
    email?: string;
  };
};

async function VerifyRequestPage({ searchParams }: VerifyRequestPageProps) {
  const { email } = await searchParams;

  if (!email) {
    redirect('/sign-in');
  }

  return (
    <VerifyRequestForm email={email} />
  );
}

export default VerifyRequestPage;