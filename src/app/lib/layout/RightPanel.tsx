"use client";

import React from "react";
import {
  X,
  Settings,
  Type,
  Link as LinkIcon,
  Image,
  FileText,
  Trash2,
  MousePointer,
} from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { CanvasElement, SectionLayout, TextProps, ButtonProps, ImageProps, CardProps, SectionProps } from "@/types/element";

// Helper function to find an element in a tree structure
const findElementInTree = (
  elements: CanvasElement[],
  id: string | null
): CanvasElement | null => {
  if (!id) return null;
  for (const element of elements) {
    if (element.id === id) return element;
    if (element.children) {
      const found = findElementInTree(element.children, id);
      if (found) return found;
    }
  }
  return null;
};

interface RightPanelProps {
  setSelectpanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightPanel = ({ setSelectpanel }: RightPanelProps) => {
  const { elements, selectedElementId, updateElement, removeElement, selectElement } =
    useBuilderStore();
  const selectedElement = findElementInTree(elements, selectedElementId);

  const handleUpdate = (key: string, value: string) => {
    if (selectedElementId) {
      updateElement(selectedElementId, { [key]: value });
    }
  };

  const handleDelete = () => {
    if (selectedElementId) {
      removeElement(selectedElementId);
      selectElement(null); // Deselect after deleting
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col text-black">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-800 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Cài đặt
        </h3>
        <button
          onClick={() => setSelectpanel(false)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {!selectedElement ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <MousePointer className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Vui lòng chọn phần tử để cấu hình
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-sm text-gray-500">
              Loại:{" "}
              <span className="font-medium capitalize text-gray-700">
                {selectedElement.type}
              </span>
            </div>

            {/* Render Settings Form based on type */}
            {selectedElement.type === "text" && (
              <TextSettings element={selectedElement} onChange={handleUpdate} />
            )}
            {selectedElement.type === "button" && (
              <ButtonSettings
                element={selectedElement}
                onChange={handleUpdate}
              />
            )}
            {selectedElement.type === "image" && (
              <ImageSettings
                element={selectedElement}
                onChange={handleUpdate}
              />
            )}
            {selectedElement.type === "card" && (
              <CardSettings element={selectedElement} onChange={handleUpdate} />
            )}
            {selectedElement.type === "section" && (
              <SectionSettings 
                element={selectedElement} 
                onChange={handleUpdate} 
              />
            )}
          </div>
        )}
      </div>

      {/* Footer with Delete Button */}
      {selectedElement && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Xóa phần tử này
          </button>
        </div>
      )}
    </div>
  );
};

// --- Settings Form Components ---
// (These are similar to what was in the old SettingsPanel)

function TextSettings({
  element,
  onChange,
}: {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
}) {
  const props = element.props as TextProps;
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Nội dung văn bản
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          rows={5}
          value={props.text || ""}
          onChange={(e) => onChange("text", e.target.value)}
        />
      </div>
    </div>
  );
}

function ButtonSettings({
  element,
  onChange,
}: {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
}) {
  const props = element.props as ButtonProps;
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Nội dung button
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={props.text || ""}
          onChange={(e) => onChange("text", e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <LinkIcon className="w-4 h-4" />
          Link URL
        </label>
        <input
          type="url"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={props.link || ""}
          onChange={(e) => onChange("link", e.target.value)}
        />
      </div>
    </div>
  );
}

function ImageSettings({
  element,
  onChange,
}: {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
}) {
  const props = element.props as ImageProps;
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Image className="w-4 h-4" />
          URL ảnh
        </label>
        <input
          type="url"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={props.url || ""}
          onChange={(e) => onChange("url", e.target.value)}
        />
      </div>
    </div>
  );
}

function CardSettings({
  element,
  onChange,
}: {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
}) {
  const props = element.props as CardProps;
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Tiêu đề card
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={props.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Mô tả
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          rows={3}
          value={props.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}

function SectionSettings({
  element,
  onChange,
}: {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
}) {
  const props = element.props as SectionProps;
  const layouts: { value: SectionLayout; label: string }[] = [
    { value: "default", label: "Mặc định (dọc)" },
    { value: "2-2", label: "2 cột bằng nhau" },
    { value: "1-1-1-1", label: "4 cột bằng nhau" },
    { value: "3-1", label: "Cột trái lớn" },
    { value: "1-3", label: "Cột phải lớn" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Layout Section
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={props.layout || "default"}
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
        💡 Tip: Thay đổi layout sẽ ảnh hưởng đến cách sắp xếp các component con bên trong section này.
      </div>
    </div>
  );
}

export default RightPanel;
