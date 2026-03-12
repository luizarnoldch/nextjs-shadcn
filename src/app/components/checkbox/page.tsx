"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CheckboxDemoPage() {
  const [showLabel, setShowLabel] = useState<boolean>(true);
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean | "indeterminate">(false);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    const checkboxProps: string[] = [`id="terms"`];
    if (disabled) checkboxProps.push(`disabled`);

    const propsStr = checkboxProps.join(" ");

    if (showLabel) {
      parts.push(`    <div className="items-top flex space-x-2">`);
      parts.push(`      <Checkbox ${propsStr} />`);
      parts.push(`      <div className="grid gap-1.5 leading-none">`);
      parts.push(`        <Label htmlFor="terms"${disabled ? ' className="cursor-not-allowed opacity-70"' : ''}>`);
      parts.push(`          Accept terms and conditions`);
      parts.push(`        </Label>`);

      if (showDescription) {
        parts.push(`        <div className="text-sm text-muted-foreground">`);
        parts.push(`          You agree to our Terms of Service and Privacy Policy.`);
        parts.push(`        </div>`);
      }

      parts.push(`      </div>`);
      parts.push(`    </div>`);
    } else {
      parts.push(`    <div className="flex items-center space-x-2">`);
      parts.push(`      <Checkbox ${propsStr} />`);
      parts.push(`    </div>`);
    }

    const innerJSX = parts.join("\n");

    const imports = [
      `import { Checkbox } from "@/components/ui/checkbox"`,
      ...(showLabel ? [`import { Label } from "@/components/ui/label"`] : []),
    ].join("\n");

    return `${imports}

export default function CheckboxDemo() {
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
    // Tags
    .replace(/&lt;(\/?)Checkbox(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Checkbox</span>$2&gt;`)
    .replace(/&lt;(\/?)Label(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Label</span>$2&gt;`)
    .replace(/&lt;(\/?)div(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">div</span>$2&gt;`)
    .replace(/&lt;(\/?)p(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">p</span>$2&gt;`)
    // Attributes
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ id="([^"]+)"/g, ` <span class="${hlProp}">id</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ htmlFor="([^"]+)"/g, ` <span class="${hlProp}">htmlFor</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ disabled/g, ` <span class="${hlProp}">disabled</span>`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Checkbox</h1>
        <p className="text-muted-foreground">
          A control that allows the user to toggle between checked and not checked.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Options</h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">With Label</span>
                <span className="text-xs text-muted-foreground">Show associated text</span>
              </div>
              <Button
                variant={showLabel ? "default" : "secondary"}
                onClick={() => setShowLabel(!showLabel)}
                size="sm"
              >
                {showLabel ? "Enabled" : "Disabled"}
              </Button>
            </div>

            {showLabel && (
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">With Description</span>
                  <span className="text-xs text-muted-foreground">Show sub-text paragraph</span>
                </div>
                <Button
                  variant={showDescription ? "default" : "secondary"}
                  onClick={() => setShowDescription(!showDescription)}
                  size="sm"
                >
                  {showDescription ? "Enabled" : "Disabled"}
                </Button>
              </div>
            )}

            <div className="border-t border-border/50" />

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Disabled State</span>
                <span className="text-xs text-muted-foreground">Disable interaction</span>
              </div>
              <Button
                variant={disabled ? "default" : "secondary"}
                onClick={() => setDisabled(!disabled)}
                size="sm"
              >
                {disabled ? "On" : "Off"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 p-12 bg-card border rounded-xl shadow-sm min-w-[300px] flex justify-center">
            {showLabel ? (
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="terms-preview"
                  disabled={disabled}
                  checked={checked}
                  onCheckedChange={setChecked}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="terms-preview"
                    className={disabled ? 'cursor-not-allowed opacity-70' : ''}
                  >
                    Accept terms and conditions
                  </Label>
                  {showDescription && (
                    <div className="text-sm text-muted-foreground">
                      You agree to our Terms of Service and Privacy Policy.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms-preview"
                  disabled={disabled}
                  checked={checked}
                  onCheckedChange={setChecked}
                />
              </div>
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
