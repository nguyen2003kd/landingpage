"use client";

import React from "react";
import { CanvasElement } from "@/types/element";

interface VisibilityPanelProps {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
  expandedSections: { [key: string]: boolean };
  toggleSection: (sectionKey: string) => void;
}

export default function VisibilityPanel({
  onChange,
  expandedSections,
  toggleSection,
}: VisibilityPanelProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div
        className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
        onClick={() => toggleSection("deviceVisibility")}
      >
        <span className="text-sm font-medium text-gray-700">
          Ẩn/Hiển thị trên thiết bị
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            expandedSections.deviceVisibility ? "rotate-90" : ""
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
      {expandedSections.deviceVisibility && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Máy tính</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                  onChange={(e) =>
                    onChange("desktopVisible", e.target.checked.toString())
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                <span className="ml-2 text-sm text-blue-500">Hiện</span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Điện thoại</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                  onChange={(e) =>
                    onChange("mobileVisible", e.target.checked.toString())
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                <span className="ml-2 text-sm text-blue-500">Hiện</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
