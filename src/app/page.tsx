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
  const { selectedId } = useBuilderStore();

  // Tự động mở RightPanel khi có element được chọn
  React.useEffect(() => {
    if (selectedId && !selectdpanel) {
      setSelectpanel(true);
    }
  }, [selectedId, selectdpanel]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Yêu cầu chuột phải di chuyển ít nhất 5px để bắt đầu kéo.
      // Điều này cho phép sự kiện 'onClick' hoạt động bình thường.
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const {
    addElement,
    addElementToColumn,
    moveElementToContainer,
    reorderElements,
  } = useBuilderStore();

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

      // Kiểm tra nếu drop vào column cụ thể
      const overIdStr = over.id as string;
      if (overIdStr.includes("-column-")) {
        // Parse để lấy parentId và columnIndex
        const parts = overIdStr.split("-column-");
        const parentId = parts[0];
        const columnIndex = parseInt(parts[1]);

        const props = type === "section" && layout ? { layout } : {};
        addElementToColumn({ type, props }, parentId, columnIndex);
        return;
      }

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

    // Logic sắp xếp và di chuyển element
    // Kéo element hiện có từ vị trí này sang vị trí khác
    const activeId = active.id as string;

    // Kiểm tra nếu drop vào column cụ thể
    const overIdStr = over.id as string;
    if (overIdStr.includes("-column-")) {
      // Parse để lấy parentId và columnIndex
      const parts = overIdStr.split("-column-");
      const parentId = parts[0];
      const columnIndex = parseInt(parts[1]);

      // Di chuyển element vào column cụ thể
      moveElementToContainer(activeId, parentId, 999, columnIndex);
      return;
    }

    // Kiểm tra nếu đang kéo element trong cùng container (sắp xếp lại)
    const sourceParentId = active.data.current?.parentId ?? null;
    const overParentId = over.data.current?.parentId ?? null;

    if (sourceParentId === overParentId && !overIsContainer) {
      // Sắp xếp lại trong cùng container
      const targetId = over.id as string;
      reorderElements(activeId, targetId, sourceParentId);
      return;
    }

    // Di chuyển element vào container khác (section hoặc root)
    moveElementToContainer(activeId, targetParentId, 999);
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
                  {activeId.includes("sidebar-")
                    ? `Đang kéo: ${activeId.replace("sidebar-", "")}`
                    : `Di chuyển element`}
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
