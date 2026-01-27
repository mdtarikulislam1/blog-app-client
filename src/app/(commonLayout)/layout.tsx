import Navbar from "@/routes/dynamicroute/NavbarWrapper";
import React from "react";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Commonlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
