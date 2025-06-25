"use client";

import { useDraggable } from "@dnd-kit/core";
import { ElementType } from "@/src/types/element";

export default function SidebarItem({ 
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