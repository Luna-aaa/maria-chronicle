# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`maria-chronicle` — 美依礼芽（MARiA）人物志。一个按时间顺序记录其生平、作品与重要事件的静态站点，Vite + React 18 SPA。

**已上线（2026-06-01）**:

- 生产地址: https://maria-chronicle.vercel.app
- 仓库: https://github.com/Luna-aaa/maria-chronicle (Public)
- 工作流: `git push origin main` → Vercel 自动构建（约 30 秒）
- 国内访问 `*.vercel.app` 不稳定且未备案。如果未来要面向大陆用户，需自定义域名 + Cloudflare 或迁移到国内备案托管。

项目处于**长期迭代阶段**：内容、UI、功能都会持续变动，不要把现状当成最终态。

## Commands

```powershell
npm install        # 安装依赖
npm run dev        # 本地开发服务器，默认 http://localhost:5173，自动打开浏览器
npm run build      # 生产构建，输出到 dist/
npm run preview    # 本地预览生产构建
```

无 lint、test、typecheck 脚本——项目目前只有这三个 npm script。

## Architecture

### 路由 / 入口

- `src/main.jsx` 用 **HashRouter**（而不是 BrowserRouter）包裹 App。这是有意的：搭配 `vite.config.js` 的 `base: './'` 和 `vercel.json` 的全路径 rewrites，可以在 Vercel 以及任意子路径下直接部署。改路由方式前先确认部署目标。
- `src/App.jsx` 是路由表 + 全局布局壳（Header / BackgroundFX / ScrollProgress / main / Footer / BackToTop）。四条路由：`/`、`/biography`、`/works`、`/about`。

### 数据层（这是项目的核心）

所有内容都是手写的纯 JS 数组，**没有 CMS、没有 fetch、没有 markdown**：

- **`src/data/biography.js`** — `biography` 数组按时间顺序排列，元素是两种之一：
  - `{ era: '...' }` — 时期分隔条（在 Timeline 中渲染为粗体横条）
  - `{ date, title, body?, tags? }` — 事件卡片
  - 顺序即展示顺序，**不要重排**。新增条目时插入到对应时间位置。
- **`src/data/works.js`** — `works` 数组（无序，按 year desc 在 `Works.jsx` 里排）+ `WORK_TYPES` 映射。每条 `{ year, type, title, meta }`，`type` 必须是 `WORK_TYPES` 的 key（`single` / `album` / `tieup` / `cover` / `event`）。新增类型时同步更新 `WORK_TYPES`，否则筛选 chip 不会出现。

两个数据文件头部注释都标明：资料来源是仓库根目录的 **`info.txt`**（约 320KB 的粉丝长文人物志），当前覆盖**到 2018 年**，2019 之后的事件/作品仍需补充。补内容时优先回查 `info.txt`，公共资料（维基/官网）作为补充。

**注意 `info.txt` 已在 `.gitignore` 里**——它只存在于本地，不会推到 GitHub。所以 Vercel 构建环境、克隆下来的开发者都看不到这个文件。如果在新机器上开发或在 CI 里需要它，要单独同步过去。

待补的主要节点（用户已点名）：2019 年开始的事件 / 作品、《乘风2023》断层一位、GARNiDELiA 2025-09-02 无限期停摆、舞见后续弹。

### 主题系统

- `src/context/ThemeContext.jsx`：Provider + `useTheme()` hook，状态写入 `localStorage` 的 `maria-chronicle-theme`，初始默认 `dark`。
- 切换时把 `document.documentElement.dataset.theme = theme`，所有主题色都通过 `[data-theme="light"]` / `[data-theme="dark"]` 选择器在 `src/styles/themes.css` 里用 CSS 变量定义。新增主题色优先加 CSS 变量，不要硬编码。
- `BackgroundFX` 会根据当前主题渲染完全不同的两套装饰层（浅色：飘落樱花 + blob；深色：星点 + 网格 + blob），都是纯 CSS + DOM，无图片依赖。

### 样式

- `src/index.css` 是主要的样式表（页面布局、卡片、Timeline 等所有组件样式都在这里），按区块组织。
- `src/styles/themes.css` 只放主题变量。
- 没有 CSS modules、没有 Tailwind、没有 styled-components——直接全局类名。

### 动画

`framer-motion` 用于入场动画（Hero、fact cards、Timeline 事件 `whileInView`）。Timeline 事件按索引交替左右（`i % 2`），改 Timeline 渲染顺序会影响布局对称。

## 部署

`vercel.json` 已配置：framework=vite，rewrites 全部回 `index.html`（HashRouter 其实不依赖这条 rewrite，但保留以兼容未来切到 BrowserRouter）。`vite.config.js` 的 `base: './'` 让构建产物可放在任意子路径。

**部署工作流**（已生效）：

1. 本地改完代码 → `npm run build` 自测通过（可选）
2. `git add` + `git commit` + `git push origin main`
3. Vercel 监听到 push，自动跑 `npm install` + `npm run build`，约 30 秒后上线
4. 失败时去 Vercel dashboard 看构建日志

本地 git 身份已配置（仅本仓库）：`Galaxia <3179697545@qq.com>`。

推送破坏性改动前先确认——线上随时可能有访客。
