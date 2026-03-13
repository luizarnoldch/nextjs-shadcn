"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function AccordionPage() {
  const [type, setType] = useState<"single" | "multiple">("single");
  const [collapsible, setCollapsible] = useState(true);
  const [disabled, setDisabled] = useState(false);

  // Styling Variables
  const [triggerPadding, setTriggerPadding] = useState("py-4");
  const [contentPadding, setContentPadding] = useState("pt-0 pb-4");
  const [borderSize, setBorderSize] = useState("border-b");
  const [triggerFontSize, setTriggerFontSize] = useState("text-sm");
  const [contentFontSize, setContentFontSize] = useState("text-sm");

  const generatedCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MyAccordion() {
  return (
    <Accordion 
      type="${type}"${type === "single" && collapsible ? "\n      collapsible" : ""}${disabled ? "\n      disabled" : ""}
      className="w-full"
    >
      <AccordionItem value="item-1" className="${borderSize}">
        <AccordionTrigger className="${triggerPadding} ${triggerFontSize}">
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent className="${contentPadding} ${contentFontSize}">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="${borderSize}">
        <AccordionTrigger className="${triggerPadding} ${triggerFontSize}">
          Is it styled?
        </AccordionTrigger>
        <AccordionContent className="${contentPadding} ${contentFontSize}">
          Yes. It comes with default styles that matches the other
          components' aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="${borderSize}">
        <AccordionTrigger className="${triggerPadding} ${triggerFontSize}">
          Is it animated?
        </AccordionTrigger>
        <AccordionContent className="${contentPadding} ${contentFontSize}">
          Yes. It's animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;

  // Highlighting settings
  const hlBehavior = "bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded";
  const hlExternal = "bg-green-500/30 text-green-200 px-1 py-0.5 rounded";
  const hlInternal = "bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded";
  const hlBorder = "bg-amber-500/30 text-amber-200 px-1 py-0.5 rounded";
  const kw = "text-pink-400"; // Keyword
  const fn = "text-blue-400"; // Function
  const str = "text-orange-300"; // String
  const tag = "text-emerald-400"; // Tag
  const attr = "text-sky-300"; // Attribute

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Accordion</h1>
        <p className="text-muted-foreground">
          Documentation and examples for the Accordion component.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-1/3 p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-2">Configuration</h2>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Type (Behavior)</span>
            <div className="flex gap-2">
              <Button
                variant={type === "single" ? "default" : "outline"}
                size="sm"
                onClick={() => setType("single")}
              >
                Single
              </Button>
              <Button
                variant={type === "multiple" ? "default" : "outline"}
                size="sm"
                onClick={() => setType("multiple")}
              >
                Multiple
              </Button>
            </div>
          </div>

          {type === "single" && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Collapsible</span>
              <div className="flex gap-2">
                <Button
                  variant={collapsible ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCollapsible(true)}
                >
                  True
                </Button>
                <Button
                  variant={!collapsible ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCollapsible(false)}
                >
                  False
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Disabled Elements</span>
            <div className="flex gap-2">
              <Button
                variant={disabled ? "default" : "outline"}
                size="sm"
                onClick={() => setDisabled(!disabled)}
              >
                {disabled ? "Enable Component" : "Disable Component"}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <span className="text-sm font-medium">
              Trigger Padding (External)
            </span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={triggerPadding === "py-2" ? "default" : "outline"}
                size="sm"
                onClick={() => setTriggerPadding("py-2")}
              >
                Small
              </Button>
              <Button
                variant={triggerPadding === "py-4" ? "default" : "outline"}
                size="sm"
                onClick={() => setTriggerPadding("py-4")}
              >
                Medium (Default)
              </Button>
              <Button
                variant={triggerPadding === "py-8" ? "default" : "outline"}
                size="sm"
                onClick={() => setTriggerPadding("py-8")}
              >
                Large
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              Content Padding (Internal)
            </span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={contentPadding === "pt-0 pb-2" ? "default" : "outline"}
                size="sm"
                onClick={() => setContentPadding("pt-0 pb-2")}
              >
                Small
              </Button>
              <Button
                variant={contentPadding === "pt-0 pb-4" ? "default" : "outline"}
                size="sm"
                onClick={() => setContentPadding("pt-0 pb-4")}
              >
                Medium (Default)
              </Button>
              <Button
                variant={contentPadding === "pt-0 pb-8" ? "default" : "outline"}
                size="sm"
                onClick={() => setContentPadding("pt-0 pb-8")}
              >
                Large
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Borders</span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={borderSize === "border-none" ? "default" : "outline"}
                size="sm"
                onClick={() => setBorderSize("border-none")}
              >
                None
              </Button>
              <Button
                variant={borderSize === "border-b" ? "default" : "outline"}
                size="sm"
                onClick={() => setBorderSize("border-b")}
              >
                Default
              </Button>
              <Button
                variant={
                  borderSize === "border-b-4 border-primary"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => setBorderSize("border-b-4 border-primary")}
              >
                Thick / Colored
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              Trigger Font Size (External)
            </span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={triggerFontSize === "text-xs" ? "default" : "outline"}
                size="sm"
                onClick={() => setTriggerFontSize("text-xs")}
              >
                Small
              </Button>
              <Button
                variant={triggerFontSize === "text-sm" ? "default" : "outline"}
                size="sm"
                onClick={() => setTriggerFontSize("text-sm")}
              >
                Medium (Default)
              </Button>
              <Button
                variant={triggerFontSize === "text-lg" ? "default" : "outline"}
                size="sm"
                onClick={() => setTriggerFontSize("text-lg")}
              >
                Large
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              Content Font Size (Internal)
            </span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={contentFontSize === "text-xs" ? "default" : "outline"}
                size="sm"
                onClick={() => setContentFontSize("text-xs")}
              >
                Small
              </Button>
              <Button
                variant={contentFontSize === "text-sm" ? "default" : "outline"}
                size="sm"
                onClick={() => setContentFontSize("text-sm")}
              >
                Medium (Default)
              </Button>
              <Button
                variant={contentFontSize === "text-lg" ? "default" : "outline"}
                size="sm"
                onClick={() => setContentFontSize("text-lg")}
              >
                Large
              </Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 p-10 border rounded-lg bg-card min-h-[500px]">
          <Accordion
            key={type}
            type={type as "single" | "multiple"}
            collapsible={type === "single" ? collapsible : undefined}
            disabled={disabled}
            className="w-full"
          >
            <AccordionItem value="item-1" className={borderSize}>
              <AccordionTrigger
                className={`${triggerPadding} ${triggerFontSize}`}
              >
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent
                className={`${contentPadding} ${contentFontSize}`}
              >
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className={borderSize}>
              <AccordionTrigger
                className={`${triggerPadding} ${triggerFontSize}`}
              >
                Is it styled?
              </AccordionTrigger>
              <AccordionContent
                className={`${contentPadding} ${contentFontSize}`}
              >
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className={borderSize}>
              <AccordionTrigger
                className={`${triggerPadding} ${triggerFontSize}`}
              >
                Is it animated?
              </AccordionTrigger>
              <AccordionContent
                className={`${contentPadding} ${contentFontSize}`}
              >
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Code Snippet */}
      <div className="mt-2 p-6 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-zinc-100">
              Generated Code
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-mono mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-zinc-400">Behavior Configuration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">
                  External Styling (Trigger)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-zinc-400">
                  Internal Styling (Content)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-zinc-400">Borders</span>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigator.clipboard.writeText(generatedCode)}
          >
            Copy Code
          </Button>
        </div>

        <pre className="text-sm font-mono whitespace-pre w-full overflow-x-auto p-4 bg-zinc-900/50 rounded-md border border-zinc-800 leading-relaxed">
          <code>
            <span className={kw}>import</span> {"{"}
            <br />
            {"  "}Accordion,
            <br />
            {"  "}AccordionContent,
            <br />
            {"  "}AccordionItem,
            <br />
            {"  "}AccordionTrigger,
            <br />
            {"}"} <span className={kw}>from</span>{" "}
            <span className={str}>"@/components/ui/accordion"</span>;<br />
            <br />
            <span className={kw}>export default function</span>{" "}
            <span className={fn}>MyAccordion</span>() {"{"}
            <br />
            {"  "}
            <span className={kw}>return</span> (<br />
            {"    "}
            <span className={tag}>&lt;Accordion</span>
            <br />
            {"      "}
            <span className={attr}>type</span>=<span className={str}>"</span>
            <span className={hlBehavior}>{type}</span>
            <span className={str}>"</span>
            {type === "single" && collapsible ? (
              <>
                <br />
                {"      "}
                <span className={hlBehavior}>collapsible</span>
              </>
            ) : null}
            {disabled ? (
              <>
                <br />
                {"      "}
                <span className={hlBehavior}>disabled</span>
              </>
            ) : null}
            <br />
            {"      "}
            <span className={attr}>className</span>=
            <span className={str}>"w-full"</span>
            <br />
            {"    "}
            <span className={tag}>&gt;</span>
            {[
              {
                val: "item-1",
                question: "Is it accessible?",
                answer: "Yes. It adheres to the WAI-ARIA design pattern.",
              },
              {
                val: "item-2",
                question: "Is it styled?",
                answer:
                  "Yes. It comes with default styles that matches the other components' aesthetic.",
              },
              {
                val: "item-3",
                question: "Is it animated?",
                answer:
                  "Yes. It's animated by default, but you can disable it if you prefer.",
              },
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <br />
                {"      "}
                <span className={tag}>&lt;AccordionItem</span>{" "}
                <span className={attr}>value</span>=
                <span className={str}>"{item.val}"</span>{" "}
                <span className={attr}>className</span>=
                <span className={str}>"</span>
                <span className={hlBorder}>{borderSize}</span>
                <span className={str}>"</span>
                <span className={tag}>&gt;</span>
                <br />
                {"        "}
                <span className={tag}>&lt;AccordionTrigger</span>{" "}
                <span className={attr}>className</span>=
                <span className={str}>"</span>
                <span className={hlExternal}>
                  {triggerPadding} {triggerFontSize}
                </span>
                <span className={str}>"</span>
                <span className={tag}>&gt;</span>
                <br />
                {"          "}
                {item.question}
                <br />
                {"        "}
                <span className={tag}>&lt;/AccordionTrigger&gt;</span>
                <br />
                {"        "}
                <span className={tag}>&lt;AccordionContent</span>{" "}
                <span className={attr}>className</span>=
                <span className={str}>"</span>
                <span className={hlInternal}>
                  {contentPadding} {contentFontSize}
                </span>
                <span className={str}>"</span>
                <span className={tag}>&gt;</span>
                <br />
                {"          "}
                {item.answer}
                <br />
                {"        "}
                <span className={tag}>&lt;/AccordionContent&gt;</span>
                <br />
                {"      "}
                <span className={tag}>&lt;/AccordionItem&gt;</span>
              </React.Fragment>
            ))}
            <br />
            {"    "}
            <span className={tag}>&lt;/Accordion&gt;</span>
            <br />
            {"  "});
            <br />
            {"}"}
          </code>
        </pre>
      </div>
    </div>
  );
}
