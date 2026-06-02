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
- `src/App.jsx` 是路由表 + 全局布局壳（Header / BackgroundFX / ScrollProgress / main / Footer / BackToTop）。五条路由：`/`、`/biography`（年份轴）、`/biography/:year`（年份详情）、`/works`、`/about`。

### 数据层（这是项目的核心）

所有内容都是手写的纯 JS 数组，**没有 CMS、没有 fetch、没有 markdown**：

- **`src/data/years.js`（生平的新数据源，核心）** — 「一年一个对象」的数组，`/biography` 年份轴与 `/biography/:year` 详情页都读它。
  - 每个年份对象：`{ year, title?, summary?, highlight?, events: [...] }`。`title` 为该年代表事件（轴上展示；为空则该年显示「待补充」并淡化）；`highlight: true` 标记「重要一年」——① 轴上 `.year-row.major` 特效（更大脉冲圆点 + 描边渐变卡片 + ★徽章）；② 进入首页「命运节点」轮播（`highlightYears()` 导出）。
  - `events` 数组**按时间顺序手写**，详情页按数组顺序渲染（不再解析日期排序）。每条：`{ date, category, title, body?, highlight? }`。
  - `category` 必须是 `CATEGORIES` 的 key：`life 经历 / music 音乐 / dance 舞见 / live 演出 / other 其他`。配色用 `themes.css` 的 `--cat-XXX` 变量，`index.css` 里 `.cat-XXX { --c: var(--cat-XXX) }` 统一驱动 chip / 色标 / 边框。新增分类要同步这两处。
  - 补内容的方式：找到对应年份对象，往 `events` 里按时间插条目即可；**各年互相独立**，不存在锚点 id 偏移问题（旧 era 方案已弃用）。
- **`src/data/biography.js`（旧版，已弃用/备份）** — 旧的扁平 era + 事件数组，连同 `Timeline.jsx` / `TimelineNav.jsx` 已无人 import，仅作迁移源与备份保留。确认新版稳定后可删除。新内容请写进 `years.js`，不要再改这里。
- **`src/data/works.js`** — `works` 数组（无序，按 year desc 在 `Works.jsx` 里排）+ `WORK_TYPES` 映射。每条 `{ year, type, title, meta }`，`type` 必须是 `WORK_TYPES` 的 key（`single` / `album` / `tieup` / `cover` / `event`）。新增类型时同步更新 `WORK_TYPES`，同时在 `themes.css` 里加 `--type-XXX` 配色变量、在 `index.css` 里补 `.chart-bar-XXX` / `.work-cover-XXX` / `.filter-chip-XXX` 三组样式，否则筛选 chip、堆叠图、卡片 cover 都会出问题。
  - ⚠️ **规划中**：作品栏将改为「大小分类 + 标签」体系（大类 音乐{专辑/单曲/合作曲} · 舞见 · 演出{演唱会/音乐节} · 综艺与经历{综艺/经历}），并与 `years.js` 生平打通（作品能在对应年份找到）。架构尚未定稿，改动前先和用户确认是「统一数据源」还是「双数据源交叉引用」。

资料来源：仓库根目录的 **`info.txt`**（约 320KB 的粉丝长文人物志，覆盖到 2018）+ 维基百科原文 **`wiki-GARNiDELiA.txt` / `wiki-MARiA.txt`** + 整理对照稿 **`wiki-research.md`**（含发售日/tie-up 全表与若干「待核实」标注）。补内容时优先回查这些本地资料，公共资料（维基/官网）作为补充。

数据现已覆盖**到 2025 年**（2019 单曲 REBEL FLAG → 2020《起死回生》→ 2021 移籍波丽佳音 +《うたものがたり》《Duality Code》→ 2022《Moments》+ 结婚 → 2023 乘风 + 多首中国合作 → 2024《TEN》+ 澳门十周年巡演 → 2025 精选/自传/无期限活动休止 + 事务所纠纷）。

**注意 `info.txt` 与 `wiki-GARNiDELiA.txt` / `wiki-MARiA.txt` 都在 `.gitignore` 里**——这些原始素材只存在于本地，不会推到 GitHub。整理稿 `wiki-research.md` 则纳入版本控制。如果在新机器上开发或在 CI 里需要这些原始素材，要单独同步过去。

**已核实修正**：《乘风2023》并非「断层一位」夺冠——而是**节目期间人气一度断层第一、总决赛获第三名**（据中文维基），数据中已按此措辞修正。

