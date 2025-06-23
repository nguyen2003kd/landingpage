"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomButton from "addmain/CustomButton/page";
import ButtonEditor from "addmain/ButtonEditor/page";
import LogoManager from "addmain/LogoManager/page";
import { FiMenu } from "react-icons/fi";
export default function Header() {
  const logo = "img/Logo-VietProDev.png";
  const [showCreator, setShowCreator] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const [textColor, setTextColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#6366f1");
  const [fontSize, setFontSize] = useState("16");
  const [padding, setPadding] = useState("px-4 py-2");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [createdButtons, setCreatedButtons] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<any | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [logoUrl, setLogoUrl] = useState("img/Logo-VietProDev.png");
  const [logoWidth, setLogoWidth] = useState("80");
  const [logoHeight, setLogoHeight] = useState("40");
  const [showLogoEditor, setShowLogoEditor] = useState(false);

  const handleCreate = () => {
    if (buttonName.trim() !== "") {
      setCreatedButtons([
        ...createdButtons,
        {
          name: buttonName,
          textColor,
          bgColor,
          fontSize,
          padding,
          bold,
          italic,
        },
      ]);
      setButtonName("");
      setShowCreator(false);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingData({ ...createdButtons[index] });
    setShowCreator(false);
  };

  const handleChange = (field: string, value: any) => {
    setEditingData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (editingIndex !== null && editingData) {
      const newButtons = [...createdButtons];
      newButtons[editingIndex] = editingData;
      setCreatedButtons(newButtons);
      setEditingIndex(null);
      setEditingData(null);
    }
  };

  return (
    <header className="flex items-center justify-between px-20 py-4 shadow">
      <LogoManager />

      <nav className="hidden lg:flex md:text-0.5xl items-center space-x-9 text-black/90 font-medium">
        {[
          "Đăng ký tham gia",
          "Khoảng khắc chương trình",
          "Nội dung chương trình",
          "Đội ngũ chuyên môn",
          "Nhà tài trợ",
        ].map((label, idx) => (
          <a
            key={idx}
            href="#"
            className="relative transition-colors text-black/90 hover:text-blue-800
    after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 
    after:translate-x-[-50%] after:h-[3px] after:w-0 after:bg-blue-800 after:rounded 
    after:transition-all after:duration-300 hover:after:w-full"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className=" space-x-2 relative md:flex">
        <div className="hidden lg:flex items-center">
          <Button className="bg-blue-800 text-white hover:bg-white hover:text-blue-800 font-semibold px-6 py-5 rounded-full transition-all duration-200 transform  hover:shadow-lg border border-blue-600">
            QUYỀN LỢI NHÀ TÀI TRỢ
          </Button>
        </div>

        {/* {createdButtons.map((btn, idx) => (
          <div key={idx} className="relative">
            <div onClick={() => handleEdit(idx)}>
              <CustomButton {...btn} />
            </div>
            {editingIndex === idx && editingData && (
              <ButtonEditor
                buttonData={editingData}
                onChange={handleChange}
                onSave={handleSave}
              />
            )}
          </div>
        ))} */}

        {showCreator && (
          <div className="absolute top-full right-0 mt-2 bg-white p-4 shadow-lg rounded z-50 w-72 space-y-2">
            <input
              type="text"
              placeholder="Tên button"
              value={buttonName}
              onChange={(e) => setButtonName(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />

            <div className="flex justify-between">
              <label className="text-sm">Màu nền:</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <label className="text-sm">Màu chữ:</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <label className="text-sm">Cỡ chữ:</label>
              <input
                type="number"
                min="10"
                max="36"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-16 border px-1 rounded"
              />
            </div>

            <div className="flex justify-between">
              <label className="text-sm">Padding:</label>
              <select
                value={padding}
                onChange={(e) => setPadding(e.target.value)}
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
                  checked={bold}
                  onChange={() => setBold(!bold)}
                />{" "}
                In đậm
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={italic}
                  onChange={() => setItalic(!italic)}
                />{" "}
                Nghiêng
              </label>
            </div>

            <Button
              onClick={handleCreate}
              className="w-full bg-blue-500 text-white"
            >
              Create
            </Button>
          </div>
        )}
      </div>

      {openMenu && (
        <div
          className="fixed inset-0 bg-white/30 bg-opacity-30 z-50"
          onClick={() => setOpenMenu(false)}
        >
          <div
            className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-6 space-y-4 animate-slide-in"
            onClick={(e) => e.stopPropagation()} // Ngăn đóng khi click vào menu
          >
            <LogoManager />
            <nav className="flex flex-col space-y-4 text-black font-medium">
              <a href="#" onClick={() => setOpenMenu(false)}>
                Đăng ký tham gia
              </a>
              <a href="#" onClick={() => setOpenMenu(false)}>
                Khoảnh khắc chương trình
              </a>
              <a href="#" onClick={() => setOpenMenu(false)}>
                Nội dung chương trình
              </a>
              <a href="#" onClick={() => setOpenMenu(false)}>
                Đội ngũ chuyên môn
              </a>
              <a href="#" onClick={() => setOpenMenu(false)}>
                Nhà tài trợ
              </a>
            </nav>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
              onClick={() => setOpenMenu(false)}
            >
              QUYỀN LỢI NHÀ TÀI TRỢ
            </Button>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-2">
        {/* <Button variant="outline" onClick={() => setShowCreator(!showCreator)}>
          +
        </Button> */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="lg:hidden text-2xl focus:outline-none flex border border-gray-300 rounded p-2 hover:bg-gray-100 transition-colors"
        >
          <FiMenu />
        </button>
      </div>
    </header>
  );
}
