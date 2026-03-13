import React from "react";

export default function FileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-4">
      <div className="lg:col-span-4">{children}</div>
    </div>
  );
}
