import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "../NavLInks";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const MenuSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="md:hidden"
          aria-label="Open Menu"
          variant={"ghost"}
          size={"icon"}
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <SheetHeader>
          <nav className="flex flex-col space-y-4">
            <NavLinks />
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
