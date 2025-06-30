export type ElementType = "text" | "button" | "image" | "card" | "divider" | "section";

export type SectionLayout = "default" | "2-2" | "1-1-1-1" | "3-1" | "1-3";

export interface ElementProps {
  text?: string;
  url?: string;
  link?: string;
  title?: string;
  description?: string;
  layout?: SectionLayout;
  columnIndex?: number;
  columnRatio?: string;
  columnHeight?: string;
  // Background properties
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  videoOpacity?: string;
  // Border and styling
  borderRadius?: string;
  borderStyle?: string;
  borderColor?: string;
  shadow?: string;
  shadowEnabled?: string;
  // Effects
  effectBackgroundColor?: string;
  textColor?: string;
  opacity?: string;
  scale?: string;
  // Advanced
  elementId?: string;
  marginTop?: string;
  marginLeft?: string;
  marginRight?: string;
  marginBottom?: string;
  paddingTop?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingBottom?: string;
  desktopVisible?: string;
  mobileVisible?: string;
  timeDisplayType?: string;
  // Hover effects
  hoverBorderColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverOpacity?: string;
  hoverScale?: string;
}

export interface CanvasElement {
  id: string;
  type: ElementType;
  props: ElementProps;
  children?: CanvasElement[];
}