"use client";

import React, { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function AvatarPage() {
  // Configurable Props for Single Avatar
  const [size, setSize] = useState<"default" | "sm" | "lg">("default");
  const [imageState, setImageState] = useState<"valid" | "invalid" | "none">(
    "valid",
  );
  const [fallbackText, setFallbackText] = useState("CN");
  const [showBadge, setShowBadge] = useState(false);
  const [badgeColor, setBadgeColor] = useState("bg-green-500");

  // Configurable Props for Group
  const [showGroup, setShowGroup] = useState(false);
  const [groupCount, setGroupCount] = useState("+3");

  // Derived Values
  const validImageUrl = "https://github.com/shadcn.png";
  const invalidImageUrl = "https://broken-link.com/avatar.jpg";

  const currentImageUrl =
    imageState === "valid"
      ? validImageUrl
      : imageState === "invalid"
        ? invalidImageUrl
        : "";

  // Code Generation Highlighting colors
  const hlLogic = "bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded"; // Size prop
  const hlProp = "bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded"; // Src/Fallback
  const hlBadge = "bg-green-500/30 text-green-200 px-1 py-0.5 rounded"; // Badge styling
  const hlGroup = "bg-orange-500/30 text-orange-200 px-1 py-0.5 rounded"; // Group logic

  // Syntax highlighting
  const kw = "text-pink-400";
  const str = "text-orange-300";
  const tag = "text-emerald-400";
  const attr = "text-sky-300";

  const getCodeString = () => {
    if (showGroup) {
      return `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <span class="${hlGroup}"><AvatarGroup></span>
      <Avatar${size !== "default" ? ` size="${size}"` : ""}>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar${size !== "default" ? ` size="${size}"` : ""}>
        <AvatarImage src="https://vercel.com/api/www/avatar/vercel" alt="@vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <span class="${hlGroup}"><AvatarGroupCount></span>${groupCount}<span class="${hlGroup}"></AvatarGroupCount></span>
    <span class="${hlGroup}"></AvatarGroup></span>
  )
}`;
    }

    return `import {
  Avatar,
  AvatarFallback,
  AvatarImage,${showBadge ? "\n  AvatarBadge," : ""}
} from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <Avatar${size !== "default" ? ` size="<span class="${hlLogic}">${size}</span>"` : ""}>
      ${imageState !== "none" ? `<AvatarImage src="<span class="${hlProp}">${currentImageUrl}</span>" alt="@shadcn" />\n      ` : ""}<AvatarFallback><span class="${hlProp}">${fallbackText}</span></AvatarFallback>
      ${showBadge ? `<span class="${hlBadge}"><AvatarBadge className="${badgeColor}" /></span>` : ""}
    </Avatar>
  )
}`;
  };

  const renderCodeStructure = () => {
    if (showGroup) {
      return (
        <>
          {"    "}
          <span className={tag}>
            &lt;<span className={hlGroup}>AvatarGroup</span>&gt;
          </span>
          <br />
          {"      "}
          <span className={tag}>&lt;Avatar</span>
          {size !== "default" ? (
            <>
              {" "}
              <span className={attr}>size</span>=<span className={str}>"</span>
              <span className={hlLogic}>{size}</span>
              <span className={str}>"</span>
            </>
          ) : (
            ""
          )}
          <span className={tag}>&gt;</span>
          <br />
          {"        "}
          <span className={tag}>&lt;AvatarImage</span>{" "}
          <span className={attr}>src</span>=
          <span className={str}>"https://github.com/shadcn.png"</span>{" "}
          <span className={attr}>alt</span>=
          <span className={str}>"@shadcn"</span>{" "}
          <span className={tag}>/&gt;</span>
          <br />
          {"        "}
          <span className={tag}>&lt;AvatarFallback&gt;</span>
          <span className={str}>CN</span>
          <span className={tag}>&lt;/AvatarFallback&gt;</span>
          <br />
          {"      "}
          <span className={tag}>&lt;/Avatar&gt;</span>
          <br />
          {"      "}
          <span className={tag}>&lt;Avatar</span>
          {size !== "default" ? (
            <>
              {" "}
              <span className={attr}>size</span>=<span className={str}>"</span>
              <span className={hlLogic}>{size}</span>
              <span className={str}>"</span>
            </>
          ) : (
            ""
          )}
          <span className={tag}>&gt;</span>
          <br />
          {"        "}
          <span className={tag}>&lt;AvatarImage</span>{" "}
          <span className={attr}>src</span>=
          <span className={str}>
            "https://vercel.com/api/www/avatar/vercel"
          </span>{" "}
          <span className={attr}>alt</span>=
          <span className={str}>"@vercel"</span>{" "}
          <span className={tag}>/&gt;</span>
          <br />
          {"        "}
          <span className={tag}>&lt;AvatarFallback&gt;</span>
          <span className={str}>VC</span>
          <span className={tag}>&lt;/AvatarFallback&gt;</span>
          <br />
          {"      "}
          <span className={tag}>&lt;/Avatar&gt;</span>
          <br />
          {"      "}
          <span className={tag}>
            &lt;<span className={hlGroup}>AvatarGroupCount</span>&gt;
          </span>
          <span className={hlGroup}>{groupCount}</span>
          <span className={tag}>
            &lt;/<span className={hlGroup}>AvatarGroupCount</span>&gt;
          </span>
          <br />
          {"    "}
          <span className={tag}>
            &lt;/<span className={hlGroup}>AvatarGroup</span>&gt;
          </span>
          <br />
        </>
      );
    }

    return (
      <>
        {"    "}
        <span className={tag}>&lt;Avatar</span>
        {size !== "default" ? (
          <>
            {" "}
            <span className={attr}>size</span>=<span className={str}>"</span>
            <span className={hlLogic}>{size}</span>
            <span className={str}>"</span>
          </>
        ) : (
          ""
        )}
        <span className={tag}>&gt;</span>
        <br />
        {imageState !== "none" && (
          <>
            {"      "}
            <span className={tag}>&lt;AvatarImage</span>{" "}
            <span className={attr}>src</span>=<span className={str}>"</span>
            <span className={hlProp}>{currentImageUrl}</span>
            <span className={str}>"</span> <span className={attr}>alt</span>=
            <span className={str}>"@shadcn"</span>{" "}
            <span className={tag}>/&gt;</span>
            <br />
          </>
        )}
        {"      "}
        <span className={tag}>&lt;AvatarFallback&gt;</span>
        <span className={hlProp}>{fallbackText}</span>
        <span className={tag}>&lt;/AvatarFallback&gt;</span>
        <br />
        {showBadge && (
          <>
            {"      "}
            <span className={tag}>
              &lt;<span className={hlBadge}>AvatarBadge</span>
            </span>
            {badgeColor !== "bg-primary" ? (
              <>
                {" "}
                <span className={attr}>className</span>=
                <span className={str}>"</span>
                <span className={hlBadge}>{badgeColor}</span>
                <span className={str}>"</span>
              </>
            ) : (
              ""
            )}{" "}
            <span className={tag}>/&gt;</span>
            <br />
          </>
        )}
        {"    "}
        <span className={tag}>&lt;/Avatar&gt;</span>
        <br />
      </>
    );
  };

  // Pre-compiled raw text for the copy button (strip spans)
  const rawCodeContent = getCodeString()
    .replace(/<span class=".*?">/g, "")
    .replace(/<\/span>/g, "");

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Avatar</h1>
        <p className="text-muted-foreground">
          Interactive showcase of the Avatar component including groups, badges,
          and fallback states.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[450px] p-6 border rounded-lg bg-card max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2 sticky top-0 bg-card z-10 py-2 border-b">
            Configuration
          </h2>

          {/* Mode Switcher */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-orange-400">
              Display Mode
            </h3>
            <div className="flex gap-2">
              <Button
                variant={!showGroup ? "default" : "outline"}
                size="sm"
                onClick={() => setShowGroup(false)}
              >
                Single Avatar
              </Button>
              <Button
                variant={showGroup ? "default" : "outline"}
                size="sm"
                onClick={() => setShowGroup(true)}
              >
                Avatar Group
              </Button>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* 1. Base Props */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-blue-400">1. Size</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">
                Native Component Size Props
              </span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={size === "sm" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSize("sm")}
                >
                  Small (sm)
                </Button>
                <Button
                  variant={size === "default" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSize("default")}
                >
                  Default
                </Button>
                <Button
                  variant={size === "lg" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSize("lg")}
                >
                  Large (lg)
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Note: Groups inherit native prop sizing cascading correctly to
                overlaps.
              </p>
            </div>
          </div>

          {!showGroup && (
            <>
              <div className="border-t my-2 border-border/50" />

              {/* 2. State & Fallbacks */}
              <div className="flex flex-col gap-3">
                <h3 className="text-md font-semibold text-purple-400">
                  2. Image & Fallback
                </h3>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">
                    Image Source State
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={imageState === "valid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setImageState("valid")}
                    >
                      Valid URL
                    </Button>
                    <Button
                      variant={imageState === "invalid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setImageState("invalid")}
                    >
                      Broken URL (Tests Fallback)
                    </Button>
                    <Button
                      variant={imageState === "none" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setImageState("none")}
                    >
                      No Image Placed
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-sm font-medium">Fallback Text</span>
                  <input
                    type="text"
                    maxLength={2}
                    className="flex h-9 w-24 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                    value={fallbackText}
                    onChange={(e) =>
                      setFallbackText(e.target.value.toUpperCase())
                    }
                  />
                </div>
              </div>

              <div className="border-t my-2 border-border/50" />

              {/* 3. Badges */}
              <div className="flex flex-col gap-3">
                <h3 className="text-md font-semibold text-green-400">
                  3. Status Badge
                </h3>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">
                    Show Status Indicator?
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant={showBadge ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowBadge(true)}
                    >
                      Active
                    </Button>
                    <Button
                      variant={!showBadge ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowBadge(false)}
                    >
                      Hidden
                    </Button>
                  </div>
                </div>

                {showBadge && (
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-sm font-medium">
                      Badge Color (Tailwind)
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant={
                          badgeColor === "bg-green-500" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setBadgeColor("bg-green-500")}
                      >
                        Online (Green)
                      </Button>
                      <Button
                        variant={
                          badgeColor === "bg-yellow-500" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setBadgeColor("bg-yellow-500")}
                      >
                        Away (Yellow)
                      </Button>
                      <Button
                        variant={
                          badgeColor === "bg-zinc-500" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setBadgeColor("bg-zinc-500")}
                      >
                        Offline (Gray)
                      </Button>
                      <Button
                        variant={
                          badgeColor === "bg-red-500" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setBadgeColor("bg-red-500")}
                      >
                        Busy (Red)
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {showGroup && (
            <>
              <div className="border-t my-2 border-border/50" />

              {/* 4. Group Settings */}
              <div className="flex flex-col gap-3">
                <h3 className="text-md font-semibold text-orange-400">
                  2. Group Settings
                </h3>
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-sm font-medium">
                    Avatar Group Count Value
                  </span>
                  <input
                    type="text"
                    maxLength={4}
                    className="flex h-9 w-24 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                    value={groupCount}
                    onChange={(e) => setGroupCount(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 min-h-[500px] flex items-center justify-center relative">
          {showGroup ? (
            <AvatarGroup>
              <Avatar size={size}>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size={size}>
                <AvatarImage
                  src="https://vercel.com/api/www/avatar/vercel"
                  alt="@vercel"
                />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <Avatar size={size}>
                <AvatarImage src="" alt="@empty" />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>{groupCount}</AvatarGroupCount>
            </AvatarGroup>
          ) : (
            <Avatar size={size}>
              {imageState !== "none" && (
                <AvatarImage src={currentImageUrl} alt="@avatar" />
              )}
              <AvatarFallback>{fallbackText}</AvatarFallback>
              {showBadge && <AvatarBadge className={badgeColor} />}
            </Avatar>
          )}
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
                <span className="text-zinc-400">Size Prop</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-zinc-400">Src & Fallbacks</span>
              </div>
              {!showGroup && (
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-zinc-400">Badge Sub-Component</span>
                </div>
              )}
              {showGroup && (
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  <span className="text-zinc-400">Group Sub-Components</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigator.clipboard.writeText(rawCodeContent)}
          >
            Copy Code
          </Button>
        </div>

        <pre className="text-sm font-mono whitespace-pre w-full overflow-x-auto p-4 bg-zinc-900/50 rounded-md border border-zinc-800 leading-relaxed">
          <code>
            <span className={kw}>import</span> {"{"}
            <br />
            {"  "}Avatar,
            <br />
            {"  "}AvatarFallback,
            <br />
            {"  "}AvatarImage,
            {!showGroup && showBadge ? (
              <>
                <br />
                {"  "}
                <span className={hlBadge}>AvatarBadge</span>,
              </>
            ) : (
              ""
            )}
            {showGroup ? (
              <>
                <br />
                {"  "}
                <span className={hlGroup}>AvatarGroup</span>,<br />
                {"  "}
                <span className={hlGroup}>AvatarGroupCount</span>,
              </>
            ) : (
              ""
            )}
            <br />
            {"}"} <span className={kw}>from</span>{" "}
            <span className={str}>"@/components/ui/avatar"</span>
            <br />
            <br />
            <span className={kw}>export default function</span>{" "}
            <span className="text-blue-400">AvatarDemo</span>() {"{"}
            <br />
            {"  "}
            <span className={kw}>return</span> (<br />
            {renderCodeStructure()}
            {"  "})<br />
            {"}"}
          </code>
        </pre>
      </div>
    </div>
  );
}
