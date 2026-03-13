"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogDemoPage() {
  const [showCloseIcon, setShowCloseIcon] = useState(true);
  const [showFooterClose, setShowFooterClose] = useState(false);
  const [preventOutsideInteraction, setPreventOutsideInteraction] =
    useState(false);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    parts.push(`    <Dialog>`);
    parts.push(`      <DialogTrigger asChild>`);
    parts.push(`        <Button variant="outline">Edit Profile</Button>`);
    parts.push(`      </DialogTrigger>`);

    // DialogContent props
    const contentProps = [];
    if (!showCloseIcon) contentProps.push(`showCloseButton={false}`);
    if (preventOutsideInteraction)
      contentProps.push(`onInteractOutside={(e) => e.preventDefault()}`);
    const contentPropsStr =
      contentProps.length > 0 ? ` ${contentProps.join(" ")}` : "";

    parts.push(
      `      <DialogContent className="sm:max-w-[425px]"${contentPropsStr}>`,
    );
    parts.push(`        <DialogHeader>`);
    parts.push(`          <DialogTitle>Edit profile</DialogTitle>`);
    parts.push(`          <DialogDescription>`);
    parts.push(
      `            Make changes to your profile here. Click save when you're done.`,
    );
    parts.push(`          </DialogDescription>`);
    parts.push(`        </DialogHeader>`);
    parts.push(`        <div className="grid gap-4 py-4">`);
    parts.push(
      `          <div className="grid grid-cols-4 items-center gap-4">`,
    );
    parts.push(`            <Label htmlFor="name" className="text-right">`);
    parts.push(`              Name`);
    parts.push(`            </Label>`);
    parts.push(
      `            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />`,
    );
    parts.push(`          </div>`);
    parts.push(
      `          <div className="grid grid-cols-4 items-center gap-4">`,
    );
    parts.push(`            <Label htmlFor="username" className="text-right">`);
    parts.push(`              Username`);
    parts.push(`            </Label>`);
    parts.push(
      `            <Input id="username" defaultValue="@peduarte" className="col-span-3" />`,
    );
    parts.push(`          </div>`);
    parts.push(`        </div>`);

    // DialogFooter props
    const footerProps = [];
    if (showFooterClose) footerProps.push(`showCloseButton`);
    const footerPropsStr =
      footerProps.length > 0 ? ` ${footerProps.join(" ")}` : "";

    parts.push(`        <DialogFooter${footerPropsStr}>`);
    parts.push(`          <Button type="submit">Save changes</Button>`);
    parts.push(`        </DialogFooter>`);
    parts.push(`      </DialogContent>`);
    parts.push(`    </Dialog>`);

    const innerJSX = parts.join("\n");

    return `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DialogDemo() {
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
      /&lt;(\/?)Dialog([A-Za-z]*)(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Dialog$2</span>$3&gt;`,
    )
    .replace(
      /&lt;(\/?)Button(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Button</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)Label(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Label</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)Input(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Input</span>$2&gt;`,
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
      / variant="([^"]+)"/g,
      ` <span class="${hlProp}">variant</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / type="([^"]+)"/g,
      ` <span class="${hlProp}">type</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / id="([^"]+)"/g,
      ` <span class="${hlProp}">id</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / htmlFor="([^"]+)"/g,
      ` <span class="${hlProp}">htmlFor</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / defaultValue="([^"]+)"/g,
      ` <span class="${hlProp}">defaultValue</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(/ asChild/g, ` <span class="${hlProp}">asChild</span>`)
    .replace(
      / showCloseButton(?!=\{)/g,
      ` <span class="${hlProp}">showCloseButton</span>`,
    )
    // React expressions
    .replace(
      / showCloseButton=\{([^}]+)\}/g,
      ` <span class="${hlProp}">showCloseButton</span>={<span class="${hlVal}">$1</span>}`,
    )
    .replace(
      / onInteractOutside=\{([^}]+)\}/g,
      ` <span class="${hlProp}">onInteractOutside</span>={<span class="${hlVal}">$1</span>}`,
    );

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dialog</h1>
        <p className="text-muted-foreground">
          A window overlaid on either the primary window or another dialog
          window, rendering the content underneath inert.
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
              Layout Options
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Header Close Icon</span>
                <span className="text-xs text-muted-foreground">
                  Toggle the top-right X icon
                </span>
              </div>
              <Button
                variant={showCloseIcon ? "default" : "secondary"}
                onClick={() => setShowCloseIcon(!showCloseIcon)}
                size="sm"
              >
                {showCloseIcon ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Footer Close Button</span>
                <span className="text-xs text-muted-foreground">
                  Toggle action close button
                </span>
              </div>
              <Button
                variant={showFooterClose ? "default" : "secondary"}
                onClick={() => setShowFooterClose(!showFooterClose)}
                size="sm"
              >
                {showFooterClose ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="border-t border-border/50" />

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Require Dismissal</span>
                <span className="text-xs text-muted-foreground">
                  Prevent click-outside to close
                </span>
              </div>
              <Button
                variant={preventOutsideInteraction ? "default" : "secondary"}
                onClick={() =>
                  setPreventOutsideInteraction(!preventOutsideInteraction)
                }
                size="sm"
              >
                {preventOutsideInteraction ? "On" : "Off"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 p-12 bg-card border rounded-xl shadow-sm min-w-[350px] flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[425px]"
                showCloseButton={showCloseIcon}
                onInteractOutside={
                  preventOutsideInteraction
                    ? (e) => e.preventDefault()
                    : undefined
                }
              >
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter showCloseButton={showFooterClose}>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
