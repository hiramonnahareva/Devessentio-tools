// "use client";

// import { useState } from "react";
// import toast from "react-hot-toast";

// export default function TextExtractor() {
//   const [inputText, setInputText] = useState("");
//   const [outputText, setOutputText] = useState("");

//   // Regex patterns
//   const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
//   const urlPattern = /\bhttps?:\/\/[^\s/$.?#].[^\s]*\b/g;
//   const phonePattern = /\b\d{10,15}\b/g; // basic phone numbers

//   const handleExtract = () => {
//     let text = inputText;

//     // Extract emails, URLs, phones
//     const emails = text.match(emailPattern) || [];
//     const urls = text.match(urlPattern) || [];
//     const phones = text.match(phonePattern) || [];

//     // Clean text: remove numbers and extra spaces
//     const cleanedText = text.replace(/[0-9]/g, "").replace(/\s+/g, " ").trim();

//     // Combine results
//     const result = `
// Cleaned Text:
// ${cleanedText}

// Emails Found:
// ${emails.join("\n") || "None"}

// URLs Found:
// ${urls.join("\n") || "None"}

// Phone Numbers Found:
// ${phones.join("\n") || "None"}
//     `.trim();

//     setOutputText(result);
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.type === "text/plain") {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setInputText(event.target?.result as string);
//       };
//       reader.readAsText(file);
//     } else {
//       toast.success("Please upload a valid .txt file");
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(outputText);
//     toast.success("Extracted text copied to clipboard!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-gray-100 p-6 flex flex-col items-center">
//       <h1 className="text-4xl font-bold mb-6">Advanced Text Extractor</h1>

//       <textarea
//         value={inputText}
//         onChange={(e) => setInputText(e.target.value)}
//         placeholder="Paste your text here..."
//         className="w-full max-w-3xl h-40 p-4 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />

//       <div className="mt-4 flex flex-wrap gap-4 items-center">
//         <input
//           type="file"
//           accept=".txt"
//           onChange={handleFileUpload}
//           className="text-gray-100"
//         />
//         <button
//           onClick={handleExtract}
//           className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white"
//         >
//           Extract
//         </button>
//         <button
//           onClick={handleCopy}
//           className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
//         >
//           Copy Output
//         </button>
//       </div>

//       <div className="mt-6 w-full max-w-3xl bg-gray-800 p-4 rounded-lg whitespace-pre-wrap">
//         {outputText || "Output will appear here..."}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function TextExtractor() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Regex patterns
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  const urlPattern = /\bhttps?:\/\/[^\s/$.?#].[^\s]*\b/g;
  const phonePattern = /\b\d{10,15}\b/g;

  const handleExtract = () => {
    const text = inputText;

    const emails = text.match(emailPattern) || [];
    const urls = text.match(urlPattern) || [];
    const phones = text.match(phonePattern) || [];

    const cleanedText = text.replace(/[0-9]/g, "").replace(/\s+/g, " ").trim();

    let result = "";
    if (cleanedText) result += `Cleaned Text:\n${cleanedText}\n\n`;
    if (emails.length) result += `Emails Found:\n${emails.join("\n")}\n\n`;
    if (urls.length) result += `URLs Found:\n${urls.join("\n")}\n\n`;
    if (phones.length) result += `Phone Numbers Found:\n${phones.join("\n")}\n\n`;

    setOutputText(result.trim() || "No extractable content found.");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputText(event.target?.result as string);
      };
      reader.readAsText(file);
    } else {
      alert("Unsupported file type. Please upload a .txt file.");
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    alert("Extracted text copied!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Advanced Text Extractor</h1>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your text here..."
        className="w-full max-w-3xl h-40 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="mt-4 flex flex-wrap gap-4 items-center">
       <input
    id="file-upload"
    type="file"
    accept=".txt"
    onChange={handleFileUpload}
    className="hidden"
  />
  <label
    htmlFor="file-upload"
    className="cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white inline-block"
  >
    Upload
  </label>
        <button
          onClick={handleExtract}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white"
        >
          Extract
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
        >
          Copy Output
        </button>
      </div>

      <div className="mt-6 w-full max-w-3xl bg-gray-800 p-4 rounded-lg whitespace-pre-wrap">
        {outputText || "Output will appear here..."}
      </div>
    </div>
  );
} 