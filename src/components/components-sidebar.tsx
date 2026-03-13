"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { uiComponents } from "@/lib/components-list";

export function ComponentsSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 shrink-0 border-r bg-background h-[calc(100vh-4rem)]">
      <ScrollArea className="h-full py-6 pl-4 pr-6">
        <h2 className="mb-4 px-2 text-lg font-semibold tracking-tight">
          Components
        </h2>
        <div className="space-y-1">
          {uiComponents.map((component) => (
            <Link
              key={component.path}
              href={component.path}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === component.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              {component.name}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
