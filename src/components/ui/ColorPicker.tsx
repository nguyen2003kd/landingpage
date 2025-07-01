"use client";

import React, { useState, useEffect } from "react";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

export default function ColorPicker({
  value,
  onChange,
  label,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [colorType, setColorType] = useState<"solid" | "gradient">("solid");
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [alpha, setAlpha] = useState(100);
  const [hexValue, setHexValue] = useState(value || "#ff0000");
  const [recentColors, setRecentColors] = useState<string[]>([]);

  // Extended color palette with more beautiful colors
  const colorPalette = [
    // Primary colors
    "#ff4757",
    "#2ed573",
    "#1e90ff",
    "#ffa502",
    "#ff6348",
    "#7bed9f",
    "#70a1ff",
    "#ffb142",
    // Secondary colors
    "#a4b0be",
    "#57606f",
    "#2f3542",
    "#40407a",
    "#706fd3",
    "#f1c40f",
    "#e74c3c",
    "#9b59b6",
    // Accent colors
    "#ff9ff3",
    "#54a0ff",
    "#5f27cd",
    "#00d2d3",
    "#ff9f43",
    "#10ac84",
    "#ee5253",
    "#0abde3",
    // Neutral colors
    "#c8d6e5",
    "#8395a7",
    "#576574",
    "#222f3e",
    "#ddd",
    "#bbb",
    "#999",
    "#777",
  ];

  // Load recent colors from localStorage on component mount
  useEffect(() => {
    const savedRecentColors = localStorage.getItem("colorpicker-recent-colors");
    if (savedRecentColors) {
      try {
        const parsed = JSON.parse(savedRecentColors);
        setRecentColors(parsed);
      } catch (e) {
        console.warn("Failed to parse recent colors from localStorage");
      }
    }
  }, []);

  // Sync hexValue with value prop
  useEffect(() => {
    if (value !== hexValue) {
      setHexValue(value || "#ffffff");

      // Also sync HSV values from the incoming color
      if (value && value.match(/^#[0-9A-Fa-f]{6}$/)) {
        const hsv = hexToHsv(value);
        setHue(hsv.h);
        setSaturation(hsv.s);
        setBrightness(hsv.v);
      }
    }
  }, [value, hexValue]);

  // Save recent colors to localStorage
  const saveRecentColor = (color: string) => {
    if (!color || color === "#ffffff" || color === "") return;

    setRecentColors((prev) => {
      // Remove if already exists, then add to front
      const filtered = prev.filter((c) => c !== color);
      const newRecent = [color, ...filtered].slice(0, 12); // Keep max 12 recent colors

      // Save to localStorage
      localStorage.setItem(
        "colorpicker-recent-colors",
        JSON.stringify(newRecent)
      );
      return newRecent;
    });
  };

  const handleColorChange = (newColor: string) => {
    setHexValue(newColor);
    onChange(newColor);
    // Save to recent colors when user actually selects a color
    saveRecentColor(newColor);
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Color Display Button */}
      <div
        className="w-full p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-gray-50/50 transition-all duration-200 bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Color Preview & Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="w-12 h-12 border-2 border-gray-300 rounded-lg shadow-sm flex-shrink-0"
              style={{ backgroundColor: value || "#ffffff" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 mb-1">
                {value ? "Màu đã chọn" : "Chọn màu"}
              </div>
              <div className="text-xs font-mono text-gray-600 truncate">
                {value || "#ffffff"}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {value && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorChange("");
                }}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Xóa màu"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Color Picker Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
              className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-xl p-4"
              style={{ maxHeight: "700px", overflowY: "auto" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800">Chọn màu</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Color Type Selector */}
              <div className="flex mb-4">
                <select
                  value={colorType}
                  onChange={(e) =>
                    setColorType(e.target.value as "solid" | "gradient")
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="solid">Solid</option>
                  <option value="gradient">Gradient</option>
                </select>
                <div
                  className="w-10 h-10 border border-l-0 border-gray-300 rounded-r-lg"
                  style={{
                    background:
                      colorType === "gradient"
                        ? "linear-gradient(45deg, #ff6b9d, #c44569)"
                        : value,
                  }}
                ></div>
              </div>

              {/* Main Color Area */}
              <div className="relative mb-4">
                <div
                  className="w-full h-40 rounded-lg border border-gray-300 cursor-crosshair"
                  style={{
                    background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = (1 - (e.clientY - rect.top) / rect.height) * 100;
                    setSaturation(x);
                    setBrightness(y);

                    // Convert HSV to RGB and then to hex
                    const color = hsvToHex(hue, x, y);
                    handleColorChange(color);
                  }}
                >
                  {/* Color picker circle */}
                  <div
                    className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md pointer-events-none"
                    style={{
                      left: `${saturation}%`,
                      top: `${100 - brightness}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              </div>

              {/* Hue Slider */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hue}
                  onChange={(e) => {
                    const newHue = parseInt(e.target.value);
                    setHue(newHue);
                    const color = hsvToHex(newHue, saturation, brightness);
                    handleColorChange(color);
                  }}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                  }}
                />
              </div>

              {/* Saturation Slider */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={saturation}
                  onChange={(e) => {
                    const newSat = parseInt(e.target.value);
                    setSaturation(newSat);
                    const color = hsvToHex(hue, newSat, brightness);
                    handleColorChange(color);
                  }}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ffffff, hsl(${hue}, 100%, 50%))`,
                  }}
                />
              </div>

              {/* Alpha Slider */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={alpha}
                  onChange={(e) => setAlpha(parseInt(e.target.value))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, transparent, ${value})`,
                  }}
                />
              </div>

              {/* Color Input and Gradient Options */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={hexValue}
                  onChange={(e) => {
                    setHexValue(e.target.value);
                    if (e.target.value.match(/^#[0-9A-Fa-f]{6}$/)) {
                      handleColorChange(e.target.value);
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                  placeholder="#ffffff"
                />
                {colorType === "gradient" && (
                  <>
                    <select className="px-3 py-2 border border-gray-300 rounded text-sm">
                      <option>Linear</option>
                      <option>Radial</option>
                    </select>
                    <input
                      type="number"
                      defaultValue="90"
                      className="w-16 px-2 py-2 border border-gray-300 rounded text-sm text-center"
                    />
                  </>
                )}
              </div>

              {/* Recent Colors */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Màu của tôi
                  </h4>
                  {recentColors.length > 0 && (
                    <button
                      onClick={() => {
                        setRecentColors([]);
                        localStorage.removeItem("colorpicker-recent-colors");
                      }}
                      className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                    >
                      Xóa tất cả
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recentColors.length > 0 ? (
                    recentColors.map((color, index) => (
                      <div key={index} className="relative group">
                        <div
                          className="w-8 h-8 rounded-md cursor-pointer border-2 border-gray-300 hover:scale-110 transition-all hover:shadow-md"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                          title={color}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newRecent = recentColors.filter(
                              (_, i) => i !== index
                            );
                            setRecentColors(newRecent);
                            localStorage.setItem(
                              "colorpicker-recent-colors",
                              JSON.stringify(newRecent)
                            );
                          }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                          title="Xóa màu này"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500 italic py-2">
                      Chưa có màu nào được chọn gần đây
                    </div>
                  )}
                </div>
              </div>

              {/* Color Palette */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Màu mẫu
                </h4>
                <div className="grid grid-cols-8 gap-1.5">
                  {colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-md cursor-pointer border-2 border-gray-300 hover:scale-110 transition-all hover:shadow-md"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleColorChange("");
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                >
                  Đặt lại
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Helper function to convert HSV to Hex
function hsvToHex(h: number, s: number, v: number): string {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r: number, g: number, b: number;

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      r = 0;
      g = 0;
      b = 0;
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Helper function to convert Hex to HSV
function hexToHsv(hex: string): { h: number; s: number; v: number } {
  // Remove # if present
  hex = hex.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  // Calculate value (brightness)
  const v = max;

  // Calculate saturation
  const s = max === 0 ? 0 : diff / max;

  // Calculate hue
  let h = 0;
  if (diff !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / diff + 2) / 6;
        break;
      case b:
        h = ((r - g) / diff + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}
