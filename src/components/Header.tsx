import React from 'react';
import { useElementStore } from '@/src/store/elementStore';
import { Download, Trash2, Save } from 'lucide-react';

const Header: React.FC = () => {
  const { elements, getLayoutJSON, loadLayoutFromJSON } = useElementStore();

  const handleExportJSON = () => {
    const json = getLayoutJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'layout.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        loadLayoutFromJSON(content);
      };
      reader.readAsText(file);
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all elements?')) {
      // Clear all elements by loading empty array
      loadLayoutFromJSON('[]');
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800">Landing Page Builder</h1>
          <span className="text-sm text-gray-500">
            {elements.length} element{elements.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Import JSON */}
          <label className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer">
            <Save className="w-4 h-4" />
            Import JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>

          {/* Clear All */}
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header; 