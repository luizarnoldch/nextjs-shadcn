"use client";

import React, { useState } from "react";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";

export default function ItemDemoPage() {
  // Variaciones
  const [variant, setVariant] = useState<"default" | "outline" | "muted">("default");
  const [size, setSize] = useState<"default" | "sm">("default");
  const [mediaType, setMediaType] = useState<"default" | "icon" | "image">("default");
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [grouped, setGrouped] = useState(false);

  // Generador de código
  const generateCode = () => {
    const imports = ["Item", "ItemMedia", "ItemContent", "ItemTitle"];
    if (showDescription) imports.push("ItemDescription");
    if (showActions) imports.push("ItemActions");
    if (showHeader) imports.push("ItemHeader");
    if (showFooter) imports.push("ItemFooter");
    if (grouped) imports.push("ItemGroup", "ItemSeparator");

    const importStr = `import { ${imports.join(", ")} } from "@/components/ui/item"`;

    const media = mediaType !== "default"
      ? `<ItemMedia variant=\"${mediaType}\">{media}</ItemMedia>`
      : `<ItemMedia>{media}</ItemMedia>`;

    const title = `<ItemTitle>Item title</ItemTitle>`;
    const description = showDescription ? `\n        <ItemDescription>Descripción del item</ItemDescription>` : "";
    const actions = showActions ? `\n        <ItemActions>\n          <Button size=\"sm\">Acción</Button>\n        </ItemActions>` : "";
    const header = showHeader ? `<ItemHeader>Header content</ItemHeader>\n` : "";
    const footer = showFooter ? `<ItemFooter>Footer content</ItemFooter>\n` : "";

    const content = `<ItemContent>\n        ${title}${description}\n      </ItemContent>`;

    const item = `  <Item variant=\"${variant}\" size=\"${size}\">\n    ${header}${media}\n    ${content}${actions}${footer}\n  </Item>`;

    if (grouped) {
      return `${importStr}

export default function ItemExample() {
  return (
    <ItemGroup>\n${item}\n      <ItemSeparator />\n${item.replace("Item title", "Otro item")}\n    </ItemGroup>
  )
}`;
    }
    return `${importStr}

export default function ItemExample() {
  return (
${item}
  )
}`;
  };

  const rawCodeContent = generateCode();

  // Highlighted code (simple)
  const highlightedCode = rawCodeContent
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/import/g, '<span class="text-pink-400">import</span>')
    .replace(/export default function/g, '<span class="text-pink-400">export default function</span>')
    .replace(/return/g, '<span class="text-pink-400">return</span>')
    .replace(/&lt;(\/?)Item(.*?)&gt;/g, '&lt;$1<span class="text-emerald-400">Item</span>$2&gt;')
    .replace(/&lt;(\/?)ItemMedia(.*?)&gt;/g, '&lt;$1<span class="text-emerald-400">ItemMedia</span>$2&gt;')
    .replace(/&lt;(\/?)ItemContent(.*?)&gt;/g, '&lt;$1<span class="text-emerald-400">ItemContent</span>$2&gt;')
    .replace(/&lt;(\/?)ItemActions(.*?)&gt;/g, '&lt;$1<span class="text-emerald-400">ItemActions</span>$2&gt;')
    .replace(/&lt;(\/?)ItemTitle(.*?)&gt;/g, '&lt;$1<span class="text-emerald-400">ItemTitle</span>$2&gt;')
    .replace(/&lt;(\/?)ItemDescription(.*?)&gt;/g, '&lt;$1<span class="text-emerald-400">ItemDescription</span>$2&gt;')
    .replace(/&lt;(\/?)ItemHeader(.*?)&gt;/g, '&lt;$1<span class="text-emerald-400">ItemHeader</span>$2&gt;')
    .replace(/&lt;(\/?)ItemFooter(.*?)&gt;/g, '&lt;$1<span class="text-emerald-400">ItemFooter</span>$2&gt;')
    .replace(/&lt;(\/?)ItemGroup(.*?)&gt;/g, '&lt;$1<span class="text-emerald-400">ItemGroup</span>$2&gt;')
    .replace(/&lt;(\/?)ItemSeparator(.*?)&gt;/g, '&lt;$1<span class="text-emerald-400">ItemSeparator</span>$2&gt;')
    .replace(/ variant=\"([^\"]+)\"/g, ' <span class="text-purple-400">variant</span>="<span class="text-blue-400">$1</span>"')
    .replace(/ size=\"([^\"]+)\"/g, ' <span class="text-purple-400">size</span>="<span class="text-blue-400">$1</span>"');

  // Renderizado
  const renderItem = (title = "Item title") => (
    <Item variant={variant} size={size}>
      {showHeader && <ItemHeader>Header content</ItemHeader>}
      <ItemMedia variant={mediaType}>
        {mediaType === "icon" ? (
          <span role="img" aria-label="icon">🔔</span>
        ) : mediaType === "image" ? (
          <img src="https://placehold.co/40x40" alt="img" className="rounded-sm" />
        ) : (
          <span role="img" aria-label="default">📦</span>
        )}
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        {showDescription && <ItemDescription>Descripción del item</ItemDescription>}
      </ItemContent>
      {showActions && (
        <ItemActions>
          <Button size="sm">Acción</Button>
        </ItemActions>
      )}
      {showFooter && <ItemFooter>Footer content</ItemFooter>}
    </Item>
  );

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Item</h1>
        <p className="text-muted-foreground">
          Componente para mostrar elementos tipo lista, tarjetas o bloques. Prueba las variaciones y copia el código generado.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controles */}
        <div className="flex flex-col gap-6 w-full xl:w-100 p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuración</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Variantes</h3>
            <div className="flex gap-2">
              {["default", "outline", "muted"].map(v => (
                <Button key={v} variant={variant === v ? "default" : "outline"} size="sm" onClick={() => setVariant(v as "default" | "outline" | "muted")}>{v}</Button>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              {["default", "sm"].map(s => (
                <Button key={s} variant={size === s ? "default" : "outline"} size="sm" onClick={() => setSize(s as "default" | "sm")}>{s}</Button>
              ))}
            </div>

            <div className="border-t border-border/50 my-2" />

            <h3 className="text-md font-medium text-muted-foreground">Media</h3>
            <div className="flex gap-2">
              {["default", "icon", "image"].map(m => (
                <Button key={m} variant={mediaType === m ? "default" : "outline"} size="sm" onClick={() => setMediaType(m as "default" | "icon" | "image")}>{m}</Button>
              ))}
            </div>

            <div className="border-t border-border/50 my-2" />

            <h3 className="text-md font-medium text-muted-foreground">Composición</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Header</span>
                <Button variant={showHeader ? "default" : "secondary"} size="sm" onClick={() => setShowHeader(!showHeader)}>{showHeader ? "Activado" : "Desactivado"}</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Footer</span>
                <Button variant={showFooter ? "default" : "secondary"} size="sm" onClick={() => setShowFooter(!showFooter)}>{showFooter ? "Activado" : "Desactivado"}</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Actions</span>
                <Button variant={showActions ? "default" : "secondary"} size="sm" onClick={() => setShowActions(!showActions)}>{showActions ? "Activado" : "Desactivado"}</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Description</span>
                <Button variant={showDescription ? "default" : "secondary"} size="sm" onClick={() => setShowDescription(!showDescription)}>{showDescription ? "Activado" : "Desactivado"}</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Agrupado</span>
                <Button variant={grouped ? "default" : "secondary"} size="sm" onClick={() => setGrouped(!grouped)}>{grouped ? "Activado" : "Desactivado"}</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-100">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />
          <div className="relative z-10 w-full flex flex-col gap-4 justify-center p-8 bg-card border rounded-xl shadow-sm min-w-75 overflow-hidden">
            {grouped ? (
              <ItemGroup>
                {renderItem("Item title")}
                <ItemSeparator />
                {renderItem("Otro item")}
              </ItemGroup>
            ) : (
              renderItem("Item title")
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 p-6 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-100">Código generado</h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigator.clipboard.writeText(rawCodeContent)}
          >
            Copiar código
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
