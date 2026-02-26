'use client'

import imageCompression from 'browser-image-compression'
import { useState, useEffect } from 'react'

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [compressedFile, setCompressedFile] = useState<File | null>(null)
  const [originalPreview, setOriginalPreview] = useState<string | null>(null)
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null)
  const [quality, setQuality] = useState(0.8)
  const [loading, setLoading] = useState(false)

  const bytesToKB = (bytes: number) => (bytes / 1024).toFixed(2)
  const bytesToMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2)

  // Handle upload
  const handleImage = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    setOriginalFile(file)
    setOriginalPreview(URL.createObjectURL(file))
  }

  // Recompress when quality changes
  useEffect(() => {
    if (!originalFile) return

    const compressImage = async () => {
      setLoading(true)

      const options = {
        maxSizeMB: 2,
        useWebWorker: true,
        initialQuality: quality,
      }

      const compressed = await imageCompression(originalFile, options)
      setCompressedFile(compressed)
      setCompressedPreview(URL.createObjectURL(compressed))
      setLoading(false)
    }

    compressImage()
  }, [quality, originalFile])

  const reduction =
    originalFile && compressedFile
      ? (
          ((originalFile.size - compressedFile.size) /
            originalFile.size) *
          100
        ).toFixed(1)
      : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-center">
           Image Compressor Tool
        </h1>

        {/* Upload Box */}
        <label className={`flex flex-col items-center ${originalFile ? 'mt-10' : 'mt-60'} justify-center border-2 border-dashed border-gray-700 rounded-xl p-10 cursor-pointer hover:border-blue-500 transition`}>
          <span className="text-gray-400 mb-2">
            Click to upload image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </label>

        {/* Quality Slider */}
        {originalFile && (
          <div className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900">
            <label className="block mb-3 text-sm">
              Compression Quality: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* Preview Section */}
        {(originalPreview || compressedPreview) && (
          <div className="grid md:grid-cols-2 gap-6">

            {/* Original */}
            {originalPreview && (
              <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
                <h2 className="text-sm text-gray-400 mb-4">
                  Original
                </h2>
                <img
                  src={originalPreview}
                  className="rounded-lg w-full h-64 object-contain bg-black"
                />
                <p className="mt-4 text-sm text-gray-300">
                  {bytesToMB(originalFile!.size)} MB
                  ({bytesToKB(originalFile!.size)} KB)
                </p>
              </div>
            )}

            {/* Compressed */}
            {compressedPreview && (
              <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
                <h2 className="text-sm text-gray-400 mb-4">
                  Compressed
                </h2>
                <img
                  src={compressedPreview}
                  className="rounded-lg w-full h-64 object-contain bg-black"
                />
                <p className="mt-4 text-sm text-gray-300">
                  {bytesToMB(compressedFile!.size)} MB
                  ({bytesToKB(compressedFile!.size)} KB)
                </p>
              </div>
            )}
          </div>
        )}

        {/* Reduction Badge */}
        {reduction && (
          <div className="text-center">
            <span className="bg-green-600/20 text-green-400 px-4 py-2 rounded-full border border-green-500">
              🎉 Reduced by {reduction}%
            </span>
          </div>
        )}

        {/* Download */}
        {compressedPreview && (
          <div className="text-center">
            <a
              href={compressedPreview}
              download="compressed-image.jpg"
              className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-lg font-medium"
            >
              Download Image
            </a>
          </div>
        )}

        {loading && (
          <p className="text-center text-gray-400">
            Compressing image...
          </p>
        )}
      </div>
    </div>
  )
}