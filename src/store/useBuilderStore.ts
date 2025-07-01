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

// Tìm element trong cây
const findElementInTree = (elements: CanvasElement[], id: string): CanvasElement | null => {
  for (const el of elements) {
    if (el.id === id) return el;
    if (el.children) {
      const found = findElementInTree(el.children, id);
      if (found) return found;
    }
  }
  return null;
};

// Di chuyển element từ vị trí này sang vị trí khác
const moveElementInTree = (
  elements: CanvasElement[],
  sourceId: string,
  targetParentId: string | null,
  targetIndex: number,
  columnIndex?: number
): CanvasElement[] => {
  // 1. Tìm element cần di chuyển
  const elementToMove = findElementInTree(elements, sourceId);
  if (!elementToMove) return elements;

  // 2. Tạo bản sao với columnIndex mới nếu cần
  const movedElement = columnIndex !== undefined 
    ? { ...elementToMove, props: { ...elementToMove.props, columnIndex } }
    : elementToMove;

  // 3. Xóa element khỏi vị trí cũ
  const elementsWithoutSource = removeElementFromTree(elements, sourceId);

  // 4. Thêm element vào vị trí mới
  return addElementToTree(elementsWithoutSource, movedElement, targetParentId, targetIndex);
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

// Sắp xếp lại elements trong cùng container
const reorderElementsInContainer = (
  elements: CanvasElement[],
  containerId: string | null,
  sourceIndex: number,
  targetIndex: number
): CanvasElement[] => {
  if (!containerId) {
    // Sắp xếp lại ở root level
    const newElements = [...elements];
    const [movedElement] = newElements.splice(sourceIndex, 1);
    newElements.splice(targetIndex, 0, movedElement);
    return newElements;
  }

  // Sắp xếp lại trong container con
  return elements.map(el => {
    if (el.id === containerId && el.children) {
      const newChildren = [...el.children];
      const [movedElement] = newChildren.splice(sourceIndex, 1);
      newChildren.splice(targetIndex, 0, movedElement);
      return { ...el, children: newChildren };
    }
    if (el.children) {
      return { ...el, children: reorderElementsInContainer(el.children, containerId, sourceIndex, targetIndex) };
    }
    return el;
  });
};

// Tìm index của element trong container
const findElementIndex = (elements: CanvasElement[], elementId: string, containerId: string | null): number => {
  if (!containerId) {
    return elements.findIndex(el => el.id === elementId);
  }
  
  for (const el of elements) {
    if (el.id === containerId && el.children) {
      return el.children.findIndex(child => child.id === elementId);
    }
    if (el.children) {
      const index = findElementIndex(el.children, elementId, containerId);
      if (index !== -1) return index;
    }
  }
  return -1;
};

interface BuilderState {
  elements: CanvasElement[];
  selectedId: string | null;
  selectedColumnId: string | null; // section-id + column-index
  selectedColumnIndex: number | null;
  columnSettings: Record<string, Record<string, string>>; // sectionId-columnIndex -> settings
  addElement: (newElement: Omit<CanvasElement, 'id' | 'children'>, parentId: string | null, index: number) => void;
  addElementToColumn: (elementData: Omit<CanvasElement, 'id' | 'children'>, parentId: string, columnIndex: number) => void;
  moveElement: (from: number, to: number) => void;
  moveElementToContainer: (sourceId: string, targetParentId: string | null, targetIndex: number, columnIndex?: number) => void;
  reorderElements: (sourceId: string, targetId: string, containerId: string | null) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, props: Partial<CanvasElement["props"]>) => void;
  selectElement: (id: string | null) => void;
  selectColumn: (sectionId: string, columnIndex: number) => void;
  updateColumnSettings: (sectionId: string, columnIndex: number, settings: Record<string, string>) => void;
  getColumnSettings: (sectionId: string, columnIndex: number) => Record<string, string>;
  setElements: (els: CanvasElement[]) => void;
  exportLayout: () => string;
  importLayout: (json: string) => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  elements: [],
  selectedId: null,
  selectedColumnId: null,
  selectedColumnIndex: null,
  columnSettings: {},
  
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

  addElementToColumn: (elementData, parentId, columnIndex) =>
    set((state) => {
      const newElement: CanvasElement = {
        ...elementData,
        id: nanoid(),
        props: { ...elementData.props, columnIndex },
        children: elementData.type === 'section' ? [] : undefined,
      };
      
      // Thêm vào cuối children của parent section
      const updater = (els: CanvasElement[]): CanvasElement[] => {
        return els.map(el => {
          if (el.id === parentId) {
            return { 
              ...el, 
              children: [...(el.children || []), newElement] 
            };
          }
          if (el.children) {
            return { ...el, children: updater(el.children) };
          }
          return el;
        });
      };
      
      return { elements: updater(state.elements) };
    }),
    
  moveElement: (from, to) =>
    set((state) => {
      const elements = [...state.elements];
      const [moved] = elements.splice(from, 1);
      elements.splice(to, 0, moved);
      return { elements };
    }),
    
  moveElementToContainer: (sourceId, targetParentId, targetIndex, columnIndex) =>
    set((state) => ({
      elements: moveElementInTree(state.elements, sourceId, targetParentId, targetIndex, columnIndex)
    })),
    
  reorderElements: (sourceId, targetId, containerId) =>
    set((state) => {
      const sourceIndex = findElementIndex(state.elements, sourceId, containerId);
      const targetIndex = findElementIndex(state.elements, targetId, containerId);
      
      if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex) return state;
      
      return {
        elements: reorderElementsInContainer(state.elements, containerId, sourceIndex, targetIndex)
      };
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
    
  selectElement: (id) => set({ selectedId: id, selectedColumnId: null, selectedColumnIndex: null }),
  
  selectColumn: (sectionId, columnIndex) => set({
    selectedColumnId: `${sectionId}-${columnIndex}`,
    selectedColumnIndex: columnIndex,
    selectedId: null,
  }),
  
  updateColumnSettings: (sectionId, columnIndex, settings) =>
    set((state) => ({
      columnSettings: {
        ...state.columnSettings,
        [`${sectionId}-${columnIndex}`]: {
          ...state.columnSettings[`${sectionId}-${columnIndex}`],
          ...settings,
        },
      },
    })),
  
  getColumnSettings: (sectionId, columnIndex) => {
    const state = get();
    return state.columnSettings[`${sectionId}-${columnIndex}`] || {};
  },
  
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