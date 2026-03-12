"use client";

import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";

export default function ContextMenuDemoPage() {
  const [showShortcuts, setShowShortcuts] = useState(true);
  const [showCheckboxItems, setShowCheckboxItems] = useState(true);
  const [showRadioItems, setShowRadioItems] = useState(true);

  // States for interactive demo items
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullUrls, setShowFullUrls] = useState(false);
  const [person, setPerson] = useState("pedro");

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    parts.push(`    <ContextMenu>`);
    parts.push(`      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">`);
    parts.push(`        Right click here`);
    parts.push(`      </ContextMenuTrigger>`);
    parts.push(`      <ContextMenuContent className="w-64">`);
    parts.push(`        <ContextMenuItem inset>`);
    parts.push(`          Back`);
    if (showShortcuts) parts.push(`          <ContextMenuShortcut>⌘[</ContextMenuShortcut>`);
    parts.push(`        </ContextMenuItem>`);
    parts.push(`        <ContextMenuItem inset disabled>`);
    parts.push(`          Forward`);
    if (showShortcuts) parts.push(`          <ContextMenuShortcut>⌘]</ContextMenuShortcut>`);
    parts.push(`        </ContextMenuItem>`);
    parts.push(`        <ContextMenuItem inset>`);
    parts.push(`          Reload`);
    if (showShortcuts) parts.push(`          <ContextMenuShortcut>⌘R</ContextMenuShortcut>`);
    parts.push(`        </ContextMenuItem>`);
    parts.push(`        <ContextMenuSub>`);
    parts.push(`          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>`);
    parts.push(`          <ContextMenuSubContent className="w-48">`);
    parts.push(`            <ContextMenuItem>`);
    parts.push(`              Save Page As...`);
    if (showShortcuts) parts.push(`              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>`);
    parts.push(`            </ContextMenuItem>`);
    parts.push(`            <ContextMenuItem>Create Shortcut...</ContextMenuItem>`);
    parts.push(`            <ContextMenuItem>Name Window...</ContextMenuItem>`);
    parts.push(`            <ContextMenuSeparator />`);
    parts.push(`            <ContextMenuItem>Developer Tools</ContextMenuItem>`);
    parts.push(`          </ContextMenuSubContent>`);
    parts.push(`        </ContextMenuSub>`);

    if (showCheckboxItems) {
      parts.push(`        <ContextMenuSeparator />`);
      parts.push(`        <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>`);
      parts.push(`          Show Bookmarks Bar`);
      if (showShortcuts) parts.push(`          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>`);
      parts.push(`        </ContextMenuCheckboxItem>`);
      parts.push(`        <ContextMenuCheckboxItem checked={showFullUrls} onCheckedChange={setShowFullUrls}>`);
      parts.push(`          Show Full URLs`);
      parts.push(`        </ContextMenuCheckboxItem>`);
    }

    if (showRadioItems) {
      parts.push(`        <ContextMenuSeparator />`);
      parts.push(`        <ContextMenuLabel inset>People</ContextMenuLabel>`);
      parts.push(`        <ContextMenuSeparator />`);
      parts.push(`        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>`);
      parts.push(`          <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>`);
      parts.push(`          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>`);
      parts.push(`        </ContextMenuRadioGroup>`);
    }

    parts.push(`      </ContextMenuContent>`);
    parts.push(`    </ContextMenu>`);

    const innerJSX = parts.join("\n");

    const importsList = [
      "ContextMenu",
      "ContextMenuTrigger",
      "ContextMenuContent",
      "ContextMenuItem",
      "ContextMenuShortcut",
      "ContextMenuSub",
      "ContextMenuSubContent",
      "ContextMenuSubTrigger",
      "ContextMenuSeparator",
    ];

    if (showCheckboxItems) {
      importsList.push("ContextMenuCheckboxItem");
    }

    if (showRadioItems) {
      importsList.push("ContextMenuLabel");
      importsList.push("ContextMenuRadioGroup");
      importsList.push("ContextMenuRadioItem");
    }

    const stateDeclarations: string[] = [];
    if (showCheckboxItems) {
      stateDeclarations.push(`  const [showBookmarks, setShowBookmarks] = React.useState(true)`);
      stateDeclarations.push(`  const [showFullUrls, setShowFullUrls] = React.useState(false)`);
    }
    if (showRadioItems) {
      stateDeclarations.push(`  const [person, setPerson] = React.useState("pedro")`);
    }

    const hooksString = stateDeclarations.length > 0 ? `\n${stateDeclarations.join("\n")}\n` : "";

    return `import * as React from "react"
import {
  ${importsList.sort().join(",\n  ")}
} from "@/components/ui/context-menu"

export default function ContextMenuDemo() {${hooksString}
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
    .replace(/export default function/g, `<span class="${hlKw}">export default function</span>`)
    .replace(/return/g, `<span class="${hlKw}">return</span>`)
    .replace(/const/g, `<span class="${hlKw}">const</span>`)
    // Tags
    .replace(/&lt;(\/?)ContextMenu([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">ContextMenu$2</span>$3&gt;`)
    // Attributes
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ value="([^"]+)"/g, ` <span class="${hlProp}">value</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ inset/g, ` <span class="${hlProp}">inset</span>`)
    .replace(/ disabled/g, ` <span class="${hlProp}">disabled</span>`)
    // React state and hooks
    .replace(/React\.useState/g, `<span class="${hlVal}">React.useState</span>`)
    .replace(/ checked=\{([^}]+)\}/g, ` <span class="${hlProp}">checked</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ onCheckedChange=\{([^}]+)\}/g, ` <span class="${hlProp}">onCheckedChange</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ value=\{([^}]+)\}/g, ` <span class="${hlProp}">value</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ onValueChange=\{([^}]+)\}/g, ` <span class="${hlProp}">onValueChange</span>={<span class="${hlVal}">$1</span>}`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Context Menu</h1>
        <p className="text-muted-foreground">
          Displays a menu to the user — such as a set of actions or functions — triggered by a right-click.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Features</h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Show Shortcuts</span>
                <span className="text-xs text-muted-foreground">Toggle keystroke hints</span>
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
                <span className="text-xs text-muted-foreground">Toggleable list items</span>
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
                <span className="text-xs text-muted-foreground">Selectable grouped items</span>
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

          <div className="relative z-10 p-12 bg-card border rounded-xl shadow-sm min-w-[350px] flex justify-center">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-zinc-500/50 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm cursor-context-menu">
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem inset>
                  Back
                  {showShortcuts && <ContextMenuShortcut>⌘[</ContextMenuShortcut>}
                </ContextMenuItem>
                <ContextMenuItem inset disabled>
                  Forward
                  {showShortcuts && <ContextMenuShortcut>⌘]</ContextMenuShortcut>}
                </ContextMenuItem>
                <ContextMenuItem inset>
                  Reload
                  {showShortcuts && <ContextMenuShortcut>⌘R</ContextMenuShortcut>}
                </ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48">
                    <ContextMenuItem>
                      Save Page As...
                      {showShortcuts && <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>}
                    </ContextMenuItem>
                    <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                    <ContextMenuItem>Name Window...</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Developer Tools</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>

                {showCheckboxItems && (
                  <>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                      Show Bookmarks Bar
                      {showShortcuts && <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>}
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem checked={showFullUrls} onCheckedChange={setShowFullUrls}>
                      Show Full URLs
                    </ContextMenuCheckboxItem>
                  </>
                )}

                {showRadioItems && (
                  <>
                    <ContextMenuSeparator />
                    <ContextMenuLabel inset>People</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
                      <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                      <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                  </>
                )}
              </ContextMenuContent>
            </ContextMenu>
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
