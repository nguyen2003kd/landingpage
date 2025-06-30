import { create } from 'zustand';
import { CanvasElement } from '../types/element';
import { produce } from 'immer';

interface ElementStore {
  elements: CanvasElement[];
  selectedElementId: string | null;
  addElement: (element: CanvasElement, parentId?: string) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  moveElement: (id: string, position: { x: number; y: number }) => void;
  getLayoutJSON: () => string;
  loadLayoutFromJSON: (json: string) => void;
}

export const useElementStore = create<ElementStore>((set, get) => ({
  elements: [],
  selectedElementId: null,

  addElement: (element, parentId) => {
    set(produce((state: ElementStore) => {
      if (parentId) {
        const findAndAdd = (elements: CanvasElement[]): boolean => {
          for (let i = 0; i < elements.length; i++) {
            if (elements[i].id === parentId) {
              if (!elements[i].children) {
                elements[i].children = [];
              }
              elements[i].children!.push(element);
              return true;
            }
            if (elements[i].children && findAndAdd(elements[i].children!)) {
              return true;
            }
          }
          return false;
        };
        if (findAndAdd(state.elements)) {
          state.selectedElementId = element.id;
        }
      } else {
        state.elements.push(element);
        state.selectedElementId = element.id;
      }
    }));
  },

  updateElement: (id, updates) => {
    set((state) => ({
      elements: state.elements.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      ),
    }));
  },

  deleteElement: (id) => {
    set(produce((state: ElementStore) => {
      const findAndRemove = (elements: CanvasElement[]): CanvasElement[] => {
        return elements.filter(element => {
          if (element.id === id) {
            return false;
          }
          if (element.children) {
            element.children = findAndRemove(element.children);
          }
          return true;
        });
      };
      state.elements = findAndRemove(state.elements);
      if (state.selectedElementId === id) {
        state.selectedElementId = null;
      }
    }));
  },

  selectElement: (id) => {
    set({ selectedElementId: id });
  },

  moveElement: (id, position) => {
    set((state) => ({
      elements: state.elements.map((element) =>
        element.id === id ? { ...element, position } : element
      ),
    }));
  },

  getLayoutJSON: () => {
    const { elements } = get();
    return JSON.stringify(elements, null, 2);
  },

  loadLayoutFromJSON: (json) => {
    try {
      const elements = JSON.parse(json);
      set({ elements, selectedElementId: null });
    } catch (error) {
      console.error('Failed to load layout from JSON:', error);
    }
  },
})); 