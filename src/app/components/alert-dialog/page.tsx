"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function AlertDialogPage() {
  // Configurable Component Props
  const [contentSize, setContentSize] = useState<"default" | "sm">("default");

  // Trigger
  const [triggerSize, setTriggerSize] = useState<"default" | "sm" | "lg" | "icon">("default");
  const [triggerTextSize, setTriggerTextSize] = useState("");
  const [triggerText, setTriggerText] = useState("Open Dialog");

  // Header & Media
  const [headerTextSize, setHeaderTextSize] = useState("");
  const [showMedia, setShowMedia] = useState(false);
  const [mediaIconSize, setMediaIconSize] = useState("size-8");

  // Title & Description
  const [title, setTitle] = useState("Are you absolutely sure?");
  const [titleTextSize, setTitleTextSize] = useState("");

  const [description, setDescription] = useState("This action cannot be undone. This will permanently delete your account and remove your data from our servers.");
  const [descriptionTextSize, setDescriptionTextSize] = useState("");

  // Footer & Actions
  const [footerTextSize, setFooterTextSize] = useState("");

  const [actionVariant, setActionVariant] = useState<"default" | "destructive" | "outline" | "secondary" | "ghost" | "link">("default");
  const [actionSize, setActionSize] = useState<"default" | "sm" | "lg" | "icon">("default");
  const [actionText, setActionText] = useState("Continue");

  const [cancelVariant, setCancelVariant] = useState<"default" | "destructive" | "outline" | "secondary" | "ghost" | "link">("outline");
  const [cancelSize, setCancelSize] = useState<"default" | "sm" | "lg" | "icon">("default");
  const [cancelText, setCancelText] = useState("Cancel");

  // Highlighting colors for code mapping
  const hlLogic = "bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded";
  const hlAction = "bg-red-500/30 text-red-200 px-1 py-0.5 rounded";
  const hlCancel = "bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded";
  const hlContent = "bg-green-500/30 text-green-200 px-1 py-0.5 rounded";
  const hlStyle = "bg-yellow-500/30 text-yellow-200 px-1 py-0.5 rounded";

  // Code highlights
  const kw = "text-pink-400";
  const str = "text-orange-300";
  const tag = "text-emerald-400";
  const attr = "text-sky-300";

  const generatedCodeString = `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,${showMedia ? "\n  AlertDialogMedia," : ""}
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"${showMedia ? '\nimport { Trash2 } from "lucide-react"' : ""}

export default function MyAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline"${triggerSize !== "default" ? ` size="${triggerSize}"` : ""}${triggerTextSize ? ` className="${triggerTextSize}"` : ""}>${triggerText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent${contentSize !== "default" ? ` size="${contentSize}"` : ""}>
        <AlertDialogHeader${headerTextSize ? ` className="${headerTextSize}"` : ""}>${showMedia ? `\n          <AlertDialogMedia>\n            <Trash2${mediaIconSize !== "size-8" ? ` className="${mediaIconSize}"` : ""} />\n          </AlertDialogMedia>` : ""}
          <AlertDialogTitle${titleTextSize ? ` className="${titleTextSize}"` : ""}>${title}</AlertDialogTitle>
          <AlertDialogDescription${descriptionTextSize ? ` className="${descriptionTextSize}"` : ""}>
            ${description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter${footerTextSize ? ` className="${footerTextSize}"` : ""}>
          <AlertDialogCancel variant="${cancelVariant}" size="${cancelSize}">${cancelText}</AlertDialogCancel>
          <AlertDialogAction variant="${actionVariant}" size="${actionSize}">${actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`;

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Alert Dialog</h1>
        <p className="text-muted-foreground">
          Interactive showcase of the Alert Dialog component with strict native props and text sizing options.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[450px] p-6 border rounded-lg bg-card max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2 sticky top-0 bg-card z-10 py-2 border-b">Configuration</h2>

          {/* Trigger Details */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-zinc-400">1. Trigger Button</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Text</span>
              <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={triggerText} onChange={(e) => setTriggerText(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Button Size</span>
              <div className="flex gap-2 flex-wrap">
                {(["default", "sm", "lg", "icon"] as const).map((s) => (
                  <Button key={s} variant={triggerSize === s ? "default" : "outline"} size="sm" onClick={() => setTriggerSize(s)}>{s}</Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Text Size</span>
              <div className="flex gap-2 flex-wrap">
                <Button variant={triggerTextSize === "" ? "default" : "outline"} size="sm" onClick={() => setTriggerTextSize("")}>Default</Button>
                <Button variant={triggerTextSize === "text-xs" ? "default" : "outline"} size="sm" onClick={() => setTriggerTextSize("text-xs")}>XS</Button>
                <Button variant={triggerTextSize === "text-lg" ? "default" : "outline"} size="sm" onClick={() => setTriggerTextSize("text-lg")}>LG</Button>
              </div>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* Header & Media Details */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-blue-400">2. Header & Media</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Content Size Props</span>
              <div className="flex gap-2">
                <Button variant={contentSize === "default" ? "default" : "outline"} size="sm" onClick={() => setContentSize("default")}>Default (lg)</Button>
                <Button variant={contentSize === "sm" ? "default" : "outline"} size="sm" onClick={() => setContentSize("sm")}>Small (sm)</Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Header Global Text Size</span>
              <div className="flex gap-2 flex-wrap">
                <Button variant={headerTextSize === "" ? "default" : "outline"} size="sm" onClick={() => setHeaderTextSize("")}>Default</Button>
                <Button variant={headerTextSize === "text-xl" ? "default" : "outline"} size="sm" onClick={() => setHeaderTextSize("text-xl")}>XL</Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium">Media Block</span>
              <div className="flex gap-2">
                <Button variant={showMedia ? "default" : "outline"} size="sm" onClick={() => setShowMedia(true)}>Show Media</Button>
                <Button variant={!showMedia ? "default" : "outline"} size="sm" onClick={() => setShowMedia(false)}>Hide Media</Button>
              </div>
            </div>
            {showMedia && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Media Icon Size</span>
                <div className="flex gap-2 flex-wrap">
                  <Button variant={mediaIconSize === "size-4" ? "default" : "outline"} size="sm" onClick={() => setMediaIconSize("size-4")}>4</Button>
                  <Button variant={mediaIconSize === "size-8" ? "default" : "outline"} size="sm" onClick={() => setMediaIconSize("size-8")}>8 (Default)</Button>
                  <Button variant={mediaIconSize === "size-12" ? "default" : "outline"} size="sm" onClick={() => setMediaIconSize("size-12")}>12</Button>
                </div>
              </div>
            )}
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* Title and Description */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-green-400">3. Title & Description</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Title Text</span>
              <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Title Text Size</span>
              <div className="flex gap-2 flex-wrap">
                <Button variant={titleTextSize === "" ? "default" : "outline"} size="sm" onClick={() => setTitleTextSize("")}>Default</Button>
                <Button variant={titleTextSize === "text-base" ? "default" : "outline"} size="sm" onClick={() => setTitleTextSize("text-base")}>Base</Button>
                <Button variant={titleTextSize === "text-2xl" ? "default" : "outline"} size="sm" onClick={() => setTitleTextSize("text-2xl")}>2XL</Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium">Description Text</span>
              <textarea className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Description Text Size</span>
              <div className="flex gap-2 flex-wrap">
                <Button variant={descriptionTextSize === "" ? "default" : "outline"} size="sm" onClick={() => setDescriptionTextSize("")}>Default</Button>
                <Button variant={descriptionTextSize === "text-xs" ? "default" : "outline"} size="sm" onClick={() => setDescriptionTextSize("text-xs")}>XS</Button>
                <Button variant={descriptionTextSize === "text-base" ? "default" : "outline"} size="sm" onClick={() => setDescriptionTextSize("text-base")}>Base</Button>
              </div>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* Footer & Actions */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-purple-400">4. Footer Actions</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Footer Wrapper Size/Text</span>
              <div className="flex gap-2 flex-wrap">
                <Button variant={footerTextSize === "" ? "default" : "outline"} size="sm" onClick={() => setFooterTextSize("")}>Default</Button>
                <Button variant={footerTextSize === "text-xs" ? "default" : "outline"} size="sm" onClick={() => setFooterTextSize("text-xs")}>XS</Button>
                <Button variant={footerTextSize === "text-lg" ? "default" : "outline"} size="sm" onClick={() => setFooterTextSize("text-lg")}>LG</Button>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-red-400 mt-2">Action Button</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Variant & Size</span>
              <div className="flex gap-2 flex-wrap">
                {(["default", "destructive", "outline", "secondary", "ghost", "link"] as const).map((v) => (
                  <Button key={v} variant={actionVariant === v ? "default" : "outline"} size="sm" onClick={() => setActionVariant(v)}>{v}</Button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["default", "sm", "lg", "icon"] as const).map((s) => (
                  <Button key={s} variant={actionSize === s ? "default" : "outline"} size="sm" onClick={() => setActionSize(s)}>{s}</Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Text</span>
              <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={actionText} onChange={(e) => setActionText(e.target.value)} />
            </div>

            <h4 className="text-sm font-semibold text-red-400 mt-2">Cancel Button</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Variant & Size</span>
              <div className="flex gap-2 flex-wrap">
                {(["default", "destructive", "outline", "secondary", "ghost", "link"] as const).map((v) => (
                  <Button key={v} variant={cancelVariant === v ? "default" : "outline"} size="sm" onClick={() => setCancelVariant(v)}>{v}</Button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["default", "sm", "lg", "icon"] as const).map((s) => (
                  <Button key={s} variant={cancelSize === s ? "default" : "outline"} size="sm" onClick={() => setCancelSize(s)}>{s}</Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Text</span>
              <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={cancelText} onChange={(e) => setCancelText(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 min-h-[500px] flex flex-col items-center justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size={triggerSize} className={triggerTextSize}>{triggerText}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size={contentSize}>
              <AlertDialogHeader className={headerTextSize}>
                {showMedia && (
                  <AlertDialogMedia>
                    <Trash2 className={mediaIconSize !== "size-8" ? mediaIconSize : undefined} />
                  </AlertDialogMedia>
                )}
                <AlertDialogTitle className={titleTextSize}>{title}</AlertDialogTitle>
                <AlertDialogDescription className={descriptionTextSize}>
                  {description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className={footerTextSize}>
                <AlertDialogCancel variant={cancelVariant} size={cancelSize}>
                  {cancelText}
                </AlertDialogCancel>
                <AlertDialogAction variant={actionVariant} size={actionSize}>
                  {actionText}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Code Snippet with Highlights and Legend */}
      <div className="mt-2 p-6 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-zinc-100">Generated Code</h2>
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-zinc-400">Content Size</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-zinc-400">Action Props</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-zinc-400">Cancel Props</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="text-zinc-400">Sizing / Text Styling</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">Content Strings</span>
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
            <span className={kw}>import</span> {"{"}<br />
            {"  "}AlertDialog,<br />
            {"  "}AlertDialogAction,<br />
            {"  "}AlertDialogCancel,<br />
            {"  "}AlertDialogContent,<br />
            {"  "}AlertDialogDescription,<br />
            {"  "}AlertDialogFooter,<br />
            {"  "}AlertDialogHeader,<br />
            {"  "}AlertDialogTitle,<br />
            {"  "}AlertDialogTrigger,{showMedia && <><br />{"  "}<span className={hlContent}>AlertDialogMedia</span>,</>}
            <br />{"}"} <span className={kw}>from</span> <span className={str}>"@/components/ui/alert-dialog"</span><br />
            <span className={kw}>import</span> {"{"} Button {"}"} <span className={kw}>from</span> <span className={str}>"@/components/ui/button"</span><br />
            {showMedia && <><span className={kw}>import</span> {"{"} Trash2 {"}"} <span className={kw}>from</span> <span className={str}>"lucide-react"</span><br /></>}
            <br />
            <span className={kw}>export default function</span> <span className="text-blue-400">MyAlertDialog</span>() {"{"}<br />
            {"  "}<span className={kw}>return</span> (<br />
            {"    "}<span className={tag}>&lt;AlertDialog&gt;</span><br />
            {"      "}<span className={tag}>&lt;AlertDialogTrigger</span> <span className={attr}>asChild</span><span className={tag}>&gt;</span><br />
            {"        "}<span className={tag}>&lt;Button</span> <span className={attr}>variant</span>=<span className={str}>"outline"</span>{triggerSize !== "default" ? <> <span className={attr}>size</span>=<span className={str}>"</span><span className={hlStyle}>{triggerSize}</span><span className={str}>"</span></> : ""}{triggerTextSize ? <> <span className={attr}>className</span>=<span className={str}>"</span><span className={hlStyle}>{triggerTextSize}</span><span className={str}>"</span></> : ""}<span className={tag}>&gt;</span><span className={hlContent}>{triggerText}</span><span className={tag}>&lt;/Button&gt;</span><br />
            {"      "}<span className={tag}>&lt;/AlertDialogTrigger&gt;</span><br />
            {"      "}<span className={tag}>&lt;AlertDialogContent</span>{contentSize !== "default" ? <> <span className={attr}>size</span>=<span className={str}>"</span><span className={hlLogic}>{contentSize}</span><span className={str}>"</span></> : ""}<span className={tag}>&gt;</span><br />
            {"        "}<span className={tag}>&lt;AlertDialogHeader</span>{headerTextSize ? <> <span className={attr}>className</span>=<span className={str}>"</span><span className={hlStyle}>{headerTextSize}</span><span className={str}>"</span></> : ""}<span className={tag}>&gt;</span><br />
            {showMedia && (<>
              {"          "}<span className={tag}>&lt;<span className={hlContent}>AlertDialogMedia</span>&gt;</span><br />
              {"            "}<span className={tag}>&lt;<span className={hlContent}>Trash2</span></span>{mediaIconSize !== "size-8" ? <> <span className={attr}>className</span>=<span className={str}>"</span><span className={hlStyle}>{mediaIconSize}</span><span className={str}>"</span></> : ""} <span className={tag}>/&gt;</span><br />
              {"          "}<span className={tag}>&lt;/<span className={hlContent}>AlertDialogMedia</span>&gt;</span><br />
            </>)}
            {"          "}<span className={tag}>&lt;AlertDialogTitle</span>{titleTextSize ? <> <span className={attr}>className</span>=<span className={str}>"</span><span className={hlStyle}>{titleTextSize}</span><span className={str}>"</span></> : ""}<span className={tag}>&gt;</span><span className={hlContent}>{title}</span><span className={tag}>&lt;/AlertDialogTitle&gt;</span><br />
            {"          "}<span className={tag}>&lt;AlertDialogDescription</span>{descriptionTextSize ? <> <span className={attr}>className</span>=<span className={str}>"</span><span className={hlStyle}>{descriptionTextSize}</span><span className={str}>"</span></> : ""}<span className={tag}>&gt;</span><br />
            {"            "}<span className={hlContent}>{description}</span><br />
            {"          "}<span className={tag}>&lt;/AlertDialogDescription&gt;</span><br />
            {"        "}<span className={tag}>&lt;/AlertDialogHeader&gt;</span><br />
            {"        "}<span className={tag}>&lt;AlertDialogFooter</span>{footerTextSize ? <> <span className={attr}>className</span>=<span className={str}>"</span><span className={hlStyle}>{footerTextSize}</span><span className={str}>"</span></> : ""}<span className={tag}>&gt;</span><br />
            {"          "}<span className={tag}>&lt;AlertDialogCancel</span> <span className={attr}>variant</span>=<span className={str}>"</span><span className={hlCancel}>{cancelVariant}</span><span className={str}>"</span> <span className={attr}>size</span>=<span className={str}>"</span><span className={hlCancel}>{cancelSize}</span><span className={str}>"</span><span className={tag}>&gt;</span><span className={hlContent}>{cancelText}</span><span className={tag}>&lt;/AlertDialogCancel&gt;</span><br />
            {"          "}<span className={tag}>&lt;AlertDialogAction</span> <span className={attr}>variant</span>=<span className={str}>"</span><span className={hlAction}>{actionVariant}</span><span className={str}>"</span> <span className={attr}>size</span>=<span className={str}>"</span><span className={hlAction}>{actionSize}</span><span className={str}>"</span><span className={tag}>&gt;</span><span className={hlContent}>{actionText}</span><span className={tag}>&lt;/AlertDialogAction&gt;</span><br />
            {"        "}<span className={tag}>&lt;/AlertDialogFooter&gt;</span><br />
            {"      "}<span className={tag}>&lt;/AlertDialogContent&gt;</span><br />
            {"    "}<span className={tag}>&lt;/AlertDialog&gt;</span><br />
            {"  "})<br />
            {"}"}
          </code>
        </pre>
      </div>
    </div>
  );
}
