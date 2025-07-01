"use client";

import React from "react";
import { CanvasElement } from "@/types/element";
import ContentTab from "./tabs/ContentTab";
import DesignTab from "./tabs/DesignTab";
import EffectsTab from "./tabs/EffectsTab";
import AdvancedTab from "./tabs/AdvancedTab";

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "content":
        return (
          <ContentTab
            element={element}
            onChange={onChange}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      case "design":
        return (
          <DesignTab
            element={element}
            onChange={onChange}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      case "effects":
        return <EffectsTab element={element} onChange={onChange} />;
      case "advanced":
        return (
          <AdvancedTab
            element={element}
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
          <h3 className="font-semibold text-gray-800">Cài đặt Section</h3>
          <p className="text-sm text-gray-500 mt-1">
            Tùy chỉnh layout và giao diện cho section
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
