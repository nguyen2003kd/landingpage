import React from 'react';
import { CanvasElement } from '../../types/element';
import { TextProps } from '../../types/element';

interface TextElementProps {
  element: CanvasElement;
}

const TextElement: React.FC<TextElementProps> = ({ element }) => {
  const props = element.props as TextProps;
  const {
    text = "Văn bản mẫu...",
    fontSize = "16px",
    fontWeight = "normal",
    color = "#000000",
    textAlign = "left",
    lineHeight = "1.5",
    letterSpacing = "0px",
    textDecoration = "none",
    fontStyle = "normal",
    backgroundColor = "transparent",
    padding = "0px",
    margin = "0px",
    borderRadius = "0px",
    border = "none",
    shadow = "none",
    maxWidth = "100%",
    opacity = "1"
  } = props;

  const getShadowStyle = (shadow: string) => {
    switch (shadow) {
      case 'small': return '0 1px 3px rgba(0,0,0,0.12)';
      case 'medium': return '0 4px 6px rgba(0,0,0,0.1)';
      case 'large': return '0 10px 25px rgba(0,0,0,0.15)';
      case 'none': return 'none';
      default: return shadow;
    }
  };

  const style: React.CSSProperties = {
    fontSize,
    fontWeight,
    color,
    textAlign: textAlign as 'left' | 'center' | 'right' | 'justify',
    lineHeight,
    letterSpacing,
    textDecoration: textDecoration as 'none' | 'underline' | 'line-through',
    fontStyle: fontStyle as 'normal' | 'italic',
    backgroundColor,
    padding,
    margin,
    borderRadius,
    border,
    boxShadow: getShadowStyle(shadow),
    maxWidth,
    opacity: parseFloat(opacity),
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap'
  };

  return (
    <div style={style}>
      {text}
    </div>
  );
};

export default TextElement; 