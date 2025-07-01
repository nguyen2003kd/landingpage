"use client";

import React from "react";
import { CanvasElement } from "@/types/element";

interface EffectsTabProps {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
}

export default function EffectsTab({ element, onChange }: EffectsTabProps) {
  return (
    <div className="space-y-4">
      {/* Hiệu ứng khi cuốn tới */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hiệu ứng khi cuốn tới
        </label>
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <span className="text-sm text-gray-600">Chọn hiệu ứng</span>
          <svg
            className="w-4 h-4 text-gray-400"
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

      {/* Loại hiệu ứng */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loại hiệu ứng
        </label>
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <span className="text-sm text-gray-400">Chọn gia trị</span>
          <svg
            className="w-4 h-4 text-gray-400"
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

      {/* Hiệu ứng khi trỏ chuột */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hiệu ứng khi trỏ chuột
        </label>
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
          <span className="text-sm text-gray-600">Chọn hiệu ứng</span>
          <svg
            className="w-4 h-4 text-gray-400"
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

      {/* Màu viền */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Màu viền
        </label>
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
          <input
            type="color"
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            value={element.props.borderColor || "#000000"}
            onChange={(e) => onChange("borderColor", e.target.value)}
          />
          <input
            type="text"
            placeholder="Chọn màu"
            value={element.props.borderColor || ""}
            className="flex-1 text-sm text-gray-500 bg-transparent outline-none"
            onChange={(e) => onChange("borderColor", e.target.value)}
          />
        </div>
      </div>

      {/* Màu nền */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Màu nền
        </label>
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
          <input
            type="color"
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            defaultValue="#ffffff"
            onChange={(e) => onChange("effectBackgroundColor", e.target.value)}
          />
          <input
            type="text"
            placeholder="Chọn màu"
            className="flex-1 text-sm text-gray-500 bg-transparent outline-none"
            onChange={(e) => onChange("effectBackgroundColor", e.target.value)}
          />
        </div>
      </div>

      {/* Màu chữ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Màu chữ
        </label>
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
          <input
            type="color"
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            defaultValue="#000000"
            onChange={(e) => onChange("textColor", e.target.value)}
          />
          <input
            type="text"
            placeholder="Chọn màu"
            className="flex-1 text-sm text-gray-500 bg-transparent outline-none"
            onChange={(e) => onChange("textColor", e.target.value)}
          />
        </div>
      </div>

      {/* Trong suốt và Phóng to */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trong suốt
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg">
            <input
              type="number"
              value={element.props.opacity || "100"}
              className="flex-1 p-2 text-sm bg-transparent outline-none text-center"
              onChange={(e) => onChange("opacity", e.target.value)}
            />
            <span className="text-sm text-gray-500 pr-3">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phóng to
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg">
            <input
              type="number"
              defaultValue="100"
              className="flex-1 p-2 text-sm bg-transparent outline-none text-center"
              onChange={(e) => onChange("scale", e.target.value)}
            />
            <span className="text-sm text-gray-500 pr-3">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
