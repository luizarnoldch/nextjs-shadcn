import BreadcrumbNavigation from "../BreadcrumbNavigation";
import Logo from "./Logo";
import MenuSheet from "./MenuSheet.tsx";
import NavLinks from "./NavLInks";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="bg-primary-foreground shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Logo />
        <nav className="hidden md:flex space-x-4 w-10/12">
          <NavLinks />
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <MenuSheet />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
