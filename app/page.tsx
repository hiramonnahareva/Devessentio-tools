"use client";

import Link from "next/link";

const tools = [
  "Image Compress",
  "Glassmorphism",
  "Shape Generator",
  "Logo Generator",
  "BG Remove",
  "Color Palette",
  "Text Extractor",
  "Photo Editor",
  "AI Tools",
  "Copy Tool",
  "Cloud Storage",
  "Favorites",
  "Refresh Tool",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 backdrop-blur-md bg-white/5 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          DevEssentio
        </h1>
        <div className="space-x-6 text-gray-300 hidden md:flex">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#tools" className="hover:text-white transition">Tools</a>
          <a href="#about" className="hover:text-white transition">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          All Developer Tools <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            In One Place
          </span>
        </h2>
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
          Compress images, generate logos, remove backgrounds, extract text,
          manage cloud storage and more — everything you need as a developer.
        </p>

        <div className="mt-10">
          <a
            href="#tools"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition shadow-lg"
          >
            Explore Tools 🚀
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Why Developers Love DevEssentio</h3>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-xl font-semibold mb-3">⚡ Fast & Lightweight</h4>
              <p className="text-gray-400">
                Built for speed with optimized performance and smooth UI experience.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">🎨 Modern UI</h4>
              <p className="text-gray-400">
                Clean glassmorphism design with smooth animations and responsiveness.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">🔒 Secure & Reliable</h4>
              <p className="text-gray-400">
                Your data stays private with secure processing and storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="px-8 py-20 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-center">
          Powerful Tools
        </h3>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <Link key={index} href={`/${tool.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition transform hover:scale-105 cursor-pointer shadow-md">
                <h4 className="text-lg font-semibold">{tool}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-xl font-semibold mb-2">1️⃣ Choose a Tool</h4>
              <p className="text-gray-400">
                Select any tool from our growing library.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">2️⃣ Upload / Customize</h4>
              <p className="text-gray-400">
                Upload files or customize your settings instantly.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">3️⃣ Download Result</h4>
              <p className="text-gray-400">
                Get your processed result in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">What Developers Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-gray-300">
                “This platform saves me hours every week. Everything in one place!”
              </p>
              <span className="text-sm text-gray-500 block mt-4">— Frontend Dev</span>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-gray-300">
                “Super clean UI and blazing fast tools. Highly recommended.”
              </p>
              <span className="text-sm text-gray-500 block mt-4">— UI Designer</span>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-gray-300">
                “Finally a toolbox built for developers.”
              </p>
              <span className="text-sm text-gray-500 block mt-4">— Fullstack Engineer</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <h3 className="text-3xl md:text-4xl font-bold">
          Ready to Boost Your Productivity?
        </h3>
        <p className="mt-4 text-gray-200">
          Start using DevEssentio today — it’s fast, free, and powerful.
        </p>
        <div className="mt-8">
          <a
            href="#tools"
            className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Get Started 🚀
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="text-center py-6 border-t border-white/10 text-gray-500 text-sm">
        © {new Date().getFullYear()} DevEssentio. All rights reserved.
      </footer>
    </div>
  );
}