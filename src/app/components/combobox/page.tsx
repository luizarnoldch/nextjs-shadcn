"use client";

import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export default function ComboboxDemoPage() {
  const [multiple, setMultiple] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showClear, setShowClear] = useState(false);

  // Single select state
  const [value, setValue] = useState<string>("next.js");
  // Multiple select state
  const [values, setValues] = useState<string[]>(["next.js", "astro"]);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    parts.push(`    <Combobox`);
    if (disabled) parts.push(`      disabled`);

    if (multiple) {
      parts.push(`      multiple`);
      parts.push(`      value={values}`);
      parts.push(`      onValueChange={setValues}`);
      parts.push(`    >`);
      parts.push(`      <ComboboxChips>`);
      parts.push(`        {values.map((v) => {`);
      parts.push(
        `          const label = frameworks.find((f) => f.value === v)?.label\n`,
      );
      parts.push(`          return (`);
      parts.push(`            <ComboboxChip key={v}>`);
      parts.push(`              {label}`);
      parts.push(`            </ComboboxChip>`);
      parts.push(`          )`);
      parts.push(`        })}`);
      parts.push(
        `        <ComboboxChipsInput placeholder="Select frameworks..." />`,
      );
      parts.push(`      </ComboboxChips>`);
    } else {
      parts.push(`      value={value}`);
      parts.push(`      onValueChange={setValue}`);
      parts.push(`    >`);
      if (showClear) {
        parts.push(
          `      <ComboboxInput placeholder="Select framework..." showClear />`,
        );
      } else {
        parts.push(`      <ComboboxInput placeholder="Select framework..." />`);
      }
    }

    parts.push(`      <ComboboxContent>`);
    parts.push(`        <ComboboxEmpty>No framework found.</ComboboxEmpty>`);
    parts.push(`        <ComboboxList>`);
    parts.push(`          {frameworks.map((framework) => (`);
    parts.push(
      `            <ComboboxItem key={framework.value} value={framework.value}>`,
    );
    parts.push(`              {framework.label}`);
    parts.push(`            </ComboboxItem>`);
    parts.push(`          ))}`);
    parts.push(`        </ComboboxList>`);
    parts.push(`      </ComboboxContent>`);
    parts.push(`    </Combobox>`);

    const innerJSX = parts.join("\n");

    const importsList = [
      "Combobox",
      "ComboboxContent",
      "ComboboxEmpty",
      "ComboboxList",
      "ComboboxItem",
    ];

    if (multiple) {
      importsList.push("ComboboxChips");
      importsList.push("ComboboxChip");
      importsList.push("ComboboxChipsInput");
    } else {
      importsList.push("ComboboxInput");
    }

    const stateType = multiple
      ? `const [values, setValues] = React.useState<string[]>(["next.js", "astro"])`
      : `const [value, setValue] = React.useState<string>("next.js")`;

    return `import * as React from "react"
import { 
  ${importsList.join(",\n  ")} 
} from "@/components/ui/combobox"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export default function ComboboxDemo() {
  ${stateType}

  return (
${innerJSX}
  )
}`;
  };

  // prettier-ignore
  const rawCodeContent = generateCode();

  // prettier-ignore
  const highlightedCode = generateCode()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/import/g, `<span class="${hlKw}">import</span>`)
    .replace(
      /export default function/g,
      `<span class="${hlKw}">export default function</span>`,
    )
    .replace(/return/g, `<span class="${hlKw}">return</span>`)
    .replace(/const/g, `<span class="${hlKw}">const</span>`)
    // Tags
    .replace(
      /&lt;(\/?)Combobox([A-Za-z]*)(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Combobox$2</span>$3&gt;`,
    )
    // Attributes
    .replace(
      / placeholder="([^"]+)"/g,
      ` <span class="${hlProp}">placeholder</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / key="([^"]+)"/g,
      ` <span class="${hlProp}">key</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(/ disabled/g, ` <span class="${hlProp}">disabled</span>`)
    .replace(/ multiple/g, ` <span class="${hlProp}">multiple</span>`)
    .replace(/ showClear/g, ` <span class="${hlProp}">showClear</span>`)
    // React expressions
    .replace(
      / value=\{([^}]+)\}/g,
      ` <span class="${hlProp}">value</span>={<span class="${hlVal}">$1</span>}`,
    )
    .replace(
      / onValueChange=\{([^}]+)\}/g,
      ` <span class="${hlProp}">onValueChange</span>={<span class="${hlVal}">$1</span>}`,
    )
    .replace(
      / key=\{([^}]+)\}/g,
      ` <span class="${hlProp}">key</span>={<span class="${hlVal}">$1</span>}`,
    );

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Combobox</h1>
        <p className="text-muted-foreground">
          Autocomplete input and command palette with a list of suggestions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">
            Configuration
          </h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">
              Selection Mode
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Multiple</span>
                <span className="text-xs text-muted-foreground">
                  Allow multiple choices
                </span>
              </div>
              <Button
                variant={multiple ? "default" : "secondary"}
                onClick={() => setMultiple(!multiple)}
                size="sm"
              >
                {multiple ? "Enabled" : "Disabled"}
              </Button>
            </div>

            {!multiple && (
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Show Clear Button</span>
                  <span className="text-xs text-muted-foreground">
                    Adds an X to reset
                  </span>
                </div>
                <Button
                  variant={showClear ? "default" : "secondary"}
                  onClick={() => setShowClear(!showClear)}
                  size="sm"
                >
                  {showClear ? "Enabled" : "Disabled"}
                </Button>
              </div>
            )}

            <div className="border-t border-border/50" />

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Disabled State</span>
                <span className="text-xs text-muted-foreground">
                  Disable input interaction
                </span>
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

          <div className="relative z-10 p-12 bg-card border rounded-xl shadow-sm min-w-[350px] max-w-md flex justify-center">
            {multiple ? (
              <Combobox
                disabled={disabled}
                multiple
                value={values}
                onValueChange={(val) => setValues(val as string[])}
              >
                <ComboboxChips className="w-full">
                  {values.map((v) => {
                    const label = frameworks.find((f) => f.value === v)?.label;
                    return (
                      <ComboboxChip key={v}>
                        {label}
                      </ComboboxChip>
                    );
                  })}
                  <ComboboxChipsInput placeholder="Select frameworks..." />
                </ComboboxChips>
                <ComboboxContent>
                  <ComboboxEmpty>No framework found.</ComboboxEmpty>
                  <ComboboxList>
                    {frameworks.map((framework) => (
                      <ComboboxItem
                        key={framework.value}
                        value={framework.value}
                      >
                        {framework.label}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            ) : (
              <Combobox
                disabled={disabled}
                value={value}
                onValueChange={(val) => setValue(val as string)}
              >
                <ComboboxInput
                  placeholder="Select framework..."
                  showClear={showClear}
                />
                <ComboboxContent>
                  <ComboboxEmpty>No framework found.</ComboboxEmpty>
                  <ComboboxList>
                    {frameworks.map((framework) => (
                      <ComboboxItem
                        key={framework.value}
                        value={framework.value}
                      >
                        {framework.label}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            )}
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
