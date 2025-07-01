"use client";

import React from "react";
import { Settings } from "lucide-react";
import { CanvasElement, SectionLayout } from "@/types/element";

interface ContentTabProps {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
  expandedSections: { [key: string]: boolean };
  toggleSection: (sectionKey: string) => void;
}

export default function ContentTab({
  element,
  onChange,
  expandedSections,
  toggleSection,
}: ContentTabProps) {
  const layouts: { value: SectionLayout; label: string }[] = [
    { value: "default", label: "Mặc định (dọc)" },
    { value: "2-2", label: "2 cột bằng nhau" },
    { value: "1-1-1-1", label: "4 cột bằng nhau" },
    { value: "3-1", label: "Cột trái lớn" },
    { value: "1-3", label: "Cột phải lớn" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Layout Section
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={element.props.layout || "default"}
          onChange={(e) => onChange("layout", e.target.value)}
        >
          {layouts.map((layout) => (
            <option key={layout.value} value={layout.value}>
              {layout.label}
            </option>
          ))}
        </select>
      </div>

      {/* Kích thước cột - chỉ hiển thị khi có grid layout */}
      {element.props.layout && element.props.layout !== "default" && (
        <div className="border border-gray-200 rounded-lg">
          <div
            className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => toggleSection("columnWidths")}
          >
            <span className="text-sm font-medium text-gray-700">
              Kích thước cột
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${
                expandedSections.columnWidths ? "rotate-90" : ""
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
          {expandedSections.columnWidths && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="space-y-3">
                {/* Hiển thị slider cho từng cột dựa trên layout */}
                {element.props.layout === "2-2" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chiều rộng cột trên máy tính
                      </label>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-12">
                          Cột 1:
                        </span>
                        <input
                          type="range"
                          min="25"
                          max="75"
                          step="5"
                          value={
                            element.props.columnRatio
                              ? parseInt(
                                  element.props.columnRatio.split(":")[0]
                                )
                              : 50
                          }
                          className="flex-1"
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            onChange("columnRatio", `${value}:${100 - value}`);
                          }}
                        />
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="25"
                            max="75"
                            value={
                              element.props.columnRatio
                                ? parseInt(
                                    element.props.columnRatio.split(":")[0]
                                  )
                                : 50
                            }
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 50;
                              onChange(
                                "columnRatio",
                                `${value}:${100 - value}`
                              );
                            }}
                          />
                          <span className="text-xs text-gray-500">%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chiều rộng cột trên điện thoại
                      </label>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-12">
                          Toàn bộ:
                        </span>
                        <input
                          type="range"
                          min="100"
                          max="100"
                          step="1"
                          defaultValue="100"
                          className="flex-1"
                          disabled
                        />
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value="100"
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded bg-gray-100"
                            disabled
                          />
                          <span className="text-xs text-gray-500">%</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {element.props.layout === "3-1" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tỷ lệ cột (Trái : Phải)
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-16">
                        Cột trái:
                      </span>
                      <input
                        type="range"
                        min="60"
                        max="80"
                        step="5"
                        value={
                          element.props.columnRatio
                            ? parseInt(element.props.columnRatio.split(":")[0])
                            : 75
                        }
                        className="flex-1"
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          onChange("columnRatio", `${value}:${100 - value}`);
                        }}
                      />
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="60"
                          max="80"
                          value={
                            element.props.columnRatio
                              ? parseInt(
                                  element.props.columnRatio.split(":")[0]
                                )
                              : 75
                          }
                          className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 75;
                            onChange("columnRatio", `${value}:${100 - value}`);
                          }}
                        />
                        <span className="text-xs text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                )}

                {element.props.layout === "1-3" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tỷ lệ cột (Trái : Phải)
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-16">
                        Cột trái:
                      </span>
                      <input
                        type="range"
                        min="20"
                        max="40"
                        step="5"
                        value={
                          element.props.columnRatio
                            ? parseInt(element.props.columnRatio.split(":")[0])
                            : 25
                        }
                        className="flex-1"
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          onChange("columnRatio", `${value}:${100 - value}`);
                        }}
                      />
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="20"
                          max="40"
                          value={
                            element.props.columnRatio
                              ? parseInt(
                                  element.props.columnRatio.split(":")[0]
                                )
                              : 25
                          }
                          className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 25;
                            onChange("columnRatio", `${value}:${100 - value}`);
                          }}
                        />
                        <span className="text-xs text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                )}

                {element.props.layout === "1-1-1-1" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chiều cao cột
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      defaultValue="auto"
                      onChange={(e) => onChange("columnHeight", e.target.value)}
                    >
                      <option value="auto">Tự động</option>
                      <option value="equal">Chiều cao bằng nhau</option>
                      <option value="fit-content">Vừa với nội dung</option>
                    </select>
                  </div>
                )}

                <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                  💡 Tip: Điều chỉnh kích thước cột để tối ưu hóa hiển thị nội
                  dung trên các thiết bị khác nhau
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
        💡 Tip: Thay đổi layout sẽ ảnh hưởng đến cách sắp xếp các component con
        bên trong section này.
      </div>
    </div>
  );
}
