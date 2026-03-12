"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export default function CollapsibleDemoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showBorder, setShowBorder] = useState(true);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    const collapsibleProps = [
      `open={isOpen}`,
      `onOpenChange={setIsOpen}`,
      `className="w-[350px] space-y-2"`
    ];
    if (disabled) collapsibleProps.push(`disabled`);

    const propsStr = collapsibleProps.join(" ");
    const borderClass = showBorder ? ' border px-4 py-3' : '';

    parts.push(`    <Collapsible ${propsStr}>`);
    parts.push(`      <div className="flex items-center justify-between space-x-4 px-4">`);
    parts.push(`        <h4 className="text-sm font-semibold">`);
    parts.push(`          @peduarte starred 3 repositories`);
    parts.push(`        </h4>`);
    parts.push(`        <CollapsibleTrigger asChild>`);
    parts.push(`          <Button variant="ghost" size="sm" className="w-9 p-0">`);
    parts.push(`            <ChevronsUpDown className="h-4 w-4" />`);
    parts.push(`            <span className="sr-only">Toggle</span>`);
    parts.push(`          </Button>`);
    parts.push(`        </CollapsibleTrigger>`);
    parts.push(`      </div>`);
    parts.push(`      <div className="rounded-md${borderClass} font-mono text-sm shadow-sm">`);
    parts.push(`        @radix-ui/primitives`);
    parts.push(`      </div>`);
    parts.push(`      <CollapsibleContent className="space-y-2">`);
    parts.push(`        <div className="rounded-md${borderClass} font-mono text-sm shadow-sm">`);
    parts.push(`          @radix-ui/colors`);
    parts.push(`        </div>`);
    parts.push(`        <div className="rounded-md${borderClass} font-mono text-sm shadow-sm">`);
    parts.push(`          @stitches/react`);
    parts.push(`        </div>`);
    parts.push(`      </CollapsibleContent>`);
    parts.push(`    </Collapsible>`);

    const innerJSX = parts.join("\n");

    return `import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

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
    // Tags
    .replace(/&lt;(\/?)Collapsible(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Collapsible</span>$2&gt;`)
    .replace(/&lt;(\/?)CollapsibleTrigger(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">CollapsibleTrigger</span>$2&gt;`)
    .replace(/&lt;(\/?)CollapsibleContent(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">CollapsibleContent</span>$2&gt;`)
    .replace(/&lt;(\/?)Button(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Button</span>$2&gt;`)
    .replace(/&lt;(\/?)ChevronsUpDown(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">ChevronsUpDown</span>$2&gt;`)
    .replace(/&lt;(\/?)div(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">div</span>$2&gt;`)
    .replace(/&lt;(\/?)h4(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">h4</span>$2&gt;`)
    .replace(/&lt;(\/?)span(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">span</span>$2&gt;`)
    // Attributes
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ variant="([^"]+)"/g, ` <span class="${hlProp}">variant</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ size="([^"]+)"/g, ` <span class="${hlProp}">size</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ asChild/g, ` <span class="${hlProp}">asChild</span>`)
    .replace(/ disabled/g, ` <span class="${hlProp}">disabled</span>`)
    // React expressions
    .replace(/ open=\{([^}]+)\}/g, ` <span class="${hlProp}">open</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ onOpenChange=\{([^}]+)\}/g, ` <span class="${hlProp}">onOpenChange</span>={<span class="${hlVal}">$1</span>}`);

  const borderClass = showBorder ? " border px-4 py-3" : "";

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Collapsible</h1>
        <p className="text-muted-foreground">
          An interactive component which expands and collapses a panel.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Options</h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Border List Style</span>
                <span className="text-xs text-muted-foreground">Toggle item borders</span>
              </div>
              <Button
                variant={showBorder ? "default" : "secondary"}
                onClick={() => setShowBorder(!showBorder)}
                size="sm"
              >
                {showBorder ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="border-t border-border/50" />

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Disabled State</span>
                <span className="text-xs text-muted-foreground">Disable collapsing</span>
              </div>
              <Button
                variant={disabled ? "default" : "secondary"}
                onClick={() => setDisabled(!disabled)}
                size="sm"
              >
                {disabled ? "On" : "Off"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 p-12 bg-card border rounded-xl shadow-sm min-w-[350px] flex justify-center">
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              disabled={disabled}
              className="w-[350px] space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">
                  @peduarte starred 3 repositories
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className={`rounded-md${borderClass} font-mono text-sm shadow-sm`}>
                @radix-ui/primitives
              </div>
              <CollapsibleContent className="space-y-2">
                <div className={`rounded-md${borderClass} font-mono text-sm shadow-sm`}>
                  @radix-ui/colors
                </div>
                <div className={`rounded-md${borderClass} font-mono text-sm shadow-sm`}>
                  @stitches/react
                </div>
              </CollapsibleContent>
            </Collapsible >
          </div >
        </div >
      </div >

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
    </div >
  );
}
