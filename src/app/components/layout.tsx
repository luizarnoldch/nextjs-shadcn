import { ComponentsSidebar } from "@/components/components-sidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <ComponentsSidebar />
      <main className="flex-1 p-6 md:p-10 hide-scrollbar overflow-y-auto h-[calc(100vh)]">
        {children}
      </main>
    </div>
  );
}
