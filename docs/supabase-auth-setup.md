# Supabase 登录配置

当前代码已经接入邮箱 Magic Link 登录，但真实邮件发送需要一个 Supabase 项目。

## 1. 准备环境变量

复制 `.env.example` 为 `.env.local`，填写 Supabase 项目中的：

- Project URL；
- Publishable key。

不要把 `.env.local` 提交到 Git。

## 2. 配置本地回调地址

在 Supabase Dashboard 的 Authentication URL Configuration 中设置：

- Site URL：`http://localhost:3000`
- Redirect URLs：加入 `http://localhost:3000`

如果使用其他端口测试，也需要加入对应地址。

## 3. 配置 Magic Link 邮件模板

在 Authentication Email Templates 中，对以下两个模板使用同一个登录链接：

- Confirm signup（首次使用的新邮箱）；
- Magic Link（已有账号）。

```html
<a href="{{ .RedirectTo }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">
  进入阅迹
</a>
```

这个回调会在服务端验证一次性链接，并把登录会话写入 Cookie。

## 4. 手动验收

1. 运行 `npm run dev`。
2. 打开 `http://localhost:3000/settings`。
3. 输入邮箱并发送登录链接。
4. 点击邮件中的链接，应回到“我的”页面并显示当前邮箱。
5. 点击“退出登录”，页面应恢复为登录表单。
