"use client";

import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { ElementType } from "@/types/element";
import {
  FileText,
  MousePointer,
  Image,
  CreditCard,
  Minus,
  Search,
} from "lucide-react";

const ELEMENTS: {
  type: ElementType;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    type: "text",
    label: "Text",
    icon: <FileText className="w-5 h-5" />,
    description: "Thêm văn bản, tiêu đề, đoạn mô tả",
  },
  {
    type: "button",
    label: "Button",
    icon: <MousePointer className="w-5 h-5" />,
    description: "Nút bấm với liên kết và hành động",
  },
  {
    type: "image",
    label: "Image",
    icon: <Image className="w-5 h-5" />,
    description: "Hình ảnh với title và mô tả",
  },
  {
    type: "card",
    label: "Card",
    icon: <CreditCard className="w-5 h-5" />,
    description: "Thẻ với tiêu đề, nội dung và liên kết",
  },
  {
    type: "divider",
    label: "Divider",
    icon: <Minus className="w-5 h-5" />,
    description: "Đường kẻ phân chia nội dung",
  },
];

export default function ElementsSidebar() {
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc elements theo từ khóa tìm kiếm
  const filteredElements = ELEMENTS.filter(
    (element) =>
      element.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Phần tử</h2>
        <p className="text-sm text-gray-500 mb-3">
          Kéo thả các phần tử vào section
        </p>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm phần tử..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          {filteredElements.length > 0 ? (
            filteredElements.map((element) => (
              <ElementItem
                key={element.type}
                type={element.type}
                label={element.label}
                icon={element.icon}
                description={element.description}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                Không tìm thấy phần tử nào
              </p>
              <p className="text-xs text-gray-400 mt-1">Thử từ khóa khác</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
          💡 <strong>Lưu ý:</strong> Các phần tử này chỉ có thể thêm vào bên
          trong Section. Hãy tạo Section trước, sau đó kéo các phần tử vào bên
          trong.
        </div>
      </div>
    </div>
  );
}

function ElementItem({
  type,
  label,
  icon,
  description,
}: {
  type: ElementType;
  label: string;
  icon: React.ReactNode;
  description: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${type}`,
    data: { type, fromSidebar: true },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`
        group flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg
        cursor-grab hover:bg-blue-50 hover:border-blue-300 transition-all duration-200
        hover:shadow-sm active:cursor-grabbing
        ${isDragging ? "opacity-50 scale-95" : ""}
      `}
    >
      <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200 flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-200 mb-1">
          {label}
        </div>
        <div className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors duration-200 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}
