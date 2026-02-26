"use client";

import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import * as htmlToImage from "html-to-image";

type Item = {
  id: string;
  type: "text" | "image";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  letterSpacing?: number;
  underline?: boolean;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  curve?: number;
  color?: string;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
};

export default function UltimateProLogoBuilder() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const measureSvgRef = useRef<SVGSVGElement>(null);

  const MIN_TEXT_WIDTH = 50;
  const MIN_TEXT_HEIGHT = 30;
  const PADDING_X = 20;
  const PADDING_Y = 40;

  // Canvas size & shape
  const [canvasWidth, setCanvasWidth] = useState(900);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [isCircle, setIsCircle] = useState(false);

  // Canvas background
  const [bgType, setBgType] = useState<"solid" | "gradient" | "transparent">(
    "solid",
  );
  const [bgColor, setBgColor] = useState("#1e1e2f");
  const [bgGradient, setBgGradient] = useState({
    from: "#1e1e2f",
    to: "#3b82f6",
    type: "linear" as "linear" | "radial",
  });

  const addText = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      type: "text",
      content: "Curved 3D Text",
      x: 50,
      y: 50,
      width: 200,
      height: 60,
      rotation: 0,
      fontSize: 30,
      fontFamily: "Arial",
      fontWeight: "normal",
      fontStyle: "normal",
      letterSpacing: 0,
      underline: false,
      textTransform: "none",
      curve: 30,
      color: "#FFD700",
      shadowColor: "rgba(0,0,0,0.6)",
      shadowBlur: 4,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
    };
    setItems((i) => [...i, newItem]);
    setSelectedId(newItem.id);
  };

  const uploadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imgUrl = reader.result as string;
      const newItem: Item = {
        id: Date.now().toString(),
        type: "image",
        content: imgUrl,
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        rotation: 0,
      };
      setItems((i) => [...i, newItem]);
      setSelectedId(newItem.id);
    };
    reader.readAsDataURL(file);
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setItems((items) => items.filter((i) => i.id !== selectedId));
    setSelectedId(null);
  };

  const downloadLogo = async () => {
    if (!canvasRef.current) return;
    const dataUrl = await htmlToImage.toPng(canvasRef.current);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "ultimate-logo.png";
    link.click();
  };

  const getTextShadowCSS = (item: Item) =>
    item.shadowColor
      ? `${item.shadowOffsetX || 0}px ${item.shadowOffsetY || 0}px ${item.shadowBlur || 0}px ${item.shadowColor}`
      : "none";

  const buildCurvePath = (width: number, height: number, curve: number) =>
    `M0 ${height / 2} Q ${width / 2} ${height / 2 - curve} ${width} ${height / 2}`;

  // Auto resize text container to fit content
  useEffect(() => {
    if (!selectedId) return;
    const selected = items.find((i) => i.id === selectedId);
    if (!selected || selected.type !== "text") return;
    if (!measureSvgRef.current) return;

    const textElem = measureSvgRef.current.querySelector("text");
    if (!textElem) return;

    const bbox = textElem.getBBox();
    const newWidth = Math.max(bbox.width + PADDING_X * 2, MIN_TEXT_WIDTH);
    const newHeight = Math.max(
      bbox.height + PADDING_Y * 2 + Math.abs(selected.curve || 0),
      MIN_TEXT_HEIGHT,
    );

    if (
      Math.abs(newWidth - selected.width) > 1 ||
      Math.abs(newHeight - selected.height) > 1
    ) {
      updateItem(selectedId, { width: newWidth, height: newHeight });
    }
  }, [
    selectedId,
    items.find((i) => i.id === selectedId)?.content,
    items.find((i) => i.id === selectedId)?.fontSize,
    items.find((i) => i.id === selectedId)?.fontFamily,
    items.find((i) => i.id === selectedId)?.fontWeight,
    items.find((i) => i.id === selectedId)?.fontStyle,
    items.find((i) => i.id === selectedId)?.letterSpacing,
    items.find((i) => i.id === selectedId)?.curve,
    items.find((i) => i.id === selectedId)?.underline,
    items.find((i) => i.id === selectedId)?.textTransform,
  ]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white p-6 gap-6 select-none">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 rounded-xl p-6 flex flex-col gap-4 shrink-0">
        <h2 className="text-2xl font-bold mb-4">Ultimate Logo Builder</h2>

        <button
          onClick={addText}
          className="bg-green-600 rounded p-2 font-semibold hover:bg-green-700 transition"
        >
          Add Curved Text
        </button>

        <label className="bg-blue-600 rounded p-2 text-center cursor-pointer hover:bg-blue-700 transition">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
            className="hidden"
          />
        </label>

        {/* Selected item controls */}
        {selectedId &&
          (() => {
            const sel = items.find((i) => i.id === selectedId);
            if (!sel) return null;

            if (sel.type === "text") {
              return (
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[60vh] pt-4 border-t border-gray-700">
                  <label className="flex flex-col">
                    Text Content
                    <textarea
                      value={sel.content}
                      onChange={(e) =>
                        updateItem(sel.id, { content: e.target.value })
                      }
                      rows={3}
                      className="p-2 rounded bg-gray-700 text-white resize-none"
                    />
                  </label>

                  {/* Text Styles */}
                  <label className="flex items-center gap-2">
                    Bold
                    <input
                      type="checkbox"
                      checked={sel.fontWeight === "bold"}
                      onChange={(e) =>
                        updateItem(sel.id, {
                          fontWeight: e.target.checked ? "bold" : "normal",
                        })
                      }
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    Italic
                    <input
                      type="checkbox"
                      checked={sel.fontStyle === "italic"}
                      onChange={(e) =>
                        updateItem(sel.id, {
                          fontStyle: e.target.checked ? "italic" : "normal",
                        })
                      }
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    Underline
                    <input
                      type="checkbox"
                      checked={sel.underline || false}
                      onChange={(e) =>
                        updateItem(sel.id, { underline: e.target.checked })
                      }
                    />
                  </label>

                  <label>
                    Text Transform
                    <select
                      value={sel.textTransform || "none"}
                      onChange={(e) =>
                        updateItem(sel.id, {
                          textTransform: e.target.value as any,
                        })
                      }
                      className="w-full p-1 rounded bg-gray-700 text-white"
                    >
                      <option value="none">None</option>
                      <option value="uppercase">Uppercase</option>
                      <option value="lowercase">Lowercase</option>
                      <option value="capitalize">Capitalize</option>
                    </select>
                  </label>

                  <label>
                    Font Size: {sel.fontSize}px
                    <input
                      type="range"
                      min={10}
                      max={150}
                      value={sel.fontSize}
                      onChange={(e) =>
                        updateItem(sel.id, { fontSize: Number(e.target.value) })
                      }
                      className="w-full"
                    />
                  </label>

                  <label>
                    Font Family
                    <select
                      value={sel.fontFamily}
                      onChange={(e) =>
                        updateItem(sel.id, { fontFamily: e.target.value })
                      }
                      className="w-full p-1 rounded bg-gray-700 text-white"
                    >
                      <option>Arial</option>
                      <option>Georgia</option>
                      <option>Times New Roman</option>
                      <option>Courier New</option>
                      <option>Verdana</option>
                      <option>Impact</option>
                      <option>Comic Sans MS</option>
                    </select>
                  </label>

                  <label>
                    Letter Spacing: {sel.letterSpacing || 0}px
                    <input
                      type="range"
                      min={-5}
                      max={20}
                      value={sel.letterSpacing || 0}
                      onChange={(e) =>
                        updateItem(sel.id, {
                          letterSpacing: Number(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </label>

                  <label>
                    Curve: {sel.curve || 0}
                    <input
                      type="range"
                      min={-100}
                      max={100}
                      value={sel.curve || 0}
                      onChange={(e) =>
                        updateItem(sel.id, { curve: Number(e.target.value) })
                      }
                      className="w-full"
                    />
                  </label>

                  <label>
                    Text Color
                    <input
                      type="color"
                      value={sel.color || "#ffffff"}
                      onChange={(e) =>
                        updateItem(sel.id, { color: e.target.value })
                      }
                      className="w-full h-8 rounded"
                    />
                  </label>

                  {/* 3D Shadow */}
                  <fieldset className="border border-gray-600 rounded p-2 space-y-1">
                    <legend className="text-sm font-semibold">3D Shadow</legend>
                    <label>
                      Shadow Color
                      <input
                        type="color"
                        value={sel.shadowColor || "rgba(0,0,0,0.5)"}
                        onChange={(e) =>
                          updateItem(sel.id, { shadowColor: e.target.value })
                        }
                        className="w-full h-8 rounded"
                      />
                    </label>
                    <label>
                      Blur: {sel.shadowBlur || 0}px
                      <input
                        type="range"
                        min={0}
                        max={20}
                        value={sel.shadowBlur || 0}
                        onChange={(e) =>
                          updateItem(sel.id, {
                            shadowBlur: Number(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </label>
                    <label>
                      Offset X: {sel.shadowOffsetX || 0}px
                      <input
                        type="range"
                        min={-20}
                        max={20}
                        value={sel.shadowOffsetX || 0}
                        onChange={(e) =>
                          updateItem(sel.id, {
                            shadowOffsetX: Number(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </label>
                    <label>
                      Offset Y: {sel.shadowOffsetY || 0}px
                      <input
                        type="range"
                        min={-20}
                        max={20}
                        value={sel.shadowOffsetY || 0}
                        onChange={(e) =>
                          updateItem(sel.id, {
                            shadowOffsetY: Number(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </label>
                  </fieldset>

                  <label>
                    Rotation: {sel.rotation}°
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={sel.rotation}
                      onChange={(e) =>
                        updateItem(sel.id, { rotation: Number(e.target.value) })
                      }
                      className="w-full"
                    />
                  </label>
                </div>
              );
            }

            if (sel.type === "image") {
              return (
                <div className="pt-4 border-t border-gray-700">
                  <p>Image selected. Use drag handles to resize and move.</p>
                </div>
              );
            }

            return null;
          })()}
        {/* </div> */}

        {/* Canvas size & shape */}
        <div className="pt-4 border-t border-gray-700 flex flex-col gap-2">
          <label>
            Width: {canvasWidth}px
            <input
              type="range"
              min={300}
              max={800}
              value={canvasWidth}
              onChange={(e) => setCanvasWidth(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label>
            Height: {canvasHeight}px
            <input
              type="range"
              min={300}
              max={800}
              value={canvasHeight}
              onChange={(e) => setCanvasHeight(Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2">
            Circular Canvas
            <input
              type="checkbox"
              checked={isCircle}
              onChange={(e) => setIsCircle(e.target.checked)}
            />
          </label>
        </div>

        <button
          onClick={deleteSelected}
          className="bg-red-600 rounded p-2 font-semibold hover:bg-red-700 transition mt-4"
        >
          Delete Selected
        </button>
        <button
          onClick={downloadLogo}
          className="bg-black rounded p-2 font-semibold hover:bg-gray-800 transition mt-2"
        >
          Download PNG
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative border border-gray-700 overflow-visible"
        style={{
          width: canvasWidth,
          height: canvasHeight,
          borderRadius: isCircle ? "50%" : "1rem",
          background:
            bgType === "transparent"
              ? "transparent"
              : bgType === "solid"
                ? bgColor
                : bgGradient.type === "linear"
                  ? `linear-gradient(135deg, ${bgGradient.from}, ${bgGradient.to})`
                  : `radial-gradient(circle, ${bgGradient.from}, ${bgGradient.to})`,
        }}
        onClick={(e) => {
          if (e.target === canvasRef.current) setSelectedId(null);
        }}
      >
        {/* Hidden SVG for measurement */}
        {selectedId &&
          (() => {
            const sel = items.find((i) => i.id === selectedId);
            if (!sel || sel.type !== "text") return null;
            const W = 1000;
            const H = 200;
            const path = buildCurvePath(W, H, sel.curve || 0);
            return (
              <svg
                ref={measureSvgRef}
                width={W}
                height={H}
                style={{
                  position: "absolute",
                  top: -9999,
                  left: -9999,
                  visibility: "hidden",
                }}
              >
                <defs>
                  <path id="measurePath" d={path} />
                </defs>
                <text
                  fontSize={sel.fontSize}
                  fontFamily={sel.fontFamily}
                  fontWeight={sel.fontWeight}
                  fontStyle={sel.fontStyle}
                  letterSpacing={sel.letterSpacing}
                  fill={sel.color}
                  textDecoration={sel.underline ? "underline" : "none"}
                  style={{ textTransform: sel.textTransform || "none" }}
                >
                  <textPath
                    href="#measurePath"
                    startOffset="0%"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {sel.content}
                  </textPath>
                </text>
              </svg>
            );
          })()}

        {/* Render items */}
        {items.map((item) => {
          if (item.type === "text") {
            const path = buildCurvePath(
              item.width,
              item.height,
              item.curve || 0,
            );
            return (
              <Rnd
                key={item.id}
                size={{ width: item.width, height: item.height }}
                position={{ x: item.x, y: item.y }}
                bounds="parent"
                minWidth={MIN_TEXT_WIDTH}
                minHeight={MIN_TEXT_HEIGHT}
                onDragStop={(e, d) => updateItem(item.id, { x: d.x, y: d.y })}
                onResizeStop={(e, dir, ref) =>
                  updateItem(item.id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                  })
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(item.id);
                }}
                style={{
                  border: selectedId === item.id ? "2px solid #60a5fa" : "none", 
                  userSelect: "none",
                  cursor: "grab",
                  zIndex: selectedId === item.id ? 10 : 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: `rotate(${item.rotation}deg)`,
                  
                }}
              >
                <svg width={item.width} height={item.height}>
                  <defs>
                    <path id={`curvePath-${item.id}`} d={path} />
                  </defs>
                  <text
                    fontSize={item.fontSize}
                    fontFamily={item.fontFamily}
                    fontWeight={item.fontWeight}
                    fontStyle={item.fontStyle}
                    letterSpacing={item.letterSpacing}
                    fill={item.color}
                    textDecoration={item.underline ? "underline" : "none"}
                    style={{
                      filter: `drop-shadow(${getTextShadowCSS(item)})`,
                      textTransform: item.textTransform || "none",
                      transform: `rotate(${item.rotation}deg)`,
                    }}
                  >
                    <textPath
                      href={`#curvePath-${item.id}`} 
                      startOffset="10%"
                      textAnchor="start"
                      dominantBaseline="middle"
                    >
                      {item.content}
                    </textPath>
                  </text>
                </svg>
              </Rnd>
            );
          }
          if (item.type === "image") {
            return (
              <Rnd
                key={item.id}
                size={{ width: item.width, height: item.height }}
                position={{ x: item.x, y: item.y }}
                bounds="parent"
                minWidth={MIN_TEXT_WIDTH}
                minHeight={MIN_TEXT_HEIGHT}
                lockAspectRatio={false}
                onDragStop={(e, d) => updateItem(item.id, { x: d.x, y: d.y })}
                onResizeStop={(e, dir, ref, delta, position) => {
                  updateItem(item.id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    x: position.x,
                    y: position.y,
                  });
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(item.id);
                }}
                style={{
                  border: selectedId === item.id ? "2px solid #60a5fa" : "none",
                  userSelect: "none",
                  cursor: "grab",
                  zIndex: selectedId === item.id ? 10 : 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: `rotate(${item.rotation}deg)`, // 🔹 Apply rotation
                }}
              >
                <img
                  src={item.content}
                  alt="uploaded"
                  draggable={false}
                  className="w-full h-full object-contain rounded"
                />
              </Rnd>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}





