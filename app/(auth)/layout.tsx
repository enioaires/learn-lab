import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";

type LayoutProps = {
	children: ReactNode;
};

function Layout({ children }: LayoutProps) {
	return (
		<section className="relative flex min-h-svh flex-col items-center justify-center">
			<Link
				href="/"
				className={buttonVariants({
					variant: "ghost",
					className: "absolute top-4 left-4",
				})}
			>
				<ArrowLeftIcon className="size-4" />
				Voltar
			</Link>

			<div className="flex w-full max-w-sm flex-col gap-6">
				<Link
					href="/"
					className="flex items-center gap-2 self-center font-medium"
				>
					<Image src={"/logo.png"} alt="Logo" width={32} height={32} />
					Learn Lab
				</Link>
				{children}
				<div className="text-balance text-center text-xs text-muted-foreground">
					Ao clicar em continuar, você concorda com os nossos{" "}
					<span className="hover:underline cursor-pointer">
						Termos de Uso
					</span>{" "}
					e{" "}
					<span className="hover:underline cursor-pointer">
						Política de Privacidade
					</span>
				</div>
			</div>
		</section>
	);
}

export default Layout;
