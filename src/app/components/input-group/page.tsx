"use client";

import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Copy, Mail, Search } from "lucide-react";

export default function InputGroupDemoPage() {
  const [align, setAlign] = useState<
    "inline-start" | "inline-end" | "block-start" | "block-end"
  >("inline-start");
  const [addonType, setAddonType] = useState<"text" | "icon" | "button">(
    "text",
  );
  const [inputType, setInputType] = useState<"input" | "textarea">("input");
  const [invalid, setInvalid] = useState(false);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    parts.push(`    <InputGroup className="max-w-md w-full">`);

    // Addon
    const alignAttr = align !== "inline-start" ? ` align="${align}"` : "";
    parts.push(`      <InputGroupAddon${alignAttr}>`);

    if (addonType === "text") {
      parts.push(`        <InputGroupText>https://</InputGroupText>`);
    } else if (addonType === "icon") {
      parts.push(`        <InputGroupText>`);
      parts.push(`          <Search />`);
      parts.push(`        </InputGroupText>`);
    } else if (addonType === "button") {
      parts.push(`        <InputGroupButton>Paste</InputGroupButton>`);
    }

    parts.push(`      </InputGroupAddon>`);

    // Input Control
    const invalidAttr = invalid ? ` aria-invalid={true}` : "";
    if (inputType === "input") {
      parts.push(
        `      <InputGroupInput placeholder="example.com"${invalidAttr} />`,
      );
    } else {
      parts.push(
        `      <InputGroupTextarea placeholder="Type your message..."${invalidAttr} />`,
      );
    }

    parts.push(`    </InputGroup>`);

    const innerJSX = parts.join("\n");

    const importsList = ["InputGroup", "InputGroupAddon", "InputGroupText"];

    if (addonType === "button") importsList.push("InputGroupButton");
    if (inputType === "input") importsList.push("InputGroupInput");
    if (inputType === "textarea") importsList.push("InputGroupTextarea");

    const extraImports =
      addonType === "icon" ? `\nimport { Search } from "lucide-react"` : "";

    return `import * as React from "react"${extraImports}
import {
  ${importsList.sort().join(",\n  ")}
} from "@/components/ui/input-group"

export default function InputGroupDemo() {
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
    .replace(/return/g, `<span class="${hlKw}">return</span>`)
    // Tags
    .replace(
      /&lt;(\/?)InputGroup([A-Za-z]*)(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">InputGroup$2</span>$3&gt;`,
    )
    .replace(
      /&lt;(\/?)Search(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Search</span>$2&gt;`,
    )
    // Attributes
    .replace(
      / className="([^"]+)"/g,
      ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / align="([^"]+)"/g,
      ` <span class="${hlProp}">align</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / placeholder="([^"]+)"/g,
      ` <span class="${hlProp}">placeholder</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / aria-invalid=\{([^}]+)\}/g,
      ` <span class="${hlProp}">aria-invalid</span>={<span class="${hlVal}">$1</span>}`,
    );

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Input Group</h1>
        <p className="text-muted-foreground">
          A stylized wrapper combining inputs, text addons, and buttons into a
          seamless line.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full xl:w-100 p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">
            Configuration
          </h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">
              Addon Settings
            </h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Addon Type</span>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={addonType === "text" ? "default" : "outline"}
                  onClick={() => setAddonType("text")}
                  size="sm"
                >
                  Text
                </Button>
                <Button
                  variant={addonType === "icon" ? "default" : "outline"}
                  onClick={() => setAddonType("icon")}
                  size="sm"
                >
                  Icon
                </Button>
                <Button
                  variant={addonType === "button" ? "default" : "outline"}
                  onClick={() => setAddonType("button")}
                  size="sm"
                >
                  Button
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Addon Alignment</span>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={align === "inline-start" ? "default" : "outline"}
                  onClick={() => setAlign("inline-start")}
                  size="sm"
                >
                  Inline Start
                </Button>
                <Button
                  variant={align === "inline-end" ? "default" : "outline"}
                  onClick={() => setAlign("inline-end")}
                  size="sm"
                >
                  Inline End
                </Button>
                <Button
                  variant={align === "block-start" ? "default" : "outline"}
                  onClick={() => setAlign("block-start")}
                  size="sm"
                >
                  Block Start
                </Button>
                <Button
                  variant={align === "block-end" ? "default" : "outline"}
                  onClick={() => setAlign("block-end")}
                  size="sm"
                >
                  Block End
                </Button>
              </div>
            </div>

            <div className="border-t border-border/50 my-2" />

            <h3 className="text-md font-medium text-muted-foreground">
              Input Settings
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Control Type</span>
                <span className="text-xs text-muted-foreground">
                  Changes the inner field
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={inputType === "input" ? "default" : "outline"}
                  onClick={() => setInputType("input")}
                  size="sm"
                >
                  Input
                </Button>
                <Button
                  variant={inputType === "textarea" ? "default" : "outline"}
                  onClick={() => setInputType("textarea")}
                  size="sm"
                >
                  Textarea
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Validation</span>
                <span className="text-xs text-muted-foreground">
                  Set <code>aria-invalid</code>
                </span>
              </div>
              <Button
                variant={invalid ? "destructive" : "secondary"}
                onClick={() => setInvalid(!invalid)}
                size="sm"
              >
                {invalid ? "Invalid" : "Valid"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-100">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full flex justify-center p-8 bg-card border rounded-xl shadow-sm min-w-75 overflow-hidden">
            <InputGroup className="max-w-md w-full transition-all">
              <InputGroupAddon align={align}>
                {addonType === "text" && (
                  <InputGroupText>https://</InputGroupText>
                )}
                {addonType === "icon" && (
                  <InputGroupText>
                    <Search className="size-4" />
                  </InputGroupText>
                )}
                {addonType === "button" && (
                  <InputGroupButton>Paste</InputGroupButton>
                )}
              </InputGroupAddon>

              {inputType === "input" ? (
                <InputGroupInput
                  placeholder="example.com"
                  aria-invalid={invalid}
                />
              ) : (
                <InputGroupTextarea
                  placeholder="Type your message..."
                  aria-invalid={invalid}
                />
              )}
            </InputGroup>
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
