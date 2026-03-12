"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function InputOtpDemoPage() {
  const [length, setLength] = useState(6);
  const [separator, setSeparator] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [value, setValue] = useState("");

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";

  // Generador de código
  const generateCode = () => {
    const imports = ["InputOTP", "InputOTPGroup", "InputOTPSlot"];
    if (separator) imports.push("InputOTPSeparator");
    if (showLabel) imports.push("Label");

    const importStr =
      imports.includes("Label")
        ? `import { InputOTP, InputOTPGroup, InputOTPSlot${separator ? ", InputOTPSeparator" : ""} } from "(@/components/ui/input-otp")\nimport { Label } from "(@/components/ui/label")`
        : `import { InputOTP, InputOTPGroup, InputOTPSlot${separator ? ", InputOTPSeparator" : ""} } from "(@/components/ui/input-otp")`;

    // slots generator
    let slotsArr = [];
    for (let i = 0; i < length; i++) {
      if (separator && i > 0 && i % Math.ceil(length / 2) === 0) {
        slotsArr.push(`        <InputOTPSeparator />`);
      }
      slotsArr.push(`        <InputOTPSlot index={${i}} />`);
    }
    const slots = slotsArr.join("\n");

    const group = `      <InputOTPGroup>\n${slots}\n      </InputOTPGroup>`;

    const inputProps = [
      `value={value}`,
      `onChange={setValue}`,
      `maxLength={${length}}`,
      disabled ? `disabled` : "",
      invalid ? `aria-invalid={true}` : "",
    ].filter(Boolean).join(" ");

    const input = `    <InputOTP ${inputProps}>\n${group}\n    </InputOTP>`;

    const label = showLabel
      ? `    <Label htmlFor="otp-demo">OTP</Label>\n` : "";

    const wrapper = showLabel
      ? `  <div className="grid w-full max-w-sm items-center gap-1.5">\n${label}${input}\n  </div>`
      : input;

    return `${importStr}

export default function InputOTPExample() {
  const [value, setValue] = React.useState(\"\");
  return (
${wrapper}
  )
}`;
  };

  const rawCodeContent = generateCode();

  const highlightedCode = generateCode()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/import/g, `<span class="text-pink-400">import</span>`)
    .replace(/export default function/g, `<span class="text-pink-400">export default function</span>`)
    .replace(/return/g, `<span class="text-pink-400">return</span>`)
    // Tags
    .replace(/&lt;(\/?)InputOTP(.*?)&gt;/g, `&lt;$1<span class="text-emerald-400">InputOTP</span>$2&gt;`)
    .replace(/&lt;(\/?)InputOTPGroup(.*?)&gt;/g, `&lt;$1<span class="text-emerald-400">InputOTPGroup</span>$2&gt;`)
    .replace(/&lt;(\/?)InputOTPSlot(.*?)&gt;/g, `&lt;$1<span class="text-emerald-400">InputOTPSlot</span>$2&gt;`)
    .replace(/&lt;(\/?)InputOTPSeparator(.*?)&gt;/g, `&lt;$1<span class="text-emerald-400">InputOTPSeparator</span>$2&gt;`)
    .replace(/&lt;(\/?)Label(.*?)&gt;/g, `&lt;$1<span class="text-emerald-400">Label</span>$2&gt;`)
    .replace(/&lt;(\/?)div(.*?)&gt;/g, `&lt;$1<span class="text-emerald-400">div</span>$2&gt;`)
    // Attributes
    .replace(/ className=\"([^\"]+)\"/g, ` <span class="text-purple-400">className</span>=\"<span class="text-blue-400">$1</span>\"`)
    .replace(/ length=\"?([0-9]+)\"?/g, ` <span class="text-purple-400">length</span>=<span class="text-blue-400">$1</span>`)
    .replace(/ value=\"([^\"]*)\"/g, ` <span class="text-purple-400">value</span>=\"<span class="text-blue-400">$1</span>\"`)
    .replace(/ value=\{value\}/g, ` <span class="text-purple-400">value</span>=&#123;<span class="text-blue-400">value</span>&#125;`)
    .replace(/ onChange=\{setValue\}/g, ` <span class="text-purple-400">onChange</span>=&#123;<span class="text-blue-400">setValue</span>&#125;`)
    .replace(/ disabled/g, ` <span class="text-purple-400">disabled</span>`)
    .replace(/ aria-invalid=\{([^}]+)\}/g, ` <span class="text-purple-400">aria-invalid</span>=&#123;<span class="text-blue-400">$1</span>&#125;`);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Input OTP</h1>
        <p className="text-muted-foreground">
          Componente para ingresar códigos OTP. Prueba las variaciones y copia el código generado.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controles */}
        <div className="flex flex-col gap-6 w-full xl:w-100 p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">Configuración</h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">Propiedades</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Cantidad de dígitos</span>
              <div className="grid grid-cols-5 gap-2">
                {[4, 6, 8, 10, 12].map((n) => (
                  <Button
                    key={n}
                    variant={length === n ? "default" : "outline"}
                    onClick={() => setLength(n)}
                    size="sm"
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Separador</span>
              <Button
                variant={separator ? "default" : "secondary"}
                onClick={() => setSeparator(!separator)}
                size="sm"
              >
                {separator ? "Activado" : "Desactivado"}
              </Button>
            </div>

            <div className="border-t border-border/50 my-2" />

            <h3 className="text-md font-medium text-muted-foreground">Estado & Composición</h3>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Con Label</span>
              <Button
                variant={showLabel ? "default" : "secondary"}
                onClick={() => setShowLabel(!showLabel)}
                size="sm"
              >
                {showLabel ? "Activado" : "Desactivado"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estado inválido</span>
              <Button
                variant={invalid ? "destructive" : "secondary"}
                onClick={() => setInvalid(!invalid)}
                size="sm"
              >
                {invalid ? "Inválido" : "Válido"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Deshabilitado</span>
              <Button
                variant={disabled ? "secondary" : "outline"}
                onClick={() => setDisabled(!disabled)}
                size="sm"
              >
                {disabled ? "Deshabilitado" : "Habilitado"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-100">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />
          <div className="relative z-10 w-full flex justify-center p-8 bg-card border rounded-xl shadow-sm min-w-75 overflow-hidden">
            {showLabel ? (
              <div className="grid w-full max-w-sm items-center gap-1.5 transition-all">
                <Label htmlFor="otp-demo" className={invalid ? "text-destructive" : ""}>
                  OTP
                </Label>
                <InputOTP
                  id="otp-demo"
                  value={value}
                  onChange={setValue}
                  maxLength={length}
                  disabled={disabled}
                  aria-invalid={invalid}
                >
                  <InputOTPGroup>
                    {Array.from({ length }, (_, i) =>
                      separator && i > 0 && i % Math.ceil(length / 2) === 0 ? (
                        <React.Fragment key={i}>
                          <InputOTPSeparator />
                          <InputOTPSlot index={i} />
                        </React.Fragment>
                      ) : (
                        <InputOTPSlot key={i} index={i} />
                      )
                    )}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            ) : (
              <InputOTP
                value={value}
                onChange={setValue}
                maxLength={length}
                disabled={disabled}
                aria-invalid={invalid}
              >
                <InputOTPGroup>
                  {Array.from({ length }, (_, i) =>
                    separator && i > 0 && i % Math.ceil(length / 2) === 0 ? (
                      <React.Fragment key={i}>
                        <InputOTPSeparator />
                        <InputOTPSlot index={i} />
                      </React.Fragment>
                    ) : (
                      <InputOTPSlot key={i} index={i} />
                    )
                  )}
                </InputOTPGroup>
              </InputOTP>
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
