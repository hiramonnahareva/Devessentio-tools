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
