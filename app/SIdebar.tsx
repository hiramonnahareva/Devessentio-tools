"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Image,
  Sparkles,
  Shapes,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-gray-900 text-white h-screen p-5 pt-8 relative duration-300`}
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

      <h1 className="text-2xl font-bold mb-10">
        {open ? "DevEssentio" : "DE"}
      </h1>

      <ul className="space-y-6">
        <li>
          <Link
            href="/image-compress"
            className="flex items-center gap-x-4 hover:text-indigo-400"
          >
            <Image size={22} />
            {open && <span>Image Compress</span>}
          </Link>
        </li>

        <li>
          <Link
            href="/glassmorphism"
            className="flex items-center gap-x-4 hover:text-indigo-400"
          >
            <Sparkles size={22} />
            {open && <span>Glassmorphism</span>}
          </Link>
        </li>

        <li>
          <Link
            href="/shape-generator"
            className="flex items-center gap-x-4 hover:text-indigo-400"
          >
            <Shapes size={22} />
            {open && <span>Shape Generator</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}