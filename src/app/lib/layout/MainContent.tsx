"use client";
import React from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useBuilderStore } from "@/store/useBuilderStore";
import ElementRenderer from "@/components/builder/ElementRenderer";
import SortableItem from "@/components/builder/SortableItem";
import { useDroppable } from '@dnd-kit/core';

interface MainContentProps {
  onCanvasClick?: () => void;
}

const MainContent = ({ onCanvasClick }: MainContentProps) => {
  const { 
    elements, 
    selectElement, 
    selectedElementId 
  } = useBuilderStore();

  const { setNodeRef } = useDroppable({
    id: 'root-canvas',
    data: {
      isContainer: true,
      parentId: null,
    }
  });
  
  return (
    <div className="w-full bg-gray-50 p-8">
      <SortableContext 
        items={elements.map((el) => el.id)} 
        strategy={verticalListSortingStrategy}
      >
        <div 
          ref={setNodeRef} 
          className="mx-auto bg-white rounded-lg shadow-sm min-h-[600px] p-8 space-y-4"
          onClick={onCanvasClick}
        >
          {elements.length === 0 && (
            <div className="text-center py-20 pointer-events-none">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                Canvas trống
              </h3>
              <p className="text-gray-500">
                Kéo thả các component từ sidebar vào đây để bắt đầu
              </p>
            </div>
          )}
          
          {elements.map((element) => (
            <SortableItem 
              key={element.id} 
              id={element.id}
              data={{
                parentId: null,
                isContainer: element.type === 'section',
              }}
            >
              <div
                className={`
                  relative group border-2 rounded-lg p-4 transition-all duration-200
                  ${selectedElementId === element.id 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-transparent hover:border-gray-300'
                  }
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  selectElement(element.id);
                }}
              >
                <ElementRenderer element={element} noWrapper={true} />
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  {element.type}
                </div>
              </div>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default MainContent;
