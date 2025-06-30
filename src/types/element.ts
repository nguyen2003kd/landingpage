export type ElementType = "text" | "button" | "image" | "card" | "divider" | "section";

export type SectionLayout = "default" | "2-2" | "1-1-1-1" | "3-1" | "1-3" | "2-1" | "1-2";

// Sidebar item type
export interface SidebarItem {
  type: ElementType;
  label: string;
  icon: string;
  layout?: SectionLayout;
  defaultProps: ElementProps;
  defaultSize: { width: number; height: number };
}

// Common styling properties
export interface CommonStyleProps {
  // Typography
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textDecoration?: string;
  fontStyle?: string;
  
  // Layout & Spacing
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  padding?: string;
  margin?: string;
  
  // Visual
  backgroundColor?: string;
  borderRadius?: string;
  border?: string;
  shadow?: string;
  opacity?: string;
  
  // Position
  position?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: string;
  
  // Flexbox
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: string;
  gap?: string;
}

// Text specific properties
export interface TextProps extends CommonStyleProps {
  text?: string;
}

// Button specific properties
export interface ButtonProps extends CommonStyleProps {
  text?: string;
  link?: string;
  buttonType?: string; // primary, secondary, outline, ghost
  buttonSize?: string; // small, medium, large
  hoverEffect?: string;
}

// Image specific properties
export interface ImageProps extends CommonStyleProps {
  url?: string;
  title?: string;
  alt?: string;
  objectFit?: string; // cover, contain, fill, none
  objectPosition?: string;
}

// Card specific properties
export interface CardProps extends CommonStyleProps {
  title?: string;
  description?: string;
  cardType?: string; // default, elevated, outlined
  titleColor?: string;
  descriptionColor?: string;
  titleFontSize?: string;
  titleFontWeight?: string;
  descriptionFontSize?: string;
  descriptionLineHeight?: string;
}

// Section specific properties
export interface SectionProps extends CommonStyleProps {
  layout?: SectionLayout;
  showGrid?: boolean; // Show grid lines
  gridColor?: string;
  gridOpacity?: string;
  containerWidth?: string; // max-width of container
  containerPadding?: string;
}

// Divider specific properties
export interface DividerProps extends CommonStyleProps {
  direction?: string; // horizontal, vertical
  style?: string; // solid, dashed, dotted
  thickness?: string;
}

// Union type for all element props
export type ElementProps = TextProps | ButtonProps | ImageProps | CardProps | SectionProps | DividerProps;

export interface CanvasElement {
  id: string;
  type: ElementType;
  props: ElementProps;
  children?: CanvasElement[];
} 