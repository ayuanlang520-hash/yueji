// 底部导航栏 —— 移动端固定底部，PC端隐藏
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarIcon, BookmarkIcon, TreeIcon } from "@/components/icons";

const items = [
  { href: "/", label: "工作台", icon: HomeIcon },
  { href: "/plan", label: "计划", icon: CalendarIcon },
  { href: "/favorites", label: "收藏", icon: BookmarkIcon },
  { href: "/growth", label: "成长", icon: TreeIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-sage-100 safe-bottom md:hidden">
      <div className="flex items-center justify-around h-16">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                active ? "text-sage-600" : "text-sage-300"
              }`}
            >
              <Icon size={22} />
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
