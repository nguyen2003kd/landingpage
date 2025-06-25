"use client";

import { useDraggable } from "@dnd-kit/core";
import { ElementType } from "../../types/element";
import { FileText, MousePointer, Image, CreditCard, Minus } from "lucide-react";
import { useBuilderStore } from "../../store/useBuilderStore";

const COMPONENTS: { type: ElementType; label: string; icon: React.ReactNode }[] = [
  { type: "text", label: "Text", icon: <FileText className="w-4 h-4" /> },
  { type: "button", label: "Button", icon: <MousePointer className="w-4 h-4" /> },
  { type: "image", label: "Image", icon: <Image className="w-4 h-4" /> },
  { type: "card", label: "Card", icon: <CreditCard className="w-4 h-4" /> },
  { type: "divider", label: "Divider", icon: <Minus className="w-4 h-4" /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Components</h2>
        <p className="text-sm text-gray-500">Kéo thả các component vào canvas</p>
      </div>
      
      <div className="flex flex-col gap-3">
        {COMPONENTS.map((comp) => (
          <SidebarItem 
            key={comp.type} 
            type={comp.type} 
            label={comp.label} 
            icon={comp.icon} 
          />
        ))}
      </div>
      
      <div className="mt-auto pt-6 border-t border-gray-200">
        <ExportButton />
      </div>
    </aside>
  );
}

function SidebarItem({ 
  type, 
  label, 
  icon 
}: { 
  type: ElementType; 
  label: string; 
  icon: React.ReactNode;
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
        flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg
        cursor-grab hover:bg-blue-50 hover:border-blue-300 transition-all duration-200
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="text-gray-600">{icon}</div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  );
}

function ExportButton() {
  const { exportLayout } = useBuilderStore();
  
  const handleExport = () => {
    const json = exportLayout();
    navigator.clipboard.writeText(json);
    alert("Đã copy JSON layout vào clipboard!");
  };

  return (
    <button
      onClick={handleExport}
      className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
    >
      Xuất JSON Layout
    </button>
  );
} 