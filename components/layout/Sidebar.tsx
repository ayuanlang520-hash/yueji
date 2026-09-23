// 侧边栏导航 —— 移动端抽屉式，PC端常驻
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CalendarIcon,
  DumbbellIcon,
  BookmarkIcon,
  SparklesIcon,
  BookIcon,
  GlobeIcon,
  SmileIcon,
  BulbIcon,
  CloseIcon,
} from "@/components/icons";

const menuGroups = [
  {
    group: "效率",
    items: [
      { href: "/", label: "工作台", icon: HomeIcon },
      { href: "/plan", label: "每日计划", icon: CalendarIcon },
    ],
  },
  {
    group: "健康",
    items: [{ href: "/sports", label: "运动打卡", icon: DumbbellIcon }],
  },
  {
    group: "收藏",
    items: [{ href: "/favorites", label: "我的收藏夹", icon: BookmarkIcon }],
  },
  {
    group: "学习",
    items: [
      { href: "/ai-tips", label: "AI技巧库", icon: SparklesIcon },
      { href: "/reading", label: "读书计划", icon: BookIcon },
      { href: "/language", label: "语言学习", icon: GlobeIcon },
    ],
  },
  {
    group: "生活",
    items: [
      { href: "/mood", label: "心情日记", icon: SmileIcon },
      { href: "/inspiration", label: "灵感泡泡", icon: BulbIcon },
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
        {/* 用户信息区 */}
        <div className="p-5 bg-gradient-to-br from-sage-500 to-sage-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center text-xl font-bold">
                我
              </div>
              <div>
                <p className="font-semibold text-lg">成长者</p>
                <p className="text-sm text-white/80">每天进步一点点</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="md:hidden text-white/80 p-1"
            >
              <CloseIcon size={22} />
            </button>
          </div>
          {/* 统计 */}
          <div className="flex gap-4 mt-4 text-sm">
            <div>
              <p className="font-bold text-xl">28</p>
              <p className="text-white/70 text-xs">连续打卡</p>
            </div>
            <div>
              <p className="font-bold text-xl">156</p>
              <p className="text-white/70 text-xs">完成任务</p>
            </div>
            <div>
              <p className="font-bold text-xl">42h</p>
              <p className="text-white/70 text-xs">本月运动</p>
            </div>
          </div>
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
