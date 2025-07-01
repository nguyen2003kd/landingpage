"use client";

import React, { useState, useCallback } from 'react';

interface UseColumnResizeProps {
  onResize: (columnIndex: number, newRatio: string) => void;
  layout: string;
  currentRatio?: string;
}

export const useColumnResize = ({ onResize, layout, currentRatio }: UseColumnResizeProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, columnIndex: -1 });

  const handleMouseDown = useCallback((e: React.MouseEvent, columnIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setDragStart({ x: e.clientX, columnIndex });
    
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || dragStart.columnIndex === -1) return;

    const deltaX = e.clientX - dragStart.x;
    const containerWidth = 800; // Giả sử width container là 800px, có thể điều chỉnh

    // Tính toán ratio mới với độ nhạy giảm xuống
    if (layout === '2-2' || layout === '3-1' || layout === '1-3') {
      // Giảm độ nhạy bằng cách chia deltaX cho 2
      const deltaPercent = (deltaX / containerWidth) * 50; // Giảm từ 100 xuống 50
      const [leftRatio] = currentRatio?.split(':').map(r => parseInt(r)) || [50, 50];
      
      // Làm tròn theo bước 5% để tránh thay đổi quá nhỏ
      const rawNewLeftRatio = leftRatio + deltaPercent;
      const newLeftRatio = Math.round(Math.max(10, Math.min(90, rawNewLeftRatio)) / 5) * 5;
      const newRightRatio = 100 - newLeftRatio;
      
      // Chỉ update khi có thay đổi đáng kể (ít nhất 5%)
      const currentLeft = parseInt(currentRatio?.split(':')[0] || '50');
      if (Math.abs(newLeftRatio - currentLeft) >= 5) {
        onResize(dragStart.columnIndex, `${newLeftRatio}:${newRightRatio}`);
      }
    }
  }, [isResizing, dragStart, layout, currentRatio, onResize]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      setDragStart({ x: 0, columnIndex: -1 });
      
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  }, [isResizing]);

  // Effect để attach/detach event listeners
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return {
    isResizing,
    handleMouseDown,
  };
};
