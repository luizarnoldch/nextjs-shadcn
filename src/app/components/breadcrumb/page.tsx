"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Slash, MoveRight, ChevronRight } from "lucide-react";

export default function BreadcrumbPageDemo() {
  // Configurable Props
  const [itemCount, setItemCount] = useState<number>(3); // 1 to 5
  const [separatorStyle, setSeparatorStyle] = useState<"default" | "slash" | "arrow">("default");
  const [showEllipsis, setShowEllipsis] = useState<boolean>(false);

  // Static path data for realism
  const pathData = ["Home", "Products", "Categories", "Electronics", "Laptops"];

  // Colors for visualization
  const hlLogic = "bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded"; // Items
  const hlSep = "bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded"; // Separator
  const hlEllip = "bg-green-500/30 text-green-200 px-1 py-0.5 rounded"; // Ellipsis

  // Code highlights
  const kw = "text-pink-400";
  const str = "text-orange-300";
  const tag = "text-emerald-400";

  const renderCurrentSeparator = () => {
    switch (separatorStyle) {
      case "slash": return <Slash />;
      case "arrow": return <MoveRight />;
      default: return null; // Uses ChevronRight natively in the component
    }
  };

  const getImportString = () => {
    let iconsToImport = [];
    if (separatorStyle === "slash") iconsToImport.push("Slash");
    if (separatorStyle === "arrow") iconsToImport.push("MoveRight");

    return iconsToImport.length > 0
      ? `\nimport { ${iconsToImport.join(", ")} } from "lucide-react"`
      : "";
  };

  const generateCodeDynamic = () => {
    const items = [];

    // Calculate which elements to render
    for (let i = 0; i < itemCount; i++) {
      const isLast = i === itemCount - 1;

      // Inject Ellipsis logic exactly like the visual render
      if (showEllipsis && itemCount > 2 && i === 1) {
        items.push(`        <span class="${hlEllip}"><BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem></span>`);

        if (!isLast) {
          items.push(`        <span class="${hlSep}"><BreadcrumbSeparator>${separatorStyle === "slash" ? "\n          <Slash />\n        " : separatorStyle === "arrow" ? "\n          <MoveRight />\n        " : ""}</BreadcrumbSeparator></span>`);
        }
        continue;
      }

      // Standard Item
      items.push(`        <span class="${hlLogic}"><BreadcrumbItem>
          ${isLast ? `<BreadcrumbPage>${pathData[i]}</BreadcrumbPage>` : `<BreadcrumbLink href="/${pathData[i].toLowerCase()}">${pathData[i]}</BreadcrumbLink>`}
        </BreadcrumbItem></span>`);

      // Add separator if NOT the last item
      if (!isLast) {
        items.push(`        <span class="${hlSep}"><BreadcrumbSeparator>${separatorStyle === "slash" ? "\n          <Slash />\n        " : separatorStyle === "arrow" ? "\n          <MoveRight />\n        " : ""}</BreadcrumbSeparator></span>`);
      }
    }

    return `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"${getImportString()}

export default function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
${items.join("\n")}
      </BreadcrumbList>
    </Breadcrumb>
  )
}`;
  };

  const rawCodeContent = generateCodeDynamic().replace(/<span class=".*?">/g, '').replace(/<\/span>/g, '');

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Breadcrumb</h1>
        <p className="text-muted-foreground">
          Interactive showcase of the Breadcrumb component to display hierarchy and navigation paths.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[450px] p-6 border rounded-lg bg-card max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2 sticky top-0 bg-card z-10 py-2 border-b">Configuration</h2>

          {/* 1. Path Depth */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-blue-400">1. Navigation Nodes</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Path Depth (Total Items)</span>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button key={num} variant={itemCount === num ? "default" : "outline"} size="sm" onClick={() => setItemCount(num)}>{num}</Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">The final item always renders as the active `BreadcrumbPage`.</p>
            </div>

            {itemCount > 2 && (
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-sm font-medium">Collapse Intermediates</span>
                <div className="flex gap-2 flex-wrap">
                  <Button variant={!showEllipsis ? "default" : "outline"} size="sm" onClick={() => setShowEllipsis(false)}>Show Full Path</Button>
                  <Button variant={showEllipsis ? "default" : "outline"} size="sm" onClick={() => setShowEllipsis(true)}>Show Ellipsis (...) at Index 1</Button>
                </div>
              </div>
            )}
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* 2. Visual Style */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-purple-400">2. Separator Style</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Icon Injection</span>
              <div className="flex gap-2 flex-wrap">
                <Button variant={separatorStyle === "default" ? "default" : "outline"} size="sm" onClick={() => setSeparatorStyle("default")}>Default (ChevronRight)</Button>
                <Button variant={separatorStyle === "slash" ? "default" : "outline"} size="sm" onClick={() => setSeparatorStyle("slash")}>Slash</Button>
                <Button variant={separatorStyle === "arrow" ? "default" : "outline"} size="sm" onClick={() => setSeparatorStyle("arrow")}>Arrow Right</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 min-h-[500px] flex items-center justify-center relative">

          <div className="bg-background shadow-sm border rounded-lg p-6 w-full max-w-xl flex items-center h-24">
            <Breadcrumb>
              <BreadcrumbList>
                {Array.from({ length: itemCount }).map((_, i) => {
                  const isLast = i === itemCount - 1;

                  // Render Ellipsis
                  if (showEllipsis && itemCount > 2 && i === 1) {
                    return (
                      <React.Fragment key={`ellipsis-${i}`}>
                        <BreadcrumbItem>
                          <BreadcrumbEllipsis />
                        </BreadcrumbItem>
                        {!isLast && (
                          <BreadcrumbSeparator>
                            {renderCurrentSeparator()}
                          </BreadcrumbSeparator>
                        )}
                      </React.Fragment>
                    )
                  }

                  // Render Normal Item
                  return (
                    <React.Fragment key={`item-${i}`}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{pathData[i]}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={`/${pathData[i].toLowerCase()}`}>{pathData[i]}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>

                      {!isLast && (
                        <BreadcrumbSeparator>
                          {renderCurrentSeparator()}
                        </BreadcrumbSeparator>
                      )}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

        </div>
      </div>

      {/* Code Snippet with Highlights and Legend */}
      <div className="mt-2 p-6 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-zinc-100">Generated Code</h2>
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-zinc-400">Breadcrumb Nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-zinc-400">Separators</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">Ellipsis Block</span>
              </div>
            </div>
          </div>
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
          dangerouslySetInnerHTML={{
            __html: generateCodeDynamic()
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/import/g, `<span class="${kw}">import</span>`)
              .replace(/export default function/g, `<span class="${kw}">export default function</span>`)
              .replace(/return/g, `<span class="${kw}">return</span>`)
              // Restore HTML tags for syntax highlighting spans that were just encoded
              .replace(/&lt;span class=(.*?)&gt;/g, '<span class=$1>')
              .replace(/&lt;\/span&gt;/g, '</span>')
              // Colorizing some tags quickly via hack
              .replace(/&lt;(\/?)Breadcrumb/g, `&lt;$1<span class="${tag}">Breadcrumb</span>`)
              .replace(/&lt;(\/?)BreadcrumbList/g, `&lt;$1<span class="${tag}">BreadcrumbList</span>`)
          }}
        />
      </div>
    </div>
  );
}
