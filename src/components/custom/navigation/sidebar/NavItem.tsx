"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavItemProps } from "@/types/NavItem";

const NavItem: FC<NavItemProps> = ({ href, icon: Icon, label, isOpen }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <Button
        variant="ghost"
        className={`flex items-center rounded w-full justify-start ${isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`}
      >
        <Icon className="w-6 h-6" />
        {isOpen && <span className="ml-2">{label}</span>}
      </Button>
    </Link>
  );
};

export default NavItem;
