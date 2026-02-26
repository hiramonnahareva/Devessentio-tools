"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Image,
  Sparkles,
  Shapes,
  Menu,
  X,
  Cpu,
  Scissors,
  Palette,
  FileText,
  Camera,
  Zap,
  Copy,
  Cloud,
  Star,
  RefreshCcw,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const links = [
    { href: "/image-compress", label: "Image Compress", icon: <Image size={20} /> },
    { href: "/glassmorphism", label: "Glassmorphism", icon: <Sparkles size={20} /> },
    { href: "/shape-generator", label: "Shape Generator", icon: <Shapes size={20} /> },
    { href: "/logo-generator", label: "Logo Generator", icon: <Cpu size={20} /> },
    { href: "/bg-remove", label: "BG Remove", icon: <Scissors size={20} /> },
    { href: "/color-palette", label: "Color Palette", icon: <Palette size={20} /> },
    { href: "/text-extractor", label: "Text Extractor", icon: <FileText size={20} /> },
    { href: "/photo-editor", label: "Photo Editor", icon: <Camera size={20} /> },
    { href: "/ai-tools", label: "AI Tools", icon: <Zap size={20} /> },
    { href: "/copy-tool", label: "Copy Tool", icon: <Copy size={20} /> },
    { href: "/cloud-storage", label: "Cloud Storage", icon: <Cloud size={20} /> },
    { href: "/favorites", label: "Favorites", icon: <Star size={20} /> },
    { href: "/refresh-tool", label: "Refresh Tool", icon: <RefreshCcw size={20} /> },
  ];

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-gray-900 text-white min-h-screen p-5 pt-8 relative duration-300 flex flex-col`}
    >
      {/* Toggle Button */}
      <div
        className="absolute -right-3 top-9 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X size={18} className="text-black" />
        ) : (
          <Menu size={18} className="text-black" />
        )}
      </div>

      {/* Logo / Title */}
      <Link href="/" >
      <h1 className="text-2xl font-bold mb-10">
        {open ? "DevEssentio" : "DE"}
      </h1>
      </Link>

      {/* Links */}
      <ul className="flex-1 space-y-4 overflow-y-auto pr-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="flex items-center gap-x-4 hover:text-indigo-400 mr-8"
            >
              {/* Icon always visible */}
              <div className="flex-shrink-0">{link.icon}</div>

              {/* Text only visible when sidebar is open */}
              {open && <span>{link.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}