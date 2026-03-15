"use client";

import FormTestForm from "../components/FormTestForm";

export default function FormTestView() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#0a0a0a] text-white">
      <div className="w-full max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Form Test Lab
          </h1>
          <p className="text-white/60 text-lg">
            Test every data type in our modern, type-safe form system.
          </p>
        </div>
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[100px] rounded-full" />
          <FormTestForm />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
            <h3 className="font-semibold text-blue-400">Type Safe</h3>
            <p className="text-white/40 text-sm">Strict validation for all Prisma types.</p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
            <h3 className="font-semibold text-purple-400">Dynamic UI</h3>
            <p className="text-white/40 text-sm">Modern components with subtle animations.</p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
            <h3 className="font-semibold text-green-400">Persistence</h3>
            <p className="text-white/40 text-sm">Direct integration with PostgreSQL.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
