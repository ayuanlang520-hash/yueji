// 图标组件 —— 全部内联 SVG，不使用 emoji
import React from "react";

type IconProps = {
  className?: string;
  size?: number;
};

const base = (size: number = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

// 工作台
export const HomeIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z" />
  </svg>
);

// 计划/日历
export const CalendarIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

// 收藏/书签
export const BookmarkIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

// 成长/树
export const TreeIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 22V12M12 12c0-3 2-5 5-5 0 3-2 5-5 5zM12 12c0-3-2-5-5-5 0 3 2 5 5 5zM12 12c0-2 1-3 3-4M12 12c0-2-1-3-3-4" />
  </svg>
);

// 运动
export const DumbbellIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6.5 6.5l11 11M21 21l-1-1M3 3l1 1M18 22l4-4M2 6l4-4M7 7L3 11M17 17l4-4M9 5l4-4" />
    <path d="M6.5 6.5l11 11" />
  </svg>
);

// 书本
export const BookIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
  </svg>
);

// 语言/地球
export const GlobeIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// 心情/笑脸
export const SmileIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
  </svg>
);

// 灵感/灯泡
export const BulbIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" />
  </svg>
);

// AI/星星
export const SparklesIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3z" />
    <path d="M19 3v4M21 5h-4M5 17v2M6 18H4" />
  </svg>
);

// 菜单
export const MenuIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);

// 通知铃铛
export const BellIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

// 加号
export const PlusIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// 勾选
export const CheckIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// 圆圈（未完成）
export const CircleIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
  </svg>
);

// 搜索
export const SearchIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

// 左箭头
export const ChevronLeftIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

// 右箭头
export const ChevronRightIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// 编辑
export const EditIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// 删除
export const TrashIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
  </svg>
);

// 关闭
export const CloseIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// 外链
export const ExternalIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

// 复制
export const CopyIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

// 设置
export const SettingsIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// 用户/我的
export const UserIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

// 火焰（连续打卡）
export const FlameIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

// 时钟
export const ClockIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

// 标签
export const TagIcon = ({ className, size }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <path d="M7 7h.01" />
  </svg>
);
