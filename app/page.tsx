// // // "use client";

// // // import { useState, useRef, useEffect } from "react";

// // // type ShapeType = "circle" | "rounded" | "triangle";

// // // export default function ShapeGenerator() {
// // //   const [shape, setShape] = useState<ShapeType>("circle");
// // //   const [size, setSize] = useState(200);
// // //   const [radius, setRadius] = useState(30);
// // //   const [color, setColor] = useState("#6366f1");

// // //   const svgRef = useRef<SVGSVGElement | null>(null);

// // //   // Smooth animation for preview
// // //   const [animatedSize, setAnimatedSize] = useState(size);
// // //   useEffect(() => {
// // //     const timeout = setTimeout(() => setAnimatedSize(size), 100);
// // //     return () => clearTimeout(timeout);
// // //   }, [size]);

// // //   const downloadSVG = () => {
// // //     if (!svgRef.current) return;
// // //     const serializer = new XMLSerializer();
// // //     const source = serializer.serializeToString(svgRef.current);
// // //     const blob = new Blob([source], { type: "image/svg+xml" });
// // //     const url = URL.createObjectURL(blob);
// // //     const link = document.createElement("a");
// // //     link.href = url;
// // //     link.download = "devessentio-shape.svg";
// // //     link.click();
// // //   };

// // //   const downloadPNG = () => {
// // //     if (!svgRef.current) return;
// // //     const serializer = new XMLSerializer();
// // //     const source = serializer.serializeToString(svgRef.current);
// // //     const img = new Image();
// // //     const svgBlob = new Blob([source], { type: "image/svg+xml" });
// // //     const url = URL.createObjectURL(svgBlob);
// // //     img.onload = () => {
// // //       const canvas = document.createElement("canvas");
// // //       canvas.width = size;
// // //       canvas.height = size;
// // //       const ctx = canvas.getContext("2d");
// // //       if (!ctx) return;
// // //       ctx.drawImage(img, 0, 0);
// // //       const pngUrl = canvas.toDataURL("image/png");
// // //       const link = document.createElement("a");
// // //       link.href = pngUrl;
// // //       link.download = "devessentio-shape.png";
// // //       link.click();
// // //     };
// // //     img.src = url;
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center space-y-8">
// // //       <h1 className="text-4xl font-bold text-center text-white">
// // //         Advanced Shape Generator
// // //       </h1>

// // //       {/* Controls Panel */}
// // //       <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
// // //         {/* Shape Select */}
// // //         <div>
// // //           <label className="block mb-2 font-medium">Shape</label>
// // //           <select
// // //             value={shape}
// // //             onChange={(e) => setShape(e.target.value as ShapeType)}
// // //             className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //           >
// // //             <option value="circle">Circle</option>
// // //             <option value="rounded">Rounded Square</option>
// // //             <option value="triangle">Triangle</option>
// // //           </select>
// // //         </div>

// // //         {/* Size */}
// // //         <div>
// // //           <label className="block mb-2 font-medium">
// // //             Size: {size}px
// // //           </label>
// // //           <input
// // //             type="range"
// // //             min="100"
// // //             max="400"
// // //             value={size}
// // //             onChange={(e) => setSize(Number(e.target.value))}
// // //             className="w-full"
// // //           />
// // //         </div>

// // //         {/* Radius (only for rounded) */}
// // //         {shape === "rounded" && (
// // //           <div>
// // //             <label className="block mb-2 font-medium">
// // //               Border Radius: {radius}px
// // //             </label>
// // //             <input
// // //               type="range"
// // //               min="0"
// // //               max="200"
// // //               value={radius}
// // //               onChange={(e) => setRadius(Number(e.target.value))}
// // //               className="w-full"
// // //             />
// // //           </div>
// // //         )}

