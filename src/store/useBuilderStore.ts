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

// Tìm element trong cây theo ID
const findElementInTree = (elements: CanvasElement[], id: string): CanvasElement | null => {
  for (const element of elements) {
    if (element.id === id) {
      return element;
    }
    if (element.children) {
      const found = findElementInTree(element.children, id);
      if (found) return found;
    }
  }
  return null;
};

interface BuilderState {
  elements: CanvasElement[];
  selectedElementId: string | null;
  addElement: (newElement: Omit<CanvasElement, 'id' | 'children'>, parentId: string | null, index: number) => void;
  moveElement: (from: number, to: number) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, props: Partial<CanvasElement["props"]>) => void;
  selectElement: (id: string | null) => void;
  setElements: (els: CanvasElement[]) => void;
  getSelectedElement: () => CanvasElement | null;
  getLayoutJSON: () => string;
  loadLayoutFromJSON: (json: string) => void;
  clearSelection: () => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  elements: [],
  selectedElementId: null,
  
  addElement: (elementData, parentId, index) =>
    set((state) => {
      const newElement: CanvasElement = {
        ...elementData,
        id: nanoid(),
        children: elementData.type === 'section' ? [] : undefined,
      };
      return {
        elements: addElementToTree(state.elements, newElement, parentId, index),
        selectedElementId: newElement.id, // Tự động chọn element mới được thêm
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
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
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
    
  selectElement: (id) => set({ selectedElementId: id }),
  
  setElements: (els) => set({ elements: els }),
  
  getSelectedElement: () => {
    const { elements, selectedElementId } = get();
    if (!selectedElementId) return null;
    return findElementInTree(elements, selectedElementId);
  },
  
  clearSelection: () => set({ selectedElementId: null }),
  
  getLayoutJSON: () => {
    const { elements, selectedElementId } = get();
    const layoutData = {
      elements,
      selectedElementId,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(layoutData, null, 2);
  },

  loadLayoutFromJSON: (json) => {
    try {
      const layoutData = JSON.parse(json);
      
      // Hỗ trợ cả format cũ (chỉ có elements) và format mới (có selectedElementId)
      if (Array.isArray(layoutData)) {
        // Format cũ - chỉ có mảng elements
        set({ elements: layoutData, selectedElementId: null });
      } else {
        // Format mới - có cả elements và selectedElementId
        const { elements, selectedElementId } = layoutData;
        set({ 
          elements: elements || [], 
          selectedElementId: selectedElementId || null 
        });
      }
    } catch (error) {
      console.error('Failed to load layout from JSON:', error);
    }
  },
})); 