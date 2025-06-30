import React from 'react';
import { CanvasElement, DividerProps } from '../../types/element';

interface DividerElementProps {
  element: CanvasElement;
}

const DividerElement: React.FC<DividerElementProps> = ({ element }) => {
  const props = element.props as DividerProps;
  const { 
    direction = 'horizontal', 
    thickness = '1px',
    backgroundColor = '#e5e7eb',
    width = '100%',
    height = 'auto',
    margin = '16px 0'
  } = props;

  const getDividerStyle = (): React.CSSProperties => {
    const isVertical = direction === 'vertical';
    
    return {
      width: isVertical ? thickness : width,
      height: isVertical ? height : thickness,
      backgroundColor,
      margin,
      border: 'none',
      borderRadius: '0px'
    };
  };

  return (
    <div style={getDividerStyle()} />
  );
};

export default DividerElement; 