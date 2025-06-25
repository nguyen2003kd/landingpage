"use client";
import React, { useState } from "react";
import LeftSidebar from "@/src/app/lib/layout/LeftSidebar";
import Header from "@/src/app/lib/layout/Header";
// import NavigationTabs from './components/NavigationTabs';
import MainContent from "@/src/app/lib/layout/MainContent";
import RightPanel from "@/src/app/lib/layout/RightPanel";
import { ArrowLeft } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  rectIntersection,
  useSensor,
  PointerSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { useBuilderStore } from "@/store/useBuilderStore";
import { ElementType } from "@/types/element";

function App() {
  const [selectdpanel, setSelectpanel] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Yêu cầu chuột phải di chuyển ít nhất 5px để bắt đầu kéo.
      // Điều này cho phép sự kiện 'onClick' hoạt động bình thường.
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const { addElement } = useBuilderStore();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    // ✅ LOGIC MỚI, ĐƠN GIẢN VÀ CHÍNH XÁC
    const overIsContainer = over.data.current?.isContainer ?? false;

    let targetParentId: string | null;
    if (overIsContainer) {
      // Nếu thả vào vùng trống của container
      targetParentId = over.id === "root-canvas" ? null : (over.id as string);
    } else {
      // Nếu thả chồng lên một item khác, lấy parentId của item đó
      targetParentId = over.data.current?.parentId ?? null;
    }

    // Kéo từ Sidebar vào
    if (active.data.current?.fromSidebar) {
      const type = active.data.current.type as ElementType;
      const layout = active.data.current.layout;

      if (type !== "section" && targetParentId === null) {
        alert(
          "Bạn chỉ có thể thêm các component khác vào bên trong một Section."
        );
        return;
      }

      const props = type === "section" && layout ? { layout } : {};
      addElement({ type, props }, targetParentId, 999);
      return;
    }

    // Logic sắp xếp (sẽ hoàn thiện sau)
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />
      {/* <NavigationTabs /> */}

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Main Content */}
          <MainContent />
          <DragOverlay>
            {activeId ? (
              <div className="bg-white border border-blue-300 rounded-lg p-3 shadow-lg opacity-80 cursor-grabbing">
                <p className="text-sm font-medium text-gray-700">
                  Đang kéo: {`${activeId}`.replace("sidebar-", "")}
                </p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
        {/* Right Panel */}
        {selectdpanel ? (
          <RightPanel setSelectpanel={setSelectpanel} />
        ) : (
          <div className="fixed top-[50%] right-0 bg-black">
            <ArrowLeft onClick={() => setSelectpanel(true)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
