"use client";

import React from "react";
import { CanvasElement } from "@/types/element";
import BackgroundPanel from "../panels/BackgroundPanel";
import BorderPanel from "../panels/BorderPanel";

interface DesignTabProps {
  element: CanvasElement;
  onChange: (k: string, v: string) => void;
  expandedSections: { [key: string]: boolean };
  toggleSection: (sectionKey: string) => void;
}

export default function DesignTab({
  element,
  onChange,
  expandedSections,
  toggleSection,
}: DesignTabProps) {
  return (
    <div className="space-y-4">
      <BackgroundPanel
        element={element}
        onChange={onChange}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />

      <BorderPanel
        element={element}
        onChange={onChange}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />
    </div>
  );
}
