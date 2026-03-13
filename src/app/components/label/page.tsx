"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LabelDemoPage() {
  // Variaciones
  const [withHtmlFor, setWithHtmlFor] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [labelText, setLabelText] = useState("Nombre");

  // Generador de código
  const generateCode = () => {
    const importStr = `import { Label } from "@/components/ui/label"`;
    const htmlForStr = withHtmlFor ? ' htmlFor="input-id"' : "";
    const disabledStr = disabled ? ' data-disabled="true"' : "";
    return `${importStr}

export default function LabelExample() {
  return (
    <Label${htmlForStr}${disabledStr}>${labelText}</Label>
  )
}`;
  };

  const rawCodeContent = generateCode();

  // Highlighted code (simple)
  const highlightedCode = rawCodeContent
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/import/g, '<span class="text-pink-400">import</span>')
    .replace(
      /export default function/g,
      '<span class="text-pink-400">export default function</span>',
    )
    .replace(/return/g, '<span class="text-pink-400">return</span>')
    .replace(
      /&lt;(\/?)Label(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">Label</span>$2&gt;',
    )
    .replace(
      / htmlFor=\"([^\"]+)\"/g,
      ' <span class="text-purple-400">htmlFor</span>="<span class="text-blue-400">$1</span>"',
    )
    .replace(
      / data-disabled=\"true\"/g,
      ' <span class="text-purple-400">data-disabled</span>="<span class="text-blue-400">true</span>"',
    );

  // Renderizado
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Label</h1>
        <p className="text-muted-foreground">
          Componente para mostrar etiquetas asociadas a campos de formulario.
          Prueba las variaciones y copia el código generado.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controles */}
        <div className="flex flex-col gap-6 w-full xl:w-100 p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">
            Configuración
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">htmlFor</span>
              <Button
                variant={withHtmlFor ? "default" : "secondary"}
                size="sm"
                onClick={() => setWithHtmlFor(!withHtmlFor)}
              >
                {withHtmlFor ? "Activado" : "Desactivado"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Disabled</span>
              <Button
                variant={disabled ? "default" : "secondary"}
                size="sm"
                onClick={() => setDisabled(!disabled)}
              >
                {disabled ? "Sí" : "No"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Texto</span>
              <input
                type="text"
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                className="border rounded px-2 py-1 text-sm bg-background text-foreground"
                style={{ width: 120 }}
              />
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-30">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />
          <div className="relative z-10 w-full flex justify-center p-8 bg-card border rounded-xl shadow-sm min-w-30 overflow-hidden">
            <Label
              htmlFor={withHtmlFor ? "input-id" : undefined}
              data-disabled={disabled ? true : undefined}
            >
              {labelText}
            </Label>
          </div>
        </div>
      </div>

      <div className="mt-4 p-6 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Código generado
          </h2>
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
