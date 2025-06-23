// components/ButtonEditor.tsx
import React from "react";
import { Button } from "@/components/ui/button";

type ButtonEditorProps = {
  buttonData: any;
  onChange: (field: string, value: any) => void;
  onSave: () => void;
};

export default function ButtonEditor({
  buttonData,
  onChange,
  onSave,
}: ButtonEditorProps) {
  return (
    <div className="absolute top-full right-0 mt-2 bg-white p-4 shadow-lg rounded z-50 w-72 space-y-2">
      <input
        type="text"
        placeholder="Tên button"
        value={buttonData.name}
        onChange={(e) => onChange("name", e.target.value)}
        className="w-full border px-2 py-1 rounded"
      />

      <div className="flex justify-between">
        <label className="text-sm">Màu nền:</label>
        <input
          type="color"
          value={buttonData.bgColor}
          onChange={(e) => onChange("bgColor", e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <label className="text-sm">Màu chữ:</label>
        <input
          type="color"
          value={buttonData.textColor}
          onChange={(e) => onChange("textColor", e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <label className="text-sm">Cỡ chữ:</label>
        <input
          type="number"
          min="10"
          max="36"
          value={buttonData.fontSize}
          onChange={(e) => onChange("fontSize", e.target.value)}
          className="w-16 border px-1 rounded"
        />
      </div>

      <div className="flex justify-between">
        <label className="text-sm">Padding:</label>
        <select
          value={buttonData.padding}
          onChange={(e) => onChange("padding", e.target.value)}
          className="w-28 border px-1 rounded"
        >
          <option value="px-2 py-1">Nhỏ</option>
          <option value="px-4 py-2">Trung bình</option>
          <option value="px-6 py-3">Lớn</option>
        </select>
      </div>

      <div className="flex space-x-4 items-center text-sm">
        <label>
          <input
            type="checkbox"
            checked={buttonData.bold}
            onChange={() => onChange("bold", !buttonData.bold)}
          />{" "}
          In đậm
        </label>
        <label>
          <input
            type="checkbox"
            checked={buttonData.italic}
            onChange={() => onChange("italic", !buttonData.italic)}
          />{" "}
          Nghiêng
        </label>
      </div>

      <Button onClick={onSave} className="w-full bg-blue-500 text-white">
        Save
      </Button>
    </div>
  );
}
