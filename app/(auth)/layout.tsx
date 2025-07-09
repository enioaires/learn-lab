import { ArrowLeftIcon } from "lucide-react";
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

			<div className="flex w-full max-w-sm flex-col gap-6">{children}</div>
		</section>
	);
}

export default Layout;
