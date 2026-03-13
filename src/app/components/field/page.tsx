"use client";

import React, { useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function FieldDemoPage() {
  const [orientation, setOrientation] = useState<
    "vertical" | "horizontal" | "responsive"
  >("vertical");
  const [state, setState] = useState<"default" | "invalid">("default");
  const [showDescription, setShowDescription] = useState(true);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    parts.push(`    <FieldSet className="max-w-md w-full">`);
    parts.push(`      <FieldLegend>Account Settings</FieldLegend>`);
    parts.push(`      `);
    parts.push(`      <FieldGroup>`);

    // Field 1 (Email)
    const invalidAttr = state === "invalid" ? ` data-invalid={true}` : "";
    parts.push(`        <Field orientation="${orientation}"${invalidAttr}>`);
    parts.push(
      `          <FieldLabel htmlFor="email">Email Address</FieldLabel>`,
    );
    parts.push(`          <FieldContent>`);
    parts.push(
      `            <Input id="email" type="email" placeholder="name@example.com" />`,
    );
    parts.push(`          </FieldContent>`);
    if (showDescription) {
      parts.push(
        `          <FieldDescription>Your primary contact email.</FieldDescription>`,
      );
    }
    if (state === "invalid") {
      parts.push(
        `          <FieldError errors={[{ message: "Please enter a valid email address." }]} />`,
      );
    }
    parts.push(`        </Field>`);

    // Separator
    parts.push(`        `);
    parts.push(`        <FieldSeparator>Options</FieldSeparator>`);
    parts.push(`        `);

    // Field 2 (Checkbox)
    parts.push(`        <Field orientation="${orientation}">`);
    parts.push(`          <div className="flex items-start gap-2 pt-1">`);
    parts.push(`            <Checkbox id="marketing" className="mt-1" />`);
    parts.push(`            <div className="grid gap-1.5">`);
    parts.push(
      `              <FieldLabel htmlFor="marketing">Marketing emails</FieldLabel>`,
    );
    if (showDescription) {
      parts.push(
        `              <FieldDescription>Receive emails about new products, features, and more.</FieldDescription>`,
      );
    }
    parts.push(`            </div>`);
    parts.push(`          </div>`);
    parts.push(`        </Field>`);

    parts.push(`      </FieldGroup>`);
    parts.push(`    </FieldSet>`);

    const innerJSX = parts.join("\n");

    const importsList = [
      "Field",
      "FieldContent",
      "FieldGroup",
      "FieldLabel",
      "FieldLegend",
      "FieldSeparator",
      "FieldSet",
    ];

    if (showDescription) importsList.push("FieldDescription");
    if (state === "invalid") importsList.push("FieldError");

    return `import {
  ${importsList.sort().join(",\n  ")}
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function FormDemo() {
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
    .replace(/function/g, `<span class="${hlKw}">function</span>`)
    .replace(/return/g, `<span class="${hlKw}">return</span>`)
    // Tags
    .replace(
      /&lt;(\/?)Field([A-Za-z]*)(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Field$2</span>$3&gt;`,
    )
    .replace(
      /&lt;(\/?)Input(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Input</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)Checkbox(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Checkbox</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)div(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">div</span>$2&gt;`,
    )
    // Attributes
    .replace(
      / className="([^"]+)"/g,
      ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / id="([^"]+)"/g,
      ` <span class="${hlProp}">id</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / type="([^"]+)"/g,
      ` <span class="${hlProp}">type</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / placeholder="([^"]+)"/g,
      ` <span class="${hlProp}">placeholder</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / orientation="([^"]+)"/g,
      ` <span class="${hlProp}">orientation</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / htmlFor="([^"]+)"/g,
      ` <span class="${hlProp}">htmlFor</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / data-invalid=\{([^}]+)\}/g,
      ` <span class="${hlProp}">data-invalid</span>={<span class="${hlVal}">$1</span>}`,
    )
    .replace(
      / errors=\{([^}]+)\}/g,
      ` <span class="${hlProp}">errors</span>={<span class="${hlVal}">$1</span>}`,
    );

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Field Components</h1>
        <p className="text-muted-foreground">
          A powerful suite of unstyled components for robust form structures,
          labels, and error tracking.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full xl:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">
            Configuration
          </h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">
              Layout
            </h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Orientation</span>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={orientation === "vertical" ? "default" : "outline"}
                  onClick={() => setOrientation("vertical")}
                  size="sm"
                >
                  Vertical
                </Button>
                <Button
                  variant={orientation === "horizontal" ? "default" : "outline"}
                  onClick={() => setOrientation("horizontal")}
                  size="sm"
                >
                  Horizontal
                </Button>
                <Button
                  variant={orientation === "responsive" ? "default" : "outline"}
                  onClick={() => setOrientation("responsive")}
                  size="sm"
                >
                  Responsive
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Responsive shifts from col to row on MD breakpoint.
              </p>
            </div>

            <div className="border-t border-border/50 my-2" />

            <h3 className="text-md font-medium text-muted-foreground">
              Form State
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Validation</span>
                <span className="text-xs text-muted-foreground">
                  Simulate field errors
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={state === "default" ? "default" : "outline"}
                  onClick={() => setState("default")}
                  size="sm"
                >
                  Valid
                </Button>
                <Button
                  variant={state === "invalid" ? "destructive" : "outline"}
                  onClick={() => setState("invalid")}
                  size="sm"
                >
                  Invalid
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Show Description</span>
                <span className="text-xs text-muted-foreground">
                  Helper text visibility
                </span>
              </div>
              <Button
                variant={showDescription ? "default" : "secondary"}
                onClick={() => setShowDescription(!showDescription)}
                size="sm"
              >
                {showDescription ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full flex justify-center p-8 bg-card border rounded-xl shadow-sm min-w-[350px] overflow-hidden">
            <FieldSet className="w-full">
              <FieldLegend>Account Settings</FieldLegend>

              <FieldGroup>
                <Field
                  orientation={orientation}
                  data-invalid={state === "invalid"}
                >
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <FieldContent>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                    />
                  </FieldContent>
                  {showDescription && (
                    <FieldDescription>
                      Your primary contact email.
                    </FieldDescription>
                  )}
                  {state === "invalid" && (
                    <FieldError
                      errors={[
                        { message: "Please enter a valid email address." },
                      ]}
                    />
                  )}
                </Field>

                <FieldSeparator>Options</FieldSeparator>

                <Field orientation={orientation}>
                  <div className="flex items-start gap-2 pt-1 transition-all">
                    <Checkbox id="marketing" className="mt-1" />
                    <div className="grid gap-1.5 flex-1">
                      <FieldLabel htmlFor="marketing">
                        Marketing emails
                      </FieldLabel>
                      {showDescription && (
                        <FieldDescription>
                          Receive emails about new products, features, and more.
                        </FieldDescription>
                      )}
                    </div>
                  </div>
                </Field>
              </FieldGroup>
            </FieldSet>
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
