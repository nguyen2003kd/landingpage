"use client";

import React, { useState } from "react";
import BackgroundPanel from "@/components/settings/panels/BackgroundPanel";
import { CanvasElement } from "@/types/element";

export default function TestBackgroundPanelPage() {
  const [expandedSections, setExpandedSections] = useState({
    backgroundColor: true,
    backgroundImage: false,
    backgroundVideo: false,
  });

  const [mockElement, setMockElement] = useState<CanvasElement>({
    id: "test-element",
    type: "section",
    props: {
      backgroundColor: "#ffffff",
      backgroundImage: "",
      backgroundVideo: "",
      backgroundPosition: "center",
      backgroundOverlayOpacity: "0",
      backgroundAnimation: "none",
      videoOpacity: "0",
    },
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey as keyof typeof prev],
    }));
  };

  const handleElementChange = (key: string, value: string) => {
    setMockElement((prev) => ({
      ...prev,
      props: {
        ...prev.props,
        [key]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test BackgroundPanel với ColorPicker
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - BackgroundPanel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              BackgroundPanel Component
            </h2>

            <BackgroundPanel
              element={mockElement}
              onChange={handleElementChange}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
            />
          </div>

          {/* Right Column - Preview */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Preview Background
            </h2>

            {/* Background Preview */}
            <div
              className="w-full h-64 rounded-lg border-2 border-gray-300 relative overflow-hidden"
              style={{
                backgroundColor: mockElement.props.backgroundColor,
                backgroundImage: mockElement.props.backgroundImage
                  ? `url(${mockElement.props.backgroundImage})`
                  : "none",
                backgroundPosition:
                  mockElement.props.backgroundPosition || "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay for background image */}
              {mockElement.props.backgroundImage && (
                <div
                  className="absolute inset-0 bg-black"
                  style={{
                    opacity:
                      parseInt(
                        mockElement.props.backgroundOverlayOpacity || "0"
                      ) / 100,
                  }}
                />
              )}

              {/* Video background preview */}
              {mockElement.props.backgroundVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-center text-white">
                    <svg
                      className="w-12 h-12 mx-auto mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <p className="text-sm">Video Background</p>
                  </div>
                  <div
                    className="absolute inset-0 bg-black"
                    style={{
                      opacity:
                        parseInt(mockElement.props.videoOpacity || "0") / 100,
                    }}
                  />
                </div>
              )}

              {/* Content preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Background Preview
                  </h3>
                  <p className="text-gray-600">
                    Thay đổi background settings để xem preview
                  </p>
                </div>
              </div>
            </div>

            {/* Current Values Display */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Giá trị hiện tại:
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="space-y-1 text-xs">
                  <div>
                    <strong>Màu nền:</strong>{" "}
                    {mockElement.props.backgroundColor || "Không có"}
                  </div>
                  <div>
                    <strong>Ảnh nền:</strong>{" "}
                    {mockElement.props.backgroundImage ? "Có" : "Không có"}
                  </div>
                  <div>
                    <strong>Video nền:</strong>{" "}
                    {mockElement.props.backgroundVideo ? "Có" : "Không có"}
                  </div>
                  <div>
                    <strong>Vị trí ảnh:</strong>{" "}
                    {mockElement.props.backgroundPosition || "center"}
                  </div>
                  <div>
                    <strong>Độ mờ overlay:</strong>{" "}
                    {mockElement.props.backgroundOverlayOpacity || "0"}%
                  </div>
                  <div>
                    <strong>Hiệu ứng:</strong>{" "}
                    {mockElement.props.backgroundAnimation || "none"}
                  </div>
                  <div>
                    <strong>Video opacity:</strong>{" "}
                    {mockElement.props.videoOpacity || "0"}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Color Picker Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            🎨 ColorPicker với "Màu của tôi" và "Màu mẫu"
          </h3>
          <p className="text-sm text-blue-700">
            Click vào phần "Màu nền" để mở ColorPicker nâng cao với:
          </p>
          <ul className="text-sm text-blue-700 mt-2 ml-4 space-y-1">
            <li>
              • <strong>Màu của tôi:</strong> Lưu màu đã chọn gần đây vào
              localStorage
            </li>
            <li>
              • <strong>Màu mẫu:</strong> 32 màu đẹp được sắp xếp theo chủ đề
            </li>
            <li>
              • <strong>HSV Picker:</strong> Chọn màu chi tiết với hue,
              saturation, brightness
            </li>
            <li>
              • <strong>Gradient:</strong> Hỗ trợ gradient (đang phát triển)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
