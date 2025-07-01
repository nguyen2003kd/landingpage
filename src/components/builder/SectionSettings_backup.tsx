"use client";

import React from "react";
import { CanvasElement } from "@/types/element";
import ContentTab from "../settings/tabs/ContentTab";
import DesignTab from "../settings/tabs/DesignTab";
import EffectsTab from "../settings/tabs/EffectsTab";
import AdvancedTab from "../settings/tabs/AdvancedTab";

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
