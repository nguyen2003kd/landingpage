"use client";

import React from "react";
import { CanvasElement } from "@/types/element";

interface BorderPanelProps {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
  expandedSections: { [key: string]: boolean };
  toggleSection: (sectionKey: string) => void;
}

export default function BorderPanel({
  element,
  onChange,
  expandedSections,
  toggleSection,
}: BorderPanelProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div
        className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
        onClick={() => toggleSection("borderRadius")}
      >
        <span className="text-sm font-medium text-gray-700">
          Viền và bo góc
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            expandedSections.borderRadius ? "rotate-90" : ""
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
      {expandedSections.borderRadius && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bo góc
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={element.props.borderRadius || "0"}
                  className="flex-1 p-2 border border-gray-300 rounded-lg text-sm text-center"
                  onChange={(e) => onChange("borderRadius", e.target.value)}
                />
                <span className="text-sm text-gray-500">px</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kiểu viền
              </label>
              <div className="flex gap-2">
                <button
                  className={`flex-1 p-2 border rounded text-sm hover:bg-gray-100 ${
                    element.props.borderStyle === "solid"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300"
                  }`}
                  onClick={() => onChange("borderStyle", "solid")}
                >
                  —
                </button>
                <button
                  className={`flex-1 p-2 border rounded text-sm hover:bg-gray-100 ${
                    element.props.borderStyle === "dashed"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300"
                  }`}
                  onClick={() => onChange("borderStyle", "dashed")}
                >
                  ···
                </button>
                <button
                  className={`flex-1 p-2 border rounded text-sm hover:bg-gray-100 ${
                    element.props.borderStyle === "dotted"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300"
                  }`}
                  onClick={() => onChange("borderStyle", "dotted")}
                >
                  ····
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Độ dày viền
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={element.props.borderWidth || "2"}
                  className="flex-1 p-2 border border-gray-300 rounded-lg text-sm text-center"
                  onChange={(e) => onChange("borderWidth", e.target.value)}
                />
                <span className="text-sm text-gray-500">px</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Màu viền
              </label>
              <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg bg-white">
                <input
                  type="color"
                  className="w-1/2 h-10 border border-gray-300 rounded cursor-pointer"
                  value={element.props.borderColor || "#000000"}
                  onChange={(e) => onChange("borderColor", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nhập mã màu viền"
                  value={element.props.borderColor || ""}
                  className="w-1/2 px-3 py-2 text-sm text-gray-700 bg-transparent border border-gray-300 rounded outline-none focus:border-blue-400"
                  onChange={(e) => onChange("borderColor", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="rounded"
                  onChange={(e) =>
                    onChange("shadow", e.target.checked.toString())
                  }
                />
                <span className="text-gray-700">Đổ bóng</span>
                <div className="ml-auto">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={(e) =>
                        onChange("shadowEnabled", e.target.checked.toString())
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    <span className="ml-2 text-sm text-blue-500">Tắt</span>
                  </label>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
