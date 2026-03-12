"use client";

import React, { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function HoverCardDemoPage() {
  const [align, setAlign] = useState<"start" | "center" | "end">("center");
  const [side, setSide] = useState<"top" | "bottom" | "left" | "right">("bottom");
  const [openDelay, setOpenDelay] = useState(700);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    const delayStr = openDelay !== 700 ? ` openDelay={${openDelay}}` : "";

    parts.push(`    <HoverCard${delayStr}>`);
    parts.push(`      <HoverCardTrigger asChild>`);
    parts.push(`        <Button variant="link">@shadcn</Button>`);
    parts.push(`      </HoverCardTrigger>`);

    const alignStr = align !== "center" ? ` align="${align}"` : "";
    const sideStr = side !== "bottom" ? ` side="${side}"` : "";

    parts.push(`      <HoverCardContent className="w-80"${alignStr}${sideStr}>`);
    parts.push(`        <div className="flex justify-between space-x-4">`);
    parts.push(`          <Avatar>`);
    parts.push(`            <AvatarImage src="https://github.com/shadcn.png" />`);
    parts.push(`            <AvatarFallback>CN</AvatarFallback>`);
    parts.push(`          </Avatar>`);
    parts.push(`          <div className="space-y-1">`);
    parts.push(`            <h4 className="text-sm font-semibold">@shadcn</h4>`);
    parts.push(`            <p className="text-sm">`);
    parts.push(`              Beautifully designed components that you can copy and paste into your apps.`);
    parts.push(`            </p>`);
    parts.push(`            <div className="flex items-center pt-2 text-muted-foreground">`);
    parts.push(`              <Calendar className="mr-2 size-4" />`);
    parts.push(`              <span className="text-xs">Joined December 2021</span>`);
    parts.push(`            </div>`);
    parts.push(`          </div>`);
    parts.push(`        </div>`);
    parts.push(`      </HoverCardContent>`);
    parts.push(`    </HoverCard>`);

    const innerJSX = parts.join("\n");

    return `import { Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function HoverCardDemo() {
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
    // Tags
    .replace(/&lt;(\/?)HoverCard([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">HoverCard$2</span>$3&gt;`)
    .replace(/&lt;(\/?)Button(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Button</span>$2&gt;`)
    .replace(/&lt;(\/?)Avatar([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Avatar$2</span>$3&gt;`)
    .replace(/&lt;(\/?)div(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">div</span>$2&gt;`)
    .replace(/&lt;(\/?)span(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">span</span>$2&gt;`)
    .replace(/&lt;(\/?)p(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">p</span>$2&gt;`)
    .replace(/&lt;(\/?)h4(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">h4</span>$2&gt;`)
    .replace(/&lt;(\/?)Calendar(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Calendar</span>$2&gt;`)
    // Attributes
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ src="([^"]+)"/g, ` <span class="${hlProp}">src</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ variant="([^"]+)"/g, ` <span class="${hlProp}">variant</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ align="([^"]+)"/g, ` <span class="${hlProp}">align</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ side="([^"]+)"/g, ` <span class="${hlProp}">side</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ openDelay=\{([^}]+)\}/g, ` <span class="${hlProp}">openDelay</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ asChild/g, ` <span class="${hlProp}">asChild</span>`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Hover Card</h1>
        <p className="text-muted-foreground">
          For sighted users to preview content available behind a link.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full xl:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">

            <h3 className="text-md font-medium text-muted-foreground">Placement</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Alignment</span>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={align === "start" ? "default" : "outline"}
                  onClick={() => setAlign("start")}
                  size="sm"
                >
                  Start
                </Button>
                <Button
                  variant={align === "center" ? "default" : "outline"}
                  onClick={() => setAlign("center")}
                  size="sm"
                >
                  Center
                </Button>
                <Button
                  variant={align === "end" ? "default" : "outline"}
                  onClick={() => setAlign("end")}
                  size="sm"
                >
                  End
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Side Position</span>
              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant={side === "top" ? "default" : "outline"}
                  onClick={() => setSide("top")}
                  size="sm"
                >
                  Top
                </Button>
                <Button
                  variant={side === "right" ? "default" : "outline"}
                  onClick={() => setSide("right")}
                  size="sm"
                >
                  Right
                </Button>
                <Button
                  variant={side === "bottom" ? "default" : "outline"}
                  onClick={() => setSide("bottom")}
                  size="sm"
                >
                  Bottom
                </Button>
                <Button
                  variant={side === "left" ? "default" : "outline"}
                  onClick={() => setSide("left")}
                  size="sm"
                >
                  Left
                </Button>
              </div>
            </div>

            <div className="border-t border-border/50 my-2" />

            <h3 className="text-md font-medium text-muted-foreground">Behavior</h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Open Delay (ms)</span>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={openDelay === 0 ? "default" : "outline"}
                  onClick={() => setOpenDelay(0)}
                  size="sm"
                >
                  0ms
                </Button>
                <Button
                  variant={openDelay === 300 ? "default" : "outline"}
                  onClick={() => setOpenDelay(300)}
                  size="sm"
                >
                  300ms
                </Button>
                <Button
                  variant={openDelay === 700 ? "default" : "outline"}
                  onClick={() => setOpenDelay(700)}
                  size="sm"
                >
                  700ms
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                700ms is the Radix default to prevent accidental triggers while moving the mouse.
              </p>
            </div>

          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full flex justify-center">
            <HoverCard openDelay={openDelay} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Button variant="link" className="text-lg">@shadcn</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80" align={align} side={side}>
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@shadcn</h4>
                    <p className="text-sm">
                      Beautifully designed components that you can copy and paste into your apps.
                    </p>
                    <div className="flex items-center pt-2 text-muted-foreground">
                      <Calendar className="mr-2 size-4" />
                      <span className="text-xs">Joined December 2021</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
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