// // //         {/* Color Picker */}
// // //         <div className="md:col-span-3">
// // //           <label className="block mb-2 font-medium">Color</label>
// // //           <input
// // //             type="color"
// // //             value={color}
// // //             onChange={(e) => setColor(e.target.value)}
// // //             className="w-full h-10 border border-gray-600 rounded-md cursor-pointer"
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Preview Panel */}
// // //       <div className="flex justify-center w-full">
// // //         <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-gray-700">
// // //           <svg
// // //             ref={svgRef}
// // //             width={animatedSize}
// // //             height={animatedSize}
// // //             viewBox={`0 0 ${animatedSize} ${animatedSize}`}
// // //             className="transition-all duration-300"
// // //           >
// // //             {shape === "circle" && (
// // //               <circle
// // //                 cx={animatedSize / 2}
// // //                 cy={animatedSize / 2}
// // //                 r={animatedSize / 2}
// // //                 fill={color}
// // //               />
// // //             )}
// // //             {shape === "rounded" && (
// // //               <rect
// // //                 width={animatedSize}
// // //                 height={animatedSize}
// // //                 rx={radius}
// // //                 ry={radius}
// // //                 fill={color}
// // //               />
// // //             )}
// // //             {shape === "triangle" && (
// // //               <polygon
// // //                 points={`${animatedSize / 2},0 ${animatedSize},${animatedSize} 0,${animatedSize}`}
// // //                 fill={color}
// // //               />
// // //             )}
// // //           </svg>
// // //         </div>
// // //       </div>

// // //       {/* Action Buttons */}
// // //       <div className="flex flex-wrap justify-center gap-4">
// // //         <button
// // //           onClick={downloadSVG}
// // //           className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-indigo-700 transition"
// // //         >
// // //           Download SVG
// // //         </button>
// // //         <button
// // //           onClick={downloadPNG}
// // //           className="bg-green-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-green-700 transition"
// // //         >
// // //           Download PNG
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import { useState, useRef, useEffect } from "react";

// // type ShapeType = "circle" | "rounded" | "triangle";

// // export default function ShapeGenerator() {
// //   const [shape, setShape] = useState<ShapeType>("circle");
// //   const [size, setSize] = useState(200);
// //   const [radius, setRadius] = useState(30);
// //   const [color, setColor] = useState("#6366f1");

// //   const svgRef = useRef<SVGSVGElement | null>(null);

// //   // Smooth animation for preview
// //   const [animatedSize, setAnimatedSize] = useState(size);
// //   useEffect(() => {
// //     const timeout = setTimeout(() => setAnimatedSize(size), 100);
// //     return () => clearTimeout(timeout);
// //   }, [size]);

// //   const downloadSVG = () => {
// //     if (!svgRef.current) return;
// //     const serializer = new XMLSerializer();
// //     const source = serializer.serializeToString(svgRef.current);
// //     const blob = new Blob([source], { type: "image/svg+xml" });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement("a");
// //     link.href = url;
// //     link.download = "devessentio-shape.svg";
// //     link.click();
// //   };

// //   const downloadPNG = () => {
// //     if (!svgRef.current) return;
// //     const serializer = new XMLSerializer();
// //     const source = serializer.serializeToString(svgRef.current);
// //     const img = new Image();
// //     const svgBlob = new Blob([source], { type: "image/svg+xml" });
// //     const url = URL.createObjectURL(svgBlob);
// //     img.onload = () => {
// //       const canvas = document.createElement("canvas");
// //       canvas.width = size;
// //       canvas.height = size;
// //       const ctx = canvas.getContext("2d");
// //       if (!ctx) return;
// //       ctx.drawImage(img, 0, 0);
// //       const pngUrl = canvas.toDataURL("image/png");
// //       const link = document.createElement("a");
// //       link.href = pngUrl;
// //       link.download = "devessentio-shape.png";
// //       link.click();
// //     };
// //     img.src = url;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 p-6 flex flex-col items-center space-y-8">
// //       <h1 className="text-4xl font-bold text-center text-white">
// //         Advanced Shape Generator
// //       </h1>

