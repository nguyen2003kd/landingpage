// components/CustomButton.tsx
import React from "react";

type CustomButtonProps = {
  name: string;
  textColor: string;
  bgColor: string;
  fontSize: string;
  padding: string;
  bold: boolean;
  italic: boolean;
};

const getFontStyle = (bold: boolean, italic: boolean) => {
  let style = "";
  if (bold) style += " font-bold";
  if (italic) style += " italic";
  return style;
};

export default function CustomButton({
  name,
  textColor,
  bgColor,
  fontSize,
  padding,
  bold,
  italic,
}: CustomButtonProps) {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontSize: `${fontSize}px`,
      }}
      className={`${padding} rounded${getFontStyle(bold, italic)}`}
    >
      {name}
    </button>
  );
}
