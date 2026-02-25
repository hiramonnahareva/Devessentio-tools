// "use client";

// import { useState, useRef } from "react";

// type ShapeType = "circle" | "rounded" | "triangle" | "hexagon" | "star";
// type GradientType = "solid" | "linear" | "radial";

// export default function ShapeStudio() {
//   const [shape, setShape] = useState<ShapeType>("circle");
//   const [size, setSize] = useState(150);
//   const [radius, setRadius] = useState(30);
//   const [gradientType, setGradientType] = useState<GradientType>("solid");
//   const [color1, setColor1] = useState("#6366f1");
//   const [color2, setColor2] = useState("#ec4899");

//   const svgRef = useRef<SVGSVGElement | null>(null);

//   // Preset templates
//   const templates = [
//     { type: "circle", size: 150, gradientType: "linear", color1: "#6366f1", color2: "#ec4899" },
//     { type: "triangle", size: 180, gradientType: "radial", color1: "#facc15", color2: "#f43f5e" },
//     { type: "star", size: 120, gradientType: "linear", color1: "#10b981", color2: "#14b8a6" },
//     { type: "hexagon", size: 160, gradientType: "solid", color1: "#f97316", color2: "#f97316" },
//     { type: "rounded", size: 140, radius: 40, gradientType: "linear", color1: "#3b82f6", color2: "#9333ea" },
//   ];

//   // Polygon points for hexagon/star
//   const getPolygonPoints = (type: ShapeType, s: number) => {
//     const points: string[] = [];
//     const center = s / 2;
//     const r = s / 2;
//     if (type === "hexagon") {
//       for (let i = 0; i < 6; i++) {
//         const angle = (Math.PI / 3) * i - Math.PI / 2;
//         const x = center + r * Math.cos(angle);
//         const y = center + r * Math.sin(angle);
//         points.push(`${x},${y}`);
//       }
//     } else if (type === "star") {
//       const outer = r;
//       const inner = r / 2.5;
//       for (let i = 0; i < 10; i++) {
//         const rad = (Math.PI / 5) * i - Math.PI / 2;
//         const radiusPoint = i % 2 === 0 ? outer : inner;
//         const x = center + radiusPoint * Math.cos(rad);
//         const y = center + radiusPoint * Math.sin(rad);
//         points.push(`${x},${y}`);
//       }
//     }
//     return points.join(" ");
//   };

//   // Fill based on gradient type
//   const getFill = () => {
//     if (gradientType === "solid") return color1;
//     if (gradientType === "linear") return "url(#gradLinear)";
//     if (gradientType === "radial") return "url(#gradRadial)";
//     return color1;
//   };

//   // Download SVG
//   const downloadSVG = () => {
//     if (!svgRef.current) return;
//     const serializer = new XMLSerializer();
//     const source = serializer.serializeToString(svgRef.current);
//     const blob = new Blob([source], { type: "image/svg+xml" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "devessentio-shape.svg";
//     link.click();
//   };

//   // Download PNG
//   const downloadPNG = () => {
//     if (!svgRef.current) return;
//     const serializer = new XMLSerializer();
//     const source = serializer.serializeToString(svgRef.current);
//     const img = new Image();
//     const svgBlob = new Blob([source], { type: "image/svg+xml" });
//     const url = URL.createObjectURL(svgBlob);
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = size;
//       canvas.height = size;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;
//       ctx.drawImage(img, 0, 0);
//       const pngUrl = canvas.toDataURL("image/png");
//       const link = document.createElement("a");
//       link.href = pngUrl;
//       link.download = "devessentio-shape.png";
//       link.click();
//     };
//     img.src = url;
//   };

//   return (
//     <div className="min-h-screen  bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 p-6 flex flex-col items-center space-y-8">
//       <h1 className="text-4xl font-bold text-center">DevEssentio Shape Studio</h1>

//       {/* Controls Panel */}
//       <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
//         <div>
//           <label className="block mb-2 font-medium">Shape</label>
//           <select
//             value={shape}
//             onChange={(e) => setShape(e.target.value as ShapeType)}
//             className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="circle">Circle</option>
//             <option value="rounded">Rounded Square</option>
//             <option value="triangle">Triangle</option>
//             <option value="hexagon">Hexagon</option>
//             <option value="star">Star</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">Size: {size}px</label>
//           <input
//             type="range"
//             min="50"
//             max="400"
//             value={size}
//             onChange={(e) => setSize(Number(e.target.value))}
//             className="w-full"
//           />
//         </div>

//         {shape === "rounded" && (
//           <div>
//             <label className="block mb-2 font-medium">Border Radius: {radius}px</label>
//             <input
//               type="range"
//               min="0"
//               max="200"
//               value={radius}
//               onChange={(e) => setRadius(Number(e.target.value))}
//               className="w-full"
//             />
//           </div>
//         )}

