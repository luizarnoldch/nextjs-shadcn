"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function InputDemoPage() {
  const [type, setType] = useState<"text" | "email" | "password" | "number" | "file">("text");
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    const typeStr = type !== "text" ? ` type="${type}"` : "";
    const disabledStr = disabled ? ` disabled` : "";
    const invalidStr = invalid ? ` aria-invalid={true}` : "";

    let placeholderStr = "";
    if (type !== "file") {
      placeholderStr = ` placeholder="${type === "email" ? "m@example.com" : type === "password" ? "••••••••" : type === "number" ? "42" : "Enter a value..."
        }"`;
    }

    if (showLabel) {
      parts.push(`    <div className="grid w-full max-w-sm items-center gap-1.5">`);
      parts.push(`      <Label htmlFor="demo-input">${type.charAt(0).toUpperCase() + type.slice(1)}</Label>`);
      parts.push(`      <Input id="demo-input"${typeStr}${placeholderStr}${disabledStr}${invalidStr} />`);
      parts.push(`    </div>`);
    } else {
      parts.push(`    <Input className="max-w-sm"${typeStr}${placeholderStr}${disabledStr}${invalidStr} />`);
    }

    const innerJSX = parts.join("\n");

    const importsList = ["Input"];
    if (showLabel) importsList.push("Label");

    const importStatements = showLabel
      ? `import { Input } from "@/components/ui/input"\nimport { Label } from "@/components/ui/label"`
      : `import { Input } from "@/components/ui/input"`;

    return `${importStatements}

export default function InputDemo() {
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
    .replace(/&lt;(\/?)Input(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Input</span>$2&gt;`)
    .replace(/&lt;(\/?)Label(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Label</span>$2&gt;`)
    .replace(/&lt;(\/?)div(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">div</span>$2&gt;`)
    // Attributes
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ type="([^"]+)"/g, ` <span class="${hlProp}">type</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ placeholder="([^"]+)"/g, ` <span class="${hlProp}">placeholder</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ id="([^"]+)"/g, ` <span class="${hlProp}">id</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ htmlFor="([^"]+)"/g, ` <span class="${hlProp}">htmlFor</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ disabled/g, ` <span class="${hlProp}">disabled</span>`)
    .replace(/ aria-invalid=\{([^}]+)\}/g, ` <span class="${hlProp}">aria-invalid</span>={<span class="${hlVal}">$1</span>}`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Input</h1>
        <p className="text-muted-foreground">
          Displays a form input field or a component that looks like an input field.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full xl:w-100 p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">

            <h3 className="text-md font-medium text-muted-foreground">HTML Properties</h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Input Type</span>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={type === "text" ? "default" : "outline"}
                  onClick={() => setType("text")}
                  size="sm"
                >
                  Text
                </Button>
                <Button
                  variant={type === "email" ? "default" : "outline"}
                  onClick={() => setType("email")}
                  size="sm"
                >
                  Email
                </Button>
                <Button
                  variant={type === "password" ? "default" : "outline"}
                  onClick={() => setType("password")}
                  size="sm"
                >
                  Password
                </Button>
                <Button
                  variant={type === "number" ? "default" : "outline"}
                  onClick={() => setType("number")}
                  size="sm"
                >
                  Number
                </Button>
                <Button
                  variant={type === "file" ? "default" : "outline"}
                  onClick={() => setType("file")}
                  size="sm"
                >
                  File
                </Button>
              </div>
            </div>

            <div className="border-t border-border/50 my-2" />

            <h3 className="text-md font-medium text-muted-foreground">State & Composition</h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">With Label</span>
                <span className="text-xs text-muted-foreground">Wraps field in a grid</span>
              </div>
              <Button
                variant={showLabel ? "default" : "secondary"}
                onClick={() => setShowLabel(!showLabel)}
                size="sm"
              >
                {showLabel ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Validation Status</span>
                <span className="text-xs text-muted-foreground">Sets <code>aria-invalid</code></span>
              </div>
              <Button
                variant={invalid ? "destructive" : "secondary"}
                onClick={() => setInvalid(!invalid)}
                size="sm"
              >
                {invalid ? "Invalid" : "Valid"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Interaction</span>
                <span className="text-xs text-muted-foreground">Sets <code>disabled</code> flag</span>
              </div>
              <Button
                variant={disabled ? "secondary" : "outline"}
                onClick={() => setDisabled(!disabled)}
                size="sm"
              >
                {disabled ? "Disabled" : "Enabled"}
              </Button>
            </div>

          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-100">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full flex justify-center p-8 bg-card border rounded-xl shadow-sm min-w-75 overflow-hidden">

            {showLabel ? (
              <div className="grid w-full max-w-sm items-center gap-1.5 transition-all">
                <Label htmlFor="demo-input" className={invalid ? "text-destructive" : ""}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Label>
                <Input
                  id="demo-input"
                  type={type}
                  disabled={disabled}
                  aria-invalid={invalid}
                  placeholder={type !== "file" ? (type === "email" ? "m@example.com" : type === "password" ? "••••••••" : type === "number" ? "42" : "Enter a value...") : undefined}
                />
              </div>
            ) : (
              <Input
                className="max-w-sm transition-all"
                type={type}
                disabled={disabled}
                aria-invalid={invalid}
                placeholder={type !== "file" ? (type === "email" ? "m@example.com" : type === "password" ? "••••••••" : type === "number" ? "42" : "Enter a value...") : undefined}
              />
            )}

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
