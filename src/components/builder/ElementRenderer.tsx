"use client";

import React from "react";
import { CanvasElement } from "@/types/element";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/builder/SortableItem";
import { useDroppable } from "@dnd-kit/core";
import { useBuilderStore } from "@/store/useBuilderStore";

function DropZone({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      isContainer: true,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`${className} transition-all duration-200 ${
        isOver ? "ring-2 ring-blue-400 ring-opacity-50 bg-blue-50/30" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default function ElementRenderer({
  element,
}: {
  element: CanvasElement;
}) {
  const { setNodeRef } = useDroppable({
    id: element.id,
    data: {
      isContainer: element.type === "section",
    },
  });

  const { selectElement, selectedId, removeElement } = useBuilderStore();

  // Xử lý phím Delete
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedId) {
        e.preventDefault();
        removeElement(selectedId);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, removeElement]);

  const handleDeleteElement = (elementId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeElement(elementId);
  };

  const renderWrapper = (element: CanvasElement, children: React.ReactNode) => {
    return (
      <div
        className={`group p-2 border rounded cursor-move relative transition-all duration-200 ${
          selectedId === element.id
            ? "border-blue-500 bg-blue-50"
            : "border-transparent hover:border-gray-300"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          selectElement(element.id);
        }}
        data-element
      >
        {/* Drag indicator và Delete button */}
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 z-10">
          {/* Delete button */}
          <button
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors duration-200"
            onClick={(e) => handleDeleteElement(element.id, e)}
            title="Xóa element (Delete)"
          >
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
          
          {/* Drag indicator */}
          <div className="bg-gray-800 text-white text-xs px-1 py-0.5 rounded flex items-center gap-1">
            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 3h4v4h-4V3zM10 9h4v4h-4V9zM10 15h4v4h-4v-4z" />
            </svg>
          </div>
        </div>
        {children}
      </div>
    );
  };

  switch (element.type) {
    case "section":
      const layout = element.props.layout || "default";

      const getLayoutClasses = (layout: string) => {
        switch (layout) {
          case "2-2":
          case "3-1":
          case "1-3":
            return "grid gap-4";
          case "1-1-1-1":
            return "grid grid-cols-4 gap-4";
          default:
            return "flex flex-col gap-4";
        }
      };

      const getColumnClasses = (layout: string, index: number) => {
        // Chỉ áp dụng cho layout 4 cột
        if (layout === "1-1-1-1") {
          return "";
        }
        return "";
      };

      const getGridStyle = () => {
        const layout = element.props.layout || "default";
        const columnRatio = element.props.columnRatio;
        
        if (layout === "default") return {};
        
        if (layout === "1-1-1-1") {
          return {
            gridTemplateColumns: "repeat(4, 1fr)"
          };
        }
        
        // Xử lý 2 cột với tỷ lệ tùy chỉnh
        if (columnRatio && typeof columnRatio === "string") {
          const [left, right] = columnRatio.split(":").map(v => parseInt(v));
          return {
            gridTemplateColumns: `${left}% ${right}%`
          };
        }
        
        // Fallback mặc định
        switch (layout) {
          case "2-2":
            return { gridTemplateColumns: "1fr 1fr" };
          case "3-1":
            return { gridTemplateColumns: "3fr 1fr" };
          case "1-3":
            return { gridTemplateColumns: "1fr 3fr" };
          default:
            return {};
        }
      };

      const renderSectionContent = () => {
        // Với layout grid, luôn hiển thị tất cả các cột
        if (layout !== "default") {
          const maxCols = layout === "1-1-1-1" ? 4 : 2;
          const columns = Array.from({ length: maxCols }, (_, index) => {
            // Lấy elements thuộc cột này dựa trên columnIndex, nếu không có thì mặc định là cột 0
            const columnChildren =
              element.children?.filter((child) => {
                const columnIndex =
                  child.props.columnIndex !== undefined
                    ? child.props.columnIndex
                    : 0;
                return columnIndex === index;
              }) || [];

            return (
              <div
                key={index}
                className={`relative group flex flex-col gap-2 ${getColumnClasses(
                  layout,
                  index
                )}`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    Cột {index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        columnChildren.length > 0
                          ? "bg-green-400"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        columnChildren.length > 1
                          ? "bg-green-400"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        columnChildren.length > 2
                          ? "bg-green-400"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Column Content - Droppable Zone */}
                <DropZone
                  id={`${element.id}-column-${index}`}
                  className={`flex-1 border-2 border-dashed rounded-lg p-3 min-h-[120px] transition-all duration-200 ${
                    columnChildren.length > 0
                      ? "border-green-300 bg-gradient-to-br from-green-50/50 to-emerald-50/30 hover:from-green-50 hover:to-emerald-50"
                      : "border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 hover:from-blue-50 hover:to-indigo-50"
                  }`}
                >
                  <SortableContext
                    items={columnChildren.map((c) => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {columnChildren.length > 0 ? (
                      columnChildren.map((child) => (
                        <SortableItem
                          key={child.id}
                          id={child.id}
                          data={{
                            parentId: element.id,
                            isContainer: child.type === "section",
                          }}
                        >
                          <div className="mb-2 last:mb-0 bg-white rounded-md shadow-sm border border-gray-100 hover:border-gray-200 transition-colors">
                            <ElementRenderer element={child} />
                          </div>
                        </SortableItem>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <svg
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                        <p className="text-xs font-medium text-blue-600 mb-1">
                          Kéo thả component
                        </p>
                        <p className="text-xs text-gray-500">vào cột này</p>
                      </div>
                    )}
                  </SortableContext>
                </DropZone>

                {/* Column Footer - Hiển thị số lượng elements */}
                <div className="flex items-center justify-center mt-2">
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      columnChildren.length > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {columnChildren.length} items
                  </div>
                </div>
              </div>
            );
          });

          return columns;
        }

        // Layout default - hiển thị theo chiều dọc
        if (element.children && element.children.length > 0) {
          return (
            <div className="space-y-2">
              <SortableContext
                items={element.children?.map((c) => c.id) || []}
                strategy={verticalListSortingStrategy}
              >
                {element.children.map((child) => (
                  <SortableItem
                    key={child.id}
                    id={child.id}
                    data={{
                      parentId: element.id,
                      isContainer: child.type === "section",
                    }}
                  >
                    <div className="bg-white rounded-md shadow-sm border border-gray-100 hover:border-gray-200 transition-colors">
                      <ElementRenderer element={child} />
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </div>
          );
        }

        // Empty state chỉ cho layout default
        return (
          <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gradient-to-br from-white to-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Thả component vào đây
              </p>
              <p className="text-xs text-gray-400">Kéo từ sidebar bên trái</p>
            </div>
          </div>
        );
      };

      return (
        <div
          onClick={(e) => {
            // Chỉ select section khi click vào khoảng trống, không phải vào element con
            const target = e.target as HTMLElement;
            const isEmptyArea =
              target.closest("[data-section-content]") &&
              !target.closest("[data-element]");
            const isClickOnSection =
              target.closest("[data-section-wrapper]") === e.currentTarget;
            if (isEmptyArea || isClickOnSection) {
              e.stopPropagation();
              selectElement(element.id);
            }
          }}
          data-section-wrapper
        >
          <DropZone
            id={element.id}
            className={`relative group p-4 border-2 border-dashed rounded-xl min-h-[120px] bg-gradient-to-br transition-all duration-300 shadow-sm hover:shadow-md cursor-move ${
              selectedId === element.id
                ? "border-blue-500 from-blue-50 to-blue-100/50 shadow-lg"
                : "border-gray-300 from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-50"
            }`}
          >
            {/* Drag Handle và Delete button cho Section */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 flex items-center gap-2">
              {/* Delete button */}
              <button
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors duration-200"
                onClick={(e) => handleDeleteElement(element.id, e)}
                title="Xóa section (Delete)"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                <span>Xóa</span>
              </button>
              
              {/* Drag Handle */}
              <div
                className="flex items-center gap-1 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  selectElement(element.id);
                }}
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 3h4v4h-4V3zM10 9h4v4h-4V9zM10 15h4v4h-4v-4z" />
                </svg>
                <span>Kéo để di chuyển</span>
              </div>
            </div>

            {/* Selected indicator với hướng dẫn Delete */}
            {selectedId === element.id && (
              <div className="absolute top-2 left-2 z-20">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Đã chọn</span>
                  </div>
                  <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded animate-pulse">
                    Nhấn Delete để xóa
                  </div>
                </div>
              </div>
            )}

            {/* Section Content */}
            <div
              className={`${getLayoutClasses(layout)} gap-4 relative z-0`}
              style={getGridStyle()}
              data-section-content
            >
              {renderSectionContent()}
            </div>
          </DropZone>
        </div>
      );

    case "text":
      return renderWrapper(
        element,
        <div>{element.props.text || "Text mẫu..."}</div>
      );

    case "button":
      return renderWrapper(
        element,
        <a
          href={element.props.link || "#"}
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded"
          onClick={(e) => e.preventDefault()}
        >
          {element.props.text || "Button"}
        </a>
      );

    case "image":
      return renderWrapper(
        element,
        <div className="w-full">
          <img
            src={
              element.props.url ||
              "https://via.placeholder.com/400x300?text=Image"
            }
            alt={element.props.title || "Image"}
            className="max-w-full h-auto rounded-lg shadow-sm"
          />
          {element.props.title && (
            <p className="mt-2 text-sm text-gray-600 text-center">
              {element.props.title}
            </p>
          )}
        </div>
      );

    case "card":
      return renderWrapper(
        element,
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            {element.props.title || "Card Title"}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {element.props.description || "Mô tả nội dung của card này..."}
          </p>
          {element.props.link && (
            <a
              href={element.props.link}
              className="inline-block mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-200"
            >
              Xem thêm
            </a>
          )}
        </div>
      );

    case "divider":
      return <hr className="my-6 border-gray-300 border-t-2" />;

    default:
      return (
        <div className="bg-white p-2 rounded border border-transparent">
          Unknown element type
        </div>
      );
  }
}
