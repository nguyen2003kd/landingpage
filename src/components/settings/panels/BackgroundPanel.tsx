"use client";

import React from "react";
import { CanvasElement } from "@/types/element";

interface BackgroundPanelProps {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
  expandedSections: { [key: string]: boolean };
  toggleSection: (sectionKey: string) => void;
}

export default function BackgroundPanel({
  element,
  onChange,
  expandedSections,
  toggleSection,
}: BackgroundPanelProps) {
  return (
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
                <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg bg-white">
                  <input
                    type="color"
                    className="w-1/2 h-10 border border-gray-300 rounded cursor-pointer"
                    value={element.props.backgroundColor || "#ffffff"}
                    onChange={(e) =>
                      onChange("backgroundColor", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Nhập mã màu (vd: #ff0000)"
                    value={element.props.backgroundColor || ""}
                    className="w-1/2 px-3 py-2 text-sm text-gray-700 bg-transparent border border-gray-300 rounded outline-none focus:border-blue-400"
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
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="background-image-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const imageUrl = event.target?.result as string;
                            onChange("backgroundImage", imageUrl);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label
                      htmlFor="background-image-upload"
                      className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded cursor-pointer hover:bg-blue-600"
                    >
                      Chọn file
                    </label>
                  </div>
                </div>
                <div className="space-y-2 mt-3">
                  <input
                    type="text"
                    placeholder="Dùng đường dẫn ảnh"
                    value={element.props.backgroundImage || ""}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    onChange={(e) =>
                      onChange("backgroundImage", e.target.value)
                    }
                  />
                  <button
                    className="w-full px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                    onClick={() => {
                      const input = document.querySelector(
                        'input[placeholder="Dùng đường dẫn ảnh"]'
                      ) as HTMLInputElement;
                      if (input?.value) {
                        onChange("backgroundImage", input.value);
                        alert("Ảnh nền đã được cập nhật!");
                      } else {
                        alert("Vui lòng nhập đường dẫn ảnh!");
                      }
                    }}
                  >
                    Áp dụng
                  </button>
                </div>

                {/* Preview ảnh nền */}
                {element.props.backgroundImage && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview
                    </label>
                    <div className="relative w-32 h-20 mx-auto">
                      <img
                        src={element.props.backgroundImage}
                        alt="Background preview"
                        className="w-full h-full object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                        onClick={() => onChange("backgroundImage", "")}
                        title="Xóa ảnh nền"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                {/* Vị trí ảnh nền - 9 vị trí lưới */}
                {element.props.backgroundImage && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vị trí ảnh nền
                    </label>
                    <div className="grid grid-cols-3 gap-1 w-fit border border-gray-300 rounded-lg p-2 bg-white">
                      {[
                        { label: "↖", value: "top left" },
                        { label: "↑", value: "top center" },
                        { label: "↗", value: "top right" },
                        { label: "←", value: "center left" },
                        { label: "●", value: "center" },
                        { label: "→", value: "center right" },
                        { label: "↙", value: "bottom left" },
                        { label: "↓", value: "bottom center" },
                        { label: "↘", value: "bottom right" },
                      ].map((position) => (
                        <button
                          key={position.value}
                          className={`w-8 h-8 flex items-center justify-center text-xs rounded border hover:bg-blue-50 ${
                            element.props.backgroundPosition === position.value
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-white text-gray-600 border-gray-300"
                          }`}
                          onClick={() =>
                            onChange("backgroundPosition", position.value)
                          }
                          title={position.value}
                        >
                          {position.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Độ mờ lớp phủ nền */}
                {element.props.backgroundImage && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Độ mờ lớp phủ nền
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={element.props.backgroundOverlayOpacity || "0"}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        onChange={(e) =>
                          onChange("backgroundOverlayOpacity", e.target.value)
                        }
                      />
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={element.props.backgroundOverlayOpacity || "0"}
                          className="w-12 text-center text-sm border border-gray-300 rounded px-1 py-1"
                          onChange={(e) =>
                            onChange("backgroundOverlayOpacity", e.target.value)
                          }
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Điều chỉnh độ mờ của lớp phủ màu đen trên ảnh nền
                    </div>
                  </div>
                )}

                {/* Hiệu ứng di chuyển ảnh nền */}
                {element.props.backgroundImage && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hiệu ứng di chuyển
                    </label>
                    <select
                      value={element.props.backgroundAnimation || "none"}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      onChange={(e) =>
                        onChange("backgroundAnimation", e.target.value)
                      }
                    >
                      <option value="none">Không có hiệu ứng</option>
                      <option value="horizontal">Chạy theo chiều ngang</option>
                      <option value="vertical">Chạy theo chiều dọc</option>
                      <option value="parallax">Hiệu ứng Parallax</option>
                    </select>
                    <div className="text-xs text-gray-500 mt-1">
                      Chọn hiệu ứng di chuyển cho ảnh nền
                    </div>
                  </div>
                )}
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
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Nhập đường dẫn Youtube"
                    value={element.props.backgroundVideo || ""}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    onChange={(e) =>
                      onChange("backgroundVideo", e.target.value)
                    }
                  />
                  <button
                    className="w-full px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                    onClick={() => {
                      if (element.props.backgroundVideo) {
                        alert(
                          "Video background đã được áp dụng! Kiểm tra section để xem video."
                        );
                      } else {
                        alert("Vui lòng nhập URL YouTube!");
                      }
                    }}
                  >
                    Test
                  </button>
                </div>

                {/* Preview Video */}
                {element.props.backgroundVideo && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview Video
                    </label>
                    <div className="relative">
                      <div className="w-full h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="w-8 h-8 text-red-500 mx-auto mb-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                          <p className="text-xs text-gray-600">
                            Video Background
                          </p>
                        </div>
                      </div>
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        onClick={() => onChange("backgroundVideo", "")}
                        title="Xóa video nền"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Độ mờ lớp phủ nền
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={element.props.videoOpacity || "0"}
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
    </div>
  );
}