// //       {/* Controls Panel */}
// //       <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
// //         {/* Shape Select */}
// //         <div>
// //           <label className="block mb-2 font-medium">Shape</label>
// //           <select
// //             value={shape}
// //             onChange={(e) => setShape(e.target.value as ShapeType)}
// //             className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //           >
// //             <option value="circle">Circle</option>
// //             <option value="rounded">Rounded Square</option>
// //             <option value="triangle">Triangle</option>
// //           </select>
// //         </div>

// //         {/* Size */}
// //         <div>
// //           <label className="block mb-2 font-medium">
// //             Size: {size}px
// //           </label>
// //           <input
// //             type="range"
// //             min="100"
// //             max="400"
// //             value={size}
// //             onChange={(e) => setSize(Number(e.target.value))}
// //             className="w-full"
// //           />
// //         </div>

// //         {/* Radius (only for rounded) */}
// //         {shape === "rounded" && (
// //           <div>
// //             <label className="block mb-2 font-medium">
// //               Border Radius: {radius}px
// //             </label>
// //             <input
// //               type="range"
// //               min="0"
// //               max="200"
// //               value={radius}
// //               onChange={(e) => setRadius(Number(e.target.value))}
// //               className="w-full"
// //             />
// //           </div>
// //         )}

// //         {/* Color Picker */}
// //         <div className="md:col-span-3">
// //           <label className="block mb-2 font-medium">Color</label>
// //           <input
// //             type="color"
// //             value={color}
// //             onChange={(e) => setColor(e.target.value)}
// //             className="w-full h-10 border border-gray-600 rounded-md cursor-pointer"
// //           />
// //         </div>
// //       </div>

// //       {/* Preview Panel */}
// //       <div className="flex justify-center w-full">
// //         <div className="backdrop-blur-md p-6 rounded-3xl shadow-2xl">
// //           <svg
// //             ref={svgRef}
// //             width={animatedSize}
// //             height={animatedSize}
// //             viewBox={`0 0 ${animatedSize} ${animatedSize}`}
// //             className="transition-all duration-300"
// //           >
// //             {shape === "circle" && (
// //               <circle
// //                 cx={animatedSize / 2}
// //                 cy={animatedSize / 2}
// //                 r={animatedSize / 2}
// //                 fill={color}
// //               />
// //             )}
// //             {shape === "rounded" && (
// //               <rect
// //                 width={animatedSize}
// //                 height={animatedSize}
// //                 rx={radius}
// //                 ry={radius}
// //                 fill={color}
// //               />
// //             )}
// //             {shape === "triangle" && (
// //               <polygon
// //                 points={`${animatedSize / 2},0 ${animatedSize},${animatedSize} 0,${animatedSize}`}
// //                 fill={color}
// //               />
// //             )}
// //           </svg>
// //         </div>
// //       </div>

// //       {/* Action Buttons */}
// //       <div className="flex flex-wrap justify-center gap-4">
// //         <button
// //           onClick={downloadSVG}
// //           className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-indigo-700 transition"
// //         >
// //           Download SVG
// //         </button>
// //         <button
// //           onClick={downloadPNG}
// //           className="bg-green-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-green-700 transition"
// //         >
// //           Download PNG
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useRef, useEffect } from "react";

// type ShapeType = "circle" | "rounded" | "triangle" | "hexagon" | "star";
// type GradientType = "solid" | "linear" | "radial";

// export default function ShapeGenerator() {
//   const [shape, setShape] = useState<ShapeType>("circle");
//   const [size, setSize] = useState(200);
//   const [radius, setRadius] = useState(30); // for rounded square
//   const [gradientType, setGradientType] = useState<GradientType>("solid");
//   const [color1, setColor1] = useState("#6366f1");
//   const [color2, setColor2] = useState("#ec4899");

//   const svgRef = useRef<SVGSVGElement | null>(null);

