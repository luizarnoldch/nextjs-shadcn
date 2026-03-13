"use client";

import React, { useState } from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarGroup,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";

export default function MenubarDemoPage() {
  // Variaciones
  const [showCheckbox, setShowCheckbox] = useState(true);
  const [showRadio, setShowRadio] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(true);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");

  // Generador de código
  const generateCode = () => {
    const imports = [
      "Menubar",
      "MenubarMenu",
      "MenubarTrigger",
      "MenubarContent",
      "MenubarItem",
      "MenubarSeparator",
      "MenubarLabel",
      "MenubarShortcut",
    ];
    if (showCheckbox) imports.push("MenubarCheckboxItem");
    if (showRadio) imports.push("MenubarRadioGroup", "MenubarRadioItem");
    if (showSubmenu)
      imports.push("MenubarSub", "MenubarSubTrigger", "MenubarSubContent");
    const importStr = `import { ${imports.join(", ")} } from "@/components/ui/menubar"`;

    let menuItems = `      <MenubarItem>Nuevo <MenubarShortcut>Ctrl+N</MenubarShortcut></MenubarItem>\n      <MenubarItem>Guardar <MenubarShortcut>Ctrl+S</MenubarShortcut></MenubarItem>`;
    if (showCheckbox) {
      menuItems += `\n      <MenubarCheckboxItem checked={checked}>Mostrar barra</MenubarCheckboxItem>`;
    }
    if (showRadio) {
      menuItems += `\n      <MenubarRadioGroup value={radioValue} onValueChange={setRadioValue}>\n        <MenubarRadioItem value=\"option1\">Opción 1</MenubarRadioItem>\n        <MenubarRadioItem value=\"option2\">Opción 2</MenubarRadioItem>\n      </MenubarRadioGroup>`;
    }
    if (showSubmenu) {
      menuItems += `\n      <MenubarSub>\n        <MenubarSubTrigger>Más</MenubarSubTrigger>\n        <MenubarSubContent>\n          <MenubarItem>Preferencias</MenubarItem>\n          <MenubarItem>Ayuda</MenubarItem>\n        </MenubarSubContent>\n      </MenubarSub>`;
    }

    return `${importStr}

export default function MenubarExample() {
  const [checked, setChecked] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("option1");
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Archivo</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Acciones</MenubarLabel>
          <MenubarSeparator />
          {menuItems}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
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
      /&lt;(\/?)Menubar(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">Menubar</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarMenu(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarMenu</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarTrigger(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarTrigger</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarContent(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarContent</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarItem(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarItem</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarSeparator(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarSeparator</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarLabel(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarLabel</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarShortcut(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarShortcut</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarCheckboxItem(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarCheckboxItem</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarRadioGroup(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarRadioGroup</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarRadioItem(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarRadioItem</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarSub(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarSub</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarSubTrigger(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarSubTrigger</span>$2&gt;',
    )
    .replace(
      /&lt;(\/?)MenubarSubContent(.*?)&gt;/g,
      '&lt;$1<span class="text-emerald-400">MenubarSubContent</span>$2&gt;',
    );

  // Renderizado
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Menubar</h1>
        <p className="text-muted-foreground">
          Componente para mostrar menús tipo barra de herramientas. Prueba las
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
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Checkbox</span>
              <Button
                variant={showCheckbox ? "default" : "secondary"}
                size="sm"
                onClick={() => setShowCheckbox(!showCheckbox)}
              >
                {showCheckbox ? "Activado" : "Desactivado"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Radio</span>
              <Button
                variant={showRadio ? "default" : "secondary"}
                size="sm"
                onClick={() => setShowRadio(!showRadio)}
              >
                {showRadio ? "Activado" : "Desactivado"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Submenú</span>
              <Button
                variant={showSubmenu ? "default" : "secondary"}
                size="sm"
                onClick={() => setShowSubmenu(!showSubmenu)}
              >
                {showSubmenu ? "Activado" : "Desactivado"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-50">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />
          <div className="relative z-10 w-full flex justify-center p-8 bg-card border rounded-xl shadow-sm min-w-75 overflow-hidden">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Archivo</MenubarTrigger>
                <MenubarContent>
                  <MenubarLabel>Acciones</MenubarLabel>
                  <MenubarSeparator />
                  <MenubarItem>
                    Nuevo <MenubarShortcut>Ctrl+N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Guardar <MenubarShortcut>Ctrl+S</MenubarShortcut>
                  </MenubarItem>
                  {showCheckbox && (
                    <MenubarCheckboxItem
                      checked={checked}
                      onCheckedChange={setChecked}
                    >
                      Mostrar barra
                    </MenubarCheckboxItem>
                  )}
                  {showRadio && (
                    <MenubarRadioGroup
                      value={radioValue}
                      onValueChange={setRadioValue}
                    >
                      <MenubarRadioItem value="option1">
                        Opción 1
                      </MenubarRadioItem>
                      <MenubarRadioItem value="option2">
                        Opción 2
                      </MenubarRadioItem>
                    </MenubarRadioGroup>
                  )}
                  {showSubmenu && (
                    <MenubarSub>
                      <MenubarSubTrigger>Más</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Preferencias</MenubarItem>
                        <MenubarItem>Ayuda</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
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
