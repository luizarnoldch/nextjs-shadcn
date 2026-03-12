"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Send } from "lucide-react";

export default function ButtonPage() {
  // Configurable Props
  const [variant, setVariant] = useState<"default" | "destructive" | "outline" | "secondary" | "ghost" | "link">("default");
  const [size, setSize] = useState<"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg">("default");
  const [text, setText] = useState("Button Text");

  // Icon / State logic
  const [iconPosition, setIconPosition] = useState<"none" | "left" | "right" | "only">("none");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // Derived Values
  const isIconSize = size.startsWith("icon");

  // Sync logic constraint (if user switches to an icon-only size, force iconPosition = 'only')
  // And vice versa, if they pick "only" position, we force a matching icon size.
  const handleSizeChange = (newSize: string) => {
    setSize(newSize as any);
    if (newSize.startsWith("icon") && iconPosition !== "only") {
      setIconPosition("only");
    } else if (!newSize.startsWith("icon") && iconPosition === "only") {
      setIconPosition("left"); // Reset to something that allows text
    }
  };

  const handlePositionChange = (newPos: "none" | "left" | "right" | "only") => {
    setIconPosition(newPos);
    if (newPos === "only" && !size.startsWith("icon")) {
      setSize("icon"); // Default to standard icon size
    } else if (newPos !== "only" && size.startsWith("icon")) {
      setSize("default");
    }
  }

  // Visualization Colors
  const hlVariant = "bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded"; // variant
  const hlSize = "bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded"; // size
  const hlState = "bg-red-500/30 text-red-200 px-1 py-0.5 rounded"; // disabled
  const hlContent = "bg-green-500/30 text-green-200 px-1 py-0.5 rounded"; // elements inside

  // Syntax highlighting
  const kw = "text-pink-400";
  const str = "text-orange-300";
  const tag = "text-emerald-400";
  const attr = "text-sky-300";

  const renderIcon = () => {
    if (isLoading) return <Loader2 className="animate-spin" />;
    if (iconPosition === "left" || iconPosition === "only") return <Mail />;
    if (iconPosition === "right") return <Send />;
    return null;
  };

  const getCodeString = () => {
    let imports = [];
    if (isLoading) imports.push("Loader2");
    if (!isLoading && (iconPosition === "left" || iconPosition === "only")) imports.push("Mail");
    if (!isLoading && iconPosition === "right") imports.push("Send");

    const importStr = imports.length > 0 ? `\nimport { ${imports.join(", ")} } from "lucide-react"` : "";

    const variantProp = variant !== "default" ? ` variant="<span class="${hlVariant}">${variant}</span>"` : "";
    const sizeProp = size !== "default" ? ` size="<span class="${hlSize}">${size}</span>"` : "";
    const disabledProp = isDisabled || isLoading ? ` <span class="${hlState}">disabled</span>` : "";

    let innerContent = "";
    if (iconPosition === "only") {
      innerContent = `\n      <span class="${hlContent}"><${isLoading ? "Loader2 className=\"animate-spin\" " : "Mail "}/></span>\n    `;
    } else if (iconPosition === "left") {
      innerContent = `\n      <span class="${hlContent}"><${isLoading ? "Loader2 className=\"animate-spin\" " : "Mail "}/></span>\n      ${text}\n    `;
    } else if (iconPosition === "right") {
      innerContent = `\n      ${text}\n      <span class="${hlContent}"><${isLoading ? "Loader2 className=\"animate-spin\" " : "Send "}/></span>\n    `;
    } else {
      innerContent = `${text}`;
    }

    return `import { Button } from "@/components/ui/button"${importStr}

export default function ButtonDemo() {
  return (
    <Button${variantProp}${sizeProp}${disabledProp}>${innerContent}</Button>
  )
}`;
  };

  const rawCodeContent = getCodeString().replace(/<span class=".*?">/g, '').replace(/<\/span>/g, '');

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Button</h1>
        <p className="text-muted-foreground">
          Displays a button or a component that looks like a button with multiple variants, sizes, and states.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[450px] p-6 border rounded-lg bg-card max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2 sticky top-0 bg-card z-10 py-2 border-b">Configuration</h2>

          {/* 1. Core Props */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-blue-400">1. Variant & Size</h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Variant</span>
              <div className="grid grid-cols-2 gap-2">
                {(["default", "destructive", "outline", "secondary", "ghost", "link"] as const).map((v) => (
                  <Button key={v} variant={variant === v ? "default" : "outline"} size="sm" onClick={() => setVariant(v)}>{v}</Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium">Text Sizes <span className="text-muted-foreground text-xs font-normal">(xs, sm, default, lg)</span></span>
              <div className="flex gap-2 flex-wrap">
                {(["xs", "sm", "default", "lg"] as const).map((s) => (
                  <Button key={s} variant={size === s ? "default" : "outline"} size="sm" onClick={() => handleSizeChange(s)}>{s}</Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <span className="text-sm font-medium">Icon-Only Sizes <span className="text-muted-foreground text-xs font-normal">(icon-xs, icon-sm, icon, icon-lg)</span></span>
              <div className="flex gap-2 flex-wrap">
                {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((s) => (
                  <Button key={s} variant={size === s ? "default" : "outline"} size="sm" onClick={() => handleSizeChange(s)}>{s}</Button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* 2. Content & Icons */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-purple-400">2. Content & Composition</h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium flex justify-between">
                Button Text
                <span className="text-xs text-muted-foreground font-normal">{isIconSize ? "Disabled in Icon size" : ""}</span>
              </span>
              <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm disabled:opacity-50"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isIconSize}
              />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium">Icon Structure</span>
              <div className="flex gap-2 flex-wrap">
                <Button variant={iconPosition === "none" ? "default" : "outline"} size="sm" onClick={() => handlePositionChange("none")} disabled={isIconSize}>None</Button>
                <Button variant={iconPosition === "left" ? "default" : "outline"} size="sm" onClick={() => handlePositionChange("left")} disabled={isIconSize}>Left Icon</Button>
                <Button variant={iconPosition === "right" ? "default" : "outline"} size="sm" onClick={() => handlePositionChange("right")} disabled={isIconSize}>Right Icon</Button>
                <Button variant={iconPosition === "only" ? "default" : "outline"} size="sm" onClick={() => handlePositionChange("only")}>Icon Only</Button>
              </div>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* 3. States */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-red-400">3. Interactivity States</h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Disabled / Loading</span>
              <div className="flex gap-2">
                <Button variant={isDisabled ? "default" : "outline"} size="sm" onClick={() => { setIsDisabled(!isDisabled); setIsLoading(false); }}>Toggle Disabled</Button>
                <Button variant={isLoading ? "default" : "outline"} size="sm" onClick={() => { setIsLoading(!isLoading); setIsDisabled(false); }}>Toggle Loading</Button>
              </div>
              {(isDisabled || isLoading) && (
                <p className="text-xs text-muted-foreground mt-1">Button is currently un-clickable via native `disabled` attribute.</p>
              )}
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-background flex flex-col items-center justify-center relative min-h-[400px]">
          {/* Subtle grid pattern for visual context */}
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />
          <div className="absolute inset-0 bg-background/50 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-center w-full max-w-sm rounded-lg border bg-card p-12 shadow-sm">
            <Button
              variant={variant}
              size={size}
              disabled={isDisabled || isLoading}
            >
              {iconPosition === "left" && renderIcon()}
              {iconPosition === "only" && renderIcon()}

              {iconPosition !== "only" && text}

              {iconPosition === "right" && renderIcon()}
            </Button>
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
                <span className="text-zinc-400">Variant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-zinc-400">Size Overrides</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-zinc-400">Native State</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">Icon Components</span>
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
            __html: getCodeString()
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/import/g, `<span class="${kw}">import</span>`)
              .replace(/export default function/g, `<span class="${kw}">export default function</span>`)
              .replace(/return/g, `<span class="${kw}">return</span>`)
              // Restore HTML tags for highlighting spans
              .replace(/&lt;span class=(.*?)&gt;/g, '<span class=$1>')
              .replace(/&lt;\/span&gt;/g, '</span>')
              // Base structural coloring
              .replace(/&lt;(\/?)Button/g, `&lt;$1<span class="${tag}">Button</span>`)
          }}
        />
      </div>
    </div>
  );
}
