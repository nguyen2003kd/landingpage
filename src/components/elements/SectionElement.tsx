import React from 'react';
import { CanvasElement } from '../../types/element';
import { SectionProps } from '../../types/element';
import ElementRenderer from '@/components/builder/ElementRenderer';
import { useBuilderStore } from '@/store/useBuilderStore';

interface SectionElementProps {
  element: CanvasElement;
}

const SectionElement: React.FC<SectionElementProps> = ({ element }) => {
  const { selectElement } = useBuilderStore();
  const props = element.props as SectionProps;
  const {
    layout = "default",
    showGrid = true,
    gridColor = "#e5e7eb",
    gridOpacity = "0.5",
    backgroundColor = "#f9fafb",
    borderRadius = "12px",
    padding = "24px",
    margin = "0px",
    border = "2px dashed #d1d5db",
    opacity = "1",
    width = "100%",
    maxWidth = "1200px",
    containerWidth = "100%",
    containerPadding = "0px",
    minHeight = "200px",
    gap = "16px"
  } = props;

  const getColumnClasses = (layout: string, index: number) => {
    switch (layout) {
      case "3-1":
        return index === 0 ? "col-span-3" : "col-span-1";
      case "1-3":
        return index === 0 ? "col-span-1" : "col-span-3";
      case "2-1":
        return index === 0 ? "col-span-2" : "col-span-1";
      case "1-2":
        return index === 0 ? "col-span-1" : "col-span-2";
      default:
        return "";
    }
  };

  const getGridBorderStyle = () => {
    if (!showGrid) return {};
    
    return {
      backgroundImage: `
        linear-gradient(to right, ${gridColor} 1px, transparent 1px),
        linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
      `,
      backgroundSize: `${gap} ${gap}`,
      opacity: parseFloat(gridOpacity)
    };
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor,
    borderRadius,
    padding,
    margin,
    border,
    opacity: parseFloat(opacity),
    width,
    maxWidth,
    minHeight,
    position: 'relative' as const,
    overflow: 'hidden'
  };

  const containerStyle: React.CSSProperties = {
    width: containerWidth,
    maxWidth: containerWidth === '100%' ? 'none' : containerWidth,
    padding: containerPadding,
    margin: '0 auto'
  };

  const contentStyle: React.CSSProperties = {
    display: 'grid',
    gap,
    minHeight: '100px',
    ...(layout === "2-2" && { gridTemplateColumns: 'repeat(2, 1fr)' }),
    ...(layout === "1-1-1-1" && { gridTemplateColumns: 'repeat(4, 1fr)' }),
    ...(layout === "3-1" && { gridTemplateColumns: 'repeat(4, 1fr)' }),
    ...(layout === "1-3" && { gridTemplateColumns: 'repeat(4, 1fr)' }),
    ...(layout === "2-1" && { gridTemplateColumns: 'repeat(3, 1fr)' }),
    ...(layout === "1-2" && { gridTemplateColumns: 'repeat(3, 1fr)' }),
    ...(layout === "default" && { display: 'flex', flexDirection: 'column' })
  };

  const renderSectionContent = () => {
    if (element.children && element.children.length > 0) {
      // Với layout grid, tạo wrapper cho mỗi column
      if (layout !== "default") {
        const maxCols = layout === "1-1-1-1" ? 4 : layout.includes("3") ? 2 : 2;
        const columns = Array.from({ length: maxCols }, (_, index) => {
          const columnChildren =
            element.children?.filter((_, i) => i % maxCols === index) || [];

          return (
            <div
              key={index}
              className={`flex flex-col gap-2 ${getColumnClasses(layout, index)}`}
              style={{
                border: showGrid ? `1px solid ${gridColor}` : 'none',
                borderRadius: '8px',
                padding: '12px',
                backgroundColor: 'rgba(255,255,255,0.5)',
                minHeight: '80px'
              }}
            >
              {columnChildren.map((child) => (
                <div 
                  key={child.id} 
                  style={{ flex: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectElement(child.id);
                  }}
                >
                  <ElementRenderer element={child} isChild={true} />
                </div>
              ))}
              {columnChildren.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  color: '#9ca3af',
                  fontSize: '12px',
                  padding: '20px',
                  border: `1px dashed ${gridColor}`,
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255,255,255,0.3)'
                }}>
                  Cột {index + 1}
                </div>
              )}
            </div>
          );
        });

        return columns;
      }

      // Layout default
      return element.children.map((child) => (
        <div 
          key={child.id} 
          style={{
            padding: '12px',
            backgroundColor: 'rgba(255,255,255,0.5)',
            border: showGrid ? `1px solid ${gridColor}` : 'none',
            borderRadius: '8px',
            minHeight: '60px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            selectElement(child.id);
          }}
        >
          <ElementRenderer element={child} isChild={true} />
        </div>
      ));
    }

    return (
      <div style={{
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '14px',
        padding: '40px 20px',
        border: `2px dashed ${gridColor}`,
        borderRadius: '8px',
        backgroundColor: 'rgba(255,255,255,0.3)'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
        Thả component vào đây
        <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.7 }}>
          Layout: {layout}
        </div>
      </div>
    );
  };

  return (
    <section 
      style={sectionStyle}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(element.id);
      }}
    >
      <div style={containerStyle}>
        <div style={{
          marginBottom: '12px',
          fontSize: '12px',
          color: '#6b7280',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.5px',
          fontWeight: '600'
        }}>
          Layout: {layout}
        </div>
        
        <div style={contentStyle}>
          {renderSectionContent()}
        </div>
        
        {showGrid && layout !== "default" && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            ...getGridBorderStyle()
          }} />
        )}
      </div>
    </section>
  );
};

export default SectionElement; 