仍待补：舞见系列后续弹的细节、2006—2008 早期偶像期个人单曲（暂未录入 `works.js`，以免堆叠图横轴拉到 2006 且数据稀疏）。

### 主题系统

- `src/context/ThemeContext.jsx`：Provider + `useTheme()` hook，状态写入 `localStorage` 的 `maria-chronicle-theme`，初始默认 `dark`。
- 切换时把 `document.documentElement.dataset.theme = theme`，所有主题色都通过 `[data-theme="light"]` / `[data-theme="dark"]` 选择器在 `src/styles/themes.css` 里用 CSS 变量定义。新增主题色优先加 CSS 变量，不要硬编码。
- `BackgroundFX` 会根据当前主题渲染完全不同的两套装饰层，都是纯 CSS + DOM，无图片依赖：
  - **浅色**：飘落樱花（14 朵，部分使用**负值 `animation-delay`** 预滚动，让加载瞬间就有樱花在画面中）+ 双 blob 漂移
  - **深色**：60 颗闪烁星点 + 网格 + 5 颗错峰流星（duration 12–15s、可见窗口仅 ~20% 形成「偶发划过」节奏）+ 双 blob
  - 流星几何：head 在元素 right + `transform-origin: 100% 50%` + **正值 angle**（顺时针）+ `translateX(120vmax)`，保证 head 领跑、向右下方斜飞。改方向时四个变量要一起改。
  - `index.css` 末尾有 `@media (prefers-reduced-motion: reduce)`，会禁用流星 / 樱花 / 星闪 / blob 漂移。

### 样式

- `src/index.css` 是主要的样式表（页面布局、卡片、Timeline 等所有组件样式都在这里），按区块组织。
- `src/styles/themes.css` 只放主题变量。
- 没有 CSS modules、没有 Tailwind、没有 styled-components——直接全局类名。

### 动画

`framer-motion` 用于入场动画（Hero、fact cards、YearAxis 年份行 `whileInView`、YearDetail 事件、Works 卡片、首页轮播）。

### 关键组件

- `components/YearAxis.jsx` — 生平主轴：垂直年份轨，每年一张代表卡（年号 + 标题 + 概述 + 该年各分类条数 + ★）。读 `years.js`，每行 `<Link to="/biography/:year">` 进详情。`.year-row.major` 为重要一年特效。
- `pages/YearDetail.jsx` — 年份详情页（路由 `/biography/:year`）：年号大标题 + 概述 + **分类筛选 chip** + 按时间排列的事件流（分类色标 + ★大事件）+ **上/下一年导航** + 空状态。切换年份时 `window.scrollTo(0)` 并重置筛选。
- `components/HighlightsCarousel.jsx` — 首页「命运节点」横向 scroll-snap 轮播。改为从 `years.js` 的 `highlightYears()` 取重要年份，每张卡 `<Link to="/biography/:year">` 直达年份详情（不再用 `scrollToEra` state）。
- `components/WorksChart.jsx` — 纯 SVG 堆叠条形图，无图表库依赖。按年份 × type 统计 `works`。配色来自 `--type-XXX` CSS 变量。
- `components/Timeline.jsx` / `components/TimelineNav.jsx` — 旧版生平时间线与章节导航，**已弃用**（无人 import），保留备份。

### 跨页面跳转 + HashRouter 注意

HashRouter 的 URL 形如 `#/biography`，**不能再附加第二个 `#anchor`**（会被吃掉）。但路径参数没问题：`#/biography/2016` 是合法的 route（年份是 path 段，不是 anchor），所以生平深链直接用 `/biography/:year` 即可，无需再走 state 传参。旧的「首页轮播 → `scrollToEra` state → Biography `scrollIntoView`」方案已随 era 时间线一起退役。

## 部署

`vercel.json` 已配置：framework=vite，rewrites 全部回 `index.html`（HashRouter 其实不依赖这条 rewrite，但保留以兼容未来切到 BrowserRouter）。`vite.config.js` 的 `base: './'` 让构建产物可放在任意子路径。

**部署工作流**（已生效）：

1. 本地改完代码 → `npm run build` 自测通过（可选）
2. `git add` + `git commit` + `git push origin main`
3. Vercel 监听到 push，自动跑 `npm install` + `npm run build`，约 30 秒后上线
4. 失败时去 Vercel dashboard 看构建日志

本地 git 身份已配置（仅本仓库）：`Galaxia <3179697545@qq.com>`。

推送破坏性改动前先确认——线上随时可能有访客。
