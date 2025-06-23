import { Button } from "@/components/ui/button";

type LogoEditorProps = {
  logoUrl: string; // là input tạm
  width: string;
  height: string;
  onChange: (field: string, value: string) => void;
  onUpload: () => void;
};

export default function LogoEditor({
  logoUrl,
  width,
  height,
  onChange,
  onUpload,
}: LogoEditorProps) {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white p-4 shadow-lg rounded z-50 w-72 space-y-3">
      <div className="space-y-1">
        <label className="text-sm">Link ảnh:</label>
        <input
          type="text"
          value={logoUrl} // ← logoUrl ở đây phải là biến inputUrl bạn truyền xuống từ `LogoManager`
          onChange={(e) => onChange("logoUrl", e.target.value)}
          className="w-full border px-2 py-1 rounded"
          placeholder="Nhập URL ảnh mới..."
        />
      </div>

      <div className="flex justify-between space-x-2">
        <div className="flex-1">
          <label className="text-sm">Chiều rộng (px):</label>
          <input
            type="number"
            value={width}
            onChange={(e) => onChange("width", e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm">Chiều cao (px):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => onChange("height", e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
      </div>

      <Button onClick={onUpload} className="w-full bg-blue-500 text-white">
        Upload
      </Button>
    </div>
  );
}
