"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./component/sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <Sidebar />;
} 