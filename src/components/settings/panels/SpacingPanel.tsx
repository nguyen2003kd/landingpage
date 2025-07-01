"use client";

import React from "react";
import { CanvasElement } from "@/types/element";

interface SpacingPanelProps {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
  expandedSections: { [key: string]: boolean };
  toggleSection: (sectionKey: string) => void;
}

export default function SpacingPanel({
  element,
  onChange,
  expandedSections,
  toggleSection,
}: SpacingPanelProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div
        className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
        onClick={() => toggleSection("spacing")}
      >
        <span className="text-sm font-medium text-gray-700">Khoảng cách</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            expandedSections.spacing ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      {expandedSections.spacing && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="space-y-4">
            <p className="text-xs text-orange-500">
              Chú ý: Margin và Padding quá cao có thể làm vỡ thiết kế trên điện
              thoại
            </p>

            {/* Margin */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Margin
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <input
                  type="number"
                  placeholder="0"
                  value={element.props.marginTop || ""}
                  className="p-2 border border-gray-300 rounded text-center text-sm"
                  onChange={(e) => onChange("marginTop", e.target.value)}
                />
                <div></div>
                <input
                  type="number"
                  placeholder="0"
                  value={element.props.marginLeft || ""}
                  className="p-2 border border-gray-300 rounded text-center text-sm"
                  onChange={(e) => onChange("marginLeft", e.target.value)}
                />
                <div></div>
                <input
                  type="number"
                  placeholder="0"
                  value={element.props.marginRight || ""}
                  className="p-2 border border-gray-300 rounded text-center text-sm"
                  onChange={(e) => onChange("marginRight", e.target.value)}
                />
                <div></div>
                <input
                  type="number"
                  placeholder="0"
                  value={element.props.marginBottom || ""}
                  className="p-2 border border-gray-300 rounded text-center text-sm"
                  onChange={(e) => onChange("marginBottom", e.target.value)}
                />
                <div></div>
              </div>
            </div>

            {/* Padding */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Padding
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <input
                  type="number"
                  placeholder="5"
                  value={element.props.paddingTop || ""}
                  className="p-2 border border-gray-300 rounded text-center text-sm"
                  onChange={(e) => onChange("paddingTop", e.target.value)}
                />
                <div></div>
                <input
                  type="number"
                  placeholder="15"
                  value={element.props.paddingLeft || ""}
                  className="p-2 border border-gray-300 rounded text-center text-sm"
                  onChange={(e) => onChange("paddingLeft", e.target.value)}
                />
                <div></div>
                <input
                  type="number"
                  placeholder="15"
                  value={element.props.paddingRight || ""}
                  className="p-2 border border-gray-300 rounded text-center text-sm"
                  onChange={(e) => onChange("paddingRight", e.target.value)}
                />
                <div></div>
                <input
                  type="number"
                  placeholder="5"
                  value={element.props.paddingBottom || ""}
                  className="p-2 border border-gray-300 rounded text-center text-sm"
                  onChange={(e) => onChange("paddingBottom", e.target.value)}
                />
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
