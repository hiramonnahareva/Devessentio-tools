'use client'

import { useState } from 'react' 

export default function GlassGenerator() {
  // Glass effect controls
  const [blur, setBlur] = useState(20)
  const [opacity, setOpacity] = useState(20)
  const [borderOpacity, setBorderOpacity] = useState(30)
  const [radius, setRadius] = useState(20)
  const [shadow, setShadow] = useState(30)

  // Background options
  const [useGradient, setUseGradient] = useState(true)
  const [bgColor, setBgColor] = useState('#1f2937')
  const [gradientColors, setGradientColors] = useState(['#6366f1', '#ec4899'])
  const [gradientAngle, setGradientAngle] = useState(90)

  // Glass colors
  const [glassColor, setGlassColor] = useState('#ffffff')
  const [borderColor, setBorderColor] = useState('#ffffff')
  const [shadowColor, setShadowColor] = useState('#000000')

  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const backgroundStyle = useGradient
    ? {
        background: `linear-gradient(${gradientAngle}deg, ${gradientColors.join(
          ', '
        )})`,
      }
    : { background: bgColor }

  const glassStyle = {
    backdropFilter: `blur(${blur}px)`,
    background: hexToRGBA(glassColor, opacity / 100),
    borderRadius: `${radius}px`,
    border: `1px solid ${hexToRGBA(borderColor, borderOpacity / 100)}`,
    boxShadow: `0 ${shadow}px ${shadow * 2}px ${hexToRGBA(
      shadowColor,
      shadow / 100
    )}`,
  }

  /* ===============================
     Tailwind Scale Mapping
  =============================== */

  const getBlurClass = () => {
    if (blur <= 5) return 'backdrop-blur-sm'
    if (blur <= 10) return 'backdrop-blur'
    if (blur <= 15) return 'backdrop-blur-md'
    if (blur <= 20) return 'backdrop-blur-lg'
    if (blur <= 30) return 'backdrop-blur-xl'
    return 'backdrop-blur-2xl'
  }

  const getRadiusClass = () => {
    if (radius <= 5) return 'rounded-sm'
    if (radius <= 10) return 'rounded'
    if (radius <= 15) return 'rounded-md'
    if (radius <= 20) return 'rounded-lg'
    if (radius <= 30) return 'rounded-xl'
    if (radius <= 40) return 'rounded-2xl'
    return 'rounded-3xl'
  }

  const getShadowClass = () => {
    if (shadow <= 5) return 'shadow-sm'
    if (shadow <= 10) return 'shadow'
    if (shadow <= 20) return 'shadow-md'
    if (shadow <= 30) return 'shadow-lg'
    if (shadow <= 40) return 'shadow-xl'
    return 'shadow-2xl'
  }

  const tailwindCode = `
${getBlurClass()}
bg-white/${opacity}
${getRadiusClass()}
border backdrop-filter
border-white/${borderOpacity}
${getShadowClass()}
`.trim()

const cssCode = `
backdrop-filter: blur(${blur}px);
background-color: ${hexToRGBA(glassColor, opacity / 100)};
border-radius: ${radius}px;
border: 1px solid ${hexToRGBA(borderColor, borderOpacity / 100)};
box-shadow: 0 ${shadow}px ${shadow * 2}px ${hexToRGBA(
    shadowColor,
    shadow / 100
  )}; 
  `

  return (
    <div className="min-h-screen text-white p-8" style={backgroundStyle}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Controls */}
        <div className="bg-black/40 backdrop-blur-lg p-6 rounded-2xl space-y-6 border border-white/10">
          <h2 className="text-2xl font-bold">Glass Settings</h2>

          <Slider label="Blur" value={blur} setValue={setBlur} max={40} />
          <Slider label="Opacity" value={opacity} setValue={setOpacity} max={90} />
          <Slider label="Border Opacity" value={borderOpacity} setValue={setBorderOpacity} max={90} />
          <Slider label="Border Radius" value={radius} setValue={setRadius} max={50} />
          <Slider label="Shadow" value={shadow} setValue={setShadow} max={50} />
        </div>

        {/* Preview + Code */}
        <div className="space-y-6">

          <div className="flex items-center justify-center h-80 rounded-2xl relative overflow-hidden">
            <div
              style={glassStyle}
              className="w-72 h-40 flex items-center justify-center font-semibold"
            >
              Glass Preview
            </div>
          </div>

          <div className="bg-black/60 p-5 rounded-xl space-y-4">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">CSS</h3>
              <pre className="text-xs whitespace-pre-wrap">{cssCode}</pre>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-2">Tailwind</h3>
              <pre className="text-xs whitespace-pre-wrap">{tailwindCode}</pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/* Slider */
function Slider({
  label,
  value,
  setValue,
  max,
}: {
  label: string
  value: number
  setValue: (v: number) => void
  max: number
}) {
  return (
    <div>
      <label className="block text-sm mb-2">
        {label}: {value}
      </label>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
