// 侧边栏导航 —— 移动端抽屉式，PC端常驻
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BookIcon,
  CloseIcon,
  UserIcon,
} from "@/components/icons";

const menuGroups = [
  {
    group: "阅读",
    items: [
      { href: "/", label: "首页", icon: HomeIcon },
      { href: "/reading", label: "书架", icon: BookIcon },
      { href: "/settings", label: "我的", icon: UserIcon },
    ],
  },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* 移动端遮罩 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white z-50 transform transition-transform duration-300 md:translate-x-0 md:static md:z-0 md:w-64 md:shrink-0 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 品牌区 */}
        <div className="p-5 bg-gradient-to-br from-sage-500 to-sage-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <BookIcon size={24} />
              </div>
              <div>
                <p className="text-xl font-semibold tracking-wide">阅迹</p>
                <p className="text-sm text-white/80">推进 · 留痕 · 积累</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="md:hidden text-white/80 p-1"
            >
              <CloseIcon size={22} />
            </button>
          </div>
          <p className="mt-4 max-w-48 text-sm leading-6 text-white/75">
            让阅读适应生活，也让每一次阅读留下痕迹。
          </p>
        </div>

        {/* 菜单 */}
        <nav className="flex-1 overflow-y-auto no-scrollbar p-3">
          {menuGroups.map(({ group, items }) => (
            <div key={group} className="mb-4">
              <p className="text-xs text-sage-400 font-medium px-3 mb-1">
                {group}
              </p>
              {items.map(({ href, label, icon: Icon }) => {
                const active =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-0.5 ${
                      active
                        ? "bg-sage-100 text-sage-700"
                        : "text-sage-600 hover:bg-sage-50"
                    }`}
                  >
                    <Icon size={20} />
                    {label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
