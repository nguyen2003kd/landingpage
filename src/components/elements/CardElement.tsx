import React from 'react';
import { CanvasElement } from '../../types/element';
import { CardProps } from '../../types/element';

interface CardElementProps {
  element: CanvasElement;
}

const CardElement: React.FC<CardElementProps> = ({ element }) => {
  const props = element.props as CardProps;
  const {
    title = "Card Title",
    description = "This is a sample card description that can be customized with various styling options.",
    cardType = "default",
    backgroundColor = "#ffffff",
    borderRadius = "12px",
    padding = "24px",
    margin = "0px",
    border = "1px solid #e5e7eb",
    shadow = "medium",
    opacity = "1",
    width = "100%",
    maxWidth = "400px",
    textAlign = "left",
    titleColor = "#1f2937",
    descriptionColor = "#6b7280",
    titleFontSize = "20px",
    titleFontWeight = "600",
    descriptionFontSize = "14px",
    descriptionLineHeight = "1.6"
  } = props;

  const getCardStyles = () => {
    const baseStyles: React.CSSProperties = {
      backgroundColor,
      borderRadius,
      padding,
      margin,
      border,
      opacity: parseFloat(opacity),
      width,
      maxWidth,
      textAlign: textAlign as 'left' | 'center' | 'right',
      transition: 'all 0.2s ease-in-out',
      overflow: 'hidden'
    };

    // Card type styles
    switch (cardType) {
      case 'elevated':
        baseStyles.border = 'none';
        baseStyles.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        break;
      case 'outlined':
        baseStyles.border = '2px solid #e5e7eb';
        baseStyles.boxShadow = 'none';
        break;
      case 'minimal':
        baseStyles.border = 'none';
        baseStyles.boxShadow = 'none';
        baseStyles.backgroundColor = 'transparent';
        break;
      case 'glass':
        baseStyles.border = '1px solid rgba(255,255,255,0.2)';
        baseStyles.backgroundColor = 'rgba(255,255,255,0.1)';
        baseStyles.backdropFilter = 'blur(10px)';
        break;
    }

    // Shadow styles
    if (cardType === 'default') {
      switch (shadow) {
        case 'small':
          baseStyles.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
          break;
        case 'medium':
          baseStyles.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          break;
        case 'large':
          baseStyles.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
          break;
        case 'none':
          baseStyles.boxShadow = 'none';
          break;
      }
    }

    return baseStyles;
  };

  return (
    <div 
      style={getCardStyles()}
      onMouseEnter={(e) => {
        if (cardType === 'default' && shadow !== 'none') {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (cardType === 'default' && shadow !== 'none') {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = getCardStyles().boxShadow as string;
        }
      }}
    >
      {title && (
        <h3 style={{
          margin: '0 0 12px 0',
          fontSize: titleFontSize,
          fontWeight: titleFontWeight,
          color: titleColor,
          lineHeight: '1.3'
        }}>
          {title}
        </h3>
      )}
      
      {description && (
        <p style={{
          margin: '0',
          fontSize: descriptionFontSize,
          color: descriptionColor,
          lineHeight: descriptionLineHeight
        }}>
          {description}
        </p>
      )}
    </div>
  );
};

export default CardElement; 