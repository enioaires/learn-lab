import { VerifyRequestForm } from "@/features/auth/components/verify-request-form";


type VerifyRequestPageProps = {
  params: {
    email: string;
  };
};

async function VerifyRequestPage({ params }: VerifyRequestPageProps) {
  const { email } = await params;

  return (
    <VerifyRequestForm email={email} />
  );
}

export default VerifyRequestPage;