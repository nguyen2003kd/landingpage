import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { sidebarItems } from '@/src/data/sidebarItems';

interface SidebarItemProps {
  item: typeof sidebarItems[0];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `sidebar-${item.type}`,
    data: {
      type: item.type,
      defaultProps: item.defaultProps,
      defaultSize: item.defaultSize,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-3 cursor-move hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.icon}</span>
        <div>
          <h3 className="font-medium text-gray-800">{item.label}</h3>
          <p className="text-sm text-gray-500">Drag to add</p>
        </div>
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Components</h2>
      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.type} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 