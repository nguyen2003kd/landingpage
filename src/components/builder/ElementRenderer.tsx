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
import { useColumnResize } from "@/hook/useColumnResize";

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
  const {
    selectElement,
    selectedId,
    removeElement,
    selectColumn,
    selectedColumnId,
    updateElement,
    getColumnSettings,
  } = useBuilderStore();

  // Column resize hook
  const { handleMouseDown: handleResizeMouseDown } = useColumnResize({
    onResize: (columnIndex, newRatio) => {
      if (element.type === "section") {
        updateElement(element.id, { columnRatio: newRatio });
      }
    },
    layout:
      element.type === "section"
        ? element.props.layout || "default"
        : "default",
    currentRatio:
      element.type === "section" ? element.props.columnRatio : undefined,
  });

  // Xử lý phím Delete
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedId) {
        e.preventDefault();
        removeElement(selectedId);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, removeElement]);

  const handleDeleteElement = (
    elementId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    removeElement(elementId);
  };

  // Apply styles cho column dựa vao columnSettings
  const getColumnStyle = (
    sectionId: string,
    columnIndex: number
  ): React.CSSProperties => {
    const settings = getColumnSettings(sectionId, columnIndex);
    const style: React.CSSProperties = {};

    // Màu nền
    if (settings.backgroundColor) {
      style.backgroundColor = settings.backgroundColor;
    }

    // Ảnh nền
    if (settings.backgroundImage) {
      style.backgroundImage = `url(${settings.backgroundImage})`;
      style.backgroundSize = "cover";
      style.backgroundRepeat = "no-repeat";
      style.backgroundPosition = settings.backgroundPosition || "center";
    }

    // Bo góc
    if (settings.borderRadius) {
      style.borderRadius = `${settings.borderRadius}px`;
    }

    // Viền
    if (settings.borderStyle && settings.borderColor) {
      style.border = `2px ${settings.borderStyle} ${settings.borderColor}`;
    }

    // Đổ bóng
    if (settings.shadow === "true" || settings.shadowEnabled === "true") {
      style.boxShadow =
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
    }

    // Độ trong suốt
    if (settings.opacity && settings.opacity !== "100") {
      style.opacity = parseInt(settings.opacity) / 100;
    }

    // Margin
    if (settings.marginTop) style.marginTop = `${settings.marginTop}px`;
    if (settings.marginBottom)
      style.marginBottom = `${settings.marginBottom}px`;
    if (settings.marginLeft) style.marginLeft = `${settings.marginLeft}px`;
    if (settings.marginRight) style.marginRight = `${settings.marginRight}px`;

    // Padding
    if (settings.paddingTop) style.paddingTop = `${settings.paddingTop}px`;
    if (settings.paddingBottom)
      style.paddingBottom = `${settings.paddingBottom}px`;
    if (settings.paddingLeft) style.paddingLeft = `${settings.paddingLeft}px`;
    if (settings.paddingRight)
      style.paddingRight = `${settings.paddingRight}px`;

    // Column specific settings from ColumnSettings
    // Desktop width - commented out for grid layouts, will be handled by grid template columns
    // if (settings.desktopWidth) {
    //   style.width = `${settings.desktopWidth}%`;
    //   style.flexGrow = 0;
    //   style.flexShrink = 0;
    //   style.flexBasis = `${settings.desktopWidth}%`;
    // }

    // Column height
    if (settings.columnHeight) {
      switch (settings.columnHeight) {
        case "auto":
          style.height = "auto";
          break;
        case "fit-content":
          style.height = "fit-content";
          style.minHeight = "fit-content";
          break;
        case "full-height":
          style.height = "100%";
          style.minHeight = "100vh";
          break;
      }
    }

    // Vertical alignment
    if (settings.verticalAlign) {
      switch (settings.verticalAlign) {
        case "top":
          style.alignItems = "flex-start";
          style.justifyContent = "flex-start";
          break;
        case "center":
          style.alignItems = "center";
          style.justifyContent = "center";
          break;
        case "bottom":
          style.alignItems = "flex-end";
          style.justifyContent = "flex-end";
          break;
      }
      style.display = "flex";
      style.flexDirection = "column";
    }

    return style;
  };

  // Tạo style cho section từ props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSectionStyle = (props: any) => {
    const style: React.CSSProperties = {};

    console.log("Section props:", props);

    // Màu nền
    if (props.backgroundColor) {
      style.backgroundColor = props.backgroundColor;
      console.log("Applied background color:", props.backgroundColor);
    }

    // Ảnh nền
    if (props.backgroundImage) {
      style.backgroundImage = `url(${props.backgroundImage})`;
      style.backgroundSize = "cover";
      style.backgroundRepeat = "no-repeat";

      // Vị trí ảnh nền
      if (props.backgroundPosition) {
        style.backgroundPosition = props.backgroundPosition;
      } else {
        style.backgroundPosition = "center";
      }

      // Hiệu ứng di chuyển ảnh nền
      if (props.backgroundAnimation) {
        switch (props.backgroundAnimation) {
          case "horizontal":
            style.backgroundSize = "200% 100%";
            style.animation = "moveHorizontal 10s linear infinite";
            break;
          case "vertical":
            style.backgroundSize = "100% 200%";
            style.animation = "moveVertical 10s linear infinite";
            break;
          case "parallax":
            style.backgroundAttachment = "fixed";
            break;
        }
      }

      console.log("Applied background image:", props.backgroundImage);
      console.log("Background position:", props.backgroundPosition);
      console.log("Background animation:", props.backgroundAnimation);
    }

    // Bo góc
    if (props.borderRadius) {
      style.borderRadius = `${props.borderRadius}px`;
    }

    // Viền
    if (props.borderStyle && props.borderColor) {
      style.border = `2px ${props.borderStyle} ${props.borderColor}`;
    }

    // Đổ bóng
    if (props.shadow === "true" || props.shadowEnabled === "true") {
      style.boxShadow =
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
    }

    // Độ trong suốt
    if (props.opacity && props.opacity !== "100") {
      style.opacity = parseInt(props.opacity) / 100;
    }

    // Margin
    if (props.marginTop) style.marginTop = `${props.marginTop}px`;
    if (props.marginBottom) style.marginBottom = `${props.marginBottom}px`;
    if (props.marginLeft) style.marginLeft = `${props.marginLeft}px`;
    if (props.marginRight) style.marginRight = `${props.marginRight}px`;

    // Padding
    if (props.paddingTop) style.paddingTop = `${props.paddingTop}px`;
    if (props.paddingBottom) style.paddingBottom = `${props.paddingBottom}px`;
    if (props.paddingLeft) style.paddingLeft = `${props.paddingLeft}px`;
    if (props.paddingRight) style.paddingRight = `${props.paddingRight}px`;

    console.log("Final style:", style);
    return style;
  };

  // Render video background nếu có
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderVideoBackground = (props: any) => {
    if (!props.backgroundVideo) return null;

    console.log("Rendering video background:", props.backgroundVideo);

    // Xử lý YouTube URL
    const getYouTubeEmbedUrl = (url: string) => {
      const regex =
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
      const match = url.match(regex);
      return match
        ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playlist=${match[1]}`
        : null;
    };

    const embedUrl = getYouTubeEmbedUrl(props.backgroundVideo);
    console.log("Embed URL:", embedUrl);

    if (!embedUrl) {
      console.log("Invalid YouTube URL");
      return null;
    }

    return (
      <div
        className="absolute inset-0 overflow-hidden rounded-xl"
        style={{ zIndex: 0 }}
      >
        <iframe
          src={embedUrl}
          className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{
            minWidth: "120%",
            minHeight: "120%",
            pointerEvents: "none",
          }}
        />
        {/* Overlay cho video */}
        {props.videoOpacity && parseInt(props.videoOpacity) > 0 && (
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: parseInt(props.videoOpacity) / 100 }}
          />
        )}
      </div>
    );
  };

  const renderWrapper = (element: CanvasElement, children: React.ReactNode) => {
    return (
      <div
        className={`group p-2 border rounded cursor-move relative transition-all duration-200 ${
          selectedId === element.id
            ? "border-blue-500 bg-blue-50"
            : "border-transparent hover:border-gray-300"
        }`}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
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
            <svg
              className="w-2.5 h-2.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
        const responsiveClass = "grid-columns-responsive";

        switch (layout) {
          case "2-2":
          case "3-1":
          case "1-3":
            return `grid gap-px ${responsiveClass}`;
          case "1-1-1-1":
            return `grid grid-cols-4 gap-px ${responsiveClass}`;
          default:
            return "flex flex-col gap-4";
        }
      };

      const getColumnClasses = (layout: string) => {
        // Chỉ áp dụng cho layout 4 cột
        if (layout === "1-1-1-1") {
          return "";
        }
        return "";
      };

      const getGridStyle = () => {
        const layout = element.props.layout || "default";

        if (layout === "default") return {};

        if (layout === "1-1-1-1") {
          // For 4 column layout - auto balance to 100%
          const col0Settings = getColumnSettings(element.id, 0);
          const col1Settings = getColumnSettings(element.id, 1);
          const col2Settings = getColumnSettings(element.id, 2);
          const col3Settings = getColumnSettings(element.id, 3);

          let col0Width = parseFloat(col0Settings.desktopWidth) || 25;
          let col1Width = parseFloat(col1Settings.desktopWidth) || 25;
          let col2Width = parseFloat(col2Settings.desktopWidth) || 25;
          let col3Width = parseFloat(col3Settings.desktopWidth) || 25;

          // Auto-balance để tổng = 100%
          const total = col0Width + col1Width + col2Width + col3Width;
          if (total !== 100) {
            const factor = 100 / total;
            col0Width = Math.round(col0Width * factor * 100) / 100;
            col1Width = Math.round(col1Width * factor * 100) / 100;
            col2Width = Math.round(col2Width * factor * 100) / 100;
            col3Width =
              Math.round((100 - col0Width - col1Width - col2Width) * 100) / 100; // Đảm bảo tổng chính xác
          }

          return {
            gridTemplateColumns: `${col0Width}% ${col1Width}% ${col2Width}% ${col3Width}%`,
          };
        }

        // For 2 column layouts - auto balance to 100%
        const col0Settings = getColumnSettings(element.id, 0);
        const col1Settings = getColumnSettings(element.id, 1);

        let col0Width = parseFloat(col0Settings.desktopWidth);
        let col1Width = parseFloat(col1Settings.desktopWidth);

        // Set defaults based on layout type
        if (!col0Width && !col1Width) {
          switch (layout) {
            case "3-1":
              col0Width = 75;
              col1Width = 25;
              break;
            case "1-3":
              col0Width = 25;
              col1Width = 75;
              break;
            default: // 2-2
              col0Width = 50;
              col1Width = 50;
              break;
          }
        } else {
          // Auto-balance để tổng = 100%
          if (col0Width && !col1Width) {
            col1Width = Math.max(0, 100 - col0Width);
          } else if (!col0Width && col1Width) {
            col0Width = Math.max(0, 100 - col1Width);
          } else if (col0Width && col1Width) {
            const total = col0Width + col1Width;
            if (total !== 100) {
              const factor = 100 / total;
              col0Width = Math.round(col0Width * factor * 100) / 100;
              col1Width = Math.round((100 - col0Width) * 100) / 100;
            }
          }
        }

        return {
          gridTemplateColumns: `${col0Width}% ${col1Width}%`,
        };
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

            const columnSettings = getColumnSettings(element.id, index);
            const alignmentClass = columnSettings.verticalAlign
              ? `column-align-${columnSettings.verticalAlign}`
              : "";
            const heightClass = columnSettings.columnHeight
              ? `column-height-${
                  columnSettings.columnHeight === "fit-content"
                    ? "fit"
                    : columnSettings.columnHeight === "full-height"
                    ? "full"
                    : "auto"
                }`
              : "";

            return (
              <div
                key={index}
                data-column
                className={`relative group flex flex-col column-settings-responsive ${getColumnClasses(
                  layout
                )} ${alignmentClass} ${heightClass} ${
                  index > 0 ? "border-l border-gray-200" : ""
                }`}
                style={getColumnStyle(element.id, index)}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  selectColumn(element.id, index);
                }}
              >
                {/* Resize Handle - chỉ hiển thị cho cột từ thứ 2 trở đi */}
                {index > 0 && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-400 cursor-col-resize z-20 group-hover:bg-blue-300 transition-colors"
                    onMouseDown={(e) => {
                      handleResizeMouseDown(e, index);
                    }}
                    title={`Kéo để thay đổi kích thước cột ${index + 1}`}
                  />
                )}

                {/* Column Content - Droppable Zone */}
                <DropZone
                  id={`${element.id}-column-${index}`}
                  className={`flex-1 rounded-lg p-3 min-h-[120px] transition-all duration-200 ${
                    // Selected column - border cam solid, không có background mặc định
                    selectedColumnId === `${element.id}-${index}`
                      ? "shadow-lg border-2 border-solid border-orange-300 rounded-lg"
                      : columnChildren.length === 0
                      ? // Cột trống - border-dashed xám nhạt
                        "border-2 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 rounded-lg"
                      : // Cột có nội dung - không border, chỉ hover nhẹ
                        "hover:bg-gray-50/30"
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

        // Empty state - hiển thị placeholder với border-dashed
        return (
          <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 hover:border-gray-300 hover:bg-gray-100/50 transition-colors">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
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
          style={getSectionStyle(element.props)}
        >
          <DropZone
            id={element.id}
            className={`relative group p-4 min-h-[120px] transition-all duration-300 ${
              // Chỉ hiển thị highlight nhẹ khi section được selected
              selectedId === element.id
                ? "bg-blue-50/50 shadow-lg rounded-xl ring-2 ring-blue-200 ring-opacity-50"
                : "bg-transparent hover:bg-gray-50/30 rounded-xl"
            } ${
              // Chỉ áp dụng màu nền mặc định khi được selected
              !element.props.backgroundColor && selectedId === element.id
                ? "bg-gradient-to-br from-blue-50 to-blue-100/50"
                : ""
            }`}
          >
            {/* Video Background */}
            {renderVideoBackground(element.props)}

            {/* Background Image Overlay */}
            {element.props.backgroundImage &&
              element.props.backgroundOverlayOpacity &&
              parseInt(element.props.backgroundOverlayOpacity) > 0 && (
                <div
                  className="absolute inset-0 bg-black z-10"
                  style={{
                    opacity:
                      parseInt(element.props.backgroundOverlayOpacity) / 100,
                  }}
                />
              )}

            {/* Drag Handle và Delete button cho Section */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center gap-2">
              {/* Delete button */}
              <button
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors duration-200"
                onClick={(e) => handleDeleteElement(element.id, e)}
                title="Xóa section (Delete)"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

            {/* Selected indicator */}
            {selectedId === element.id && (
              <div className="absolute top-2 left-2 z-30">
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
              </div>
            )}

            {/* Section Content */}
            <div
              className={`${getLayoutClasses(layout)} gap-4 relative z-10`}
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
