"use client";

import React, { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AspectRatioPage() {
  // Configurable Props
  const [ratioWidth, setRatioWidth] = useState(16);
  const [ratioHeight, setRatioHeight] = useState(9);

  // Custom Controls for Demo visualization
  const [containerWidth, setContainerWidth] = useState("w-full");
  const [rounded, setRounded] = useState("rounded-md");
  const [contentType, setContentType] = useState<"image" | "map" | "color">(
    "image",
  );
  const [objectFit, setObjectFit] = useState<"cover" | "contain" | "fill">(
    "cover",
  );

  // Pre-calculated ratio float for the component
  const ratioFloat = ratioWidth / ratioHeight;

  // Code Generation Highlighting colors
  const hlLogic = "bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded"; // ratio natively
  const hlWrapper = "bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded"; // Wrapper styling
  const hlContent = "bg-green-500/30 text-green-200 px-1 py-0.5 rounded"; // Inner content styling

  // Syntax highlighting
  const kw = "text-pink-400";
  const fn = "text-blue-400";
  const str = "text-orange-300";
  const tag = "text-emerald-400";
  const attr = "text-sky-300";
  const num = "text-yellow-300";

  // Dynamic Image placeholder (using abstract landscape for nice aspect ratio testing)
  const imageUrl =
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=3270&auto=format&fit=crop";

  const getInnerContentString = () => {
    switch (contentType) {
      case "image":
        return `<Image
          src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=3270&auto=format&fit=crop"
          alt="Abstract landscape"
          fill
          className="${rounded} <span class="${hlContent}">object-${objectFit}</span>"
        />`;
      case "map":
        return `<iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528001093!2d-74.14483161358983!3d40.6976633946006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1709149463564!5m2!1sen!2sus" 
          className="<span class="${hlContent}">w-full h-full ${rounded} border-0</span>" 
          loading="lazy"
        ></iframe>`;
      case "color":
        return `<div className="<span class="${hlContent}">w-full h-full ${rounded} bg-gradient-to-br from-indigo-500 to-purple-500</span>" />`;
    }
  };

  const generatedCodeString = `import { AspectRatio } from "@/components/ui/aspect-ratio"
${contentType === "image" ? 'import Image from "next/image"\n' : ""}
export default function AspectRatioDemo() {
  return (
    <div className="${containerWidth}">
      <AspectRatio ratio={${ratioWidth} / ${ratioHeight}} className="bg-muted">
        ${getInnerContentString()
          .replace(/<span class=".*?">/g, "")
          .replace(/<\/span>/g, "")}
      </AspectRatio>
    </div>
  )
}`;

  const renderCodeContent = () => {
    switch (contentType) {
      case "color":
        return (
          <>
            {"        "}
            <span className={tag}>&lt;div</span>{" "}
            <span className={attr}>className</span>=
            <span className={str}>"</span>
            <span className={hlContent}>
              w-full h-full {rounded} bg-gradient-to-br from-indigo-500
              to-purple-500
            </span>
            <span className={str}>"</span> <span className={tag}>/&gt;</span>
            <br />
          </>
        );
      case "map":
        return (
          <>
            {"        "}
            <span className={tag}>&lt;iframe</span>
            <br />
            {"          "}
            <span className={attr}>src</span>=
            <span className={str}>"https://www.google.com/maps/embed?..."</span>
            <br />
            {"          "}
            <span className={attr}>className</span>=
            <span className={str}>"</span>
            <span className={hlContent}>w-full h-full {rounded} border-0</span>
            <span className={str}>"</span>
            <br />
            {"          "}
            <span className={attr}>loading</span>=
            <span className={str}>"lazy"</span>
            <br />
            {"        "}
            <span className={tag}>&gt;&lt;/iframe&gt;</span>
            <br />
          </>
        );
      case "image":
      default:
        return (
          <>
            {"        "}
            <span className={tag}>&lt;Image</span>
            <br />
            {"          "}
            <span className={attr}>src</span>=
            <span className={str}>"https://images.unsplash.com/photo-..."</span>
            <br />
            {"          "}
            <span className={attr}>alt</span>=
            <span className={str}>"Abstract landscape"</span>
            <br />
            {"          "}
            <span className={attr}>fill</span>
            <br />
            {"          "}
            <span className={attr}>className</span>=
            <span className={str}>"{rounded} </span>
            <span className={hlContent}>object-{objectFit}</span>
            <span className={str}>"</span>
            <br />
            {"        "}
            <span className={tag}>/&gt;</span>
            <br />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Aspect Ratio</h1>
        <p className="text-muted-foreground">
          Interactive showcase of the Aspect Ratio component.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[450px] p-6 border rounded-lg bg-card max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2 sticky top-0 bg-card z-10 py-2 border-b">
            Configuration
          </h2>

          {/* 1. Component Native Prop (Ratio) */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-blue-400">
              1. Ratio Prop (Native)
            </h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Common Ratios</span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={ratioFloat === 16 / 9 ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setRatioWidth(16);
                    setRatioHeight(9);
                  }}
                >
                  16:9 (Widescreen)
                </Button>
                <Button
                  variant={ratioFloat === 4 / 3 ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setRatioWidth(4);
                    setRatioHeight(3);
                  }}
                >
                  4:3 (Classic TV)
                </Button>
                <Button
                  variant={ratioFloat === 1 / 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setRatioWidth(1);
                    setRatioHeight(1);
                  }}
                >
                  1:1 (Square)
                </Button>
                <Button
                  variant={ratioFloat === 21 / 9 ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setRatioWidth(21);
                    setRatioHeight(9);
                  }}
                >
                  21:9 (Ultrawide)
                </Button>
                <Button
                  variant={ratioFloat === 9 / 16 ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setRatioWidth(9);
                    setRatioHeight(16);
                  }}
                >
                  9:16 (Vertical)
                </Button>
              </div>
            </div>

            <div className="flex gap-4 items-center mt-2">
              <div className="flex flex-col gap-1 w-full">
                <span className="text-xs text-muted-foreground">Width</span>
                <input
                  type="number"
                  min="1"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={ratioWidth}
                  onChange={(e) =>
                    setRatioWidth(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
              </div>
              <span className="font-bold text-xl mt-4">:</span>
              <div className="flex flex-col gap-1 w-full">
                <span className="text-xs text-muted-foreground">Height</span>
                <input
                  type="number"
                  min="1"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={ratioHeight}
                  onChange={(e) =>
                    setRatioHeight(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
              </div>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* 2. Container Wrapper */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-purple-400">
              2. Container Context
            </h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">
                Wrapper Width (Limiting expansion)
              </span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={containerWidth === "w-64" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContainerWidth("w-64")}
                >
                  w-64 (256px)
                </Button>
                <Button
                  variant={containerWidth === "w-96" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContainerWidth("w-96")}
                >
                  w-96 (384px)
                </Button>
                <Button
                  variant={containerWidth === "w-1/2" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContainerWidth("w-1/2")}
                >
                  w-1/2 (50%)
                </Button>
                <Button
                  variant={containerWidth === "w-full" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContainerWidth("w-full")}
                >
                  w-full (100%)
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* 3. Inner Content */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-green-400">
              3. Child Content
            </h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">
                Element inside AspectRatio
              </span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={contentType === "image" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContentType("image")}
                >
                  Next/Image
                </Button>
                <Button
                  variant={contentType === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContentType("map")}
                >
                  Google Map (iframe)
                </Button>
                <Button
                  variant={contentType === "color" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContentType("color")}
                >
                  Color Block (div)
                </Button>
              </div>
            </div>

            {contentType === "image" && (
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-sm font-medium">
                  Image Object-Fit (CSS)
                </span>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={objectFit === "cover" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setObjectFit("cover")}
                  >
                    Cover (Crop)
                  </Button>
                  <Button
                    variant={objectFit === "contain" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setObjectFit("contain")}
                  >
                    Contain (Fit)
                  </Button>
                  <Button
                    variant={objectFit === "fill" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setObjectFit("fill")}
                  >
                    Fill (Stretch)
                  </Button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium">
                Inner Content Rounded Corners
              </span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={rounded === "rounded-none" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRounded("rounded-none")}
                >
                  None
                </Button>
                <Button
                  variant={rounded === "rounded-md" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRounded("rounded-md")}
                >
                  MD
                </Button>
                <Button
                  variant={rounded === "rounded-2xl" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRounded("rounded-2xl")}
                >
                  2XL
                </Button>
                <Button
                  variant={rounded === "rounded-full" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRounded("rounded-full")}
                >
                  Full (Circle)
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 min-h-[500px] flex items-center justify-center relative overflow-hidden">
          {/* Abstract background just to show transparency bounds */}
          <div
            className="absolute inset-0 z-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* The Actual Component Usage */}
          <div
            className={`${containerWidth} z-10 p-4 border border-dashed border-red-500/50 bg-background/50 relative`}
          >
            {/* Context label */}
            <div className="absolute -top-3 left-2 bg-background px-1 text-xs text-red-500 font-mono">
              Wrapper: {containerWidth}
            </div>

            <AspectRatio
              ratio={ratioFloat}
              className="bg-muted shadow-xl border"
            >
              {contentType === "image" && (
                <Image
                  src={imageUrl}
                  alt="Abstract landscape"
                  fill
                  className={`${rounded} object-${objectFit}`}
                />
              )}
              {contentType === "map" && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528001093!2d-74.14483161358983!3d40.6976633946006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1709149463564!5m2!1sen!2sus"
                  className={`w-full h-full ${rounded} border-0`}
                  loading="lazy"
                ></iframe>
              )}
              {contentType === "color" && (
                <div
                  className={`w-full h-full ${rounded} bg-linear-to-br from-indigo-500 to-purple-500`}
                />
              )}
            </AspectRatio>
          </div>
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
                <span className="text-zinc-400">Native Prop (Ratio)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-zinc-400">Wrapper Width</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">Child Content & Styles</span>
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
            <span className={kw}>import</span> {"{"} AspectRatio {"}"}{" "}
            <span className={kw}>from</span>{" "}
            <span className={str}>"@/components/ui/aspect-ratio"</span>
            <br />
            {contentType === "image" && (
              <>
                <span className={kw}>import</span> Image{" "}
                <span className={kw}>from</span>{" "}
                <span className={str}>"next/image"</span>
                <br />
              </>
            )}
            <br />
            <span className={kw}>export default function</span>{" "}
            <span className={fn}>AspectRatioDemo</span>() {"{"}
            <br />
            {"  "}
            <span className={kw}>return</span> (<br />
            {"    "}
            <span className={tag}>&lt;div</span>{" "}
            <span className={attr}>className</span>=
            <span className={str}>"</span>
            <span className={hlWrapper}>{containerWidth}</span>
            <span className={str}>"</span>
            <span className={tag}>&gt;</span>
            <br />
            {"      "}
            <span className={tag}>&lt;AspectRatio</span>{" "}
            <span className={attr}>ratio</span>={"{"}
            <span className={hlLogic}>
              <span className={num}>{ratioWidth}</span> /{" "}
              <span className={num}>{ratioHeight}</span>
            </span>
            {"}"} <span className={attr}>className</span>=
            <span className={str}>"bg-muted"</span>
            <span className={tag}>&gt;</span>
            <br />
            {renderCodeContent()}
            {"      "}
            <span className={tag}>&lt;/AspectRatio&gt;</span>
            <br />
            {"    "}
            <span className={tag}>&lt;/div&gt;</span>
            <br />
            {"  "})<br />
            {"}"}
          </code>
        </pre>
      </div>
    </div>
  );
}
