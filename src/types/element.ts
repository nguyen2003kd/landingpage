export type ElementType = "text" | "button" | "image" | "card" | "divider" | "section";

export type SectionLayout = "default" | "2-2" | "1-1-1-1" | "3-1" | "1-3";

export interface ElementProps {
  text?: string;
  url?: string;
  link?: string;
  title?: string;
  description?: string;
  layout?: SectionLayout;
}

export interface CanvasElement {
  id: string;
  type: ElementType;
  props: ElementProps;
  children?: CanvasElement[];
} 