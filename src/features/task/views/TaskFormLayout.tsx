import React from "react";

export default function TaskFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-24">
        <header className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Task Management
          </h1>
          <p className="text-white/40">
            Streamline your workflow with precision and style.
          </p>
        </header>
        <div className="grid gap-12">
          {children}
        </div>
      </div>
    </div>
  );
}
