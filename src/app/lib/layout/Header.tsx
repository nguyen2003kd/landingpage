import React from 'react';
import { Globe, Smartphone, Eye, Download, Undo2, Redo2 } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800">VietProDev</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <Undo2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <Redo2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all duration-200">
              <Globe className="w-4 h-4 inline mr-1" />
              Desktop
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all duration-200">
              <Smartphone className="w-4 h-4 inline mr-1" />
              Mobile
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
              <span className="text-xs font-medium text-green-700">Đang chỉnh sửa:</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🇻🇳</span>
                </div>
                <span className="text-sm text-green-700">Tiếng Việt</span>
              </div>
            </div> */}

            <button className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Xem trước
            </button>
            
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Xuất bản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;