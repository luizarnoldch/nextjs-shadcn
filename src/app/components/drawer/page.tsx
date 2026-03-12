"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export default function DrawerDemoPage() {
  const [direction, setDirection] = useState<"top" | "bottom" | "left" | "right">("bottom");
  const [dismissible, setDismissible] = useState(true);

  // Example interactive state for the payload content
  const [goal, setGoal] = useState(350);

  const onClick = (adjustment: number) => {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  };

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    const dirStr = direction !== "bottom" ? ` direction="${direction}"` : "";
    const disStr = !dismissible ? ` dismissible={false}` : "";

    parts.push(`    <Drawer${dirStr}${disStr}>`);
    parts.push(`      <DrawerTrigger asChild>`);
    parts.push(`        <Button variant="outline">Open Drawer</Button>`);
    parts.push(`      </DrawerTrigger>`);
    parts.push(`      <DrawerContent>`);

    // Add layout adjustments depending on direction for better presentation
    const alignClass = direction === "left" || direction === "right"
      ? `h-full flex flex-col p-4 w-[300px]`
      : `mx-auto w-full max-w-sm`;

    parts.push(`        <div className="${alignClass}">`);
    parts.push(`          <DrawerHeader>`);
    parts.push(`            <DrawerTitle>Move Goal</DrawerTitle>`);
    parts.push(`            <DrawerDescription>Set your daily activity goal.</DrawerDescription>`);
    parts.push(`          </DrawerHeader>`);
    parts.push(`          <div className="p-4 pb-0 flex-1 flex flex-col justify-center">`);
    parts.push(`            <div className="flex items-center justify-center space-x-2">`);
    parts.push(`              <Button`);
    parts.push(`                variant="outline"`);
    parts.push(`                size="icon"`);
    parts.push(`                className="h-8 w-8 shrink-0 rounded-full"`);
    parts.push(`                onClick={() => onClick(-10)}`);
    parts.push(`                disabled={goal <= 200}`);
    parts.push(`              >`);
    parts.push(`                <Minus />`);
    parts.push(`                <span className="sr-only">Decrease</span>`);
    parts.push(`              </Button>`);
    parts.push(`              <div className="flex-1 text-center">`);
    parts.push(`                <div className="text-7xl font-bold tracking-tighter">`);
    parts.push(`                  {goal}`);
    parts.push(`                </div>`);
    parts.push(`                <div className="text-[0.70rem] uppercase text-muted-foreground">`);
    parts.push(`                  Calories/day`);
    parts.push(`                </div>`);
    parts.push(`              </div>`);
    parts.push(`              <Button`);
    parts.push(`                variant="outline"`);
    parts.push(`                size="icon"`);
    parts.push(`                className="h-8 w-8 shrink-0 rounded-full"`);
    parts.push(`                onClick={() => onClick(10)}`);
    parts.push(`                disabled={goal >= 400}`);
    parts.push(`              >`);
    parts.push(`                <Plus />`);
    parts.push(`                <span className="sr-only">Increase</span>`);
    parts.push(`              </Button>`);
    parts.push(`            </div>`);
    parts.push(`          </div>`);
    parts.push(`          <DrawerFooter>`);
    parts.push(`            <Button>Submit</Button>`);
    parts.push(`            <DrawerClose asChild>`);
    parts.push(`              <Button variant="outline">Cancel</Button>`);
    parts.push(`            </DrawerClose>`);
    parts.push(`          </DrawerFooter>`);
    parts.push(`        </div>`);
    parts.push(`      </DrawerContent>`);
    parts.push(`    </Drawer>`);

    const innerJSX = parts.join("\n");

    return `import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function DrawerDemo() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

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
    .replace(/function/g, `<span class="${hlKw}">function</span>`)
    .replace(/return/g, `<span class="${hlKw}">return</span>`)
    .replace(/const/g, `<span class="${hlKw}">const</span>`)
    // Tags
    .replace(/&lt;(\/?)Drawer([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Drawer$2</span>$3&gt;`)
    .replace(/&lt;(\/?)Button(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Button</span>$2&gt;`)
    .replace(/&lt;(\/?)Minus(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Minus</span>$2&gt;`)
    .replace(/&lt;(\/?)Plus(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Plus</span>$2&gt;`)
    .replace(/&lt;(\/?)div(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">div</span>$2&gt;`)
    .replace(/&lt;(\/?)span(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">span</span>$2&gt;`)
    // Attributes
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ variant="([^"]+)"/g, ` <span class="${hlProp}">variant</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ size="([^"]+)"/g, ` <span class="${hlProp}">size</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ direction="([^"]+)"/g, ` <span class="${hlProp}">direction</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ asChild/g, ` <span class="${hlProp}">asChild</span>`)
    // React Hook and expressions
    .replace(/React\.useState/g, `<span class="${hlVal}">React.useState</span>`)
    .replace(/ onClick=\{([^}]+)\}/g, ` <span class="${hlProp}">onClick</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ disabled=\{([^}]+)\}/g, ` <span class="${hlProp}">disabled</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ dismissible=\{([^}]+)\}/g, ` <span class="${hlProp}">dismissible</span>={<span class="${hlVal}">$1</span>}`);

  const alignClass = direction === "left" || direction === "right"
    ? `h-full flex flex-col p-4 w-[300px]`
    : `mx-auto w-full max-w-sm`;

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Drawer</h1>
        <p className="text-muted-foreground">
          A drawer component for React. Smooth, accessible, and flexible.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Flow Direction</h3>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Anchor Point</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={direction === "top" ? "default" : "outline"}
                onClick={() => setDirection("top")}
                size="sm"
              >
                Top
              </Button>
              <Button
                variant={direction === "bottom" ? "default" : "outline"}
                onClick={() => setDirection("bottom")}
                size="sm"
              >
                Bottom
              </Button>
              <Button
                variant={direction === "left" ? "default" : "outline"}
                onClick={() => setDirection("left")}
                size="sm"
              >
                Left
              </Button>
              <Button
                variant={direction === "right" ? "default" : "outline"}
                onClick={() => setDirection("right")}
                size="sm"
              >
                Right
              </Button>
            </div>

            <div className="border-t border-border/50 my-2" />

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Dismissible</span>
                <span className="text-xs text-muted-foreground">Allow swipe/backdrop close</span>
              </div>
              <Button
                variant={dismissible ? "default" : "secondary"}
                onClick={() => setDismissible(!dismissible)}
                size="sm"
              >
                {dismissible ? "Enabled" : "Disabled"}
              </Button>
            </div>

          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 p-12 bg-card border rounded-xl shadow-sm min-w-[350px] flex justify-center">

            <Drawer direction={direction} dismissible={dismissible}>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className={alignClass}>
                  <DrawerHeader>
                    <DrawerTitle>Move Goal</DrawerTitle>
                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0 flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => onClick(-10)}
                        disabled={goal <= 200}
                      >
                        <Minus className="size-4" />
                        <span className="sr-only">Decrease</span>
                      </Button>
                      <div className="flex-1 text-center">
                        <div className="text-7xl font-bold tracking-tighter">
                          {goal}
                        </div>
                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                          Calories/day
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => onClick(10)}
                        disabled={goal >= 400}
                      >
                        <Plus className="size-4" />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

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
