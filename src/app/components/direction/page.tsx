"use client";

import React, { useState } from "react";
import { DirectionProvider, useDirection } from "@/components/ui/direction";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

// Example consumer component to demonstrate reading the direction context
function ExampleContent() {
  const dir = useDirection();

  return (
    <div
      dir={dir}
      className="flex gap-4 p-6 border rounded-lg bg-background text-foreground shadow-sm max-w-sm w-full transition-all"
    >
      <div className="bg-primary/10 p-3 rounded-full h-fit shrink-0">
        <ArrowRightLeft className="size-5 text-primary" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-medium leading-none">Reading Context Flow</p>
        <p className="text-sm text-muted-foreground leading-snug">
          The <code>useDirection()</code> hook returned{" "}
          <strong className="text-foreground">{dir}</strong>. Notice how the
          flex-layout and text alignment automatically reflow inside this
          container.
        </p>
      </div>
    </div>
  );
}

export default function DirectionDemoPage() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    parts.push(`    <DirectionProvider direction="${direction}">`);
    parts.push(`      <ExampleContent />`);
    parts.push(`    </DirectionProvider>`);

    const innerJSX = parts.join("\n");

    return `import { DirectionProvider, useDirection } from "@/components/ui/direction"
import { ArrowLeftRight } from "lucide-react"

function ExampleContent() {
  // 1. Consume the strict direction context deep within the tree
  const dir = useDirection()
  
  return (
    // 2. Apply the HTML dir attribute to trigger CSS localized flips
    <div dir={dir} className="flex gap-4 p-4 border rounded-lg max-w-sm flex-row">
      <div className="bg-primary/10 p-3 rounded-full h-fit shrink-0">
        <ArrowLeftRight className="size-5 text-primary" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-medium">Direction Aware Card</p>
        <p className="text-sm text-muted-foreground">
          Resolved Context: <strong>{dir}</strong>
        </p>
      </div>
    </div>
  )
}

export default function App() {
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
    .replace(/function/g, `<span class="${hlKw}">function</span>`)
    .replace(/return/g, `<span class="${hlKw}">return</span>`)
    .replace(/const/g, `<span class="${hlKw}">const</span>`)
    // Tags
    .replace(
      /&lt;(\/?)DirectionProvider(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">DirectionProvider</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)ExampleContent(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">ExampleContent</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)div(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">div</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)p(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">p</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)strong(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">strong</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)ArrowLeftRight(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">ArrowLeftRight</span>$2&gt;`,
    )
    // Attributes
    .replace(
      / direction="([^"]+)"/g,
      ` <span class="${hlProp}">direction</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / className="([^"]+)"/g,
      ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`,
    )
    // React Hook
    .replace(/useDirection/g, `<span class="${hlVal}">useDirection</span>`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Direction</h1>
        <p className="text-muted-foreground">
          A context provider for RTL/LTR orientation, passing down direction
          intent to all Radix primitives globally.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">
            Configuration
          </h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">
              Context Value
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Text Direction</span>
                <span className="text-xs text-muted-foreground">
                  LTR vs RTL broadcast
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={direction === "ltr" ? "default" : "outline"}
                  onClick={() => setDirection("ltr")}
                  size="sm"
                >
                  LTR
                </Button>
                <Button
                  variant={direction === "rtl" ? "default" : "outline"}
                  onClick={() => setDirection("rtl")}
                  size="sm"
                >
                  RTL
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full flex justify-center">
            {/* The actual component implementation with DirectionProvider */}
            <DirectionProvider direction={direction} dir={"ltr"}>
              <ExampleContent />
            </DirectionProvider>
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
