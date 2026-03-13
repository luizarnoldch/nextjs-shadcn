import fs from "fs/promises";
import path from "path";

// Relative paths from the script execution context (project root)
const UI_COMPONENTS_DIR = path.join(process.cwd(), "src/components/ui");
const OUTPUT_LIST_FILE = path.join(process.cwd(), "src/lib/components-list.ts");
const APP_COMPONENTS_DIR = path.join(process.cwd(), "src/app/components");

async function main() {
  try {
    // 1. Read the src/components/ui directory
    const files = await fs.readdir(UI_COMPONENTS_DIR);

    // Filter for .tsx files and extract component names
    const components = files
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => {
        const name = file.replace(".tsx", "");
        // Format names like 'alert-dialog' to 'Alert Dialog'
        const formattedName = name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return {
          id: name,
          name: formattedName,
          path: `/components/${name}`,
        };
      })
      .sort((a, b) => a.id.localeCompare(b.id));

    console.log(`Found ${components.length} UI components.`);

    // 2. Generate src/lib/components-list.ts
    // Ensure lib directory exists
    await fs.mkdir(path.dirname(OUTPUT_LIST_FILE), { recursive: true });

    const listContent = `// Auto-generated file. Do not edit manually.
export const uiComponents = ${JSON.stringify(components, null, 2)} as const;

export type UIComponent = typeof uiComponents[number];
`;
    await fs.writeFile(OUTPUT_LIST_FILE, listContent, "utf-8");
    console.log(`Generated ${OUTPUT_LIST_FILE}`);

    // 3. Create component pages
    let newPagesCount = 0;

    for (const component of components) {
      const componentDir = path.join(APP_COMPONENTS_DIR, component.id);
      const pageFile = path.join(componentDir, "page.tsx");

      // Ensure the directory exists
      await fs.mkdir(componentDir, { recursive: true });

      // Check if page already exists to prevent overwriting custom work
      try {
        await fs.access(pageFile);
      } catch (error) {
        // File doesn't exist, generate standard template
        const pageContent = `export default function ${component.name.replace(/ /g, "")}Page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">${component.name}</h1>
        <p className="text-muted-foreground">
          Documentation and examples for the ${component.name} component.
        </p>
      </div>
      <div className="flex items-center justify-center p-10 mt-6 border rounded-lg bg-card text-card-foreground min-h-[350px]">
        <p className="text-muted-foreground text-sm flex items-center gap-2">
           Placeholder for {component.id}.tsx examples
        </p>
      </div>
    </div>
  );
}
`;
        await fs.writeFile(pageFile, pageContent, "utf-8");
        newPagesCount++;
      }
    }

    console.log(`Generated ${newPagesCount} new component pages.`);
    console.log("Done!");
  } catch (error) {
    console.error("Error generating component pages:", error);
    process.exit(1);
  }
}

main();
