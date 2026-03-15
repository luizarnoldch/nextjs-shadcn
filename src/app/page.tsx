import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const links = [
  {
    href: "/custom",
    label: "Custom Components",
    description: "Library of Custom Components",
  },
  {
    href: "/components",
    label: "UI Components",
    description: "Shadcn UI Component Library",
  },
  {
    href: "/features/file-upload",
    label: "File Upload",
    description: "File Upload System",
  },
  {
    href: "/features/task-form",
    label: "Task Form",
    description: "Task Form System",
  },
  {
    href: "/features/form-test",
    label: "Form Test",
    description: "Form Test System",
  },
];

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center gap-8 p-8 text-foreground">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {links.map(({ href, label, description }) => (
          <Link key={href} href={href}>
            <div className="cursor-pointer h-full">
              <Card className="h-full flex flex-col justify-between hover:shadow-xl hover:shadow-border transition-shadow duration-200 text-card-foreground bg-primary-foreground">
                <CardHeader>
                  <CardTitle>{label}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <p>Learn more about {label.toLowerCase()}.</p>
                </CardContent>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
