// 通用卡片组件
import React from "react";

export function Card({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-card p-4 ${onClick ? "cursor-pointer active:scale-[0.98] transition-transform" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
