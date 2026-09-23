// 通用按钮组件
"use client";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const variants: Record<Variant, string> = {
    primary: "bg-sage-500 text-white hover:bg-sage-600 active:bg-sage-700",
    secondary: "bg-sage-100 text-sage-700 hover:bg-sage-200",
    ghost: "bg-transparent text-sage-600 hover:bg-sage-50",
    danger: "bg-rose-50 text-red-600 hover:bg-rose-100",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-xl font-medium transition-colors min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
