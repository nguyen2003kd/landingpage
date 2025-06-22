import React from "react";

type CanvasWrapperProps = {
  width?: number; // độ rộng canvas thật
  scale?: number; // hệ số co canvas để hiển thị vừa khung thiết kế
  children: React.ReactNode;
};

export default function CanvasWrapper({
  width = 1280,
  scale = 1,
  children
}: CanvasWrapperProps) {
  return (
    <div className="w-full flex justify-center overflow-auto">
      <div
        className="relative border bg-white shadow-md"
        style={{
          width,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          minHeight: 600,
        }}
      >
        {children}
      </div>
    </div>
  );
}
