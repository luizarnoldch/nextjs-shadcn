"use client";

import React, { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  AlertCircle,
  Info,
  CheckCircle,
  LucideIcon,
} from "lucide-react";

export default function AlertPage() {
  const [variant, setVariant] = useState<"default" | "destructive">("default");
  const [showIcon, setShowIcon] = useState(true);
  const [iconName, setIconName] = useState<
    "Terminal" | "AlertCircle" | "Info" | "CheckCircle"
  >("Terminal");
  const [title, setTitle] = useState("Heads up!");
  const [description, setDescription] = useState(
    "You can add components to your app using the cli.",
  );

  // Styling Variables
  const [padding, setPadding] = useState("px-4 py-3");
  const [borderRadius, setBorderRadius] = useState("rounded-lg");
  const [titleFontSize, setTitleFontSize] = useState("text-base");
  const [descriptionFontSize, setDescriptionFontSize] = useState("text-sm");

  const icons: Record<string, LucideIcon> = {
    Terminal,
    AlertCircle,
    Info,
    CheckCircle,
  };

  const IconComponent = icons[iconName];

  // Code Generation Highlighting colors
  const hlLogic = "bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded";
  const hlContent = "bg-green-500/30 text-green-200 px-1 py-0.5 rounded";
  const hlStyle = "bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded";

  const kw = "text-pink-400"; // Keyword
  const fn = "text-blue-400"; // Function
  const str = "text-orange-300"; // String
  const tag = "text-emerald-400"; // Tag
  const attr = "text-sky-300"; // Attribute

  const generatedCodeString = `import { ${showIcon ? `${iconName}, ` : ""}Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MyAlert() {
  return (
    <Alert 
      variant="${variant}" 
      className="${padding} ${borderRadius}"
    >
      ${showIcon ? `<${iconName} className="h-4 w-4" />` : ""}
      <AlertTitle className="${titleFontSize}">${title}</AlertTitle>
      <AlertDescription className="${descriptionFontSize}">
        ${description}
      </AlertDescription>
    </Alert>
  );
}`;

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Alert</h1>
        <p className="text-muted-foreground">
          Displays a callout for user attention.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-1/3 p-6 border rounded-lg bg-card max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Configuration</h2>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Variant</span>
            <div className="flex gap-2">
              <Button
                variant={variant === "default" ? "default" : "outline"}
                size="sm"
                onClick={() => setVariant("default")}
              >
                Default
              </Button>
              <Button
                variant={variant === "destructive" ? "default" : "outline"}
                size="sm"
                onClick={() => setVariant("destructive")}
              >
                Destructive
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Icon Visibility</span>
            <div className="flex gap-2">
              <Button
                variant={showIcon ? "default" : "outline"}
                size="sm"
                onClick={() => setShowIcon(true)}
              >
                Show Icon
              </Button>
              <Button
                variant={!showIcon ? "default" : "outline"}
                size="sm"
                onClick={() => setShowIcon(false)}
              >
                Hide Icon
              </Button>
            </div>
          </div>

          {showIcon && (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Select Icon</span>
              <div className="flex gap-2 flex-wrap">
                {(Object.keys(icons) as (keyof typeof icons)[]).map((name) => (
                  <Button
                    key={name}
                    variant={iconName === name ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setIconName(
                        name as
                          | "Terminal"
                          | "AlertCircle"
                          | "Info"
                          | "CheckCircle",
                      )
                    }
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Alert Title</span>
            <input
              type="text"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Alert Description</span>
            <textarea
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <span className="text-sm font-medium">
              Padding (Internal Style)
            </span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={padding === "px-2 py-1" ? "default" : "outline"}
                size="sm"
                onClick={() => setPadding("px-2 py-1")}
              >
                Small
              </Button>
              <Button
                variant={padding === "px-4 py-3" ? "default" : "outline"}
                size="sm"
                onClick={() => setPadding("px-4 py-3")}
              >
                Normal
              </Button>
              <Button
                variant={padding === "px-8 py-6" ? "default" : "outline"}
                size="sm"
                onClick={() => setPadding("px-8 py-6")}
              >
                Large
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Border Radius</span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={
                  borderRadius === "rounded-none" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setBorderRadius("rounded-none")}
              >
                None
              </Button>
              <Button
                variant={borderRadius === "rounded-lg" ? "default" : "outline"}
                size="sm"
                onClick={() => setBorderRadius("rounded-lg")}
              >
                Rounded
              </Button>
              <Button
                variant={
                  borderRadius === "rounded-full" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setBorderRadius("rounded-full")}
              >
                Full
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Title Font Size</span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={titleFontSize === "text-xs" ? "default" : "outline"}
                size="sm"
                onClick={() => setTitleFontSize("text-xs")}
              >
                XS
              </Button>
              <Button
                variant={titleFontSize === "text-base" ? "default" : "outline"}
                size="sm"
                onClick={() => setTitleFontSize("text-base")}
              >
                Base
              </Button>
              <Button
                variant={titleFontSize === "text-xl" ? "default" : "outline"}
                size="sm"
                onClick={() => setTitleFontSize("text-xl")}
              >
                XL
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Description Font Size</span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={
                  descriptionFontSize === "text-xs" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setDescriptionFontSize("text-xs")}
              >
                XS
              </Button>
              <Button
                variant={
                  descriptionFontSize === "text-base" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setDescriptionFontSize("text-base")}
              >
                Base
              </Button>
              <Button
                variant={
                  descriptionFontSize === "text-xl" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setDescriptionFontSize("text-xl")}
              >
                XL
              </Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 p-10 border rounded-lg bg-card min-h-[500px] flex items-center justify-center">
          <Alert
            variant={variant}
            className={`${padding} ${borderRadius} max-w-md`}
          >
            {showIcon && <IconComponent className="h-4 w-4" />}
            <AlertTitle className={titleFontSize}>{title}</AlertTitle>
            <AlertDescription className={descriptionFontSize}>
              {description}
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Code Snippet with Highlights and Legend */}
      <div className="mt-2 p-6 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-zinc-100">
              Generated Code
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-zinc-400">Logic/Variant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">Content</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-zinc-400">Styling</span>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigator.clipboard.writeText(generatedCodeString)}
          >
            Copy Code
          </Button>
        </div>

        <pre className="text-sm font-mono whitespace-pre w-full overflow-x-auto p-4 bg-zinc-900/50 rounded-md border border-zinc-800 leading-relaxed">
          <code>
            <span className={kw}>import</span> {"{"}{" "}
            {showIcon && <span className={hlLogic}>{iconName}, </span>}Alert,
            AlertDescription, AlertTitle {"}"} <span className={kw}>from</span>{" "}
            <span className={str}>"@/components/ui/alert"</span>;<br />
            <br />
            <span className={kw}>export default function</span>{" "}
            <span className={fn}>MyAlert</span>() {"{"}
            <br />
            {"  "}
            <span className={kw}>return</span> (<br />
            {"    "}
            <span className={tag}>&lt;Alert</span>
            <br />
            {"      "}
            <span className={attr}>variant</span>=<span className={str}>"</span>
            <span className={hlLogic}>{variant}</span>
            <span className={str}>"</span>
            <br />
            {"      "}
            <span className={attr}>className</span>=
            <span className={str}>"</span>
            <span className={hlStyle}>
              {padding} {borderRadius}
            </span>
            <span className={str}>"</span>
            <br />
            {"    "}
            <span className={tag}>&gt;</span>
            <br />
            {showIcon && (
              <>
                {"      "}
                <span className={tag}>&lt;</span>
                <span className={hlLogic}>{iconName}</span>{" "}
                <span className={attr}>className</span>=
                <span className={str}>"h-4 w-4"</span>{" "}
                <span className={tag}>/&gt;</span>
                <br />
              </>
            )}
            {"      "}
            <span className={tag}>&lt;AlertTitle</span>{" "}
            <span className={attr}>className</span>=
            <span className={str}>"</span>
            <span className={hlStyle}>{titleFontSize}</span>
            <span className={str}>"</span>
            <span className={tag}>&gt;</span>
            <br />
            {"        "}
            <span className={hlContent}>{title}</span>
            <br />
            {"      "}
            <span className={tag}>&lt;/AlertTitle&gt;</span>
            <br />
            {"      "}
            <span className={tag}>&lt;AlertDescription</span>{" "}
            <span className={attr}>className</span>=
            <span className={str}>"</span>
            <span className={hlStyle}>{descriptionFontSize}</span>
            <span className={str}>"</span>
            <span className={tag}>&gt;</span>
            <br />
            {"        "}
            <span className={hlContent}>{description}</span>
            <br />
            {"      "}
            <span className={tag}>&lt;/AlertDescription&gt;</span>
            <br />
            {"    "}
            <span className={tag}>&lt;/Alert&gt;</span>
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
