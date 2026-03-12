"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export default function CarouselDemoPage() {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [loop, setLoop] = useState<boolean>(false);
  const [slideSize, setSlideSize] = useState<"basis-full" | "basis-1/2" | "basis-1/3">("basis-1/2");
  const [showArrows, setShowArrows] = useState<boolean>(true);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    const carouselProps: string[] = [];
    if (orientation === "vertical") {
      carouselProps.push(`orientation="vertical"`);
      carouselProps.push(`className="w-full max-w-xs"`);
    } else {
      carouselProps.push(`className="w-full max-w-sm"`);
    }

    if (loop) {
      carouselProps.push(`opts={{ loop: true }}`);
    }

    const propsStr = carouselProps.length > 0 ? ` ${carouselProps.join(" ")}` : "";

    parts.push(`    <Carousel${propsStr}>`);
    parts.push(`      <CarouselContent${orientation === "vertical" ? ' className="-mt-1 h-[200px]"' : ''}>`);

    // Simulate mapping 5 items
    parts.push(`        {Array.from({ length: 5 }).map((_, index) => (`);

    // Item configuration
    const itemClasses: string[] = [];
    if (slideSize !== "basis-full") {
      itemClasses.push(slideSize === "basis-1/2" ? `md:basis-1/2` : `md:basis-1/2 lg:basis-1/3`);
    }
    if (orientation === "vertical") {
      itemClasses.push("pt-1 h-full"); // spacing adjustments for vertical
    }

    const itemPropsStr = itemClasses.length > 0 ? ` className="${itemClasses.join(" ")}"` : "";

    parts.push(`          <CarouselItem key={index}${itemPropsStr}>`);
    parts.push(`            <div className="p-1">`);
    parts.push(`              <div className="flex aspect-square items-center justify-center rounded-xl border bg-card p-6 shadow-sm">`);
    parts.push(`                <span className="text-3xl font-semibold">{index + 1}</span>`);
    parts.push(`              </div>`);
    parts.push(`            </div>`);
    parts.push(`          </CarouselItem>`);
    parts.push(`        ))}`);

    parts.push(`      </CarouselContent>`);

    if (showArrows) {
      parts.push(`      <CarouselPrevious />`);
      parts.push(`      <CarouselNext />`);
    }

    parts.push(`    </Carousel>`);

    const innerJSX = parts.join("\n");

    const importNames = [
      "Carousel",
      "CarouselContent",
      "CarouselItem",
      ...(showArrows ? ["CarouselPrevious", "CarouselNext"] : [])
    ];

    return `import { 
  ${importNames.join(",\n  ")}
} from "@/components/ui/carousel"

export default function CarouselDemo() {
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
    .replace(/&lt;(\/?)Carousel([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Carousel$2</span>$3&gt;`)
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ orientation="([^"]+)"/g, ` <span class="${hlProp}">orientation</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ key=\{([^}]+)\}/g, ` <span class="${hlProp}">key</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ opts=\{([^}]+)\}/g, ` <span class="${hlProp}">opts</span>={<span class="${hlVal}">$1</span>}`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Carousel</h1>
        <p className="text-muted-foreground">
          A carousel with motion and swipe built using Embla.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full xl:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Slide Sizing (Basis)</h3>
            <p className="text-xs text-muted-foreground">Determines how many slides fit in the viewport at once using flex-basis.</p>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "1 Slide", value: "basis-full" },
                { label: "2 Slides", value: "basis-1/2" },
                { label: "3 Slides", value: "basis-1/3" },
              ].map((opt) => (
                <Button
                  key={opt.value}
                  size="sm"
                  variant={slideSize === opt.value ? "default" : "outline"}
                  onClick={() => setSlideSize(opt.value as any)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t border-border/50" />

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Properties</h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Orientation</span>
                <span className="text-xs text-muted-foreground">Horizontal or vertical layout</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={orientation === "horizontal" ? "default" : "secondary"}
                  onClick={() => setOrientation("horizontal")}
                  size="sm"
                >
                  Horiz
                </Button>
                <Button
                  variant={orientation === "vertical" ? "default" : "secondary"}
                  onClick={() => setOrientation("vertical")}
                  size="sm"
                >
                  Vert
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Looping</span>
                <span className="text-xs text-muted-foreground">Infinite scroll wrapping (opts.loop)</span>
              </div>
              <Button
                variant={loop ? "default" : "secondary"}
                onClick={() => setLoop(!loop)}
                size="sm"
              >
                {loop ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Arrows</span>
                <span className="text-xs text-muted-foreground">Show previous/next controls</span>
              </div>
              <Button
                variant={showArrows ? "default" : "secondary"}
                onClick={() => setShowArrows(!showArrows)}
                size="sm"
              >
                {showArrows ? "Visible" : "Hidden"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center relative min-h-[500px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full flex items-center justify-center h-full">
            {/* 
              We instantiate a fresh Carousel completely re-keyed when orientation changes
              to prevent internal Embla state issues, but the user code snippet handles
              it seamlessly. 
            */}
            <div key={orientation + loop.toString()} className="relative flex w-full flex-col items-center justify-center py-10 px-12">
              <Carousel
                orientation={orientation}
                opts={{ loop }}
                className={orientation === "vertical" ? "w-full max-w-xs" : "w-full max-w-sm"}
              >
                <CarouselContent className={orientation === "vertical" ? "-mt-1 h-[400px]" : ""}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className={
                        slideSize === "basis-full"
                          ? orientation === "vertical" ? "pt-1 block" : ""
                          : slideSize === "basis-1/2"
                            ? orientation === "vertical" ? "pt-1 basis-1/2" : "md:basis-1/2"
                            : orientation === "vertical" ? "pt-1 basis-1/3" : "md:basis-1/2 lg:basis-1/3"
                      }
                    >
                      <div className="p-1 h-full">
                        <div className="flex h-full aspect-square md:aspect-auto md:min-h-[200px] items-center justify-center rounded-xl border bg-card p-6 shadow-sm transition-transform hover:scale-[1.02]">
                          <span className="text-4xl font-semibold">{index + 1}</span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {showArrows && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            </div>
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
