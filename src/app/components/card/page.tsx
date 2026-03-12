"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardPage() {
  const [showHeader, setShowHeader] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [showAction, setShowAction] = useState(false);
  const [cardTheme, setCardTheme] = useState<"login" | "pricing" | "empty">("login");

  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // prettier-ignore
  const generateCode = () => {
    const parts: string[] = [];

    if (cardTheme === "login") {
      if (showHeader) {
        let headerContent = `      <CardTitle>Login</CardTitle>\n      <CardDescription>Enter your email below to login.</CardDescription>`;
        if (showAction) {
          headerContent += `\n      <CardAction>\n        <Button variant="outline" size="sm">Help</Button>\n      </CardAction>`;
        }
        parts.push(`    <CardHeader>\n${headerContent}\n    </CardHeader>`);
      }
      if (showContent) {
        parts.push(`    <CardContent className="space-y-4">\n      <div className="space-y-2">\n        <Label htmlFor="email">Email</Label>\n        <Input id="email" type="email" placeholder="m@example.com" />\n      </div>\n      <div className="space-y-2">\n        <Label htmlFor="password">Password</Label>\n        <Input id="password" type="password" />\n      </div>\n    </CardContent>`);
      }
      if (showFooter) {
        parts.push(`    <CardFooter>\n      <Button className="w-full">Sign In</Button>\n    </CardFooter>`);
      }
    } else if (cardTheme === "pricing") {
      if (showHeader) {
        let headerContent = `      <CardTitle className="text-2xl">Pro Plan</CardTitle>\n      <CardDescription>Perfect for growing businesses.</CardDescription>`;
        if (showAction) {
          headerContent += `\n      <CardAction>\n        <div className="text-3xl font-bold">$19<span className="text-sm font-normal text-muted-foreground">/mo</span></div>\n      </CardAction>`;
        }
        parts.push(`    <CardHeader>\n${headerContent}\n    </CardHeader>`);
      }
      if (showContent) {
        parts.push(`    <CardContent>\n      <ul className="space-y-2 text-sm text-muted-foreground flex flex-col gap-1">\n        <li className="flex items-center gap-2">\n          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>\n          Up to 10 users\n        </li>\n        <li className="flex items-center gap-2">\n          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>\n          20GB Storage\n        </li>\n        <li className="flex items-center gap-2">\n          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>\n          Priority Support\n        </li>\n      </ul>\n    </CardContent>`);
      }
      if (showFooter) {
        parts.push(`    <CardFooter>\n      <Button className="w-full">Upgrade to Pro</Button>\n    </CardFooter>`);
      }
    } else {
      if (showHeader) {
        let headerContent = `      <CardTitle>Blank Card</CardTitle>\n      <CardDescription>A completely empty starting point.</CardDescription>`;
        if (showAction) {
          headerContent += `\n      <CardAction>\n        <Button variant="ghost" size="sm">Action</Button>\n      </CardAction>`;
        }
        parts.push(`    <CardHeader>\n${headerContent}\n    </CardHeader>`);
      }
      if (showContent) {
        parts.push(`    <CardContent>\n      <p className="text-sm text-muted-foreground">Card content goes here. Build your own layout.</p>\n    </CardContent>`);
      }
      if (showFooter) {
        parts.push(`    <CardFooter>\n      <Button variant="outline" className="w-full">Footer Action</Button>\n    </CardFooter>`);
      }
    }

    const innerJSX = parts.length > 0 ? `\n${parts.join("\n")}\n    ` : "";

    const importCardSubcomponents = [
      "Card",
      ...(showHeader ? ["CardHeader", "CardTitle", "CardDescription"] : []),
      ...(showContent ? ["CardContent"] : []),
      ...(showFooter ? ["CardFooter"] : []),
      ...(showAction && showHeader ? ["CardAction"] : [])
    ];

    return `import { 
  ${importCardSubcomponents.join(",\n  ")}
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
${cardTheme === "login" && showContent ? 'import { Input } from "@/components/ui/input"\nimport { Label } from "@/components/ui/label"\n' : ''}
export default function CardDemo() {
  return (
    <Card className="w-[350px]">${innerJSX}</Card>
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
    .replace(/&lt;(\/?)Card([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Card$2</span>$3&gt;`)
    .replace(/&lt;(\/?)Button(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Button</span>$2&gt;`)
    .replace(/&lt;(\/?)Label(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Label</span>$2&gt;`)
    .replace(/&lt;(\/?)Input(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Input</span>$2&gt;`)
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ variant="([^"]+)"/g, ` <span class="${hlProp}">variant</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ size="([^"]+)"/g, ` <span class="${hlProp}">size</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ type="([^"]+)"/g, ` <span class="${hlProp}">type</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ id="([^"]+)"/g, ` <span class="${hlProp}">id</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ htmlFor="([^"]+)"/g, ` <span class="${hlProp}">htmlFor</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ placeholder="([^"]+)"/g, ` <span class="${hlProp}">placeholder</span>="<span class="${hlVal}">$1</span>"`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Card</h1>
        <p className="text-muted-foreground">
          Displays a card with header, content, and footer.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[400px] p-6 border rounded-lg bg-card shadow-sm">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Component Theme</h3>
            <div className="flex gap-2 flex-wrap">
              {(["login", "pricing", "empty"] as const).map((t) => (
                <Button
                  key={t}
                  variant={cardTheme === t ? "default" : "outline"}
                  onClick={() => setCardTheme(t)}
                  className="capitalize"
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t border-border/50" />

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Visible Layers</h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Header</span>
                <span className="text-xs text-muted-foreground">Visually sets the card title and description</span>
              </div>
              <Button
                variant={showHeader ? "default" : "secondary"}
                onClick={() => setShowHeader(!showHeader)}
                size="sm"
              >
                {showHeader ? "On" : "Off"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Action</span>
                <span className="text-xs text-muted-foreground">Placed inside the CardHeader space</span>
              </div>
              <Button
                variant={showAction ? "default" : "secondary"}
                onClick={() => setShowAction(!showAction)}
                size="sm"
                disabled={!showHeader}
              >
                {showAction ? "On" : "Off"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Content</span>
                <span className="text-xs text-muted-foreground">The primary interior padding wrapper</span>
              </div>
              <Button
                variant={showContent ? "default" : "secondary"}
                onClick={() => setShowContent(!showContent)}
                size="sm"
              >
                {showContent ? "On" : "Off"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Footer</span>
                <span className="text-xs text-muted-foreground">Bottom bordered wrapper</span>
              </div>
              <Button
                variant={showFooter ? "default" : "secondary"}
                onClick={() => setShowFooter(!showFooter)}
                size="sm"
              >
                {showFooter ? "On" : "Off"}
              </Button>
            </div>

          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full max-w-[350px]">
            <Card className="w-full bg-card shadow-lg transition-all">
              {showHeader && (
                <CardHeader>
                  <CardTitle>{cardTheme === 'pricing' ? 'Pro Plan' : cardTheme === 'login' ? 'Login' : 'Blank Card'}</CardTitle>
                  <CardDescription>
                    {cardTheme === 'pricing' ? 'Perfect for growing businesses.' : cardTheme === 'login' ? 'Enter your email below to login.' : 'A completely empty starting point.'}
                  </CardDescription>
                  {showAction && (
                    <CardAction>
                      {cardTheme === 'pricing' ? (
                        <div className="text-3xl font-bold">$19<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                      ) : cardTheme === 'login' ? (
                        <Button variant="outline" size="sm">Help</Button>
                      ) : (
                        <Button variant="ghost" size="sm">Action</Button>
                      )}
                    </CardAction>
                  )}
                </CardHeader>
              )}

              {showContent && (
                <CardContent className={cardTheme === 'login' ? 'space-y-4' : ''}>
                  {cardTheme === 'login' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                      </div>
                    </>
                  )}
                  {cardTheme === 'pricing' && (
                    <ul className="space-y-2 text-sm text-muted-foreground flex flex-col gap-1">
                      <li className="flex items-center gap-2">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                        Up to 10 users
                      </li>
                      <li className="flex items-center gap-2">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                        20GB Storage
                      </li>
                      <li className="flex items-center gap-2">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                        Priority Support
                      </li>
                    </ul>
                  )}
                  {cardTheme === 'empty' && (
                    <p className="text-sm text-muted-foreground">Card content goes here. Build your own layout.</p>
                  )}
                </CardContent>
              )}

              {showFooter && (
                <CardFooter>
                  {cardTheme === 'login' && (
                    <Button className="w-full">Sign In</Button>
                  )}
                  {cardTheme === 'pricing' && (
                    <Button className="w-full">Upgrade to Pro</Button>
                  )}
                  {cardTheme === 'empty' && (
                    <Button variant="outline" className="w-full">Footer Action</Button>
                  )}
                </CardFooter>
              )}
            </Card>
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
