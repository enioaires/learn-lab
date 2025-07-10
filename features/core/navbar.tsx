import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { NavItem } from "./nav-item";
import type { Session } from "better-auth";

interface NavbarProps {
  session?: Session | null;
}

type NavItem = {
  name: string;
  href: string;
};

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Cursos", href: "/explore" },
  { name: "Painel", href: "/dashboard" },
];

function Navbar({ session }: NavbarProps) {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background-95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <Image src={Logo} alt="Logo" className="size-9" />
          <span className="font-bold">Learn Lab</span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            {navItems.map((navItem) => (
              <NavItem
                name={navItem.name}
                href={navItem.href}
                key={navItem.name}
              />
            ))}
          </div>

          <div>
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  )
}

export { Navbar };