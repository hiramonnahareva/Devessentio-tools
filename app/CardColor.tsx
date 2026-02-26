// app/components/ColorCard.tsx
"use client";

import { useState } from "react";

interface ColorCardProps {
  name: string;
  hex: string;
  onDelete: () => void;
}

export default function ColorCard({ name, hex, onDelete }: ColorCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition relative w-28">
      <div
        className="w-20 h-20 rounded-lg mb-3 border border-gray-200 cursor-pointer"
        style={{ backgroundColor: hex }}
        onClick={handleCopy}
        title="Click to copy hex"
      />
      {copied && (
        <span className="absolute top-1 right-1 text-xs bg-gray-800 text-white px-2 py-1 rounded">
          Copied!
        </span>
      )}
      <span className="text-sm font-medium text-gray-800">{name}</span>
      <span className="text-xs text-gray-500 mb-2">{hex}</span>
      <button
        onClick={onDelete}
        className="text-xs text-red-500 hover:text-red-700 transition"
      >
        Delete
      </button>
    </div>
  );
}