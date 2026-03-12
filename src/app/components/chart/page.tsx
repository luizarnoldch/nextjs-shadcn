"use client";

import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

const pieData = [
  { browser: "Chrome", visitors: 275, fill: "var(--color-chart-1)" },
  { browser: "Safari", visitors: 200, fill: "var(--color-chart-2)" },
  { browser: "Firefox", visitors: 187, fill: "var(--color-chart-3)" },
  { browser: "Edge", visitors: 173, fill: "var(--color-chart-4)" },
  { browser: "Other", visitors: 90, fill: "var(--color-chart-5)" },
];

const pieConfig = {
  Chrome: { label: "Chrome", color: "var(--color-chart-1)" },
  Safari: { label: "Safari", color: "var(--color-chart-2)" },
  Firefox: { label: "Firefox", color: "var(--color-chart-3)" },
  Edge: { label: "Edge", color: "var(--color-chart-4)" },
  Other: { label: "Other", color: "var(--color-chart-5)" },
} satisfies ChartConfig;

export default function ChartDemoPage() {
  const [chartType, setChartType] = useState<"bar" | "line" | "area" | "pie">("bar");
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showAxis, setShowAxis] = useState<boolean>(true);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<boolean>(true);

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    if (chartType === "pie") {
      parts.push(`    <ChartContainer config={pieConfig} className="min-h-[250px] w-full">`);
      parts.push(`      <PieChart>`);

      if (showTooltip) {
        parts.push(`        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />`);
      }
      if (showLegend) {
        parts.push(`        <ChartLegend content={<ChartLegendContent />} />`);
      }

      parts.push(`        <Pie data={pieData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5} />`);
      parts.push(`      </PieChart>`);
      parts.push(`    </ChartContainer>`);
    } else {
      parts.push(`    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">`);

      if (chartType === "bar") {
        parts.push(`      <BarChart accessibilityLayer data={chartData}>`);
      } else if (chartType === "area") {
        parts.push(`      <AreaChart accessibilityLayer data={chartData}>`);
      } else {
        parts.push(`      <LineChart accessibilityLayer data={chartData}>`);
      }

      if (showGrid) {
        parts.push(`        <CartesianGrid vertical={false} />`);
      }

      if (showAxis) {
        parts.push(`        <XAxis`);
        parts.push(`          dataKey="month"`);
        parts.push(`          tickLine={false}`);
        parts.push(`          tickMargin={10}`);
        parts.push(`          axisLine={false}`);
        parts.push(`          tickFormatter={(value) => value.slice(0, 3)}`);
        parts.push(`        />`);
      }

      if (showTooltip) {
        parts.push(`        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />`);
      }

      if (showLegend) {
        parts.push(`        <ChartLegend content={<ChartLegendContent />} />`);
      }

      if (chartType === "bar") {
        parts.push(`        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />`);
        parts.push(`        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />`);
        parts.push(`      </BarChart>`);
      } else if (chartType === "area") {
        parts.push(`        <Area type="monotone" dataKey="desktop" fill="var(--color-desktop)" stroke="var(--color-desktop)" fillOpacity={0.4} />`);
        parts.push(`        <Area type="monotone" dataKey="mobile" fill="var(--color-mobile)" stroke="var(--color-mobile)" fillOpacity={0.4} />`);
        parts.push(`      </AreaChart>`);
      } else {
        parts.push(`        <Line type="monotone" dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />`);
        parts.push(`        <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />`);
        parts.push(`      </LineChart>`);
      }

      parts.push(`    </ChartContainer>`);
    }

    const innerJSX = parts.join("\n");

    const rechartsImports = [
      ...(chartType === "bar" ? ["Bar", "BarChart"] : []),
      ...(chartType === "line" ? ["Line", "LineChart"] : []),
      ...(chartType === "area" ? ["Area", "AreaChart"] : []),
      ...(chartType === "pie" ? ["Pie", "PieChart"] : []),
      ...(showGrid && chartType !== "pie" ? ["CartesianGrid"] : []),
      ...(showAxis && chartType !== "pie" ? ["XAxis"] : []),
    ];

    const shadcnImports = [
      "ChartConfig",
      "ChartContainer",
      ...(showTooltip ? ["ChartTooltip", "ChartTooltipContent"] : []),
      ...(showLegend ? ["ChartLegend", "ChartLegendContent"] : [])
    ];

    const dataBlock = chartType === "pie"
      ? `const pieData = [\n  { browser: "Chrome", visitors: 275, fill: "var(--color-chart-1)" },\n  { browser: "Safari", visitors: 200, fill: "var(--color-chart-2)" },\n  { browser: "Firefox", visitors: 187, fill: "var(--color-chart-3)" },\n]\n\nconst pieConfig = {\n  Chrome: { label: "Chrome", color: "var(--color-chart-1)" },\n  Safari: { label: "Safari", color: "var(--color-chart-2)" },\n  Firefox: { label: "Firefox", color: "var(--color-chart-3)" },\n} satisfies ChartConfig`
      : `const chartData = [\n  { month: "January", desktop: 186, mobile: 80 },\n  { month: "February", desktop: 305, mobile: 200 },\n  { month: "March", desktop: 237, mobile: 120 },\n]\n\nconst chartConfig = {\n  desktop: { label: "Desktop", color: "var(--color-chart-1)" },\n  mobile: { label: "Mobile", color: "var(--color-chart-2)" },\n} satisfies ChartConfig`;

    return `import { ${rechartsImports.join(", ")} } from "recharts"
import { 
  ${shadcnImports.join(",\n  ")}
} from "@/components/ui/chart"

${dataBlock}

export default function ChartDemo() {
  return (
${innerJSX}
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
    .replace(/const/g, `<span class="${hlKw}">const</span>`)
    // Tags
    .replace(/&lt;(\/?)Chart([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Chart$2</span>$3&gt;`)
    .replace(/&lt;(\/?)Bar([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Bar$2</span>$3&gt;`)
    .replace(/&lt;(\/?)Line([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Line$2</span>$3&gt;`)
    .replace(/&lt;(\/?)Area([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Area$2</span>$3&gt;`)
    .replace(/&lt;(\/?)Pie([A-Za-z]*)(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">Pie$2</span>$3&gt;`)
    .replace(/&lt;(\/?)CartesianGrid(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">CartesianGrid</span>$2&gt;`)
    .replace(/&lt;(\/?)XAxis(.*?)&gt;/g, `&lt;$1<span class="${hlTag}">XAxis</span>$2&gt;`)
    // Attributes
    .replace(/ className="([^"]+)"/g, ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ dataKey="([^"]+)"/g, ` <span class="${hlProp}">dataKey</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ nameKey="([^"]+)"/g, ` <span class="${hlProp}">nameKey</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ fill="([^"]+)"/g, ` <span class="${hlProp}">fill</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ stroke="([^"]+)"/g, ` <span class="${hlProp}">stroke</span>="<span class="${hlVal}">$1</span>"`)
    .replace(/ type="([^"]+)"/g, ` <span class="${hlProp}">type</span>="<span class="${hlVal}">$1</span>"`)
    // React expression attributes
    .replace(/ config=\{([^}]+)\}/g, ` <span class="${hlProp}">config</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ data=\{([^}]+)\}/g, ` <span class="${hlProp}">data</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ content=\{([^}]+)\}/g, ` <span class="${hlProp}">content</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ vertical=\{([^}]+)\}/g, ` <span class="${hlProp}">vertical</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ tickLine=\{([^}]+)\}/g, ` <span class="${hlProp}">tickLine</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ tickMargin=\{([^}]+)\}/g, ` <span class="${hlProp}">tickMargin</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ axisLine=\{([^}]+)\}/g, ` <span class="${hlProp}">axisLine</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ strokeWidth=\{([^}]+)\}/g, ` <span class="${hlProp}">strokeWidth</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ dot=\{([^}]+)\}/g, ` <span class="${hlProp}">dot</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ radius=\{([^}]+)\}/g, ` <span class="${hlProp}">radius</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ innerRadius=\{([^}]+)\}/g, ` <span class="${hlProp}">innerRadius</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ fillOpacity=\{([^}]+)\}/g, ` <span class="${hlProp}">fillOpacity</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ cursor=\{([^}]+)\}/g, ` <span class="${hlProp}">cursor</span>={<span class="${hlVal}">$1</span>}`)
    .replace(/ tickFormatter=\{([^}]+)\}/g, ` <span class="${hlProp}">tickFormatter</span>={<span class="${hlVal}">$1</span>}`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Chart</h1>
        <p className="text-muted-foreground">
          Beautiful charts built using Recharts. Copy and paste into your apps.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[450px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuration</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Chart Type</h3>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                onClick={() => setChartType("bar")}
                className="w-24"
              >
                Bar
              </Button>
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                onClick={() => setChartType("line")}
                className="w-24"
              >
                Line
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "outline"}
                onClick={() => setChartType("area")}
                className="w-24"
              >
                Area
              </Button>
              <Button
                variant={chartType === "pie" ? "default" : "outline"}
                onClick={() => setChartType("pie")}
                className="w-24"
              >
                Pie/Donut
              </Button>
            </div>
          </div>

          <div className="border-t border-border/50" />

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Components</h3>

            {chartType !== "pie" && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Grid</span>
                    <span className="text-xs text-muted-foreground">Background CartesianGrid</span>
                  </div>
                  <Button
                    variant={showGrid ? "default" : "secondary"}
                    onClick={() => setShowGrid(!showGrid)}
                    size="sm"
                  >
                    {showGrid ? "Visible" : "Hidden"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">X-Axis</span>
                    <span className="text-xs text-muted-foreground">Bottom labels</span>
                  </div>
                  <Button
                    variant={showAxis ? "default" : "secondary"}
                    onClick={() => setShowAxis(!showAxis)}
                    size="sm"
                  >
                    {showAxis ? "Visible" : "Hidden"}
                  </Button>
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Tooltip</span>
                <span className="text-xs text-muted-foreground">Hover info panel</span>
              </div>
              <Button
                variant={showTooltip ? "default" : "secondary"}
                onClick={() => setShowTooltip(!showTooltip)}
                size="sm"
              >
                {showTooltip ? "Visible" : "Hidden"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Legend</span>
                <span className="text-xs text-muted-foreground">Categorical labels map</span>
              </div>
              <Button
                variant={showLegend ? "default" : "secondary"}
                onClick={() => setShowLegend(!showLegend)}
                size="sm"
              >
                {showLegend ? "Visible" : "Hidden"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col justify-center relative min-h-[500px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="font-semibold leading-none tracking-tight">Analytics Overview</h3>
              <p className="text-sm text-muted-foreground">
                {chartType === "pie" ? "Showing browser market share for January" : "Showing total visitors for the last 6 months"}
              </p>
            </div>

            {chartType === "pie" ? (
              <ChartContainer config={pieConfig} className="min-h-[250px] w-full">
                <PieChart>
                  {showTooltip && <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />}
                  {showLegend && <ChartLegend content={<ChartLegendContent />} />}
                  <Pie data={pieData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5} />
                </PieChart>
              </ChartContainer>
            ) : (
              <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                {chartType === "bar" ? (
                  <BarChart accessibilityLayer data={chartData}>
                    {showGrid && <CartesianGrid vertical={false} />}
                    {showAxis && (
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                    )}
                    {showTooltip && <ChartTooltip cursor={false} content={<ChartTooltipContent />} />}
                    {showLegend && <ChartLegend content={<ChartLegendContent />} />}
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                  </BarChart>
                ) : chartType === "area" ? (
                  <AreaChart accessibilityLayer data={chartData}>
                    {showGrid && <CartesianGrid vertical={false} />}
                    {showAxis && (
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                    )}
                    {showTooltip && <ChartTooltip cursor={false} content={<ChartTooltipContent />} />}
                    {showLegend && <ChartLegend content={<ChartLegendContent />} />}
                    <Area type="monotone" dataKey="desktop" fill="var(--color-desktop)" stroke="var(--color-desktop)" fillOpacity={0.4} />
                    <Area type="monotone" dataKey="mobile" fill="var(--color-mobile)" stroke="var(--color-mobile)" fillOpacity={0.4} />
                  </AreaChart>
                ) : (
                  <LineChart accessibilityLayer data={chartData}>
                    {showGrid && <CartesianGrid vertical={false} />}
                    {showAxis && (
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                    )}
                    {showTooltip && <ChartTooltip cursor={false} content={<ChartTooltipContent />} />}
                    {showLegend && <ChartLegend content={<ChartLegendContent />} />}
                    <Line type="monotone" dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
                  </LineChart>
                )}
              </ChartContainer>
            )}
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
