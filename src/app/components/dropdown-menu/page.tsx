"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function DropdownMenuDemoPage() {
  const [showShortcuts, setShowShortcuts] = useState(true);
  const [showCheckboxItems, setShowCheckboxItems] = useState(true);
  const [showRadioItems, setShowRadioItems] = useState(true);

  // States for interactive demo items
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [position, setPosition] = useState("bottom");

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    parts.push(`    <DropdownMenu>`);
    parts.push(`      <DropdownMenuTrigger asChild>`);
    parts.push(`        <Button variant="outline">Open Menu</Button>`);
    parts.push(`      </DropdownMenuTrigger>`);
    parts.push(`      <DropdownMenuContent className="w-56">`);
    parts.push(`        <DropdownMenuLabel>My Account</DropdownMenuLabel>`);
    parts.push(`        <DropdownMenuSeparator />`);
    parts.push(`        <DropdownMenuGroup>`);
    parts.push(`          <DropdownMenuItem>`);
    parts.push(`            Profile`);
    if (showShortcuts)
      parts.push(
        `            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>`,
      );
    parts.push(`          </DropdownMenuItem>`);
    parts.push(`          <DropdownMenuItem>`);
    parts.push(`            Billing`);
    if (showShortcuts)
      parts.push(`            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>`);
    parts.push(`          </DropdownMenuItem>`);
    parts.push(`          <DropdownMenuItem>`);
    parts.push(`            Settings`);
    if (showShortcuts)
      parts.push(`            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>`);
    parts.push(`          </DropdownMenuItem>`);
    parts.push(`          <DropdownMenuItem>`);
    parts.push(`            Keyboard shortcuts`);
    if (showShortcuts)
      parts.push(`            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>`);
    parts.push(`          </DropdownMenuItem>`);
    parts.push(`        </DropdownMenuGroup>`);
    parts.push(`        <DropdownMenuSeparator />`);
    parts.push(`        <DropdownMenuGroup>`);
    parts.push(`          <DropdownMenuItem>Team</DropdownMenuItem>`);
    parts.push(`          <DropdownMenuSub>`);
    parts.push(
      `            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>`,
    );
    parts.push(`            <DropdownMenuPortal>`);
    parts.push(`              <DropdownMenuSubContent>`);
    parts.push(`                <DropdownMenuItem>Email</DropdownMenuItem>`);
    parts.push(`                <DropdownMenuItem>Message</DropdownMenuItem>`);
    parts.push(`                <DropdownMenuSeparator />`);
    parts.push(`                <DropdownMenuItem>More...</DropdownMenuItem>`);
    parts.push(`              </DropdownMenuSubContent>`);
    parts.push(`            </DropdownMenuPortal>`);
    parts.push(`          </DropdownMenuSub>`);
    parts.push(`          <DropdownMenuItem>`);
    parts.push(`            New Team`);
    if (showShortcuts)
      parts.push(
        `            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>`,
      );
    parts.push(`          </DropdownMenuItem>`);
    parts.push(`        </DropdownMenuGroup>`);

    if (showCheckboxItems) {
      parts.push(`        <DropdownMenuSeparator />`);
      parts.push(
        `        <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>`,
      );
      parts.push(`          Status Bar`);
      parts.push(`        </DropdownMenuCheckboxItem>`);
      parts.push(
        `        <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar} disabled>`,
      );
      parts.push(`          Activity Bar`);
      parts.push(`        </DropdownMenuCheckboxItem>`);
      parts.push(
        `        <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>`,
      );
      parts.push(`          Panel`);
      parts.push(`        </DropdownMenuCheckboxItem>`);
    }

    if (showRadioItems) {
      parts.push(`        <DropdownMenuSeparator />`);
      parts.push(
        `        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>`,
      );
      parts.push(`        <DropdownMenuSeparator />`);
      parts.push(
        `        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>`,
      );
      parts.push(
        `          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>`,
      );
      parts.push(
        `          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>`,
      );
      parts.push(
        `          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>`,
      );
      parts.push(`        </DropdownMenuRadioGroup>`);
    }

    parts.push(`        <DropdownMenuSeparator />`);
    parts.push(`        <DropdownMenuItem>GitHub</DropdownMenuItem>`);
    parts.push(`        <DropdownMenuItem>Support</DropdownMenuItem>`);
    parts.push(`        <DropdownMenuItem disabled>API</DropdownMenuItem>`);
    parts.push(`        <DropdownMenuSeparator />`);
    parts.push(`        <DropdownMenuItem>`);
    parts.push(`          Log out`);
    if (showShortcuts)
      parts.push(`          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>`);
    parts.push(`        </DropdownMenuItem>`);
    parts.push(`      </DropdownMenuContent>`);
    parts.push(`    </DropdownMenu>`);

    const innerJSX = parts.join("\n");

    const importsList = [
      "DropdownMenu",
      "DropdownMenuContent",
      "DropdownMenuGroup",
      "DropdownMenuItem",
      "DropdownMenuLabel",
      "DropdownMenuPortal",
      "DropdownMenuSeparator",
      "DropdownMenuShortcut",
      "DropdownMenuSub",
      "DropdownMenuSubContent",
      "DropdownMenuSubTrigger",
      "DropdownMenuTrigger",
    ];

    if (showCheckboxItems) {
      importsList.push("DropdownMenuCheckboxItem");
    }

    if (showRadioItems) {
      importsList.push("DropdownMenuRadioGroup");
      importsList.push("DropdownMenuRadioItem");
    }

    const stateDeclarations: string[] = [];
    if (showCheckboxItems) {
      stateDeclarations.push(
        `  const [showStatusBar, setShowStatusBar] = React.useState(true)`,
      );
      stateDeclarations.push(
        `  const [showActivityBar, setShowActivityBar] = React.useState(false)`,
      );
      stateDeclarations.push(
        `  const [showPanel, setShowPanel] = React.useState(false)`,
      );
    }
    if (showRadioItems) {
      stateDeclarations.push(
        `  const [position, setPosition] = React.useState("bottom")`,
      );
    }

    const hooksString =
      stateDeclarations.length > 0 ? `\n${stateDeclarations.join("\n")}\n` : "";

    return `import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  ${importsList.sort().join(",\n  ")}
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuDemo() {${hooksString}
  return (
${innerJSX}
  )
}`;
  };

  const rawCodeContent = generateCode();

  const highlightedCode = generateCode()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/import/g, `<span class="${hlKw}">import</span>`)
    .replace(
      /export default function/g,
      `<span class="${hlKw}">export default function</span>`,
    )
    .replace(/return/g, `<span class="${hlKw}">return</span>`)
    .replace(/const/g, `<span class="${hlKw}">const</span>`)
    // Tags
    .replace(
      /&lt;(\/?)DropdownMenu([A-Za-z]*)(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">DropdownMenu$2</span>$3&gt;`,
    )
    .replace(
      /&lt;(\/?)Button(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Button</span>$2&gt;`,
    )
    // Attributes
    .replace(
      / className="([^"]+)"/g,
      ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / value="([^"]+)"/g,
      ` <span class="${hlProp}">value</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / variant="([^"]+)"/g,
      ` <span class="${hlProp}">variant</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / checked=\{([^}]+)\}/g,
      ` <span class="${hlProp}">checked</span>={<span class="${hlVal}">$1</span>}`,
    )
    .replace(
      / onCheckedChange=\{([^}]+)\}/g,
      ` <span class="${hlProp}">onCheckedChange</span>={<span class="${hlVal}">$1</span>}`,
    )
    .replace(
      / value=\{([^}]+)\}/g,
      ` <span class="${hlProp}">value</span>={<span class="${hlVal}">$1</span>}`,
    )
    .replace(
      / onValueChange=\{([^}]+)\}/g,
      ` <span class="${hlProp}">onValueChange</span>={<span class="${hlVal}">$1</span>}`,
    )
    .replace(/ asChild/g, ` <span class="${hlProp}">asChild</span>`)
    .replace(/ disabled/g, ` <span class="${hlProp}">disabled</span>`)
    // React Hook
    .replace(
      /React\.useState/g,
      `<span class="${hlVal}">React.useState</span>`,
    );

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dropdown Menu</h1>
        <p className="text-muted-foreground">
          Displays a menu to the user — such as a set of actions or functions —
          triggered by a button.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full xl:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">
            Configuration
          </h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">
              Features
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Show Shortcuts</span>
                <span className="text-xs text-muted-foreground">
                  Toggle keystroke hints
                </span>
              </div>
              <Button
                variant={showShortcuts ? "default" : "secondary"}
                onClick={() => setShowShortcuts(!showShortcuts)}
                size="sm"
              >
                {showShortcuts ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Checkbox Items</span>
                <span className="text-xs text-muted-foreground">
                  Toggleable list items
                </span>
              </div>
              <Button
                variant={showCheckboxItems ? "default" : "secondary"}
                onClick={() => setShowCheckboxItems(!showCheckboxItems)}
                size="sm"
              >
                {showCheckboxItems ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Radio Group</span>
                <span className="text-xs text-muted-foreground">
                  Selectable grouped items
                </span>
              </div>
              <Button
                variant={showRadioItems ? "default" : "secondary"}
                onClick={() => setShowRadioItems(!showRadioItems)}
                size="sm"
              >
                {showRadioItems ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                    {showShortcuts && (
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                    {showShortcuts && (
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    {showShortcuts && (
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Keyboard shortcuts
                    {showShortcuts && (
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Invite users
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>More...</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    New Team
                    {showShortcuts && (
                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {showCheckboxItems && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={showStatusBar}
                      onCheckedChange={setShowStatusBar}
                    >
                      Status Bar
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={showActivityBar}
                      onCheckedChange={setShowActivityBar}
                      disabled
                    >
                      Activity Bar
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={showPanel}
                      onCheckedChange={setShowPanel}
                    >
                      Panel
                    </DropdownMenuCheckboxItem>
                  </>
                )}

                {showRadioItems && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={position}
                      onValueChange={setPosition}
                    >
                      <DropdownMenuRadioItem value="top">
                        Top
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="bottom">
                        Bottom
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="right">
                        Right
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                  {showShortcuts && (
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="mt-4 p-6 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Generated Code
          </h2>
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