//         <div>
//           <label className="block mb-2 font-medium">Gradient Type</label>
//           <select
//             value={gradientType}
//             onChange={(e) => setGradientType(e.target.value as GradientType)}
//             className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="solid">Solid</option>
//             <option value="linear">Linear</option>
//             <option value="radial">Radial</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">Color 1</label>
//           <input
//             type="color"
//             value={color1}
//             onChange={(e) => setColor1(e.target.value)}
//             className="w-full h-10 border border-gray-600 rounded-md cursor-pointer"
//           />
//         </div>

//         {gradientType !== "solid" && (
//           <div>
//             <label className="block mb-2 font-medium">Color 2</label>
//             <input
//               type="color"
//               value={color2}
//               onChange={(e) => setColor2(e.target.value)}
//               className="w-full h-10 border border-gray-600 rounded-md cursor-pointer"
//             />
//           </div>
//         )}
//       </div>

//       {/* Preview */}
//       <div className="flex justify-center w-full mt-4">
//         <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-gray-700">
//           <svg
//             ref={svgRef}
//             width={size}
//             height={size}
//             viewBox={`0 0 ${size} ${size}`}
//             className="transition-all duration-300"
//           >
//             <defs>
//               <linearGradient id="gradLinear" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor={color1} />
//                 <stop offset="100%" stopColor={color2} />
//               </linearGradient>
//               <radialGradient id="gradRadial">
//                 <stop offset="0%" stopColor={color1} />
//                 <stop offset="100%" stopColor={color2} />
//               </radialGradient>
//             </defs>

//             {shape === "circle" && <circle cx={size/2} cy={size/2} r={size/2} fill={getFill()} />}
//             {shape === "rounded" && <rect width={size} height={size} rx={radius} ry={radius} fill={getFill()} />}
//             {shape === "triangle" && <polygon points={`${size/2},0 ${size},${size} 0,${size}`} fill={getFill()} />}
//             {(shape === "hexagon" || shape === "star") && <polygon points={getPolygonPoints(shape, size)} fill={getFill()} />}
//           </svg>
//         </div>
//       </div>

//       {/* Download Buttons */}
//       <div className="flex flex-wrap justify-center gap-4 mt-4">
//         <button
//           onClick={downloadSVG}
//           className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-indigo-700 transition"
//         >
//           Download SVG
//         </button>
//         <button
//           onClick={downloadPNG}
//           className="bg-green-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-green-700 transition"
//         >
//           Download PNG
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";

type ShapeType =
  | "circle"
  | "rounded"
  | "triangle"
  | "hexagon"
  | "star"
  | "pentagon"
  | "ellipse"
  | "roundedTriangle";
type GradientType = "solid" | "linear" | "radial";

