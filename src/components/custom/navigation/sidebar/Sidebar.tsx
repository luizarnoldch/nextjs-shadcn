// components/Sidebar.tsx
"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import ProfileSection from "./ProfileSection";
import NavItem from "./NavItem";
import UpgradeSection from "./UpgradeSection";
// import ThemeSwitcher from './ThemeSwitcher';
import LogoutButton from "./LogoutButton";
import navItems from "./navItems";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col h-screen bg-zinc-900 text-white ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}
    >
      <div
        className={cn(
          "flex items-center justify-between p-4 h-24",
          !isOpen && "justify-center",
        )}
      >
        <ProfileSection isOpen={isOpen} />
        <button className="text-white" onClick={toggleSidebar}>
          <ChevronRight
            className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <nav className={cn("mt-4 px-2", !isOpen && "mx-auto")}>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.href} className="flex items-center">
              <NavItem
                href={item.href}
                icon={item.icon}
                label={item.label}
                isOpen={isOpen}
              />
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto px-2 mb-4">
        {/* <UpgradeSection isOpen={isOpen} /> */}
        {/* <ThemeSwitcher /> */}
        <LogoutButton isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
