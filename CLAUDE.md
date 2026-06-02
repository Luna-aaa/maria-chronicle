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
  - `{ era: '...' }` — 时期分隔条（在 Timeline 中渲染为章节标题胶囊）
  - `{ date, title, body?, tags?, highlight? }` — 事件卡片。`highlight: true` 有双重作用：① 该事件出现在首页「命运节点」轮播中；② 在 Timeline 里被渲染为「重要节点」——`Timeline.jsx` 给其外层加 `.major` 类并插入「★ 重要节点」徽章，对应样式在 `index.css`（更大的渐变发光圆点 + 描边卡片，含移动端圆点对齐）。新增/取消 highlight 会同时影响轮播与时间线强调，注意别让轮播过载。
  - 顺序即展示顺序，**不要重排**。新增条目时插入到对应时间位置。
  - 同文件导出两个工具函数：
    - `enrichBiography(events)` — 给每个 era 项打上 `eraId`（`era-0`、`era-1`...）
    - `extractEras(events)` — 提取章节列表 `[{ id, label, eventCount, firstEventDate, sourceIndex }]`，供 `TimelineNav` 和首页轮播跳转使用
  - 章节 id 由数组顺序生成（`era-N`），**重排 era 项会让所有锚点 id 偏移**——首页轮播、TimelineNav scroll spy 都依赖这套 id。
- **`src/data/works.js`** — `works` 数组（无序，按 year desc 在 `Works.jsx` 里排）+ `WORK_TYPES` 映射。每条 `{ year, type, title, meta }`，`type` 必须是 `WORK_TYPES` 的 key（`single` / `album` / `tieup` / `cover` / `event`）。新增类型时同步更新 `WORK_TYPES`，同时在 `themes.css` 里加 `--type-XXX` 配色变量、在 `index.css` 里补 `.chart-bar-XXX` / `.work-cover-XXX` / `.filter-chip-XXX` 三组样式，否则筛选 chip、堆叠图、卡片 cover 都会出问题。

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

`framer-motion` 用于入场动画（Hero、fact cards、Timeline 事件 `whileInView`、Works 卡片、首页轮播）。Timeline 事件按其在 `biography` 数组中的索引交替左右（`i % 2`，包含 era 项），改 Timeline 渲染顺序会影响布局对称。

### 关键组件

- `components/Timeline.jsx` — 渲染左右交替的时间线。`era` 项渲染为 `#eraId` 锚点（id 来自 `enrichBiography`）。
- `components/TimelineNav.jsx` — Biography 页面的章节导航。**PC（≥1280px）** 固定在视口右侧，**移动端**为 sticky 顶部 chip bar；用 `IntersectionObserver` 做 scroll spy。
- `components/HighlightsCarousel.jsx` — 首页「命运节点」横向 scroll-snap 轮播。从 `biography` 中筛 `highlight: true` 条目，每张卡片用 `<Link state={{ scrollToEra }}>` 跳转到对应章节；`Biography.jsx` 用 `useLocation().state` 接收并滚动。
- `components/WorksChart.jsx` — 纯 SVG 堆叠条形图，无图表库依赖。按年份 × type 统计 `works`。配色来自 `--type-XXX` CSS 变量。

### 跨页面跳转 + HashRouter 注意

HashRouter 的 URL 形如 `#/biography`，**不能再附加第二个 `#anchor`**（会被吃掉）。因此首页 → Biography 章节跳转用 `<Link to="/biography" state={{ scrollToEra: 'era-N' }}>` 传 state，Biography 页面用 `useEffect` + `useLocation().state` 在 mount 后 `scrollIntoView`。需要从外部链接深链到某章节时，须改造为 query string 方案（如 `?era=N`）。

## 部署

`vercel.json` 已配置：framework=vite，rewrites 全部回 `index.html`（HashRouter 其实不依赖这条 rewrite，但保留以兼容未来切到 BrowserRouter）。`vite.config.js` 的 `base: './'` 让构建产物可放在任意子路径。

**部署工作流**（已生效）：

1. 本地改完代码 → `npm run build` 自测通过（可选）
2. `git add` + `git commit` + `git push origin main`
3. Vercel 监听到 push，自动跑 `npm install` + `npm run build`，约 30 秒后上线
4. 失败时去 Vercel dashboard 看构建日志

本地 git 身份已配置（仅本仓库）：`Galaxia <3179697545@qq.com>`。

推送破坏性改动前先确认——线上随时可能有访客。