export default function ShapeStudio() {
  const [shape, setShape] = useState<ShapeType>("circle");
  const [size, setSize] = useState(150);
  const [radius, setRadius] = useState(30);
  const [gradientType, setGradientType] = useState<GradientType>("solid");
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Templates for quick shapes
  const templates = [
    { type: "circle", size: 150, gradientType: "linear", color1: "#6366f1", color2: "#ec4899" },
    { type: "triangle", size: 180, gradientType: "radial", color1: "#facc15", color2: "#f43f5e" },
    { type: "star", size: 120, gradientType: "linear", color1: "#10b981", color2: "#14b8a6" },
    { type: "hexagon", size: 160, gradientType: "solid", color1: "#f97316", color2: "#f97316" },
    { type: "pentagon", size: 140, gradientType: "linear", color1: "#3b82f6", color2: "#9333ea" },
    { type: "ellipse", size: 160, gradientType: "radial", color1: "#f43f5e", color2: "#f59e0b" },
    { type: "roundedTriangle", size: 160, gradientType: "linear", color1: "#14b8a6", color2: "#0ea5e9" },
  ];

  const getPolygonPoints = (type: ShapeType, s: number) => {
    const points: string[] = [];
    const center = s / 2;
    const r = s / 2;

    if (type === "hexagon") {
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        points.push(`${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`);
      }
    } else if (type === "star") {
      const outer = r;
      const inner = r / 2.5;
      for (let i = 0; i < 10; i++) {
        const rad = (Math.PI / 5) * i - Math.PI / 2;
        const radiusPoint = i % 2 === 0 ? outer : inner;
        points.push(`${center + radiusPoint * Math.cos(rad)},${center + radiusPoint * Math.sin(rad)}`);
      }
    } else if (type === "pentagon") {
      for (let i = 0; i < 5; i++) {
        const angle = (2 * Math.PI * i) / 5 - Math.PI / 2;
        points.push(`${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`);
      }
    } else if (type === "roundedTriangle") {
      points.push(`${s / 2},0`);
      points.push(`${s},${s}`);
      points.push(`${s * 0.75},${s}`);
      points.push(`${s / 2},${s * 0.5}`);
      points.push(`${s * 0.25},${s}`);
      points.push(`0,${s}`);
    }
    return points.join(" ");
  };

  const getFill = () => {
    if (gradientType === "solid") return color1;
    if (gradientType === "linear") return "url(#gradLinear)";
    if (gradientType === "radial") return "url(#gradRadial)";
    return color1;
  };

  const downloadSVG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "devessentio-shape.svg";
    link.click();
  };

  const downloadPNG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "devessentio-shape.png";
      link.click();
    };
    img.src = URL.createObjectURL(new Blob([source], { type: "image/svg+xml" }));
  };

  const copyTailwind = () => {
  let classes = `w-[${size}px] h-[${size}px] `;
  
  // Rounded for circle/rounded square
  if (shape === "circle") classes += "rounded-full ";
  else if (shape === "rounded") classes += `rounded-[${radius}px] `;

  // Gradient background
  let style = "";
  if (gradientType === "solid") style += `background-color: ${color1};`;
  else if (gradientType === "linear") style += `background-image: linear-gradient(to bottom right, ${color1}, ${color2});`;
  else if (gradientType === "radial") style += `background-image: radial-gradient(circle, ${color1}, ${color2});`;

  // Clip-path for polygons
  if (["triangle","hexagon","star","pentagon","roundedTriangle"].includes(shape)) {
    const clip = shape === "triangle"
      ? "polygon(50% 0%, 100% 100%, 0% 100%)"
      : shape === "hexagon"
      ? "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
      : shape === "star"
      ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
      : shape === "pentagon"
      ? "polygon(50% 0%, 95% 38%, 78% 100%, 22% 100%, 5% 38%)"
      : "polygon(50% 0%, 100% 100%, 75% 100%, 50% 50%, 25% 100%, 0% 100%)";
    style += `clip-path: ${clip};`;
  }

  const code = `<div class="${classes}" style="${style}"></div>`;
  navigator.clipboard.writeText(code);
  toast.success("Tailwind CSS + CSS copied! Works with radius, colors, gradients, and shapes.");
};

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-center">DevEssentio Shape Studio</h1>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
        <div>
          <label className="block mb-2 font-medium">Shape</label>
          <select value={shape} onChange={(e) => setShape(e.target.value as ShapeType)} className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600">
            {["circle","rounded","triangle","hexagon","star","pentagon","ellipse","roundedTriangle"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Size: {size}px</label>
          <input type="range" min="50" max="400" value={size} onChange={e => setSize(Number(e.target.value))} className="w-full" />
        </div>

        {shape === "rounded" && (
          <div>
            <label className="block mb-2 font-medium">Radius: {radius}px</label>
            <input type="range" min="0" max="200" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full" />
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium">Gradient</label>
          <select value={gradientType} onChange={e => setGradientType(e.target.value as GradientType)} className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600">
            {["solid","linear","radial"].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Color 1</label>
          <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-full h-10 rounded-md" />
        </div>

        {gradientType !== "solid" && (
          <div>
            <label className="block mb-2 font-medium">Color 2</label>
            <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-full h-10 rounded-md" />
          </div>
        )}
      </div>

      {/* Templates */}
      {/* <div className="flex flex-wrap gap-4 mt-2 max-w-5xl">
        {templates.map((t, idx) => (
          <button key={idx} onClick={() => {
            setShape(t.type as ShapeType);
            setSize(t.size);
            setRadius(t.radius || 30);
            setGradientType(t.gradientType as GradientType);
            setColor1(t.color1);
            setColor2(t.color2 || "#000000");
          }} className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition">Template {idx+1}</button>
        ))}
      </div> */}

      {/* Preview */}
      <div className="flex justify-center w-full mt-4">
        <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-gray-700">
          <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient id="gradLinear" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color1} />
                <stop offset="100%" stopColor={color2} />
              </linearGradient>
              <radialGradient id="gradRadial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={color1} />
                <stop offset="100%" stopColor={color2} />
              </radialGradient>
            </defs>

            {shape === "circle" && <circle cx={size/2} cy={size/2} r={size/2} fill={getFill()} />}
            {shape === "rounded" && <rect width={size} height={size} rx={radius} ry={radius} fill={getFill()} />}
            {shape === "triangle" && <polygon points={`${size/2},0 ${size},${size} 0,${size}`} fill={getFill()} />}
            {["hexagon","star","pentagon","roundedTriangle"].includes(shape) && <polygon points={getPolygonPoints(shape, size)} fill={getFill()} />}
            {shape === "ellipse" && <ellipse cx={size/2} cy={size/2} rx={size/2} ry={size/3} fill={getFill()} />}
          </svg>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button onClick={downloadSVG} className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700">Download SVG</button>
        <button onClick={downloadPNG} className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700">Download PNG</button>
        <button onClick={copyTailwind} className="bg-yellow-500 text-black px-6 py-2 rounded-xl shadow hover:bg-yellow-400">Copy Tailwind CSS</button>
      </div>
    </div>
  );
}