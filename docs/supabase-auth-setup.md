# Supabase 登录配置

当前代码使用邮箱数字验证码登录，真实邮件发送需要一个 Supabase 项目。

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

## 3. 配置邮箱验证码模板

在 Authentication Email Templates 中，对以下两个模板显示 `Token`：

- Confirm signup（首次使用的新邮箱）；
- Magic Link（已有账号）。

```html
<p>你的阅迹登录验证码是：</p>
<p style="font-size: 28px; font-weight: 700; letter-spacing: 6px;">
  {{ .Token }}
</p>
<p>验证码短时间内有效。如果不是你本人操作，可以忽略这封邮件。</p>
```

不要保留自动登录链接。数字验证码由用户主动输入，不依赖发起登录时的浏览器，也不容易被邮箱的链接预览提前消耗。

## 4. 手动验收

1. 运行 `npm run dev`。
2. 打开 `http://localhost:3000/settings`。
3. 输入邮箱并发送验证码。
4. 将邮件中的数字验证码填回页面。
5. 点击“验证并登录”，页面应显示当前邮箱。
6. 点击“退出登录”，页面应恢复为登录表单。
