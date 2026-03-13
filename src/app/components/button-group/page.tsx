"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

export default function ButtonGroupPage() {
  // Configurable Props
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );
  const [showSeparator, setShowSeparator] = useState<boolean>(true);
  const [showPrefixText, setShowPrefixText] = useState<boolean>(false);

  // Interactive State for realism
  const [alignment, setAlignment] = useState<
    "left" | "center" | "right" | "justify"
  >("left");
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({
    bold: false,
    italic: false,
    underline: false,
  });

  const toggleFormat = (key: string) => {
    setActiveFormats((p) => ({ ...p, [key]: !p[key] }));
  };

  // Highlights mapping
  const hlLogic = "bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded"; // Orientation
  const hlSep = "bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded"; // Separator
  const hlText = "bg-green-500/30 text-green-200 px-1 py-0.5 rounded"; // Prefix Text

  // Syntax highlighting
  const kw = "text-pink-400";
  const str = "text-orange-300";
  const tag = "text-emerald-400";
  const attr = "text-sky-300";

  const generateCodeDynamic = () => {
    const orientationProp =
      orientation === "vertical"
        ? ` <span class="${hlLogic}">orientation</span>=<span class="${str}">"vertical"</span>`
        : "";

    let contentStr = "";

    // Prefix Text
    if (showPrefixText) {
      if (orientation === "horizontal") {
        contentStr += `\n      <span class="${hlText}"><ButtonGroupText>Format</ButtonGroupText></span>`;
      } else {
        contentStr += `\n      <span class="${hlText}"><ButtonGroupText className="flex justify-center border-b-0">Fx</ButtonGroupText></span>`;
      }
    }

    // Alignment Buttons
    contentStr += `\n      <Button variant="outline" size="icon"><AlignLeft /></Button>
      <Button variant="outline" size="icon"><AlignCenter /></Button>
      <Button variant="outline" size="icon"><AlignRight /></Button>
      <Button variant="outline" size="icon"><AlignJustify /></Button>`;

    // Separator
    if (showSeparator) {
      const sepOrient =
        orientation === "horizontal" ? "vertical" : "horizontal";
      contentStr += `\n      <span class="${hlSep}"><ButtonGroupSeparator orientation="${sepOrient}" /></span>`;
    }

    // Format Buttons
    contentStr += `\n      <Button variant="outline" size="icon"><Bold /></Button>
      <Button variant="outline" size="icon"><Italic /></Button>
      <Button variant="outline" size="icon"><Underline /></Button>`;

    return `import { Button } from "@/components/ui/button"
import { 
  ButtonGroup,${showSeparator ? "\n  ButtonGroupSeparator," : ""}${showPrefixText ? "\n  ButtonGroupText," : ""} 
} from "@/components/ui/button-group"
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline } from "lucide-react"

export default function ButtonGroupDemo() {
  return (
    <span class="${hlLogic}"><ButtonGroup</span>${orientationProp}<span class="${hlLogic}">></span>${contentStr}
    <span class="${hlLogic}"></ButtonGroup></span>
  )
}`;
  };

  const rawCodeContent = generateCodeDynamic()
    .replace(/<span class=".*?">/g, "")
    .replace(/<\/span>/g, "");

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Button Group</h1>
        <p className="text-muted-foreground">
          Combines multiple buttons into a single visually connected toolbar or
          segmented control.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[450px] p-6 border rounded-lg bg-card max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2 sticky top-0 bg-card z-10 py-2 border-b">
            Configuration
          </h2>

          {/* 1. Core Props */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-blue-400">
              1. Orientation
            </h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Layout Direction</span>
              <div className="flex gap-2">
                <Button
                  variant={orientation === "horizontal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOrientation("horizontal")}
                >
                  Horizontal
                </Button>
                <Button
                  variant={orientation === "vertical" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOrientation("vertical")}
                >
                  Vertical
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Changes the border culling algorithm automatically.
              </p>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* 2. Composition */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-purple-400">
              2. Sub-Components
            </h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Text Prefix / Addon</span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={!showPrefixText ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowPrefixText(false)}
                >
                  Hide
                </Button>
                <Button
                  variant={showPrefixText ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowPrefixText(true)}
                >
                  Show &lt;ButtonGroupText&gt;
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium">Inner Separators</span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={!showSeparator ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowSeparator(false)}
                >
                  None
                </Button>
                <Button
                  variant={showSeparator ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowSeparator(true)}
                >
                  Show &lt;ButtonGroupSeparator&gt;
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 flex items-center justify-center border bg-card p-12 shadow-sm rounded-lg w-full max-w-sm">
            <ButtonGroup orientation={orientation}>
              {/* Prefix Text */}
              {showPrefixText && (
                <ButtonGroupText
                  className={
                    orientation === "vertical"
                      ? "flex justify-center border-b-0"
                      : ""
                  }
                >
                  {orientation === "horizontal" ? "Format" : "Fx"}
                </ButtonGroupText>
              )}

              {/* Logical Group 1: Alignment */}
              <Button
                variant={alignment === "left" ? "secondary" : "outline"}
                size="icon"
                onClick={() => setAlignment("left")}
              >
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button
                variant={alignment === "center" ? "secondary" : "outline"}
                size="icon"
                onClick={() => setAlignment("center")}
              >
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button
                variant={alignment === "right" ? "secondary" : "outline"}
                size="icon"
                onClick={() => setAlignment("right")}
              >
                <AlignRight className="w-4 h-4" />
              </Button>
              <Button
                variant={alignment === "justify" ? "secondary" : "outline"}
                size="icon"
                onClick={() => setAlignment("justify")}
              >
                <AlignJustify className="w-4 h-4" />
              </Button>

              {/* Structural Split */}
              {showSeparator && (
                <ButtonGroupSeparator
                  orientation={
                    orientation === "horizontal" ? "vertical" : "horizontal"
                  }
                />
              )}

              {/* Logical Group 2: Formatting */}
              <Button
                variant={activeFormats.bold ? "secondary" : "outline"}
                size="icon"
                onClick={() => toggleFormat("bold")}
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                variant={activeFormats.italic ? "secondary" : "outline"}
                size="icon"
                onClick={() => toggleFormat("italic")}
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                variant={activeFormats.underline ? "secondary" : "outline"}
                size="icon"
                onClick={() => toggleFormat("underline")}
              >
                <Underline className="w-4 h-4" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      {/* Code Snippet with Highlights and Legend */}
      <div className="mt-2 p-6 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-zinc-100">
              Generated Code
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-zinc-400">Orientation Prop</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">Prefix Addons</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-zinc-400">Separators</span>
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
              .replace(
                /export default function/g,
                `<span class="${kw}">export default function</span>`,
              )
              .replace(/return/g, `<span class="${kw}">return</span>`)
              // Restore HTML tags for highlighting spans
              .replace(/&lt;span class=(.*?)&gt;/g, "<span class=$1>")
              .replace(/&lt;\/span&gt;/g, "</span>")
              // Base structural coloring
              .replace(
                /&lt;(\/?)Button/g,
                `&lt;$1<span class="${tag}">Button</span>`,
              )
              .replace(
                /&lt;(\/?)(Align|Bold|Italic|Underline)([^&]*)&gt;/g,
                `&lt;$1<span class="text-yellow-300">$2</span>$3&gt;`,
              )
              // Fix the explicit button logic that matched the Button replacing rules over-aggressively
              .replace(
                /&lt;(\/?)ButtonGroup/g,
                `&lt;$1<span class="${tag}">ButtonGroup</span>`,
              ),
          }}
        />
      </div>
    </div>
  );
}
