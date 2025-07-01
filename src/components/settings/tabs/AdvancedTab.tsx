"use client";

import React from "react";
import { CanvasElement } from "@/types/element";
import SpacingPanel from "../panels/SpacingPanel";
import VisibilityPanel from "../panels/VisibilityPanel";

interface AdvancedTabProps {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
  expandedSections: { [key: string]: boolean };
  toggleSection: (sectionKey: string) => void;
}

export default function AdvancedTab({
  element,
  onChange,
  expandedSections,
  toggleSection,
}: AdvancedTabProps) {
  return (
    <div className="space-y-4">
      {/* Mã phần tử */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mã phần tử
        </label>
        <input
          type="text"
          placeholder="Nhập mã"
          value={element.props.elementId || ""}
          className="w-full p-3 border border-gray-200 rounded-lg text-sm"
          onChange={(e) => onChange("elementId", e.target.value)}
        />
      </div>

      <SpacingPanel
        element={element}
        onChange={onChange}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />

      <VisibilityPanel
        element={element}
        onChange={onChange}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />

      {/* Đặt giới hạn thời gian */}
      <div className="border border-gray-200 rounded-lg">
        <div
          className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
          onClick={() => toggleSection("timeLimit")}
        >
          <span className="text-sm font-medium text-gray-700">
            Đặt giới hạn thời gian
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              expandedSections.timeLimit ? "rotate-90" : ""
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
        {expandedSections.timeLimit && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kiểu hiển thị
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  onChange={(e) => onChange("timeDisplayType", e.target.value)}
                >
                  <option>Luôn hiển thị</option>
                  <option>Không thời gian</option>
                  <option>Lặp lại hàng ngày</option>
                  <option>Tùy chỉnh</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hiệu ứng khi di chuột vào */}
      <div className="border border-gray-200 rounded-lg">
        <div
          className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
          onClick={() => toggleSection("hoverEffect")}
        >
          <span className="text-sm font-medium text-gray-700">
            Hiệu ứng khi di chuột vào
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              expandedSections.hoverEffect ? "rotate-90" : ""
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
        {expandedSections.hoverEffect && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="space-y-4">
              {/* Màu viền */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu viền
                </label>
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
                  <input
                    type="color"
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    defaultValue="#000000"
                    onChange={(e) =>
                      onChange("hoverBorderColor", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Chọn màu"
                    className="flex-1 text-sm text-gray-500 bg-transparent outline-none"
                    onChange={(e) =>
                      onChange("hoverBorderColor", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Màu nền */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu nền
                </label>
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
                  <input
                    type="color"
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    defaultValue="#ffffff"
                    onChange={(e) =>
                      onChange("hoverBackgroundColor", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Chọn màu"
                    className="flex-1 text-sm text-gray-500 bg-transparent outline-none"
                    onChange={(e) =>
                      onChange("hoverBackgroundColor", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Màu chữ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu chữ
                </label>
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
                  <input
                    type="color"
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    defaultValue="#000000"
                    onChange={(e) => onChange("hoverTextColor", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Chọn màu"
                    className="flex-1 text-sm text-gray-500 bg-transparent outline-none"
                    onChange={(e) => onChange("hoverTextColor", e.target.value)}
                  />
                </div>
              </div>

              {/* Trong suốt và Phóng to */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trong suốt
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                    <input
                      type="number"
                      defaultValue="100"
                      className="flex-1 p-2 text-sm bg-transparent outline-none text-center"
                      onChange={(e) => onChange("hoverOpacity", e.target.value)}
                    />
                    <span className="text-sm text-gray-500 pr-3">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phóng to
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                    <input
                      type="number"
                      defaultValue="100"
                      className="flex-1 p-2 text-sm bg-transparent outline-none text-center"
                      onChange={(e) => onChange("hoverScale", e.target.value)}
                    />
                    <span className="text-sm text-gray-500 pr-3">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer help text */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <span className="text-base">😊</span>
          <div>
            <span className="text-blue-600 underline cursor-pointer">
              Góp ý tính năng này
            </span>
            <span> để chúng tôi giúp bạn trải nghiệm tốt hơn</span>
          </div>
        </div>
      </div>
    </div>
  );
}
