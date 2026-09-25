"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export function AuthPanel({
  configured,
  email,
  invalidLink,
}: {
  configured: boolean;
  email?: string;
  invalidLink: boolean;
}) {
  const router = useRouter();
  const [inputEmail, setInputEmail] = useState("");
  const [message, setMessage] = useState(
    invalidLink ? "登录链接无效或已经过期，请重新发送。" : "",
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: inputEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      setMessage(
        error ? `发送失败：${error.message}` : "登录链接已发送，请检查邮箱。",
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "发送失败，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    setSubmitting(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        setMessage(`退出失败：${error.message}`);
        return;
      }

      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "退出失败，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        <p className="font-medium">Supabase 尚未连接</p>
        <p className="mt-1">
          请先创建或确认 Supabase 项目，再把项目地址和 Publishable Key 写入
          <code className="mx-1 rounded bg-white/70 px-1.5 py-0.5">.env.local</code>。
        </p>
      </div>
    );
  }

  if (email) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl bg-sage-50 p-4">
          <p className="text-xs font-medium tracking-wide text-sage-400">当前账号</p>
          <p className="mt-1 break-all font-medium text-sage-800">{email}</p>
        </div>
        <Button
          variant="secondary"
          className="w-full"
          disabled={submitting}
          onClick={handleLogout}
        >
          {submitting ? "正在退出…" : "退出登录"}
        </Button>
        {message && <p className="text-sm text-red-600">{message}</p>}
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-sage-700">邮箱</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={inputEmail}
          onChange={(event) => setInputEmail(event.target.value)}
          placeholder="name@example.com"
          className="min-h-[48px] w-full rounded-xl border border-sage-200 bg-white px-4 text-base text-sage-800 outline-none transition focus:border-sage-500 focus:ring-2 focus:ring-sage-100"
        />
      </label>
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "正在发送…" : "发送登录链接"}
      </Button>
      {message && (
        <p
          className={`text-sm leading-6 ${message.startsWith("登录链接已发送") ? "text-sage-600" : "text-red-600"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
