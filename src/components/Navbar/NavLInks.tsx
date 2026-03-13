"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col md:flex-row gap-4 mx-auto mt-6 md:mt-0">
      {links.map(({ href, label }) => (
        <Button key={href} asChild variant={"link"}>
          <Link href={href}>
            <li
              className={`text-lg ${pathname === href ? "underline underline-offset-4" : ""}`}
            >
              {label}
            </li>
          </Link>
        </Button>
      ))}
    </ul>
  );
};

export default NavLinks;
