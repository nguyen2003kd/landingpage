import React from 'react';
import { Plus } from 'lucide-react';
import {DndContext,closestCorners} from '@dnd-kit/core'
import Headers from '@/src/app/lib/layout/_components/header';
import CanvasWrapper from '@/components/ui/CanvasWrapper';
import { useState } from 'react';
const MainContent = () => {
  // Khi kéo bắt đầu (viết logic sau cũng được)
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  return (
    <div className=" w-full bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Canvas Area */}
        <DndContext collisionDetection={closestCorners}>
        <CanvasWrapper width={mode === "desktop" ? 1280 : 375} scale={0.9}>
          <DndContext collisionDetection={closestCorners}>
          <Headers/>
          </DndContext>
          {/* Grid Overlay (subtle) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #6B7280 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            ></div>
          </div>
          </CanvasWrapper>
        </DndContext>
        {/* Bottom Actions */}
        <div className="flex justify-center mt-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
            <Plus className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            <span className="text-gray-700 group-hover:text-blue-600">
              Thêm trang mới
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
