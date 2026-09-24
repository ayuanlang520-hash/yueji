import { AuthPanel } from "@/components/auth/AuthPanel";
import { Card } from "@/components/ui/Card";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ auth_error?: string }>;
}) {
  const configured = isSupabaseConfigured();
  const { auth_error: authError } = await searchParams;
  let email: string | undefined;

  if (configured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email;
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-sage-400">我的</p>
        <h1 className="mt-1 text-2xl font-semibold text-sage-800">
          {email ? "阅读记录会跟着你" : "用邮箱保存阅读轨迹"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-sage-500">
          {email
            ? "你已经登录。后续的书籍、进度和阅读感想会与这个账号同步。"
            : "无需设置密码。我们会发送一封登录邮件，点击其中的链接即可进入阅迹。"}
        </p>
      </div>

      <Card className="p-5">
        <AuthPanel
          configured={configured}
          email={email}
          invalidLink={authError === "invalid_link"}
        />
      </Card>

      <p className="text-xs leading-5 text-sage-400">
        当前阶段仅建立账号与同步基础，不会公开你的阅读记录，也不包含社交功能。
      </p>
    </div>
  );
}
