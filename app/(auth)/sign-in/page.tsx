import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { auth } from "@/lib/auth";

export default async function SignInPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		return redirect("/");
	}

	return <SignInForm />;
}
