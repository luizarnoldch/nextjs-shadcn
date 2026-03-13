"use client";

// components/ThemeSwitcher.tsx
import { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitcher: FC = () => {
  const { setTheme } = useTheme();

  const handleThemeChange = (value: string) => {
    console.log(`Theme changed to: ${value}`);
    // Aquí puedes agregar la lógica para cambiar el tema
    setTheme(value);
  };

  return (
    <Tabs
      defaultValue="light"
      onValueChange={handleThemeChange}
      className="w-full rounded-md"
    >
      <TabsList className="flex justify-between gap-2 bg-gray-700 rounded-md">
        <TabsTrigger
          value="light"
          className="flex items-center justify-center w-1/2 rounded-md bg-gray-600"
        >
          <Sun className="w-5 h-5 text-white" />
          <span className="ml-2 text-white">Light</span>
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          className="flex items-center justify-center w-1/2 rounded-md bg-gray-600"
        >
          <Moon className="w-5 h-5 text-gray-400" />
          <span className="ml-2 text-gray-400">Dark</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
