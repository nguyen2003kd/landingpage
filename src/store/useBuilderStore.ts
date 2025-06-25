import { create } from "zustand";
import { CanvasElement } from "../types/element";
import { nanoid } from "nanoid";

// --- Helper Functions for Tree Operations ---

// Tìm và xóa một element khỏi cây
const removeElementFromTree = (elements: CanvasElement[], id: string): CanvasElement[] => {
  return elements.reduce((acc, el) => {
    if (el.id === id) return acc; // Bỏ qua element cần xóa
    if (el.children) {
      el.children = removeElementFromTree(el.children, id);
    }
    acc.push(el);
    return acc;
  }, [] as CanvasElement[]);
};

// Tìm và chèn một element mới vào cây
const addElementToTree = (
  elements: CanvasElement[], 
  newElement: CanvasElement, 
  parentId: string | null, 
  index: number
): CanvasElement[] => {
  if (!parentId) { // Thêm vào root
    const newElements = [...elements];
    newElements.splice(index, 0, newElement);
    return newElements;
  }

  return elements.map(el => {
    if (el.id === parentId) {
      if (!el.children) el.children = [];
      const newChildren = [...el.children];
      newChildren.splice(index, 0, newElement);
      return { ...el, children: newChildren };
    }
    if (el.children) {
      return { ...el, children: addElementToTree(el.children, newElement, parentId, index) };
    }
    return el;
  });
};

// ... (Các helper khác như findElement, moveElementInTree có thể được thêm vào sau)

interface BuilderState {
  elements: CanvasElement[];
  selectedId: string | null;
  addElement: (newElement: Omit<CanvasElement, 'id' | 'children'>, parentId: string | null, index: number) => void;
  moveElement: (from: number, to: number) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, props: Partial<CanvasElement["props"]>) => void;
  selectElement: (id: string | null) => void;
  setElements: (els: CanvasElement[]) => void;
  exportLayout: () => string;
  importLayout: (json: string) => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  elements: [],
  selectedId: null,
  
  addElement: (elementData, parentId, index) =>
    set((state) => {
      const newElement: CanvasElement = {
        ...elementData,
        id: nanoid(),
        children: elementData.type === 'section' ? [] : undefined,
      };
      return {
        elements: addElementToTree(state.elements, newElement, parentId, index)
      };
    }),
    
  moveElement: (from, to) =>
    set((state) => {
      const elements = [...state.elements];
      const [moved] = elements.splice(from, 1);
      elements.splice(to, 0, moved);
      return { elements };
    }),
    
  removeElement: (id) =>
    set((state) => ({
      elements: removeElementFromTree(state.elements, id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),
    
  updateElement: (id, props) =>
    set((state) => {
      const updater = (els: CanvasElement[]): CanvasElement[] => {
        return els.map(el => {
          if (el.id === id) {
            return { ...el, props: { ...el.props, ...props } };
          }
          if (el.children) {
            return { ...el, children: updater(el.children) };
          }
          return el;
        });
      };
      return { elements: updater(state.elements) };
    }),
    
  selectElement: (id) => set({ selectedId: id }),
  
  setElements: (els) => set({ elements: els }),
  
  exportLayout: () => {
    const { elements } = get();
    return JSON.stringify(elements, null, 2);
  },
  
  importLayout: (json) => {
    try {
      const elements = JSON.parse(json);
      set({ elements });
    } catch (error) {
      console.error("Invalid JSON format:", error);
    }
  },
})); 