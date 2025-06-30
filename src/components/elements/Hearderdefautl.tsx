import React from 'react';
import { CanvasElement } from '../../types/element';

interface HeaderElementProps {
  element: CanvasElement;
}

interface HeaderProps {
  url?: string;
  title?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  shadow?: string;
  opacity?: string;
}

const Hearderdefautl: React.FC<HeaderElementProps> = ({ element }) => {
  const props = element.props as HeaderProps;
  const {
    url = "https://via.placeholder.com/1200x400?text=Header+Image",
    title = "Header Title",
    backgroundColor = "#f8fafc",
    padding = "40px 20px",
    margin = "0px",
    borderRadius = "0px",
    border = "none",
    shadow = "none",
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

  const headerStyle: React.CSSProperties = {
    backgroundColor,
    padding,
    margin,
    borderRadius,
    border,
    boxShadow: getShadowStyle(shadow),
    opacity: parseFloat(opacity),
    position: 'relative' as const,
    overflow: 'hidden'
  };

  return (
    <header style={headerStyle}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          flex: '1',
          textAlign: 'left' as const
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 1rem 0',
            lineHeight: '1.2'
          }}>
            {title}
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            margin: '0',
            lineHeight: '1.6'
          }}>
            Welcome to our amazing platform
          </p>
        </div>
        
        <div style={{
          flex: '1',
          textAlign: 'center' as const
        }}>
          <img
            src={url}
            alt="Header illustration"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/400x300?text=Header+Image+Error";
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Hearderdefautl;