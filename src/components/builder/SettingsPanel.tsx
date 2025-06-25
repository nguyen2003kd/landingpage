"use client";

import { useBuilderStore } from "../../store/useBuilderStore";
import { CanvasElement } from "../../types/element";
import { Settings, Type, Link, Image, FileText, Minus } from "lucide-react";

export default function SettingsPanel() {
  const { elements, selectedId, updateElement } = useBuilderStore();
  const element = elements.find((el) => el.id === selectedId);

  if (!element) {
    return (
      <aside className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="text-center py-20">
          <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Chưa chọn element
          </h3>
          <p className="text-gray-500 text-sm">
            Click vào một element trên canvas để chỉnh sửa
          </p>
        </div>
      </aside>
    );
  }

  const handleChange = (key: string, value: string) => {
    updateElement(element.id, { [key]: value });
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Cài đặt Element
        </h2>
        <div className="text-sm text-gray-500">
          Loại: <span className="font-medium capitalize">{element.type}</span>
        </div>
      </div>

      <div className="space-y-6">
        {element.type === "text" && (
          <TextSettings element={element} onChange={handleChange} />
        )}
        
        {element.type === "button" && (
          <ButtonSettings element={element} onChange={handleChange} />
        )}
        
        {element.type === "image" && (
          <ImageSettings element={element} onChange={handleChange} />
        )}
        
        {element.type === "card" && (
          <CardSettings element={element} onChange={handleChange} />
        )}
        
        {element.type === "divider" && (
          <div className="text-center py-8 text-gray-500">
            <Minus className="w-8 h-8 mx-auto mb-2" />
            <p>Divider không có thuộc tính chỉnh sửa</p>
          </div>
        )}
      </div>
    </aside>
  );
}

function TextSettings({ 
  element, 
  onChange 
}: { 
  element: CanvasElement; 
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Nội dung văn bản
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          value={element.props.text || ""}
          onChange={(e) => onChange("text", e.target.value)}
          placeholder="Nhập nội dung văn bản..."
        />
      </div>
    </div>
  );
}

function ButtonSettings({ 
  element, 
  onChange 
}: { 
  element: CanvasElement; 
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Nội dung button
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={element.props.text || ""}
          onChange={(e) => onChange("text", e.target.value)}
          placeholder="Nhập nội dung button..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Link className="w-4 h-4" />
          Link URL
        </label>
        <input
          type="url"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={element.props.link || ""}
          onChange={(e) => onChange("link", e.target.value)}
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
}

function ImageSettings({ 
  element, 
  onChange 
}: { 
  element: CanvasElement; 
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Image className="w-4 h-4" />
          URL ảnh
        </label>
        <input
          type="url"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={element.props.url || ""}
          onChange={(e) => onChange("url", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Tiêu đề ảnh
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={element.props.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Mô tả ảnh..."
        />
      </div>
    </div>
  );
}

function CardSettings({ 
  element, 
  onChange 
}: { 
  element: CanvasElement; 
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Type className="w-4 h-4" />
          Tiêu đề card
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={element.props.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Nhập tiêu đề card..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Mô tả
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          value={element.props.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Nhập mô tả card..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Link className="w-4 h-4" />
          Link &quot;Xem thêm&quot;
        </label>
        <input
          type="url"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={element.props.link || ""}
          onChange={(e) => onChange("link", e.target.value)}
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
} 