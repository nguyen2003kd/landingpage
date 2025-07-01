import ColumnSettingsDemo from "@/components/settings/ColumnSettingsDemo";

export default function TestColumnSettings() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Test ColumnSettings Component
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">ColumnSettings Demo</h2>
            <ColumnSettingsDemo />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <ul className="space-y-3 text-sm">
                <li>• Thử thay đổi các giá trị width, height, alignment</li>
                <li>• Xem console để debug các thay đổi</li>
                <li>• Kiểm tra Current Settings bên dưới để xem state</li>
                <li>• Component tự động detect layout từ mock data</li>
              </ul>
              
              <div className="mt-6 p-4 bg-gray-50 rounded">
                <h3 className="font-medium mb-2">Features đã implement:</h3>
                <ul className="text-xs space-y-1">
                  <li>✅ Layout detection (single, 2:2, 1:1:1:1, 3:1, 1:3)</li>
                  <li>✅ Width controls với range và number input</li>
                  <li>✅ Height controls (auto, fit-content, full-height)</li>
                  <li>✅ Vertical alignment buttons với preview</li>
                  <li>✅ Mobile responsive (100% width trên mobile)</li>
                  <li>✅ Store integration (updateColumnSettings, getColumnSettings)</li>
                  <li>✅ Debug info trong development mode</li>
                  <li>✅ Real-time updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
