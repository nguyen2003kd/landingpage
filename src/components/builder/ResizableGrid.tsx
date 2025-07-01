"use client";

import React from "react";

interface ResizableGridProps {
  sectionId: string;
  layout: string;
  children: React.ReactNode[];
  isSelected: boolean;
  columnRatio?: number[];
}

const ResizableGrid: React.FC<ResizableGridProps> = ({
  layout,
  children,
  columnRatio,
}) => {
  // Lấy tỷ lệ cột từ props hoặc mặc định
  const getGridTemplate = () => {
    if (columnRatio && columnRatio.length > 0) {
      return columnRatio.map((ratio) => `${ratio}fr`).join(" ");
    }

    // Trả về tỷ lệ mặc định dựa trên layout
    switch (layout) {
      case "2-2":
        return "1fr 1fr"; // 50% - 50%
      case "1-1-1-1":
        return "1fr 1fr 1fr 1fr"; // 25% mỗi cột
      case "3-1":
        return "3fr 1fr"; // 75% - 25%
      case "1-3":
        return "1fr 3fr"; // 25% - 75%
      default:
        return "1fr";
    }
  };

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: getGridTemplate(),
      }}
    >
      {children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
};

export default ResizableGrid;
