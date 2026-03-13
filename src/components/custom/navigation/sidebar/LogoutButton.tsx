// components/LogoutButton.tsx
import { FC } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleNavProps } from "@/types/NavItem";
import Link from "next/link";

const LogoutButton: FC<ToggleNavProps> = ({ isOpen }) => {
  return (
    <Link className="w-full" href={"/"}>
      <Button
        variant="ghost"
        className="flex items-center justify-start text-white w-full py-2 px-4"
      >
        <LogOut className="w-6 h-6" />
        {isOpen && <span className="ml-2">Logout</span>}
      </Button>
    </Link>
  );
};

export default LogoutButton;
