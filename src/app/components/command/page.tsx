"use client";

import React, { useState, useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Search
} from "lucide-react";

export default function CommandDemoPage() {
  const [asDialog, setAsDialog] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(true);
  const [showSeparators, setShowSeparators] = useState(true);

  // Dialog State
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    if (asDialog) {
      parts.push(`    <>`);
      parts.push(`      <p className="text-sm text-muted-foreground">`);
      parts.push(`        Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">⌘</span>J</kbd>`);
      parts.push(`      </p>`);
      parts.push(`      <CommandDialog open={open} onOpenChange={setOpen}>`);
    } else {
      parts.push(`    <Command className="rounded-lg border shadow-md md:min-w-[450px]">`);
    }

    parts.push(`      <CommandInput placeholder="Type a command or search..." />`);
    parts.push(`      <CommandList>`);
    parts.push(`        <CommandEmpty>No results found.</CommandEmpty>`);
    parts.push(`        <CommandGroup heading="Suggestions">`);
    parts.push(`          <CommandItem>`);
    parts.push(`            <Calendar />`);
    parts.push(`            <span>Calendar</span>`);
    parts.push(`          </CommandItem>`);
    parts.push(`          <CommandItem>`);
    parts.push(`            <Smile />`);
    parts.push(`            <span>Search Emoji</span>`);
    parts.push(`          </CommandItem>`);
    parts.push(`          <CommandItem disabled>`);
    parts.push(`            <Calculator />`);
    parts.push(`            <span>Calculator</span>`);
    parts.push(`          </CommandItem>`);
    parts.push(`        </CommandGroup>`);

    if (showSeparators) {
      parts.push(`        <CommandSeparator />`);
    }

    parts.push(`        <CommandGroup heading="Settings">`);
    parts.push(`          <CommandItem>`);
    parts.push(`            <User />`);
    parts.push(`            <span>Profile</span>`);
    if (showShortcuts) parts.push(`            <CommandShortcut>⌘P</CommandShortcut>`);
    parts.push(`          </CommandItem>`);
    parts.push(`          <CommandItem>`);
    parts.push(`            <CreditCard />`);
    parts.push(`            <span>Billing</span>`);
    if (showShortcuts) parts.push(`            <CommandShortcut>⌘B</CommandShortcut>`);
    parts.push(`          </CommandItem>`);
    parts.push(`          <CommandItem>`);
    parts.push(`            <Settings />`);
    parts.push(`            <span>Settings</span>`);
    if (showShortcuts) parts.push(`            <CommandShortcut>⌘S</CommandShortcut>`);
    parts.push(`          </CommandItem>`);
    parts.push(`        </CommandGroup>`);
    parts.push(`      </CommandList>`);

    if (asDialog) {
      parts.push(`      </CommandDialog>`);
      parts.push(`    </>`);
    } else {
      parts.push(`    </Command>`);
    }

    const innerJSX = parts.join("\n");
    const modeImports = asDialog ? "CommandDialog,\n  " : "";

    const stateCode = asDialog ? `\n  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])\n` : "";

    return `import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  Command,
  ${modeImports}CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export default function CommandDemo() {${stateCode}
  return (
${innerJSX}
  )
}`;
  };

  // prettier-ignore
  const rawCodeContent = generateCode()

  // prettier-ignore
  const highlightedCode = generateCode()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/import/g, `<span class="${hlKw}">import</span>`)
    .replace(/export default function/g, `<span class="${hlKw}">export default function</span>`)
    .replace(/return/g, `<span class="${hlKw}">return</span>`)
    .replace(/const/g, `<span class="${hlKw}">const</span>`)
    .replace(/if \(/g, `<span class="${hlKw}">if</span> (`)
    // Tags
    .replace(/&lt;(\/?)Command([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Command$2</span>$3&gt;`)
    .replace(/&lt;(\/?)Calculator(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Calculator</span>$2&gt;`)
    .replace(/&lt;(\/?)Calendar(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Calendar</span>$2&gt;`)
    .replace(/&lt;(\/?)CreditCard(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">CreditCard</span>$2&gt;`)
    .replace(/&lt;(\/?)Settings(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Settings</span>$2&gt;`)
    .replace(/&lt;(\/?)Smile(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Smile</span>$2&gt;`)
    .replace(/&lt;(\/?)User(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">User</span>$2&gt;`)
    .replace(/&lt;(\/?)span(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">span</span>$2&gt;`)
    .replace(/&lt;(\/?)kbd(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">kbd</span>$2&gt;`)
    .replace(/&lt;(\/?)p(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">p</span>$2&gt;`)
    // Attributes
    .replace(/ placeholder="([^"]+)"/g, ` <span class="${hlProp}">placeholder</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ heading="([^"]+)"/g, ` <span class="${hlProp}">heading</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ disabled/g, ` <span class="${hlProp}">disabled</span>`)
    // React state and hooks
    .replace(/React\.useEffect/g, `<span class="${hlVal}">React.useEffect</span>`)
    .replace(/React\.useState/g, `<span class="${hlVal}">React.useState</span>`)
    .replace(/ open=\{([^}]+)\}/g, ` <span class="${hlProp}">open</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ onOpenChange=\{([^}]+)\}/g, ` <span class="${hlProp}">onOpenChange</span>={<span class="${hlVal}">$1</span>}`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Command</h1>
        <p className="text-muted-foreground">
          Fast, composable, unstyled command menu for React.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full xl:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Options</h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">As Dialog</span>
                <span className="text-xs text-muted-foreground">Render in a modal overlay</span>
              </div>
              <Button
                variant={asDialog ? "default" : "secondary"}
                onClick={() => setAsDialog(!asDialog)}
                size="sm"
              >
                {asDialog ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Show Separators</span>
                <span className="text-xs text-muted-foreground">Dividers between groups</span>
              </div>
              <Button
                variant={showSeparators ? "default" : "secondary"}
                onClick={() => setShowSeparators(!showSeparators)}
                size="sm"
              >
                {showSeparators ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Show Shortcuts</span>
                <span className="text-xs text-muted-foreground">Trailing keybind hints</span>
              </div>
              <Button
                variant={showShortcuts ? "default" : "secondary"}
                onClick={() => setShowShortcuts(!showShortcuts)}
                size="sm"
              >
                {showShortcuts ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            {asDialog ? (
              <>
                <p className="text-sm text-muted-foreground bg-background px-4 py-2 rounded-md shadow-sm border mb-4">
                  Press{" "}
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>J
                  </kbd>
                  {" "}to open the command menu
                </p>
                <div className="mt-4">
                  <Button variant="outline" onClick={() => setOpen(true)}>
                    <span>Open Command Menu</span>
                  </Button>
                </div>
                <CommandDialog open={open} onOpenChange={setOpen}>
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <Calendar />
                        <span>Calendar</span>
                      </CommandItem>
                      <CommandItem>
                        <Smile />
                        <span>Search Emoji</span>
                      </CommandItem>
                      <CommandItem disabled>
                        <Calculator />
                        <span>Calculator</span>
                      </CommandItem>
                    </CommandGroup>
                    {showSeparators && <CommandSeparator />}
                    <CommandGroup heading="Settings">
                      <CommandItem>
                        <User />
                        <span>Profile</span>
                        {showShortcuts && <CommandShortcut>⌘P</CommandShortcut>}
                      </CommandItem>
                      <CommandItem>
                        <CreditCard />
                        <span>Billing</span>
                        {showShortcuts && <CommandShortcut>⌘B</CommandShortcut>}
                      </CommandItem>
                      <CommandItem>
                        <Settings />
                        <span>Settings</span>
                        {showShortcuts && <CommandShortcut>⌘S</CommandShortcut>}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </CommandDialog>
              </>
            ) : (
              <Command className="rounded-lg border shadow-md md:min-w-[450px] w-full max-w-lg bg-card">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <Calendar />
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <Smile />
                      <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem disabled>
                      <Calculator />
                      <span>Calculator</span>
                    </CommandItem>
                  </CommandGroup>
                  {showSeparators && <CommandSeparator />}
                  <CommandGroup heading="Settings">
                    <CommandItem>
                      <User />
                      <span>Profile</span>
                      {showShortcuts && <CommandShortcut>⌘P</CommandShortcut>}
                    </CommandItem>
                    <CommandItem>
                      <CreditCard />
                      <span>Billing</span>
                      {showShortcuts && <CommandShortcut>⌘B</CommandShortcut>}
                    </CommandItem>
                    <CommandItem>
                      <Settings />
                      <span>Settings</span>
                      {showShortcuts && <CommandShortcut>⌘S</CommandShortcut>}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 p-6 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-100">Generated Code</h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigator.clipboard.writeText(rawCodeContent)}
          >
            Copy Code
          </Button>
        </div>
        <pre
          className="text-sm font-mono whitespace-pre w-full overflow-x-auto p-4 bg-zinc-900/50 rounded-md border border-zinc-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
