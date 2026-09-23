// 页面头部 —— 菜单按钮 + 标题 + 通知
"use client";
import { MenuIcon, BellIcon } from "@/components/icons";

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
      <h1 className="text-lg font-semibold text-sage-800 flex-1 md:text-center">
        {title}
      </h1>
      <button
        className="p-2 -mr-2 text-sage-700 active:bg-sage-100 rounded-lg relative"
        aria-label="通知"
      >
        <BellIcon size={22} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-rose rounded-full" />
      </button>
    </header>
  );
}
