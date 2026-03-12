"use client";

import React, { useState } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { FolderOpen, Upload } from "lucide-react";

export default function EmptyDemoPage() {
  const [mediaVariant, setMediaVariant] = useState<"default" | "icon">("icon");
  const [showContent, setShowContent] = useState(true);
  const [showAction, setShowAction] = useState(true);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    parts.push(`    <Empty className="w-full max-w-md mx-auto">`);
    parts.push(`      <EmptyHeader>`);

    if (mediaVariant === "icon") {
      parts.push(`        <EmptyMedia variant="icon">`);
      parts.push(`          <FolderOpen />`);
      parts.push(`        </EmptyMedia>`);
    } else {
      parts.push(`        <EmptyMedia>`);
      parts.push(`          <FolderOpen className="size-12 text-muted-foreground" />`);
      parts.push(`        </EmptyMedia>`);
    }

    parts.push(`        <EmptyTitle>No files found</EmptyTitle>`);
    parts.push(`        <EmptyDescription>`);
    parts.push(`          You haven't uploaded any files yet. Upload a file to get started.`);
    parts.push(`        </EmptyDescription>`);
    parts.push(`      </EmptyHeader>`);

    if (showContent || showAction) {
      parts.push(`      <EmptyContent>`);

      if (showContent) {
        parts.push(`        <div className="flex flex-col items-center text-muted-foreground">`);
        parts.push(`          <p>Tip: You can drag and drop your files directly here.</p>`);
        parts.push(`        </div>`);
      }

      if (showAction) {
        parts.push(`        <div className="${showContent ? "mt-2" : ""}">`);
        parts.push(`          <Button size="sm">`);
        parts.push(`            <Upload />`);
        parts.push(`            Upload File`);
        parts.push(`          </Button>`);
        parts.push(`        </div>`);
      }

      parts.push(`      </EmptyContent>`);
    }

    parts.push(`    </Empty>`);

    const innerJSX = parts.join("\n");

    const importsList = [
      "Empty",
      "EmptyDescription",
      "EmptyHeader",
      "EmptyMedia",
      "EmptyTitle",
    ];

    if (showContent || showAction) {
      importsList.push("EmptyContent");
    }

    return `import { FolderOpen, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ${importsList.sort().join(",\n  ")}
} from "@/components/ui/empty"

export default function EmptyDemo() {
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
    .replace(/&lt;(\/?)Empty([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Empty$2</span>$3&gt;`)
    .replace(/&lt;(\/?)Button(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Button</span>$2&gt;`)
    .replace(/&lt;(\/?)FolderOpen(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">FolderOpen</span>$2&gt;`)
    .replace(/&lt;(\/?)Upload(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Upload</span>$2&gt;`)
    .replace(/&lt;(\/?)div(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">div</span>$2&gt;`)
    .replace(/&lt;(\/?)p(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">p</span>$2&gt;`)
    // Attributes
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ variant="([^"]+)"/g, ` <span class="${hlProp}">variant</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ size="([^"]+)"/g, ` <span class="${hlProp}">size</span>="<span class="${hlVal}">$1</span>"`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Empty State</h1>
        <p className="text-muted-foreground">
          A stylized layout designed to present empty states for datatables, file systems, and collections.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full xl:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Properties</h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Media Variant</span>
                <span className="text-xs text-muted-foreground">Changes the icon wrapper style</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={mediaVariant === "icon" ? "default" : "outline"}
                  onClick={() => setMediaVariant("icon")}
                  size="sm"
                >
                  Icon
                </Button>
                <Button
                  variant={mediaVariant === "default" ? "default" : "outline"}
                  onClick={() => setMediaVariant("default")}
                  size="sm"
                >
                  Default
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Tip Content</span>
                <span className="text-xs text-muted-foreground">Provides helper text hints</span>
              </div>
              <Button
                variant={showContent ? "default" : "secondary"}
                onClick={() => setShowContent(!showContent)}
                size="sm"
              >
                {showContent ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Action Button</span>
                <span className="text-xs text-muted-foreground">Renders a primary call-to-action</span>
              </div>
              <Button
                variant={showAction ? "default" : "secondary"}
                onClick={() => setShowAction(!showAction)}
                size="sm"
              >
                {showAction ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full flex justify-center">

            <Empty className="w-full max-w-md mx-auto bg-card shadow-sm">
              <EmptyHeader>
                {mediaVariant === "icon" ? (
                  <EmptyMedia variant="icon">
                    <FolderOpen />
                  </EmptyMedia>
                ) : (
                  <EmptyMedia>
                    <FolderOpen className="size-12 text-muted-foreground" />
                  </EmptyMedia>
                )}
                <EmptyTitle>No files found</EmptyTitle>
                <EmptyDescription>
                  You haven't uploaded any files yet. Upload a file to get started.
                </EmptyDescription>
              </EmptyHeader>
              {(showContent || showAction) && (
                <EmptyContent>
                  {showContent && (
                    <div className="flex flex-col items-center text-muted-foreground">
                      <p>Tip: You can drag and drop your files directly here.</p>
                    </div>
                  )}
                  {showAction && (
                    <div className={showContent ? "mt-2" : ""}>
                      <Button size="sm">
                        <Upload />
                        Upload File
                      </Button>
                    </div>
                  )}
                </EmptyContent>
              )}
            </Empty>

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
