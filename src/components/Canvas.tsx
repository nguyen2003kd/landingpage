import React, { forwardRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useElementStore } from '@/src/store/elementStore';
import ElementRenderer from './elements/ElementRenderer';

// eslint-disable-next-line react/display-name
const Canvas = forwardRef<HTMLDivElement>((props, ref) => {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const { elements, selectedElementId, selectElement } = useElementStore();

  const handleElementClick = (elementId: string) => {
    selectElement(elementId);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectElement(null);
    }
  };

  const mergeRefs = (...refs: (React.Ref<HTMLDivElement> | React.LegacyRef<HTMLDivElement>)[]) => {
    return (node: HTMLDivElement | null) => {
      for (const r of refs) {
        if (typeof r === 'function') {
          r(node);
        } else if (r != null) {
          r.current = node;
        }
      }
    };
  };

  return (
    <div className="flex-1 bg-gray-100 p-4 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div
          ref={mergeRefs(setNodeRef, ref)}
          className="bg-white rounded-lg shadow-lg min-h-[800px] relative"
          onClick={handleCanvasClick}
          style={{ height: '1200px' }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle, #6B7280 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          {/* Elements */}
          {elements.map((element) => (
            <div
              key={element.id}
              style={{
                position: 'absolute',
                left: element.position.x,
                top: element.position.y,
                width: element.size.width,
                height: element.size.height,
              }}
            >
              <ElementRenderer
                element={element}
                isSelected={selectedElementId === element.id}
                onClick={() => handleElementClick(element.id)}
              />
            </div>
          ))}

          {/* Drop zone indicator */}
          <div className="absolute inset-0 border-2 border-dashed border-gray-300 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        </div>
      </div>
    </div>
  );
});

export default Canvas; 