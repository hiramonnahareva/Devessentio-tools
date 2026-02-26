"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ColorPalette() {
  const [color, setColor] = useState("#ff0000");

  const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex: string): string => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h: number = 0, s: number = 0, l: number = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h = Math.round(h * 60);
    }

    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied: ${text}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 p-4 text-white">
      <h1 className="text-4xl font-bold mb-8">🎨 Color Palette</h1>

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-32 h-16 rounded-lg border border-gray-700 cursor-pointer shadow-lg"
        />

        <div
          className="w-64 h-64 rounded-xl shadow-xl border-2 border-gray-700"
          style={{ backgroundColor: color }}
        ></div>

        <div className="w-full flex flex-col gap-4">
          {/* HEX */}
          <div className="flex justify-between items-center bg-gray-800 p-3 rounded shadow hover:shadow-lg transition">
            <span className="font-medium">{color}</span>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => handleCopy(color)}
            >
              Copy
            </button>
          </div>

          {/* RGB */}
          <div className="flex justify-between items-center bg-gray-800 p-3 rounded shadow hover:shadow-lg transition">
            <span className="font-medium">{hexToRgb(color)}</span>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => handleCopy(hexToRgb(color))}
            >
              Copy
            </button>
          </div>

          {/* HSL */}
          <div className="flex justify-between items-center bg-gray-800 p-3 rounded shadow hover:shadow-lg transition">
            <span className="font-medium">{hexToHsl(color)}</span>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => handleCopy(hexToHsl(color))}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}