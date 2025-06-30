import React from 'react';
import { CanvasElement } from '../../types/element';
import { ImageProps } from '../../types/element';

interface ImageElementProps {
  element: CanvasElement;
}

const ImageElement: React.FC<ImageElementProps> = ({ element }) => {
  const props = element.props as ImageProps;

  const {
    url = "https://via.placeholder.com/400x300?text=Image",
    title = "",
    alt = "Image",
    objectFit = "cover",
    objectPosition = "center",
    width = "100%",
    height = "auto",
    maxWidth = "100%",
    borderRadius = "8px",
    border = "none",
    shadow = "medium",
    opacity = "1",
    backgroundColor = "transparent",
    padding = "0px",
    margin = "0px"
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

  const containerStyle: React.CSSProperties = {
    width,
    maxWidth,
    padding,
    margin,
    backgroundColor,
    borderRadius,
    border,
    boxShadow: getShadowStyle(shadow),
    opacity: parseFloat(opacity),
    overflow: 'hidden'
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height,
    objectFit: objectFit as 'cover' | 'contain' | 'fill' | 'none',
    objectPosition,
    display: 'block',
    borderRadius: objectFit === 'cover' ? borderRadius : '0px'
  };

  return (
    <div style={containerStyle}>
      <img
        src={url}
        alt={alt}
        style={imageStyle}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://via.placeholder.com/400x300?text=Image+Error";
        }}
      />
      {title && (
        <div style={{
          padding: '8px 0',
          textAlign: 'center',
          fontSize: '14px',
          color: '#666',
          fontWeight: '500'
        }}>
          {title}
        </div>
      )}
    </div>
  );
};

export default ImageElement; 