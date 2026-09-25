// 应用外壳 —— 整合侧边栏、头部、底部导航，管理侧边栏开关状态
"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { PageHeader } from "./PageHeader";

// 路由到标题的映射
const titleMap: Record<string, string> = {
  "/": "阅迹",
  "/reading": "书架",
  "/traces": "轨迹",
  "/settings": "我的",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = titleMap[pathname] || "阅迹";

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <PageHeader title={title} onMenu={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 pb-24 md:pb-8 max-w-2xl mx-auto w-full">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
