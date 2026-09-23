// 页面头部 —— 菜单按钮 + 标题
"use client";
import { MenuIcon } from "@/components/icons";

export function PageHeader({
  title,
  onMenu,
}: {
  title: string;
  onMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur-md flex items-center justify-between px-4 h-14 border-b border-sage-100">
      <button
        onClick={onMenu}
        className="md:hidden p-2 -ml-2 text-sage-700 active:bg-sage-100 rounded-lg"
        aria-label="打开菜单"
      >
        <MenuIcon size={22} />
      </button>
      <h1 className="flex-1 text-center text-lg font-semibold tracking-wide text-sage-800">
        {title}
      </h1>
      <div className="w-10 md:hidden" aria-hidden="true" />
    </header>
  );
}
