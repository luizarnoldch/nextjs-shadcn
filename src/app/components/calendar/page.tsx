"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";

export default function CalendarPage() {
  // Configurable Props
  const [mode, setMode] = useState<"single" | "multiple" | "range">("single");
  const [showOutsideDays, setShowOutsideDays] = useState<boolean>(true);
  const [showWeekNumber, setShowWeekNumber] = useState<boolean>(false);
  const [fixedWeeks, setFixedWeeks] = useState<boolean>(false);

  // Calendar State Values (One for each mode to avoid type clashing)
  const [dateSingle, setDateSingle] = useState<Date | undefined>(new Date());
  const [dateMultiple, setDateMultiple] = useState<Date[] | undefined>([
    new Date(),
  ]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 5)),
  });

  // Derived Values for Code Generation visualization
  const hlLogic = "bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded"; // mode
  const hlProp = "bg-purple-500/30 text-purple-200 px-1 py-0.5 rounded"; // outside elements
  const hlState = "bg-green-500/30 text-green-200 px-1 py-0.5 rounded"; // selection data

  // Syntax highlighting
  const kw = "text-pink-400";
  const str = "text-orange-300";
  const tag = "text-emerald-400";
  const attr = "text-sky-300";

  // Formatter for visual feedback in UI
  const renderSelectionText = () => {
    if (mode === "single" && dateSingle) {
      return format(dateSingle, "PPP");
    } else if (mode === "multiple" && dateMultiple?.length) {
      return `${dateMultiple.length} days selected`;
    } else if (mode === "range" && dateRange?.from) {
      if (!dateRange.to) return `${format(dateRange.from, "PPP")} - ...`;
      return `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`;
    }
    return "Pick a date";
  };

  // prettier-ignore
  const generateCodeDynamic = () => {
    let modeState = "";
    let callbackStr = "";

    if (mode === "single") {
      modeState = `const [date, setDate] = React.useState<Date | undefined>(new Date())`;
      callbackStr = `\n      <span class="${hlState}">selected</span>={date}\n      <span class="${hlState}">onSelect</span>={setDate}`;
    } else if (mode === "multiple") {
      modeState = `const [dates, setDates] = React.useState<Date[] | undefined>([])`;
      callbackStr = `\n      <span class="${hlState}">selected</span>={dates}\n      <span class="${hlState}">onSelect</span>={setDates}`;
    } else if (mode === "range") {
      modeState = `const [date, setDate] = React.useState<DateRange | undefined>({\n    from: new Date(),\n    to: addDays(new Date(), 5),\n  })`;
      callbackStr = `\n      <span class="${hlState}">selected</span>={date}\n      <span class="${hlState}">onSelect</span>={setDate}`;
    }

    const outsideDaysProp = !showOutsideDays
      ? `\n      <span class="${hlProp}">showOutsideDays</span>={false}`
      : "";
    const weekNumberProp = showWeekNumber
      ? `\n      <span class="${hlProp}">showWeekNumber</span>`
      : "";
    const fixedWeeksProp = fixedWeeks
      ? `\n      <span class="${hlProp}">fixedWeeks</span>`
      : "";

    const imports =
      mode === "range"
        ? 'import { addDays } from "date-fns"\\nimport { DateRange } from "react-day-picker"\\n'
        : "";

    return `import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
${imports}export default function CalendarDemo() {
  ${modeState}

  return (
    <Calendar
      <span class="${hlLogic}">mode</span>="<span class="${hlLogic}">${mode}</span>"${callbackStr}${outsideDaysProp}${weekNumberProp}${fixedWeeksProp}
      className="rounded-md border shadow-sm"
    />
  )
}`;
  };

  // prettier-ignore
  const rawCodeContent = generateCodeDynamic()
    .replace(/<span class=".*?">/g, "")
    .replace(/<\/span>/g, "");

  // prettier-ignore
  const highlightedCode = generateCodeDynamic()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/import/g, `<span class="${kw}">import</span>`)
    .replace(
      /export default function/g,
      `<span class="${kw}">export default function</span>`,
    )
    .replace(/return/g, `<span class="${kw}">return</span>`)
    .replace(/const/g, `<span class="${kw}">const</span>`)
    .replace(/&lt;span class=(.*?)&gt;/g, "<span class=$1>")
    .replace(/&lt;\/span&gt;/g, "</span>")
    .replace(
      /&lt;(\/?)Calendar/g,
      `&lt;$1<span class="${tag}">Calendar</span>`,
    );

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">
          A date field component that allows users to enter and edit date,
          multiple dates, or date ranges.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full lg:w-[450px] p-6 border rounded-lg bg-card max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2 sticky top-0 bg-card z-10 py-2 border-b">
            Configuration
          </h2>

          {/* 1. Modalities */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-blue-400">
              1. Selection Mode
            </h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">DayPicker Mode Prop</span>
              <div className="flex gap-2 flex-wrap">
                {(["single", "multiple", "range"] as const).map((m) => (
                  <Button
                    key={m}
                    variant={mode === m ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMode(m)}
                  >
                    {m}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Current State Data:{" "}
                <span className="font-mono text-foreground bg-muted px-1 py-0.5 rounded">
                  {renderSelectionText()}
                </span>
              </p>
            </div>
          </div>

          <div className="border-t my-2 border-border/50" />

          {/* 2. Visual Configuration */}
          <div className="flex flex-col gap-3">
            <h3 className="text-md font-semibold text-purple-400">
              2. Grid Modifiers
            </h3>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Outside Days</span>
              <p className="text-xs text-muted-foreground mb-1">
                Show dates from previous/next months filling empty slots.
              </p>
              <div className="flex gap-2">
                <Button
                  variant={!showOutsideDays ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowOutsideDays(false)}
                >
                  Hide (false)
                </Button>
                <Button
                  variant={showOutsideDays ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowOutsideDays(true)}
                >
                  Show (true)
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium">Week Numbers</span>
              <p className="text-xs text-muted-foreground mb-1">
                Display ISO standard week numbers on the left.
              </p>
              <div className="flex gap-2">
                <Button
                  variant={!showWeekNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowWeekNumber(false)}
                >
                  Disabled
                </Button>
                <Button
                  variant={showWeekNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowWeekNumber(true)}
                >
                  Enabled
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm font-medium">Fixed Weeks</span>
              <p className="text-xs text-muted-foreground mb-1">
                Force rendering exactly 6 rows (weeks) regardless of month
                length to prevent UI jumping.
              </p>
              <div className="flex gap-2">
                <Button
                  variant={!fixedWeeks ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFixedWeeks(false)}
                >
                  Disabled
                </Button>
                <Button
                  variant={fixedWeeks ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFixedWeeks(true)}
                >
                  Enabled
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center relative min-h-[500px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10">
            {/* 
              We instantiate 3 entirely different distinct Calendar components in memory 
              based on mode. React Day Picker gets highly unstable if you change the "mode" prop 
              dynamically while it's tied to an incompatible generic Type State (Date vs Date[] vs DateRange).
            */}
            {mode === "single" && (
              <Calendar
                mode="single"
                selected={dateSingle}
                onSelect={setDateSingle}
                showOutsideDays={showOutsideDays}
                showWeekNumber={showWeekNumber}
                fixedWeeks={fixedWeeks}
                className="rounded-md border bg-card shadow-sm"
              />
            )}

            {mode === "multiple" && (
              <Calendar
                mode="multiple"
                selected={dateMultiple}
                onSelect={setDateMultiple}
                showOutsideDays={showOutsideDays}
                showWeekNumber={showWeekNumber}
                fixedWeeks={fixedWeeks}
                className="rounded-md border bg-card shadow-sm"
              />
            )}

            {mode === "range" && (
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                showOutsideDays={showOutsideDays}
                showWeekNumber={showWeekNumber}
                fixedWeeks={fixedWeeks}
                className="rounded-md border bg-card shadow-sm"
              />
            )}
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
                <span className="text-zinc-400">Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-zinc-400">
                  React State (Generic Types)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-zinc-400">Display Modifiers</span>
              </div>
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

        <pre
          className="text-sm font-mono whitespace-pre w-full overflow-x-auto p-4 bg-zinc-900/50 rounded-md border border-zinc-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
