import { useState } from "react";
import LogoEditor from "addmain/LogoEditor/page";

export default function LogoManager() {
  const [logoUrl, setLogoUrl] = useState("img/Logo-VietProDev.png");

  const [logoWidth, setLogoWidth] = useState("80");
  const [logoHeight, setLogoHeight] = useState("40");
  const [showLogoEditor, setShowLogoEditor] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const handleLogoChange = (field: string, value: string) => {
    if (field === "logoUrl") setInputUrl(value); // CHỈ gán vào input
    if (field === "width") setLogoWidth(value);
    if (field === "height") setLogoHeight(value);
  };
  const handleUploadLogo = () => {
    if (inputUrl.trim()) {
      setLogoUrl(inputUrl); // Chỉ gán vào logo chính nếu có link mới
    }
    setInputUrl(""); // reset input về rỗng
    setShowLogoEditor(false);
  };

  return (
    <div className="flex items-center space-x-2 relative">
      <img
        src={logoUrl}
        alt="Logo"
        onClick={() => setShowLogoEditor(!showLogoEditor)}
        style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
        className="cursor-pointer object-contain"
        title="Click để chỉnh sửa logo"
      />

      {showLogoEditor && (
        <LogoEditor
          logoUrl={inputUrl}
          width={logoWidth}
          height={logoHeight}
          onChange={handleLogoChange}
          onUpload={handleUploadLogo}
        />
      )}
    </div>
  );
}
