// 成长树页 —— SVG 成长树 + 成长数据 + 四季变化
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { mockGrowthData, growthStages } from "@/lib/mockData";
import { FlameIcon, SparklesIcon, TreeIcon } from "@/components/icons";
import type { Season } from "@/types";

const seasonInfo: Record<
  Season,
  { label: string; leaf: string; leaf2: string; bg: string }
> = {
  spring: {
    label: "春",
    leaf: "#A9CBB2",
    leaf2: "#7DAB89",
    bg: "from-sage-100 to-sage-50",
  },
  summer: {
    label: "夏",
    leaf: "#5A8C68",
    leaf2: "#467554",
    bg: "from-sage-200 to-sage-100",
  },
  autumn: {
    label: "秋",
    leaf: "#E8B86D",
    leaf2: "#D98B5B",
    bg: "from-amber-50 to-amber-100",
  },
  winter: {
    label: "冬",
    leaf: "#C4D4C8",
    leaf2: "#D1E3D6",
    bg: "from-slate-50 to-slate-100",
  },
};

// 成长树 SVG 组件
function GrowthTree({ stage, season }: { stage: number; season: Season }) {
  const c = seasonInfo[season];
  const trunkH = 36 + stage * 10;
  const trunkW = 7 + stage * 1.2;
  const baseR = 16 + stage * 5;
  const cy = 215 - trunkH - baseR * 0.5;
  const cx = 100;

  const crowns: { cx: number; cy: number; r: number; fill: string }[] = [
    { cx, cy, r: baseR, fill: c.leaf },
  ];
  if (stage >= 2)
    crowns.push({
      cx: cx - baseR * 0.65,
      cy: cy + baseR * 0.25,
      r: baseR * 0.8,
      fill: c.leaf2,
    });
  if (stage >= 3)
    crowns.push({
      cx: cx + baseR * 0.65,
      cy: cy + baseR * 0.25,
      r: baseR * 0.8,
      fill: c.leaf2,
    });
  if (stage >= 4)
    crowns.push({
      cx: cx,
      cy: cy - baseR * 0.7,
      r: baseR * 0.75,
      fill: c.leaf,
    });
  if (stage >= 5) {
    crowns.push({
      cx: cx - baseR * 0.95,
      cy: cy - baseR * 0.3,
      r: baseR * 0.6,
      fill: c.leaf2,
    });
    crowns.push({
      cx: cx + baseR * 0.95,
      cy: cy - baseR * 0.3,
      r: baseR * 0.6,
      fill: c.leaf2,
    });
  }

  return (
    <svg viewBox="0 0 200 250" className="w-full max-w-[220px] mx-auto">
      {/* 地面阴影 */}
      <ellipse cx="100" cy="220" rx="55" ry="7" fill="#00000010" />
      <ellipse cx="100" cy="220" rx="45" ry="5" fill="#E8F1EA" />
      {/* 树干 */}
      <path
        d={`M${cx - trunkW / 2} 218 L${cx - trunkW / 3} ${218 - trunkH} L${cx + trunkW / 3} ${218 - trunkH} L${cx + trunkW / 2} 218 Z`}
        fill="#8B6F47"
      />
      {/* 树枝（winter 时显示更多枝条感） */}
      {season === "winter" && (
        <>
          <line
            x1={cx}
            y1={218 - trunkH * 0.5}
            x2={cx - 20}
            y2={218 - trunkH * 0.8}
            stroke="#8B6F47"
            strokeWidth="2"
          />
          <line
            x1={cx}
            y1={218 - trunkH * 0.6}
            x2={cx + 18}
            y2={218 - trunkH * 0.9}
            stroke="#8B6F47"
            strokeWidth="2"
          />
        </>
      )}
      {/* 树冠 */}
      {crowns.map((cr, i) => (
        <circle
          key={i}
          cx={cr.cx}
          cy={cr.cy}
          r={cr.r}
          fill={cr.fill}
          opacity={season === "winter" ? 0.5 : 1}
        />
      ))}
      {/* stage 5 果实 */}
      {stage >= 5 && season !== "winter" && (
        <>
          <circle cx={cx - 12} cy={cy - 3} r="3.5" fill="#D98B8B" />
          <circle cx={cx + 14} cy={cy + 4} r="3.5" fill="#D98B8B" />
          <circle cx={cx + 2} cy={cy - 14} r="3.5" fill="#D98B8B" />
        </>
      )}
    </svg>
  );
}

export default function GrowthPage() {
  const [season, setSeason] = useState<Season>(mockGrowthData.season);
  const stageInfo = growthStages.find(
    (s) => s.stage === mockGrowthData.stage
  )!;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 成长树展示 */}
      <Card className={`bg-gradient-to-b ${seasonInfo[season].bg} !shadow-float`}>
        <div className="text-center mb-2">
          <p className="text-xs text-sage-500">
            第 {mockGrowthData.stage} 阶段 · {stageInfo.name}
          </p>
          <p className="text-sm text-sage-600 mt-0.5">{stageInfo.desc}</p>
        </div>
        <GrowthTree stage={mockGrowthData.stage} season={season} />
        {/* 季节切换 */}
        <div className="flex justify-center gap-2 mt-2">
          {(Object.keys(seasonInfo) as Season[]).map((s) => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                season === s
                  ? "bg-sage-500 text-white scale-110"
                  : "bg-white/60 text-sage-600"
              }`}
            >
              {seasonInfo[s].label}
            </button>
          ))}
        </div>
      </Card>

      {/* 成长数据 */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <p className="text-2xl font-bold text-sage-700">
            {mockGrowthData.totalValue}
          </p>
          <p className="text-xs text-sage-400 mt-1">累计成长值</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-sage-700 flex items-center justify-center gap-1">
            <FlameIcon size={18} />
            {mockGrowthData.streakDays}
          </p>
          <p className="text-xs text-sage-400 mt-1">连续天数</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-sage-700">
            +{mockGrowthData.weekValue}
          </p>
          <p className="text-xs text-sage-400 mt-1">本周成长值</p>
        </Card>
      </div>

      {/* 本月里程碑 */}
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center text-sage-600">
            <SparklesIcon size={18} />
          </div>
          <h3 className="text-sm font-semibold text-sage-800">本月里程碑</h3>
        </div>
        <p className="text-sm text-sage-600">
          {mockGrowthData.monthMilestone}
        </p>
        <div className="mt-3 h-2 bg-sage-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sage-400 to-sage-500 rounded-full w-3/4" />
        </div>
        <p className="text-xs text-sage-400 mt-1.5">进度 75%</p>
      </Card>

      {/* 年度成长树 */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <TreeIcon size={18} className="text-sage-600" />
          <h3 className="text-sm font-semibold text-sage-800">年度成长树</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {([2023, 2024, 2025, 2026] as const).map((year) => (
            <div
              key={year}
              className="flex flex-col items-center gap-1 p-2 bg-sage-50 rounded-xl"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <GrowthTree
                  stage={Math.min(year - 2022, 5)}
                  season="summer"
                />
              </div>
              <span className="text-xs text-sage-500">{year}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
