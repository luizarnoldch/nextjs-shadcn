"use client";

import React, { useState, useMemo, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FormDemoPage() {
  const [requireUsername, setRequireUsername] = useState(true);
  const [requireEmail, setRequireEmail] = useState(true);
  const [showFormDescriptions, setShowFormDescriptions] = useState(true);

  // Dynamic schema simulation so the form reacts to user configuration
  const formSchema = useMemo(() => {
    return z.object({
      username: requireUsername
        ? z
            .string()
            .min(2, { message: "Username must be at least 2 characters." })
        : z.string().optional(),
      email: requireEmail
        ? z
            .string()
            .email({ message: "Invalid email address." })
            .min(1, { message: "Email is required." })
        : z.string().optional(),
    });
  }, [requireUsername, requireEmail]);

  // Hook definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
    mode: "onSubmit",
  });

  // Hot reload config changes so validations don't stick incorrectly
  useEffect(() => {
    form.clearErrors();
  }, [requireUsername, requireEmail, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert(
      "Form submitted successfully!\\n\\n" + JSON.stringify(values, null, 2),
    );
  }

  // Syntax highlighting colors
  const hlTag = "text-emerald-400";
  const hlProp = "text-purple-400";
  const hlVal = "text-blue-400";
  const hlKw = "text-pink-400";
  const hlFunc = "text-yellow-200";

  // Array based code generator
  const generateCode = () => {
    const parts: string[] = [];

    parts.push(`    <Form {...form}>`);
    parts.push(
      `      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">`,
    );

    // Username Field
    parts.push(`        <FormField`);
    parts.push(`          control={form.control}`);
    parts.push(`          name="username"`);
    parts.push(`          render={({ field }) => (`);
    parts.push(`            <FormItem>`);
    parts.push(`              <FormLabel>Username</FormLabel>`);
    parts.push(`              <FormControl>`);
    parts.push(`                <Input placeholder="shadcn" {...field} />`);
    parts.push(`              </FormControl>`);
    if (showFormDescriptions) {
      parts.push(`              <FormDescription>`);
      parts.push(`                This is your public display name.`);
      parts.push(`              </FormDescription>`);
    }
    parts.push(`              <FormMessage />`);
    parts.push(`            </FormItem>`);
    parts.push(`          )}`);
    parts.push(`        />`);

    // Email Field
    parts.push(`        <FormField`);
    parts.push(`          control={form.control}`);
    parts.push(`          name="email"`);
    parts.push(`          render={({ field }) => (`);
    parts.push(`            <FormItem>`);
    parts.push(`              <FormLabel>Email</FormLabel>`);
    parts.push(`              <FormControl>`);
    parts.push(
      `                <Input type="email" placeholder="m@example.com" {...field} />`,
    );
    parts.push(`              </FormControl>`);
    if (showFormDescriptions) {
      parts.push(`              <FormDescription>`);
      parts.push(`                We won't share your email with anyone.`);
      parts.push(`              </FormDescription>`);
    }
    parts.push(`              <FormMessage />`);
    parts.push(`            </FormItem>`);
    parts.push(`          )}`);
    parts.push(`        />`);

    parts.push(`        <Button type="submit">Submit</Button>`);
    parts.push(`      </form>`);
    parts.push(`    </Form>`);

    const innerJSX = parts.join("\n");

    const importsList = [
      "Form",
      "FormControl",
      "FormField",
      "FormItem",
      "FormLabel",
      "FormMessage",
    ];
    if (showFormDescriptions) {
      importsList.push("FormDescription");
    }

    const zodUsernameRule = requireUsername
      ? `\n    username: z.string().min(2, {\n      message: "Username must be at least 2 characters.",\n    }),`
      : `\n    username: z.string().optional(),`;
    const zodEmailRule = requireEmail
      ? `\n    email: z.string().email({\n      message: "Invalid email address.",\n    }),`
      : `\n    email: z.string().optional(),`;

    return `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ${importsList.sort().join(",\n  ")}
} from "@/components/ui/form"

const formSchema = z.object({${zodUsernameRule}${zodEmailRule}
})

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
${innerJSX}
  )
}`;
  };

  const rawCodeContent = generateCode();

  const highlightedCode = generateCode()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/import/g, `<span class="${hlKw}">import</span>`)
    .replace(
      /export default function/g,
      `<span class="${hlKw}">export default function</span>`,
    )
    .replace(/function/g, `<span class="${hlKw}">function</span>`)
    .replace(/return/g, `<span class="${hlKw}">return</span>`)
    .replace(/const/g, `<span class="${hlKw}">const</span>`)
    // Tags
    .replace(
      /&lt;(\/?)Form([A-Za-z]*)(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Form$2</span>$3&gt;`,
    )
    .replace(
      /&lt;(\/?)form(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">form</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)Input(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Input</span>$2&gt;`,
    )
    .replace(
      /&lt;(\/?)Button(.*?)&gt;/g,
      `&lt;$1<span class="${hlTag}">Button</span>$2&gt;`,
    )
    // Attributes
    .replace(
      / className="([^"]+)"/g,
      ` <span class="${hlProp}">className</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / type="([^"]+)"/g,
      ` <span class="${hlProp}">type</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / placeholder="([^"]+)"/g,
      ` <span class="${hlProp}">placeholder</span>="<span class="${hlVal}">$1</span>"`,
    )
    .replace(
      / name="([^"]+)"/g,
      ` <span class="${hlProp}">name</span>="<span class="${hlVal}">$1</span>"`,
    )
    // JS/TS code highlighting
    .replace(/useForm/g, `<span class="${hlFunc}">useForm</span>`)
    .replace(/zodResolver/g, `<span class="${hlFunc}">zodResolver</span>`)
    .replace(/z\.object/g, `<span class="${hlFunc}">z.object</span>`)
    .replace(/\.string\(\)/g, `<span class="${hlFunc}">.string()</span>`)
    .replace(/\.email\(/g, `<span class="${hlFunc}">.email(</span>`)
    .replace(/\.min\(/g, `<span class="${hlFunc}">.min(</span>`)
    .replace(/\.optional\(\)/g, `<span class="${hlFunc}">.optional()</span>`)
    .replace(
      / onSubmit=\{([^}]+)\}/g,
      ` <span class="${hlProp}">onSubmit</span>={<span class="${hlVal}">$1</span>}`,
    )
    .replace(
      / control=\{([^}]+)\}/g,
      ` <span class="${hlProp}">control</span>={<span class="${hlVal}">$1</span>}`,
    )
    .replace(
      / render=\{([^}]+)\}/g,
      ` <span class="${hlProp}">render</span>={<span class="${hlVal}">$1</span>}`,
    );

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Form</h1>
        <p className="text-muted-foreground">
          Building forms with React Hook Form and Zod. Accessible,
          schema-driven, and highly composable.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mt-6">
        {/* Controls */}
        <div className="flex flex-col gap-6 w-full xl:w-[400px] p-6 border rounded-lg bg-card shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">
            Configuration
          </h2>

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium text-muted-foreground">
              Zod Schema Validation
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Require Username</span>
                <span className="text-xs text-muted-foreground">
                  <code>.string().min(2)</code>
                </span>
              </div>
              <Button
                variant={requireUsername ? "default" : "secondary"}
                onClick={() => setRequireUsername(!requireUsername)}
                size="sm"
              >
                {requireUsername ? "Required" : "Optional"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Require Email</span>
                <span className="text-xs text-muted-foreground">
                  <code>.string().email()</code>
                </span>
              </div>
              <Button
                variant={requireEmail ? "default" : "secondary"}
                onClick={() => setRequireEmail(!requireEmail)}
                size="sm"
              >
                {requireEmail ? "Required" : "Optional"}
              </Button>
            </div>

            <div className="border-t border-border/50 my-2" />

            <h3 className="text-md font-medium text-muted-foreground">
              Form Structure
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Descriptions</span>
                <span className="text-xs text-muted-foreground">
                  Toggles <code>&lt;FormDescription&gt;</code>
                </span>
              </div>
              <Button
                variant={showFormDescriptions ? "default" : "secondary"}
                onClick={() => setShowFormDescriptions(!showFormDescriptions)}
                size="sm"
              >
                {showFormDescriptions ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex-1 p-10 border rounded-lg bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center relative min-h-[400px]">
          <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-size-[20px_20px]" />

          <div className="relative z-10 w-full flex justify-center p-8 bg-card border rounded-xl shadow-sm min-w-[400px] overflow-hidden">
            {/* Form Instance */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      {showFormDescriptions && (
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      {showFormDescriptions && (
                        <FormDescription>
                          We won't share your email with anyone.
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit Profile</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="mt-4 p-6 border rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Generated Code
          </h2>
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