//   const [animatedSize, setAnimatedSize] = useState(size);
//   useEffect(() => {
//     const timeout = setTimeout(() => setAnimatedSize(size), 100);
//     return () => clearTimeout(timeout);
//   }, [size]);

//   // Generate Polygon Points (Hexagon / Star)
//   const getPolygonPoints = () => {
//     const points: string[] = [];
//     const n = shape === "hexagon" ? 6 : 5; // star will use 5 points
//     const center = size / 2;
//     const r = size / 2;
//     if (shape === "hexagon") {
//       for (let i = 0; i < n; i++) {
//         const angle = ((2 * Math.PI) / n) * i - Math.PI / 2;
//         const x = center + r * Math.cos(angle);
//         const y = center + r * Math.sin(angle);
//         points.push(`${x},${y}`);
//       }
//     } else if (shape === "star") {
//       const outer = r;
//       const inner = r / 2.5;
//       for (let i = 0; i < 10; i++) {
//         const rad = (Math.PI / 5) * i - Math.PI / 2;
//         const radiusPoint = i % 2 === 0 ? outer : inner;
//         const x = size / 2 + radiusPoint * Math.cos(rad);
//         const y = size / 2 + radiusPoint * Math.sin(rad);
//         points.push(`${x},${y}`);
//       }
//     }
//     return points.join(" ");
//   };

//   // Generate Gradient Fill
//   const getFill = () => {
//     if (gradientType === "solid") return color1;
//     if (gradientType === "linear") return `url(#gradLinear)`;
//     if (gradientType === "radial") return `url(#gradRadial)`;
//     return color1;
//   };

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
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center space-y-8">
//       <h1 className="text-4xl font-bold text-center">DevEssentio Shape Studio</h1>

//       {/* Controls Panel */}
//       <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
//         {/* Shape Select */}
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

//         {/* Size */}
//         <div>
//           <label className="block mb-2 font-medium">Size: {size}px</label>
//           <input
//             type="range"
//             min="100"
//             max="400"
//             value={size}
//             onChange={(e) => setSize(Number(e.target.value))}
//             className="w-full"
//           />
//         </div>

//         {/* Radius for rounded */}
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

//         {/* Gradient Type */}
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

//         {/* Color Pickers */}
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

//       {/* Preview Panel */}
//       <div className="flex justify-center w-full">
//         <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-gray-700">
//           <svg
//             ref={svgRef}
//             width={animatedSize}
//             height={animatedSize}
//             viewBox={`0 0 ${animatedSize} ${animatedSize}`}
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

//             {shape === "circle" && (
//               <circle
//                 cx={animatedSize / 2}
//                 cy={animatedSize / 2}
//                 r={animatedSize / 2}
//                 fill={getFill()}
//               />
//             )}
//             {shape === "rounded" && (
//               <rect
//                 width={animatedSize}
//                 height={animatedSize}
//                 rx={radius}
//                 ry={radius}
//                 fill={getFill()}
//               />
//             )}
//             {shape === "triangle" && (
//               <polygon
//                 points={`${animatedSize / 2},0 ${animatedSize},${animatedSize} 0,${animatedSize}`}
//                 fill={getFill()}
//               />
//             )}
//             {(shape === "hexagon" || shape === "star") && (
//               <polygon points={getPolygonPoints()} fill={getFill()} />
//             )}
//           </svg>
//         </div>
//       </div>

//       {/* Download Buttons */}
//       <div className="flex flex-wrap justify-center gap-4">
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


// 'use client'

// import { useState } from 'react'

// export default function BgRemoveAdvanced() {
//   const [image, setImage] = useState<File | null>(null)
//   const [resultUrl, setResultUrl] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   // Replace with your Remove.bg API key
//   const REMOVE_BG_API_KEY = 'aLdTYx4Gshx5QwH41kakhBvD'

//   // Handle file upload
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0])
//       setResultUrl(null)
//       setError('')
//     }
//   }

//   // Call Remove.bg API to remove background
//   const removeBackground = async () => {
//     if (!image) return
//     setLoading(true)
//     setError('')

