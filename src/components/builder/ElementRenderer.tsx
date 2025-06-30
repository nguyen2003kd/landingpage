"use client";

import { CanvasElement } from "@/types/element";
import { useDroppable } from "@dnd-kit/core";
import { useBuilderStore } from "@/store/useBuilderStore";

// Import the enhanced components
import TextElement from "@/components/elements/TextElement";
import ButtonElement from "@/components/elements/ButtonElement";
import ImageElement from "@/components/elements/ImageElement";
import CardElement from "@/components/elements/CardElement";
import SectionElement from "@/components/elements/SectionElement";

export default function ElementRenderer({
  element,
  isChild = false,
  noWrapper = false,
}: {
  element: CanvasElement;
  isChild?: boolean;
  noWrapper?: boolean;
}) {
  const { setNodeRef } = useDroppable({
    id: element.id,
    data: {
      isContainer: element.type === "section",
    },
  });

  const { selectElement } = useBuilderStore();

  const renderWrapper = (element: CanvasElement, children: React.ReactNode) => {
    // Nếu là child element hoặc noWrapper, không wrap thêm
    if (isChild || noWrapper) {
      return <>{children}</>;
    }

    return (
      <div
        className="p-2 border border-transparent hover:border-gray-300 rounded"
        onClick={(e) => {
          e.stopPropagation();
          selectElement(element.id);
        }}
      >
        {children}
      </div>
    );
  };

  switch (element.type) {
    case "section":
      return (
        <section
          ref={setNodeRef}
          className="p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[100px] bg-gray-50"
        >
          <SectionElement element={element} />
        </section>
      );

    case "text":
      return renderWrapper(element, <TextElement element={element} />);

    case "button":
      return renderWrapper(element, <ButtonElement element={element} />);

    case "image":
      return renderWrapper(element, <ImageElement element={element} />);

    case "card":
      return renderWrapper(element, <CardElement element={element} />);

    case "divider":
      return renderWrapper(
        element,
        <div style={{
          width: '100%',
          height: '2px',
          backgroundColor: '#e5e7eb',
          margin: '16px 0'
        }} />
      );

    default:
      return renderWrapper(
        element,
        <div className="p-4 bg-gray-100 rounded text-gray-600">
          Unknown element type: {element.type}
        </div>
      );
  }
}
