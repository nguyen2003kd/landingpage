"use client";

import React from "react";
import ColumnSettings from "./ColumnSettings";
import { useBuilderStore } from "@/store/useBuilderStore";
import { SectionLayout } from "@/types/element";

// Demo component để test ColumnSettings
export default function ColumnSettingsDemo() {
  const { selectColumn, updateColumnSettings, getColumnSettings, elements, setElements } = useBuilderStore();
  
  const [selectedLayout, setSelectedLayout] = React.useState<SectionLayout>("2-2");
  const [selectedColumn, setSelectedColumn] = React.useState(0);
  
  // Mock section element với layout
  React.useEffect(() => {
    const mockSection = {
      id: "demo-section-1",
      type: "section" as const,
      props: {
        layout: selectedLayout, // Now type-safe
        backgroundColor: "#ffffff",
      },
      children: [],
    };
    
    setElements([mockSection]);
  }, [selectedLayout, setElements]);

  const mockColumnId = `demo-section-1-${selectedColumn}`;

  const handleColumnUpdate = (key: string, value: string) => {
    console.log("Demo: Column setting updated:", key, value);
    updateColumnSettings("demo-section-1", selectedColumn, { [key]: value });
  };

  const columnSettings = getColumnSettings("demo-section-1", selectedColumn);

  const getMaxColumns = () => {
    switch (selectedLayout) {
      case "default": return 1;
      case "1-1-1-1": return 4;
      default: return 2;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg bg-white">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="font-semibold">Demo ColumnSettings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Test component cho cài đặt cột
        </p>
        
        {/* Layout Selector */}
        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Test Layout:
          </label>
          <select
            value={selectedLayout}
            onChange={(e) => {
              setSelectedLayout(e.target.value as SectionLayout);
              setSelectedColumn(0); // Reset to first column
            }}
            className="w-full text-xs border border-gray-300 rounded px-2 py-1"
          >
            <option value="default">Single Column (default)</option>
            <option value="2-2">Two Columns (2-2)</option>
            <option value="1-1-1-1">Four Columns (1-1-1-1)</option>
            <option value="3-1">Three-One (3-1)</option>
            <option value="1-3">One-Three (1-3)</option>
          </select>
        </div>

        {/* Column Selector */}
        <div className="mt-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Test Column:
          </label>
          <select
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(parseInt(e.target.value))}
            className="w-full text-xs border border-gray-300 rounded px-2 py-1"
          >
            {Array.from({ length: getMaxColumns() }, (_, i) => (
              <option key={i} value={i}>
                Cột {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <ColumnSettings
        columnId={mockColumnId}
        columnIndex={selectedColumn}
        columnSettings={columnSettings}
        onChange={handleColumnUpdate}
      />
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <h3 className="font-medium mb-2">Current Settings:</h3>
        <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-32">
          {JSON.stringify(columnSettings, null, 2)}
        </pre>
        
        <div className="mt-3 text-xs text-gray-600">
          <div><strong>Layout:</strong> {selectedLayout}</div>
          <div><strong>Selected Column:</strong> {selectedColumn + 1}</div>
          <div><strong>Total Columns:</strong> {getMaxColumns()}</div>
        </div>
      </div>
    </div>
  );
}
