import Link from "next/link";

type NavItemProps = {
  name: string;
  href: string;
};

function NavItem({ href, name }: NavItemProps) {

  return (
    <Link
      href={href}
      className="text-sm font-semibold transition-colors hover:text-primary"
    >
      {name}
    </Link>
  )
}

export { NavItem };