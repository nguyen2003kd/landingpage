"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLayoutcomponents } from "@/hook/use-Layoutcomponents";
//Image

export const MobileSidebar = () => {
  //state
  const { isOpen, onClose } = useLayoutcomponents();

  // Prevent background scrolling
  //
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    //Render
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Close Button outside white box */}
      <X
        size={30}
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] text-black cursor-pointer"
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[330px] bg-white py-10 shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Tabs */}
      </div>
    </>
  );
};
