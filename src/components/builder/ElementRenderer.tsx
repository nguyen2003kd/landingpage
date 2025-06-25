"use client";

import { CanvasElement } from "@/types/element";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "@/components/builder/SortableItem";
import { useDroppable } from "@dnd-kit/core";
import { useBuilderStore } from "@/store/useBuilderStore";

export default function ElementRenderer({ element }: { element: CanvasElement }) {
  const { setNodeRef } = useDroppable({
    id: element.id,
    data: {
      isContainer: element.type === 'section'
    }
  });

  const { selectElement } = useBuilderStore();

  const renderWrapper = (element: CanvasElement, children: React.ReactNode) => {
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
    )
  }

  switch (element.type) {
    case "section":
      return (
        <section 
          ref={setNodeRef}
          className="p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[100px] flex flex-col gap-4 bg-gray-50"
        >
          <SortableContext items={element.children?.map(c => c.id) || []} strategy={verticalListSortingStrategy}>
            {element.children && element.children.length > 0 ? (
              element.children.map(child => (
                <SortableItem 
                  key={child.id} 
                  id={child.id}
                  data={{
                    parentId: element.id,
                    isContainer: child.type === 'section',
                  }}
                >
                  <ElementRenderer element={child} />
                </SortableItem>
              ))
            ) : (
              <div className="text-center text-gray-400 py-4">
                Thả component vào đây
              </div>
            )}
          </SortableContext>
        </section>
      );

    case "text":
      return renderWrapper(element, 
        <div>{element.props.text || "Text mẫu..."}</div>
      );
      
    case "button":
        return renderWrapper(element,
          <a
            href={element.props.link || "#"}
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded"
            onClick={(e) => e.preventDefault()}
          >
            {element.props.text || "Button"}
          </a>
        );
      
    case "image":
      return renderWrapper(element,
        <div className="w-full">
          <img
            src={element.props.url || "https://via.placeholder.com/400x300?text=Image"}
            alt={element.props.title || "Image"}
            className="max-w-full h-auto rounded-lg shadow-sm"
          />
          {element.props.title && (
            <p className="mt-2 text-sm text-gray-600 text-center">{element.props.title}</p>
          )}
        </div>
      );
      
    case "card":
      return renderWrapper(element,
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
      return (
        <hr className="my-6 border-gray-300 border-t-2" />
      );
      
    default:
      return (
        <div className="bg-white p-2 rounded border border-transparent">
            Unknown element type
        </div>
      );
  }
} 