//     try {
//       const formData = new FormData()
//       formData.append('image_file', image)
//       formData.append('size', 'auto')

//       const response = await fetch('https://api.remove.bg/v1.0/removebg', {
//         method: 'POST',
//         headers: {
//           'X-Api-Key': REMOVE_BG_API_KEY,
//         },
//         body: formData,
//       })

//       if (!response.ok) {
//         const errorText = await response.text()
//         throw new Error(errorText)
//       }

//       const blob = await response.blob()
//       const url = URL.createObjectURL(blob)
//       setResultUrl(url)
//     } catch (err: any) {
//       setError(err.message || 'Error removing background')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Download result
//   const downloadResult = () => {
//     if (!resultUrl) return
//     const link = document.createElement('a')
//     link.href = resultUrl
//     link.download = 'background-removed.png'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-900 text-white">
//       <h2 className="text-2xl font-bold">Advanced Background Remover</h2>

//       {/* File input */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="text-black p-2 rounded"
//       />

//       {/* Buttons */}
//       <div className="flex gap-4 mt-2">
//         <button
//           onClick={removeBackground}
//           disabled={!image || loading}
//           className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded disabled:opacity-50"
//         >
//           {loading ? 'Removing...' : 'Remove Background'}
//         </button>
//         {resultUrl && (
//           <button
//             onClick={downloadResult}
//             className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded"
//           >
//             Download
//           </button>
//         )}
//       </div>

//       {/* Error */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Preview */}
//       {image && !resultUrl && (
//         <div className="relative w-80 h-80 border border-white/20 rounded overflow-hidden mt-4">
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Preview"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       {resultUrl && (
//         <div className="relative w-80 h-80 border border-white/20 rounded overflow-hidden mt-4">
//           <img
//             src={resultUrl}
//             alt="Background Removed"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}
//     </div>
//   )
// }


'use client'

import { useState } from 'react'

export default function BgRemoveAdvanced() {
  const [image, setImage] = useState<File | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Replace with your Remove.bg API key
  const REMOVE_BG_API_KEY = 'aLdTYx4Gshx5QwH41kakhBvD'

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setResultUrl(null)
      setError('')
    }
  }

  // Remove background
  const removeBackground = async () => {
    if (!image) return
    setLoading(true)
    setError('')
    setResultUrl(null)

    try {
      const formData = new FormData()
      formData.append('image_file', image)
      formData.append('size', 'auto')

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': REMOVE_BG_API_KEY,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setResultUrl(url)
    } catch (err: any) {
      setError(err.message || 'Error removing background')
    } finally {
      setLoading(false)
    }
  }

  // Download result
  const downloadResult = () => {
    if (!resultUrl) return
    const link = document.createElement('a')
    link.href = resultUrl
    link.download = 'bg-removed.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold">Advanced Background Remover</h2>

     <label className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl p-10 cursor-pointer hover:border-blue-500 transition`}>
          <span className="text-gray-400 mb-2">
            Click to upload image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

      {/* File input */}
      {/* <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-black p-2 rounded"
      /> */}

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={removeBackground}
          disabled={!image || loading}
          className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded disabled:opacity-50 transition"
        >
          {loading ? 'Removing...' : 'Remove Background'}
        </button>
        {resultUrl && (
          <button
            onClick={downloadResult}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded transition"
          >
            Download
          </button>
        )}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-300">Processing image...</span>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Preview */}
      <div className="">
        {image && !resultUrl && (
          <div className="relative w-64 h-64 rounded overflow-hidden mx-auto">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 bg-black/50 text-xs px-2 py-1 rounded">
              Original
            </span>
          </div>
        )}

        {resultUrl && (
          <div className="relative w-64 h-64 border border-white/20 rounded overflow-hidden mx-auto">
            <img
              src={resultUrl}
              alt="Background Removed"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 bg-black/50 text-xs px-2 py-1 rounded">
              Result
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
