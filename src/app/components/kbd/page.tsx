"use client";

import React, { useState } from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";

export default function KbdDemoPage() {
  // Variaciones
  const [grouped, setGrouped] = useState(false);
  const [keys, setKeys] = useState(["Ctrl", "Shift", "K"]);
  const [showPlus, setShowPlus] = useState(true);

  // Generador de código
  const generateCode = () => {
    const imports = grouped ? ["Kbd", "KbdGroup"] : ["Kbd"];
    const importStr = `import { ${imports.join(", ")} } from "@/components/ui/kbd"`;

    if (grouped) {
      return `${importStr}

export default function KbdExample() {
  return (
    <KbdGroup>\n      <Kbd>Ctrl</Kbd>${showPlus ? " + " : " "}<Kbd>Shift</Kbd>${showPlus ? " + " : " "}<Kbd>K</Kbd>\n    </KbdGroup>
  )
}`;
    }
    return `${importStr}

export default function KbdExample() {
  return (
    <Kbd>Ctrl</Kbd>
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
      /&lt;(\/?)Kbd(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">Kbd</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)KbdGroup(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">KbdGroup</span>$2&gt;',
    );

  // Renderizado
  const renderKbd = () => {
    if (grouped) {
      return (
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          {showPlus && <span className="mx-1">+</span>}
          <Kbd>Shift</Kbd>
          {showPlus && <span className="mx-1">+</span>}
          <Kbd>K</Kbd>
        </KbdGroup>
      );
    }
    return <Kbd>Ctrl</Kbd>;
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Kbd</h1>
        <p className="text-muted-foreground">
          Componente para mostrar teclas o combinaciones de teclado. Prueba las
          variaciones y copia el código generado.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controles */}
        <div className="flex flex-col gap-6 w-full xl:w-100 p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">
            Configuración
          </h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">
              Variantes
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Agrupado</span>
              <Button
                variant={grouped ? "default" : "secondary"}
                size="sm"
                onClick={() => setGrouped(!grouped)}
              >
                {grouped ? "Activado" : "Desactivado"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mostrar símbolo +</span>
              <Button
                variant={showPlus ? "default" : "secondary"}
                size="sm"
                onClick={() => setShowPlus(!showPlus)}
              >
                {showPlus ? "Sí" : "No"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-50">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />
          <div className="relative z-10 w-full flex justify-center p-8 bg-card border rounded-xl shadow-sm min-w-30 overflow-hidden">
            {renderKbd()}
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
