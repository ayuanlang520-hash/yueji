import { TreeIcon } from "@/components/icons";
import { Card } from "@/components/ui/Card";

export default function TracesPage() {
  return (
    <div className="animate-fade-in">
      <Card className="border border-sage-100 p-7 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600">
          <TreeIcon size={26} />
        </div>
        <p className="mt-5 text-xs font-medium tracking-[0.16em] text-sage-400">阅读轨迹</p>
        <h1 className="mt-2 text-xl font-semibold text-sage-800">先留下真实的第一页</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-sage-500">
          阅读时长、页数和感想将在后续阶段汇聚到这里。现在不生成虚假的统计或成长树。
        </p>
      </Card>
    </div>
  );
}
