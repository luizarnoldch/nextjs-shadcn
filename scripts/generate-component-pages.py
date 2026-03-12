import os
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(message)s')

# Relative paths from the script execution context (project root)
PROJECT_ROOT = os.getcwd()
UI_COMPONENTS_DIR = os.path.join(PROJECT_ROOT, 'src', 'components', 'ui')
OUTPUT_LIST_FILE = os.path.join(PROJECT_ROOT, 'src', 'lib', 'components-list.ts')
APP_COMPONENTS_DIR = os.path.join(PROJECT_ROOT, 'src', 'app', 'components')

def main():
    try:
        # 1. Read the src/components/ui directory
        files = os.listdir(UI_COMPONENTS_DIR)
        
        components = []
        for file in files:
            if file.endswith('.tsx'):
                name = file.replace('.tsx', '')
                # Format names like 'alert-dialog' to 'Alert Dialog'
                formatted_name = ' '.join([word.capitalize() for word in name.split('-')])
                
                components.append({
                    'id': name,
                    'name': formatted_name,
                    'path': f'/components/{name}'
                })
        
        # Sort components by id
        components.sort(key=lambda x: x['id'])
        
        logging.info(f"Found {len(components)} UI components.")

        # 2. Generate src/lib/components-list.ts
        os.makedirs(os.path.dirname(OUTPUT_LIST_FILE), exist_ok=True)
        
        list_content = f"""// Auto-generated file. Do not edit manually.
export const uiComponents = {json.dumps(components, indent=2)} as const;

export type UIComponent = typeof uiComponents[number];
"""
        with open(OUTPUT_LIST_FILE, 'w', encoding='utf-8') as f:
            f.write(list_content)
        
        logging.info(f"Generated {OUTPUT_LIST_FILE}")

        # 3. Create component pages
        new_pages_count = 0
        
        for component in components:
            component_dir = os.path.join(APP_COMPONENTS_DIR, component['id'])
            page_file = os.path.join(component_dir, 'page.tsx')
            
            # Ensure the directory exists
            os.makedirs(component_dir, exist_ok=True)
            
            # Check if page already exists to prevent overwriting custom work
            if not os.path.exists(page_file):
                # File doesn't exist, generate standard template
                component_name_no_spaces = component['name'].replace(' ', '')
                page_content = f"""export default function {component_name_no_spaces}Page() {{
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{component['name']}</h1>
        <p className="text-muted-foreground">
          Documentation and examples for the {component['name']} component.
        </p>
      </div>
      <div className="flex items-center justify-center p-10 mt-6 border rounded-lg bg-card text-card-foreground min-h-[350px]">
        <p className="text-muted-foreground text-sm flex items-center gap-2">
           Placeholder for {component['id']}.tsx examples
        </p>
      </div>
    </div>
  );
}}
"""
                with open(page_file, 'w', encoding='utf-8') as f:
                    f.write(page_content)
                new_pages_count += 1
                
        logging.info(f"Generated {new_pages_count} new component pages.")
        logging.info("Done!")
        
    except Exception as e:
        logging.error(f"Error generating component pages: {e}")
        exit(1)

if __name__ == "__main__":
    main()
