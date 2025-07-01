"use client";

import React from "react";
import DesignTab from "./tabs/DesignTab";
import EffectsTab from "./tabs/EffectsTab";
import AdvancedTab from "./tabs/AdvancedTab";
import { useBuilderStore } from "@/store/useBuilderStore";

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

  // Get store to find parent section info
  const { elements, updateColumnSettings, getColumnSettings } =
    useBuilderStore();

  // Extract sectionId từ columnId (format: "sectionId-columnIndex")
  const sectionId = columnId.split("-")[0];

  // Find parent section element to get layout info
  const findElementInTree = (elements: any[], id: string): any => {
    for (const el of elements) {
      if (el.id === id) return el;
      if (el.children) {
        const found = findElementInTree(el.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const parentSection = findElementInTree(elements, sectionId);
  const sectionLayout = parentSection?.props?.layout || "2:2";

  // Enhanced onChange để auto-balance các cột khác
  const handleChange = (key: string, value: string) => {
    onChange(key, value);

    // Auto-balance width khi thay đổi desktopWidth
    if (key === "desktopWidth") {
      const newWidth = parseFloat(value);

      if (sectionLayout === "1-1-1-1") {
        // 4 column layout - balance các cột còn lại
        const otherColumns = [0, 1, 2, 3].filter((i) => i !== columnIndex);
        const remainingWidth = 100 - newWidth;
        const widthPerOther = Math.round((remainingWidth / 3) * 100) / 100;

        otherColumns.forEach((colIndex, idx) => {
          const finalWidth =
            idx === otherColumns.length - 1
              ? Math.round(
                  (remainingWidth - widthPerOther * (otherColumns.length - 1)) *
                    100
                ) / 100
              : widthPerOther;
          updateColumnSettings(sectionId, colIndex, {
            desktopWidth: finalWidth.toString(),
          });
        });
      } else {
        // 2 column layout - balance cột còn lại
        const otherColumnIndex = columnIndex === 0 ? 1 : 0;
        const otherWidth = Math.max(
          0,
          Math.round((100 - newWidth) * 100) / 100
        );
        updateColumnSettings(sectionId, otherColumnIndex, {
          desktopWidth: otherWidth.toString(),
        });
      }
    }
  };

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
            onChange={handleChange}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            sectionLayout={sectionLayout}
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
          {process.env.NODE_ENV === "development" && (
            <div className="text-xs text-gray-400 mt-2 p-2 bg-gray-50 rounded">
              Debug: Layout={sectionLayout}, ColumnId={columnId}, SectionId=
              {sectionId}
            </div>
          )}
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
  columnSettings,
  onChange,
  expandedSections,
  toggleSection,
  sectionLayout,
}: {
  columnIndex: number;
  columnSettings: Record<string, string>;
  onChange: (key: string, value: string) => void;
  expandedSections: { [key: string]: boolean };
  toggleSection: (key: string) => void;
  sectionLayout: string;
}) {
  // Detect layout type based on sectionLayout
  const getLayoutType = () => {
    switch (sectionLayout) {
      case "default":
        return "single";
      case "2-2":
        return "2-2";
      case "1-1-1-1":
        return "1-1-1-1";
      case "3-1":
        return "3-1";
      case "1-3":
        return "1-3";
      default:
        return "2-2";
    }
  };

  const layoutType = getLayoutType();

  const renderContentBasedOnLayout = () => {
    switch (layoutType) {
      case "single":
        return renderSingleColumnContent();
      case "2-2":
        return renderTwoColumnContent();
      case "1-1-1-1":
        return renderFourColumnContent();
      case "3-1":
        return renderThreeOneColumnContent();
      case "1-3":
        return renderOneThreeColumnContent();
      default:
        return renderDefaultContent();
    }
  };

  const renderSingleColumnContent = () => (
    <div className="space-y-4">
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Nội dung cột duy nhất
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiều rộng cột trên máy tính
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="50"
                max="100"
                value={columnSettings.desktopWidth || "100"}
                className="flex-1"
                onChange={(e) => {
                  console.log("Single column width changed:", e.target.value);
                  onChange("desktopWidth", e.target.value);
                }}
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={columnSettings.desktopWidth || "100"}
                  className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                  onChange={(e) => onChange("desktopWidth", e.target.value)}
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
              <input
                type="range"
                min="100"
                max="100"
                value="100"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiều cao cột
            </label>
            <select
              value={columnSettings.columnHeight || "auto"}
              onChange={(e) => {
                console.log("Single column height changed:", e.target.value);
                onChange("columnHeight", e.target.value);
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="auto">Mặc định</option>
              <option value="fit-content">Vừa với nội dung</option>
              <option value="full-height">Chiều cao đầy đủ</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTwoColumnContent = () => (
    <div className="space-y-4">
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Cột {columnIndex + 1} (Layout {sectionLayout})
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiều rộng cột trên máy tính
            </label>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 w-16">
                {columnIndex === 0 ? "Cột trái:" : "Cột phải:"}
              </span>
              <input
                type="range"
                min="10"
                max="90"
                step="1"
                value={columnSettings.desktopWidth || "50"}
                className="flex-0"
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  if (newValue >= 10 && newValue <= 90) {
                    console.log(
                      "Two column width changed:",
                      newValue,
                      "for column:",
                      columnIndex
                    );
                    onChange("desktopWidth", newValue.toString());
                  }
                }}
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="10"
                  max="90"
                  step="0.1"
                  value={columnSettings.desktopWidth || "50"}
                  className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    if (newValue >= 10 && newValue <= 90) {
                      onChange("desktopWidth", newValue.toString());
                    }
                  }}
                />
                <span className="text-xs text-gray-500">%</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Cột còn lại:{" "}
              {Math.round(
                (100 - parseFloat(columnSettings.desktopWidth || "50")) * 100
              ) / 100}
              %
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiều rộng cột trên điện thoại
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16">Toàn bộ:</span>
              <input
                type="range"
                min="100"
                max="100"
                value="100"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Căn chỉnh nội dung bên trong theo chiều dọc
            </label>
            <div className="flex gap-2">
              {["top", "center", "bottom"].map((align) => (
                <button
                  key={align}
                  onClick={() => onChange("verticalAlign", align)}
                  className={`flex-1 p-2 text-xs border rounded ${
                    (columnSettings.verticalAlign || "top") === align
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-4 h-3 border flex ${
                        align === "top"
                          ? "items-start"
                          : align === "center"
                          ? "items-center"
                          : "items-end"
                      }`}
                    >
                      <div className="w-full h-1 bg-current"></div>
                    </div>
                    <span className="capitalize">
                      {align === "top"
                        ? "Trên"
                        : align === "center"
                        ? "Giữa"
                        : "Dưới"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFourColumnContent = () => (
    <div className="space-y-4">
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Cột {columnIndex + 1} (Layout 1:1:1:1)
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiều rộng cột trên máy tính
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16">
                Cột {columnIndex + 1}:
              </span>
              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={columnSettings.desktopWidth || "25"}
                className="flex-1"
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  if (newValue >= 10 && newValue <= 40) {
                    console.log(
                      "Four column width changed:",
                      newValue,
                      "for column:",
                      columnIndex
                    );
                    onChange("desktopWidth", newValue.toString());
                  }
                }}
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="10"
                  max="40"
                  step="0.1"
                  value={columnSettings.desktopWidth || "25"}
                  className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    if (newValue >= 10 && newValue <= 40) {
                      onChange("desktopWidth", newValue.toString());
                    }
                  }}
                />
                <span className="text-xs text-gray-500">%</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              3 cột còn lại chia đều:{" "}
              {Math.round(
                ((100 - parseFloat(columnSettings.desktopWidth || "25")) / 3) *
                  100
              ) / 100}
              % mỗi cột
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiều rộng cột trên điện thoại
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16">Toàn bộ:</span>
              <input
                type="range"
                min="100"
                max="100"
                value="100"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Căn chỉnh nội dung bên trong theo chiều dọc
            </label>
            <div className="flex gap-2">
              {["top", "center", "bottom"].map((align) => (
                <button
                  key={align}
                  onClick={() => onChange("verticalAlign", align)}
                  className={`flex-1 p-2 text-xs border rounded ${
                    (columnSettings.verticalAlign || "top") === align
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-4 h-3 border flex ${
                        align === "top"
                          ? "items-start"
                          : align === "center"
                          ? "items-center"
                          : "items-end"
                      }`}
                    >
                      <div className="w-full h-1 bg-current"></div>
                    </div>
                    <span className="capitalize">
                      {align === "top"
                        ? "Trên"
                        : align === "center"
                        ? "Giữa"
                        : "Dưới"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderThreeOneColumnContent = () => (
    <div className="space-y-4">
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          {columnIndex === 0 ? "Cột trái (Lớn)" : "Cột phải (Nhỏ)"} - Layout 3:1
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiều rộng cột trên máy tính
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16">
                {columnIndex === 0 ? "Cột lớn:" : "Cột nhỏ:"}
              </span>
              <input
                type="range"
                min={columnIndex === 0 ? "60" : "20"}
                max={columnIndex === 0 ? "80" : "40"}
                step="5"
                value={
                  columnSettings.desktopWidth ||
                  (columnIndex === 0 ? "66.66" : "33.33")
                }
                className="flex-1"
                onChange={(e) => onChange("desktopWidth", e.target.value)}
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={columnIndex === 0 ? "60" : "20"}
                  max={columnIndex === 0 ? "80" : "40"}
                  value={
                    columnSettings.desktopWidth ||
                    (columnIndex === 0 ? "66.66" : "33.33")
                  }
                  className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                  onChange={(e) => onChange("desktopWidth", e.target.value)}
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
              <span className="text-xs text-gray-500 w-16">Toàn bộ:</span>
              <input
                type="range"
                min="100"
                max="100"
                value="100"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Căn chỉnh nội dung bên trong theo chiều dọc
            </label>
            <div className="flex gap-2">
              {["top", "center", "bottom"].map((align) => (
                <button
                  key={align}
                  onClick={() => onChange("verticalAlign", align)}
                  className={`flex-1 p-2 text-xs border rounded ${
                    (columnSettings.verticalAlign || "top") === align
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-4 h-3 border flex ${
                        align === "top"
                          ? "items-start"
                          : align === "center"
                          ? "items-center"
                          : "items-end"
                      }`}
                    >
                      <div className="w-full h-1 bg-current"></div>
                    </div>
                    <span className="capitalize">
                      {align === "top"
                        ? "Trên"
                        : align === "center"
                        ? "Giữa"
                        : "Dưới"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOneThreeColumnContent = () => (
    <div className="space-y-4">
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          {columnIndex === 0 ? "Cột trái (Nhỏ)" : "Cột phải (Lớn)"} - Layout 1:3
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chiều rộng cột trên máy tính
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16">
                {columnIndex === 0 ? "Cột nhỏ:" : "Cột lớn:"}
              </span>
              <input
                type="range"
                min={columnIndex === 0 ? "20" : "60"}
                max={columnIndex === 0 ? "40" : "80"}
                step="5"
                value={
                  columnSettings.desktopWidth ||
                  (columnIndex === 0 ? "33.33" : "66.66")
                }
                className="flex-1"
                onChange={(e) => onChange("desktopWidth", e.target.value)}
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={columnIndex === 0 ? "20" : "60"}
                  max={columnIndex === 0 ? "40" : "80"}
                  value={
                    columnSettings.desktopWidth ||
                    (columnIndex === 0 ? "33.33" : "66.66")
                  }
                  className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
                  onChange={(e) => onChange("desktopWidth", e.target.value)}
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
              <span className="text-xs text-gray-500 w-16">Toàn bộ:</span>
              <input
                type="range"
                min="100"
                max="100"
                value="100"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Căn chỉnh nội dung bên trong theo chiều dọc
            </label>
            <div className="flex gap-2">
              {["top", "center", "bottom"].map((align) => (
                <button
                  key={align}
                  onClick={() => onChange("verticalAlign", align)}
                  className={`flex-1 p-2 text-xs border rounded ${
                    (columnSettings.verticalAlign || "top") === align
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-4 h-3 border flex ${
                        align === "top"
                          ? "items-start"
                          : align === "center"
                          ? "items-center"
                          : "items-end"
                      }`}
                    >
                      <div className="w-full h-1 bg-current"></div>
                    </div>
                    <span className="capitalize">
                      {align === "top"
                        ? "Trên"
                        : align === "center"
                        ? "Giữa"
                        : "Dưới"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDefaultContent = () => (
    <div className="space-y-4">
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Cài đặt cột cơ bản</h4>
        <div className="text-sm text-gray-600">
          Chọn layout để hiển thị các tùy chọn cấu hình chi tiết.
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderContentBasedOnLayout()}

      <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
        💡 Tip: Các thay đổi sẽ được áp dụng ngay lập tức vào thiết kế của bạn.
      </div>
    </div>
  );
}
