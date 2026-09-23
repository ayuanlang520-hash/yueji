// 底部导航栏 —— 移动端固定底部，PC端隐藏
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, BookIcon } from "@/components/icons";

const items = [
  { href: "/", label: "首页", icon: HomeIcon },
  { href: "/reading", label: "书架", icon: BookIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-sage-100 safe-bottom md:hidden">
      <div className="mx-auto flex h-16 max-w-sm items-center justify-around">
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
