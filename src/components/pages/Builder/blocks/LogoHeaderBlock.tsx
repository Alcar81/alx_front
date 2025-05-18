// 📁 src/components/pages/Builder/blocks/LogoHeaderBlock.tsx
import React from "react";

interface LogoHeaderBlockProps {
  position?: "left" | "center" | "right";
  size?: "small" | "medium" | "large";
}

const LogoHeaderBlock: React.FC<LogoHeaderBlockProps> = ({
  position = "left",
  size = "medium",
}) => {
  const alignment = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  }[position];

  const sizePx = {
    small: 40,
    medium: 60,
    large: 80,
  }[size];

  return (
    <div style={{ display: "flex", justifyContent: alignment, padding: "10px" }}>
      <img
        src="/logo192.png"
        alt="Logo"
        width={sizePx}
        height={sizePx}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default LogoHeaderBlock;
