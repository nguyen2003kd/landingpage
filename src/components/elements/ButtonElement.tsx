import React from 'react';
import { CanvasElement } from '../../types/element';
import { ButtonProps } from '../../types/element';

interface ButtonElementProps {
  element: CanvasElement;
}

const ButtonElement: React.FC<ButtonElementProps> = ({ element }) => {
  const props = element.props as ButtonProps;

  const {
    text = "Button",
    link = "#",
    buttonType = "primary",
    buttonSize = "medium",
    fontSize = "16px",
    fontWeight = "600",
    color = "#ffffff",
    backgroundColor = "#3b82f6",
    borderRadius = "8px",
    padding = "12px 24px",
    border = "none",
    shadow = "medium",
    opacity = "1",
    width = "auto",
    textAlign = "center",
    textDecoration = "none",
    hoverEffect = "true"
  } = props;

  const getButtonStyles = () => {
    const baseStyles: React.CSSProperties = {
      fontSize,
      fontWeight,
      color,
      backgroundColor,
      borderRadius,
      padding,
      border,
      opacity: parseFloat(opacity),
      width,
      textAlign: textAlign as 'left' | 'center' | 'right',
      textDecoration: textDecoration as 'none' | 'underline',
      cursor: 'pointer',
      display: 'inline-block',
      transition: 'all 0.2s ease-in-out',
      userSelect: 'none',
      outline: 'none'
    };

    // Button type styles
    switch (buttonType) {
      case 'secondary':
        baseStyles.backgroundColor = '#6b7280';
        break;
      case 'outline':
        baseStyles.backgroundColor = 'transparent';
        baseStyles.border = `2px solid ${backgroundColor}`;
        baseStyles.color = backgroundColor;
        break;
      case 'ghost':
        baseStyles.backgroundColor = 'transparent';
        baseStyles.color = backgroundColor;
        break;
      case 'danger':
        baseStyles.backgroundColor = '#ef4444';
        break;
      case 'success':
        baseStyles.backgroundColor = '#10b981';
        break;
      case 'warning':
        baseStyles.backgroundColor = '#f59e0b';
        break;
    }

    // Button size styles
    switch (buttonSize) {
      case 'small':
        baseStyles.padding = '8px 16px';
        baseStyles.fontSize = '14px';
        break;
      case 'large':
        baseStyles.padding = '16px 32px';
        baseStyles.fontSize = '18px';
        break;
    }

    // Shadow styles
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

    return baseStyles;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  };

  return (
    <button
      style={getButtonStyles()}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (hoverEffect === 'true') {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverEffect === 'true') {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = getButtonStyles().boxShadow as string;
        }
      }}
    >
      {text}
    </button>
  );
};

export default ButtonElement; 