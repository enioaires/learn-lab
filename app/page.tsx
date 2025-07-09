"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const Home = () => {
	const router = useRouter();
	const { data: session } = authClient.useSession();

	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					toast.success("Deslogado com sucesso!");
					router.push("/sign-in");
				},
				onError: () => {
					toast.error("Erro ao deslogar, tente novamente mais tarde.");
				},
			},
		});
	};
	return (
		<div>
			{session ? (
				<pre className="flex flex-col gap-4">
					{JSON.stringify(session?.user, null, 2)}
					<Button className="w-xs" onClick={signOut}>
						Logout
					</Button>
				</pre>
			) : (
				<Link href={"/sign-in"} className={buttonVariants()}>
					Login
				</Link>
			)}
		</div>
	);
};

export default Home;
