import React from "react";

export default function Contactlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <p>This is contact</p>
      {children}
    </div>
  );
}
