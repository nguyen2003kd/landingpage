import React from 'react';
import { X, Settings, Palette, Layout, MousePointer } from 'lucide-react';

interface RightPanelProps {
  setSelectpanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightPanel = ({ setSelectpanel }: RightPanelProps) => {
  return (
    <div className=" w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800">Cài đặt phần tử</h3>
          <button onClick={() => setSelectpanel(false)} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <MousePointer className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Vui lòng chọn phần tử để cấu hình
          </p>
        </div>

        {/* Settings Categories (placeholder for when element is selected) */}
        <div className="space-y-4 opacity-50">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Layout className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Bố cục</span>
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Màu sắc</span>
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Nâng cao</span>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <span>💡</span>
          Góp ý tính năng này
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
          để chúng tôi giúp bạn trải nghiệm tốt hơn
        </p>
      </div>
    </div>
  );
};

export default RightPanel;