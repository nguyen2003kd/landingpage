export type ElementType = "text" | "button" | "image" | "card" | "divider" | "section";

export interface ElementProps {
  text?: string;
  url?: string;
  link?: string;
  title?: string;
  description?: string;
}

export interface CanvasElement {
  id: string;
  type: ElementType;
  props: ElementProps;
  children?: CanvasElement[];
} 