"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Flame, X } from "lucide-react";

export default function BadgePage() {
  // Configurable Props
  const [variant, setVariant] = useState<"default" | "secondary" | "destructive" | "outline" | "ghost" | "link">("default");
  const [text, setText] = useState("New Feature");
  const [icon, setIcon] = useState<"none" | "check" | "flame" | "x">("none");
  const [asChild, setAsChild] = useState(false);
  const [isRounded, setIsRounded] = useState(true);

  // Derived properties purely for Code Generation visualization
  const hlVariant = "bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded";
  const hlLogic = "bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded"; // asChild / class tweaks
  const hlContent = "bg-green-500/30 text-green-200 px-1 py-0.5 rounded";

  // Syntax highlighting
  const kw = "text-pink-400";
  const str = "text-orange-300";
  const tag = "text-emerald-400";
  const attr = "text-sky-300";

  // Dynamic Content Renderers
  const renderIcon = () => {
    switch (icon) {
      case "check": return <Check className="w-3 h-3 mr-1" />;
      case "flame": return <Flame className="w-3 h-3 mr-1" />;
      case "x": return <X className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  const renderCodeIcon = () => {
    switch (icon) {
      case "check": return `\n      <span class="${hlContent}"><Check /></span>`;
      case "flame": return `\n      <span class="${hlContent}"><Flame /></span>`;
      case "x": return `\n      <span class="${hlContent}"><X /></span>`;
      default: return "";
    }
  };

  const getCodeString = () => {
    const importIconString = icon !== "none" ? `\nimport { ${icon === "check" ? "Check" : icon === "flame" ? "Flame" : "X"} } from "lucide-react"` : "";
    const variantProp = variant !== "default" ? ` variant="<span class="${hlVariant}">${variant}</span>"` : "";
    const roundedClass = !isRounded ? ` className="<span class="${hlLogic}">rounded-md</span>"` : "";
    const innerContent = `${renderCodeIcon()}\n      <span class="${hlContent}">${text}</span>\n    `;

    if (asChild) {
      return `import { Badge } from "@/components/ui/badge"${importIconString}

export default function BadgeDemo() {
  return (
    <Badge${variantProp}${roundedClass} <span class="${hlLogic}">asChild</span>>
      <a href="#">${innerContent}</a>
    </Badge>
  )
}`;
    }

    return `import { Badge } from "@/components/ui/badge"${importIconString}

export default function BadgeDemo() {
  return (
    <Badge${variantProp}${roundedClass}>${innerContent}</Badge>
  )
}`;
  };

  const renderCodeStructure = () => {
    if (asChild) {
      return <>
        {"    "}<span className={tag}>&lt;Badge</span>{variant !== "default" ? <> <span className={attr}>variant</span>=<span className={str}>"</span><span className={hlVariant}>{variant}</span><span className={str}>"</span></> : ""}{!isRounded ? <> <span className={attr}>className</span>=<span className={str}>"</span><span className={hlLogic}>rounded-md</span><span className={str}>"</span></> : ""} <span className={attr}>asChild</span><span className={tag}>&gt;</span><br />
        {"      "}<span className={tag}>&lt;a</span> <span className={attr}>href</span>=<span className={str}>"#"</span><span className={tag}>&gt;</span><br />
        {icon !== "none" && <>{"        "}<span className={tag}>&lt;<span className={hlContent}>{icon === "check" ? "Check" : icon === "flame" ? "Flame" : "X"}</span> /&gt;</span><br /></>}
        {"        "}<span className={hlContent}>{text}</span><br />
        {"      "}<span className={tag}>&lt;/a&gt;</span><br />
        {"    "}<span className={tag}>&lt;/Badge&gt;</span><br />
      </>
    }

    return <>
      {"    "}<span className={tag}>&lt;Badge</span>{variant !== "default" ? <> <span className={attr}>variant</span>=<span className={str}>"</span><span className={hlVariant}>{variant}</span><span className={str}>"</span></> : ""}{!isRounded ? <> <span className={attr}>className</span>=<span className={str}>"</span><span className={hlLogic}>rounded-md</span><span className={str}>"</span></> : ""}<span className={tag}>&gt;</span><br />
      {icon !== "none" && <>{"      "}<span className={tag}>&lt;<span className={hlContent}>{icon === "check" ? "Check" : icon === "flame" ? "Flame" : "X"}</span> /&gt;</span><br /></>}
      {"      "}<span className={hlContent}>{text}</span><br />
      {"    "}<span className={tag}>&lt;/Badge&gt;</span><br />
    </>
  }

  // Pre-compiled raw text for the copy button (strip spans)
  const rawCodeContent = getCodeString().replace(/<span class=".*?">/g, '').replace(/<\/span>/g, '');

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Badge</h1>
        <p className="text-muted-foreground">
          Interactive showcase of the Badge component including variants, custom overrides, and polymorphic capabilities.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[450px] p-6 border rounded-lg bg-card max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2 sticky top-0 bg-card z-10 py-2 border-b">Configuration</h2>

          {/* 1. Content */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-green-400">1. Content</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Text Label</span>
              <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium">Leading Icon (Lucide)</span>
              <div className="flex gap-2 flex-wrap">
                <Button variant={icon === "none" ? "default" : "outline"} size="sm" onClick={() => setIcon("none")}>None</Button>
                <Button variant={icon === "check" ? "default" : "outline"} size="sm" onClick={() => setIcon("check")}>Check</Button>
                <Button variant={icon === "flame" ? "default" : "outline"} size="sm" onClick={() => setIcon("flame")}>Flame</Button>
                <Button variant={icon === "x" ? "default" : "outline"} size="sm" onClick={() => setIcon("x")}>X</Button>
              </div>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* 2. Visual Variants */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-blue-400">2. Variant (Native Prop)</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Theme Style</span>
              <div className="flex gap-2 flex-wrap">
                {(["default", "secondary", "destructive", "outline", "ghost", "link"] as const).map((v) => (
                  <Button key={v} variant={variant === v ? "default" : "outline"} size="sm" onClick={() => setVariant(v)}>{v}</Button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* 3. Logic / Polymorphism */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-purple-400">3. Behavior & Styling</h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Corners</span>
              <div className="flex gap-2">
                <Button variant={isRounded ? "default" : "outline"} size="sm" onClick={() => setIsRounded(true)}>Default (Pill)</Button>
                <Button variant={!isRounded ? "default" : "outline"} size="sm" onClick={() => setIsRounded(false)}>Override (Rounded-md)</Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium">asChild (Polymorphic Slot)</span>
              <p className="text-xs text-muted-foreground leading-tight mb-2">
                Renders the Badge styling onto a different DOM node underneath (e.g. an &lt;a&gt; tag for actual active links).
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button variant={!asChild ? "default" : "outline"} size="sm" onClick={() => setAsChild(false)}>False (Standard &lt;span&gt;)</Button>
                <Button variant={asChild ? "default" : "outline"} size="sm" onClick={() => setAsChild(true)}>True (Link &lt;a&gt; tag)</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 min-h-[500px] flex items-center justify-center relative">

          <div className="bg-background shadow-xl border rounded-lg p-12 flex items-center justify-center min-w-[300px]">
            {asChild ? (
              <Badge variant={variant} asChild className={!isRounded ? "rounded-md" : ""}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {renderIcon()}
                  {text}
                </a>
              </Badge>
            ) : (
              <Badge variant={variant} className={!isRounded ? "rounded-md" : ""}>
                {renderIcon()}
                {text}
              </Badge>
            )}
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
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">Content / Icons</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-zinc-400">Variant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-zinc-400">Logic & Overrides</span>
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

        <pre className="text-sm font-mono whitespace-pre w-full overflow-x-auto p-4 bg-zinc-900/50 rounded-md border border-zinc-800 leading-relaxed">
          <code>
            <span className={kw}>import</span> {"{"} Badge {"}"} <span className={kw}>from</span> <span className={str}>"@/components/ui/badge"</span><br />
            {icon !== "none" && <><span className={kw}>import</span> {"{"} {icon === "check" ? "Check" : icon === "flame" ? "Flame" : "X"} {"}"} <span className={kw}>from</span> <span className={str}>"lucide-react"</span><br /></>}
            <br />
            <span className={kw}>export default function</span> <span className="text-blue-400">BadgeDemo</span>() {"{"}<br />
            {"  "}<span className={kw}>return</span> (<br />
            {renderCodeStructure()}
            {"  "})<br />
            {"}"}
          </code>
        </pre>
      </div>
    </div>
  );
}
