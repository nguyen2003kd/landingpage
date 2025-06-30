"use client";

import React from "react";
import { Settings } from "lucide-react";
import { CanvasElement, SectionLayout } from "@/types/element";

interface SectionSettingsProps {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
}

export default function SectionSettings({
  element,
  onChange,
}: SectionSettingsProps) {
  const [activeTab, setActiveTab] = React.useState("content");
  const [expandedSections, setExpandedSections] = React.useState<{
    [key: string]: boolean;
  }>({});

  const layouts: { value: SectionLayout; label: string }[] = [
    { value: "default", label: "Mặc định (dọc)" },
    { value: "2-2", label: "2 cột bằng nhau" },
    { value: "1-1-1-1", label: "4 cột bằng nhau" },
    { value: "3-1", label: "Cột trái lớn" },
    { value: "1-3", label: "Cột phải lớn" },
  ];

  const tabs = [
    { id: "content", label: "Nội dung" },
    { id: "design", label: "Thiết kế" },
    { id: "effects", label: "Hiệu ứng" },
    { id: "advanced", label: "Nâng cao" },
  ];

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const renderContentTab = () => (
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
      <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
        💡 Tip: Thay đổi layout sẽ ảnh hưởng đến cách sắp xếp các component con
        bên trong section này.
      </div>

      {/* Kích thước cột - chỉ hiển thị khi có grid layout */}
      {element.props.layout && element.props.layout !== "default" && (
        <div className="border border-gray-200 rounded-lg">
          <div
            className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => toggleSection("columnWidths")}
          >
            <span className="text-sm font-medium text-gray-700">Kích thước cột</span>
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
                        <span className="text-xs text-gray-500 w-12">Cột 1:</span>
                        <input
                          type="range"
                          min="25"
                          max="75"
                          step="5"
                          value={element.props.columnRatio ? 
                            parseInt(element.props.columnRatio.split(":")[0]) : 50}
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
                            value={element.props.columnRatio ? 
                              parseInt(element.props.columnRatio.split(":")[0]) : 50}
                            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 50;
                              onChange("columnRatio", `${value}:${100 - value}`);
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
                        <span className="text-xs text-gray-500 w-12">Toàn bộ:</span>
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
                      <span className="text-xs text-gray-500 w-16">Cột trái:</span>
                      <input
                        type="range"
                        min="60"
                        max="80"
                        step="5"
                        value={element.props.columnRatio ? 
                          parseInt(element.props.columnRatio.split(":")[0]) : 75}
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
                          value={element.props.columnRatio ? 
                            parseInt(element.props.columnRatio.split(":")[0]) : 75}
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
                      <span className="text-xs text-gray-500 w-16">Cột trái:</span>
                      <input
                        type="range"
                        min="20"
                        max="40"
                        step="5"
                        value={element.props.columnRatio ? 
                          parseInt(element.props.columnRatio.split(":")[0]) : 25}
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
                          value={element.props.columnRatio ? 
                            parseInt(element.props.columnRatio.split(":")[0]) : 25}
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
                  💡 Tip: Điều chỉnh kích thước cột để tối ưu hóa hiển thị nội dung trên các thiết bị khác nhau
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

  const renderDesignTab = () => (
    <div className="space-y-4">
      {/* Màu nền */}
      <div className="border border-gray-200 rounded-lg">
        <div
          className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
          onClick={() => toggleSection("backgroundColor")}
        >
          <span className="text-sm font-medium text-gray-700">Màu nền</span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              expandedSections.backgroundColor ? "rotate-90" : ""
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
        {expandedSections.backgroundColor && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="space-y-3">
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
                      onChange("backgroundColor", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Chọn màu"
                    className="flex-1 text-sm text-gray-500 bg-transparent outline-none"
                    onChange={(e) =>
                      onChange("backgroundColor", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ảnh nền */}
      <div className="border border-gray-200 rounded-lg">
        <div
          className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
          onClick={() => toggleSection("backgroundImage")}
        >
          <span className="text-sm font-medium text-gray-700">Ảnh nền</span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              expandedSections.backgroundImage ? "rotate-90" : ""
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
        {expandedSections.backgroundImage && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white">
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-sm text-gray-500 mb-2">
                      Tải ảnh lên (tối đa 20MB)
                    </span>
                    <span className="text-xs text-orange-500">hoặc</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Dùng đường dẫn ảnh"
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                    onChange={(e) =>
                      onChange("backgroundImage", e.target.value)
                    }
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                    onClick={() => {
                      const input = document.querySelector(
                        'input[placeholder="Dùng đường dẫn ảnh"]'
                      ) as HTMLInputElement;
                      if (input?.value) {
                        onChange("backgroundImage", input.value);
                      }
                    }}
                  >
                    Dùng ảnh
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video nền */}
      <div className="border border-gray-200 rounded-lg">
        <div
          className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
          onClick={() => toggleSection("backgroundVideo")}
        >
          <span className="text-sm font-medium text-gray-700">Video nền</span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              expandedSections.backgroundVideo ? "rotate-90" : ""
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
        {expandedSections.backgroundVideo && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="space-y-3">
              <div className="flex gap-2 mb-3">
                <button className="flex-1 p-2 bg-gray-200 text-gray-700 text-sm rounded-lg">
                  YouTube
                </button>
                <button className="flex-1 p-2 bg-white text-gray-600 text-sm rounded-lg border border-gray-300">
                  Upload
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đường dẫn Youtube
                </label>
                <input
                  type="text"
                  placeholder="Nhập đường dẫn Youtube"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  onChange={(e) => onChange("backgroundVideo", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Độ mờ lớp phủ nền
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue="0"
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm text-center"
                    onChange={(e) => onChange("videoOpacity", e.target.value)}
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Viền và bo góc */}
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
                    defaultValue="0"
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
                    className="flex-1 p-2 border border-gray-300 rounded text-sm hover:bg-gray-100"
                    onClick={() => onChange("borderStyle", "solid")}
                  >
                    —
                  </button>
                  <button
                    className="flex-1 p-2 border border-gray-300 rounded text-sm hover:bg-gray-100"
                    onClick={() => onChange("borderStyle", "dashed")}
                  >
                    ···
                  </button>
                  <button
                    className="flex-1 p-2 border border-gray-300 rounded text-sm hover:bg-gray-100"
                    onClick={() => onChange("borderStyle", "dotted")}
                  >
                    ····
                  </button>
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
    </div>
  );

  const renderEffectsTab = () => (
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
            defaultValue="#000000"
            onChange={(e) => onChange("borderColor", e.target.value)}
          />
          <input
            type="text"
            placeholder="Chọn màu"
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
              defaultValue="100"
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

  const renderAdvancedTab = () => (
    <div className="space-y-4">
      {/* Mã phần tử */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mã phần tử
        </label>
        <input
          type="text"
          placeholder="Nhập mã"
          className="w-full p-3 border border-gray-200 rounded-lg text-sm"
          onChange={(e) => onChange("elementId", e.target.value)}
        />
      </div>

      {/* Khoảng cách */}
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
                Chú ý: Margin và Padding quá cao có thể làm vỡ thiết kế trên
                điện thoại
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
                    className="p-2 border border-gray-300 rounded text-center text-sm"
                    onChange={(e) => onChange("marginTop", e.target.value)}
                  />
                  <div></div>
                  <input
                    type="number"
                    placeholder="0"
                    className="p-2 border border-gray-300 rounded text-center text-sm"
                    onChange={(e) => onChange("marginLeft", e.target.value)}
                  />
                  <div></div>
                  <input
                    type="number"
                    placeholder="0"
                    className="p-2 border border-gray-300 rounded text-center text-sm"
                    onChange={(e) => onChange("marginRight", e.target.value)}
                  />
                  <div></div>
                  <input
                    type="number"
                    placeholder="0"
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
                    className="p-2 border border-gray-300 rounded text-center text-sm"
                    onChange={(e) => onChange("paddingTop", e.target.value)}
                  />
                  <div></div>
                  <input
                    type="number"
                    placeholder="15"
                    className="p-2 border border-gray-300 rounded text-center text-sm"
                    onChange={(e) => onChange("paddingLeft", e.target.value)}
                  />
                  <div></div>
                  <input
                    type="number"
                    placeholder="15"
                    className="p-2 border border-gray-300 rounded text-center text-sm"
                    onChange={(e) => onChange("paddingRight", e.target.value)}
                  />
                  <div></div>
                  <input
                    type="number"
                    placeholder="5"
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

      {/* Ẩn/Hiển thị trên thiết bị */}
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "content":
        return renderContentTab();
      case "design":
        return renderDesignTab();
      case "effects":
        return renderEffectsTab();
      case "advanced":
        return renderAdvancedTab();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
}
