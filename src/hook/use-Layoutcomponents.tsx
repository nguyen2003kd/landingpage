import {create} from 'zustand'
type LayoutComponent={
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useLayoutcomponents = create<LayoutComponent>((set)=>({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));