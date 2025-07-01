"use client";

import React from "react";
import DesignTab from "./tabs/DesignTab";
import EffectsTab from "./tabs/EffectsTab";
import AdvancedTab from "./tabs/AdvancedTab";

interface ColumnSettingsProps {
  columnId: string;
  columnIndex: number;
  columnSettings: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export default function ColumnSettings({
  columnId,
  columnIndex,
  columnSettings,
  onChange,
}: ColumnSettingsProps) {
  const [activeTab, setActiveTab] = React.useState("content");
  const [expandedSections, setExpandedSections] = React.useState<{
    [key: string]: boolean;
  }>({});

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

  // Tạo một pseudo element object để tái sử dụng các tab components
  const pseudoElement = {
    id: columnId,
    type: "column" as const,
    props: {
      ...columnSettings,
      columnIndex,
    },
    children: [],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "content":
        return (
          <ColumnContentTab
            columnIndex={columnIndex}
            columnSettings={columnSettings}
            onChange={onChange}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      case "design":
        return (
          <DesignTab
            element={pseudoElement}
            onChange={onChange}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      case "effects":
        return <EffectsTab element={pseudoElement} onChange={onChange} />;
      case "advanced":
        return (
          <AdvancedTab
            element={pseudoElement}
            onChange={onChange}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="p-4">
          <h3 className="font-semibold text-gray-800">Cài đặt Cột</h3>
          <p className="text-sm text-gray-500 mt-1">
            Tùy chỉnh giao diện cho cột số {columnIndex + 1}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">{renderTabContent()}</div>
    </div>
  );
}

// Tab riêng cho Column Content vì khác với Section Content
function ColumnContentTab({
  columnIndex,
  // columnSettings,
  // onChange,
  expandedSections,
  toggleSection,
}: {
  columnIndex: number;
  columnSettings: Record<string, string>;
  onChange: (key: string, value: string) => void;
  expandedSections: { [key: string]: boolean };
  toggleSection: (key: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Column Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h4 className="text-sm font-medium text-blue-800">Thông tin cột</h4>
        </div>
        <p className="text-sm text-blue-600">
          Đang chỉnh sửa cột số {columnIndex + 1}
        </p>
        <p className="text-xs text-blue-500 mt-1">
          Cài đặt này chỉ ảnh hưởng đến cột được chọn, không ảnh hưởng đến các
          cột khác trong section.
        </p>
      </div>

      {/* Elements Management */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection("elements")}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h4 className="text-sm font-medium text-gray-700">
              Quản lý phần tử
            </h4>
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              expandedSections.elements ? "rotate-180" : ""
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
        </button>

        {expandedSections.elements && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="mt-3 space-y-3">
              <p className="text-sm text-gray-600">
                Kéo thả các phần tử từ sidebar vào cột này để thêm nội dung.
              </p>

              {/* Visual representation của drag zone */}
              <div className="border-2 border-dashed border-green-300 rounded-lg p-6 bg-gradient-to-br from-green-50/50 to-emerald-50/30">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-green-600 mb-1">
                    Vùng kéo thả
                  </p>
                  <p className="text-xs text-gray-500">
                    Cột số {columnIndex + 1}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-600">
                  💡 Mẹo: Click vào từng phần tử trong cột để chỉnh sửa riêng
                  biệt
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Column Size Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          <h4 className="text-sm font-medium text-gray-700">Kích thước cột</h4>
        </div>
        <p className="text-sm text-gray-600">
          Kích thước cột được xác định bởi layout của section cha. Để thay đổi
          kích thước, vui lòng chọn section cha và điều chỉnh layout.
        </p>
      </div>
    </div>
  );
}
