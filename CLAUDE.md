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
- `src/App.jsx` 是路由表 + 全局布局壳（Header / BackgroundFX / ScrollProgress / main / Footer / BackToTop）。六条路由：`/`、`/biography`（年份轴）、`/biography/:year`（年份详情）、`/item/:id`（条目详情，生平与作品共享）、`/works`、`/about`。

### 数据层（这是项目的核心）

所有内容都是手写的纯 JS 数组，**没有 CMS、没有 fetch、没有 markdown**：

- **`src/data/years.js`（全站唯一数据源，核心）** — 生平与作品**共用同一份数据**（统一单源，避免双录）。「一年一个对象」的数组，`/biography` 年份轴、`/biography/:year` 年份详情、`/item/:id` 条目详情、`/works` 作品页**全都读它**。
  - 每个年份对象：`{ year, title?, summary?, highlight?, events: [...] }`。`title` 为该年代表事件（轴上展示；为空则该年显示「待补充」并淡化）；`highlight: true` 标记「重要一年」——① 轴上 `.year-row.major` 特效；② 进入首页「命运节点」轮播（`highlightYears()`）。
  - 每个 event 既是生平节点也是作品条目：`{ id, date, cat, sub?, title, body?, tags?, highlight?, media? }`。
    - `id` **全站唯一**（约定 `'年份-序号'`，如 `'2016-2'`），是 `/item/:id` 详情页的路由键，**不要重复或随意改动**（会断链）。
    - `cat`（大类）是 `MAJORS` 的 key：`music 音乐 / dance 舞见 / live 演出 / variety 综艺 / life 经历`。**可为字符串或数组**——一条同时属于多个大类（如出道=`['life','music']`，既是经历里程碑又是出道曲）。统一用辅助函数处理：`catList(e)`（归一为数组）、`primaryCat(e)`（取 `cat[0]`，决定生平里的颜色/主色）、`worksCat(e)`（取首个非 `life` 大类，决定作品页里的颜色/归类）。新写组件涉及 `cat` 时务必走这三个函数，不要直接读 `e.cat`。
    - `sub`（小类）必须是 `MAJORS[cat].subs` 的 key：音乐{`album`专辑 / `single`单曲 / `collab`合作曲}、演出{`concert`演唱会 / `festival`音乐节}；**舞见 / 综艺 / 经历均无小类**。
    - `tags` 卡片左下角标签（体系待逐步补充）；`media`（可选，`{ links?, audio?, video?, photos? }`）供 `/item/:id` 展示音乐/视频/照片。图片放在 **`public/photos/<年份>/`**（随构建部署）。`photos` 数组的**每个元素可为两种形态**：纯路径字符串 `'/photos/1992/1.jpg'`（无描述），或对象 `{ src:'/photos/2003/3.jpg', caption:'组合照片' }`（caption 在图片下方显示为注释）。统一用辅助函数 `normPhoto(p)` 归一为 `{ src, caption? }` 后再渲染，**不要直接读字符串/对象**。
  - 每个年份对象还可有 **`photos: [...]`（年份级照片，可选）** — 与任何 event **都无关**、单独成廊的照片，元素同样是「字符串或 `{src,caption}`」两种形态。在 `/biography/:year` 年份详情页底部以「这一年的影像」画廊展示（仅 `filter==='all'` 时显示），不进 `/item/:id`。用于「这年还有些零散合影/演出照但挂不到具体事件」的情况。
  - **`label`（可选，跨年份/特殊标签）** — 覆盖时间轴与详情页顶部显示的年号文字。用于「某段时期没有具体事件、只放一批跨年份合辑照片」的场景：如 `{ year:2009, label:'2007–2009', events:[], photos:[...] }`——轴上该行显示「2007–2009」、`year-num` 自动缩小字号（`.year-num.range`），foot 显示「影像 N / 查看影像 →」，详情页只渲染影像画廊（标题作「影像合辑」）、不显示「补充中」空状态。
  - **`slug`（可选，路由键）** — 路由统一用 `String(y.slug ?? y.year)` 作 `/biography/:year` 的键（YearAxis 链接、YearDetail 匹配、prev/next 导航都走这个 fallback）。**普通年份不用写 `slug`**（自动 fallback 到数字 `year`）。只有当合辑跨越的年份整数**已被占用**时才需要 `slug`：如「2010–2011」合辑——2010、2011 都已是真实年份，无法再用整数 `year`，于是写 `{ slug:'2010-2011', label:'2010–2011', events:[], photos:[...] }`（**省略 `year`**），路由变成 `/biography/2010-2011`。`slug` 用连字符 `-`（URL 友好），`label` 用 en-dash `–`（显示）。合辑对象在数组里的**位置**决定它在轴上的顺序（一般紧接所跨区间的最后一个年份之后）。
  - 跨年份合辑的照片放在 **`public/photos/<slug或label>/`**（如 `public/photos/2007-2009/`、`public/photos/2010-2011/`），不混进单个年份目录。
  - `events` **按时间顺序手写**，年份页/详情页按数组顺序渲染（不解析日期排序）。
  - 配色：`cat` 对应 `themes.css` 的 `--cat-XXX` 变量，`index.css` 里 `.cat-XXX { --c: var(--cat-XXX) }` 统一驱动 chip / 色标 / 卡片 cover / 图表。新增大类要同步这两处 + `MAJORS` + `WorksChart` 的 `CAT_ORDER`。
  - 辅助导出：`MAJORS`（分类体系）、`catList/primaryCat/worksCat`（多分类处理）、`highlightYears()`、`getAllItems()`（拍平为带 year 的条目）、`getItemById(id)`。
  - 补内容：找到对应年份对象往 `events` 插条目即可；**各年互相独立**，无锚点 id 偏移问题。
- **`src/data/biography.js` / `src/data/works.js`（旧版，已弃用/备份）** — 连同 `Timeline.jsx` / `TimelineNav.jsx` 均已无人 import，仅作迁移源与备份。确认新版稳定后可删除。**新内容一律写进 `years.js`**，不要再改这两个文件。

资料来源：仓库根目录的 **`info.txt`**（约 320KB 的粉丝长文人物志，覆盖到 2018）+ 维基百科原文 **`wiki-GARNiDELiA.txt` / `wiki-MARiA.txt`** + 整理对照稿 **`wiki-research.md`**（含发售日/tie-up 全表与若干「待核实」标注）。补内容时优先回查这些本地资料，公共资料（维基/官网）作为补充。

数据现已覆盖**到 2025 年**（早期 2003 童星出道 → 2005 原宿 BJ Girls/CHIX CHICKS → 2006—2008 动画歌与舞台剧 → 2019 单曲 REBEL FLAG → 2020《起死回生》→ 2021 移籍波丽佳音 +《うたものがたり》《Duality Code》→ 2022《Moments》+ 结婚 → 2023 乘风 + 多首中国合作 → 2024《TEN》+ 澳门十周年巡演 → 2025 精选/自传/无期限活动休止 + 事务所纠纷）。

**注意 `info.txt`、`wiki-GARNiDELiA.txt` / `wiki-MARiA.txt`、以及 `素材/` 目录都在 `.gitignore` 里**——这些原始素材只存在于本地，不会推到 GitHub。整理稿 `wiki-research.md` 则纳入版本控制。如果在新机器上开发或在 CI 里需要这些原始素材，要单独同步过去。

**逐年补充内容的工作流（更新模式，2026-06 定稿）**：三层结构对应 `years.js` 三处字段，Claude 与用户分工固定——

1. **Claude 先建模板**：`素材/<年份>.txt`（本地、gitignore，handoff 草稿），图片由用户放进 `public/photos/<年份>/`（会提交、随构建部署）。
2. **用户写「事件」**：在 txt 里逐条写该年发生的事件（每条一段，**空行分隔两个事件**），照片文件名写在所属事件文字后面，如 `（1.jpg,4.jpg）` 或 `(8.png)`——照片接到**那一条事件**的 `media.photos`。
   - **照片描述**：文件名后接 `--描述` 即为该图注释，如 `(3.jpg--组合照片)`；多图共享一句描述写成 `18.jpg,19.jpg,20.jpg--开幕表演`。Claude 整理时转成 `{ src, caption }`。
   - **年份级照片（与事件无关）**：用户把这类照片**放在该年 txt 的最下方**（不跟在任何事件段后），可带 `--描述`。Claude 整理进**年份对象的 `photos`**（不进任何 event），年份详情页底部「这一年的影像」展示。
3. **Claude 整理进 `years.js`**：
   - **年份级**（时间轴 YearAxis 显示）：由 Claude **归纳** `title`（该年主要事件）和 `summary`（简介）。
   - **事件级**（年份详情 YearDetail 显示）：每条事件 → 一个 event 的 `title` + `body`（介绍）+ `tags`（标签挂在事件上，事件卡左下角显示，由 Claude 按内容自动提）。
   - **媒体级**（条目详情 ItemDetail 显示）：照片/音乐/视频接到对应 event 的 `media.{photos/audio/video/links}`；带 `--描述` 的照片转成 `{ src, caption }`。与事件无关的照片放进**年份对象的 `photos`**（年份详情页「这一年的影像」画廊）。
   - **忠于用户文本**：`body` 只用用户在 txt 里写的内容，**不补未考据的额外信息**（如身高/血型/本名等，除非用户写了）；txt 顶部 `#` 注释只是提示，**不作为内容来源**。
   - 照片所属年份以**事件实际发生年份**为准：若某事件被判定属于别的年份，照片也随之移到该年份的 `public/photos/<年份>/`，并删掉旧图。
4. **推送时机**：**用户明确说推送时才 `git push`**；多年调整期间先本地 `npm run build` 自测、攒着，等用户统一发话再一起提交推送（减少 Vercel 部署次数）。`素材/<年份>.txt` 在 gitignore 里不会进仓库。

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
- `pages/YearDetail.jsx` — 年份详情页（路由 `/biography/:year`）：年号大标题 + 概述 + **分类筛选 chip** + 按时间排列的事件流（每条是 `<Link to="/item/:id">`，分类色标 + ★大事件 + 标签）+ **上/下一年导航** + 空状态。切换年份时 `window.scrollTo(0)` 并重置筛选。
- `pages/ItemDetail.jsx` — **条目详情页（路由 `/item/:id`）**：生平里点事件、作品里点卡片都到这里（共享落点）。用 `getItemById` 取数，展示大类/小类 chip、日期、标题、正文、标签 + **媒体版位**（`media.audio/video/photos/links`，多为空时显示占位）。这是后续放音乐/视频/照片的地方。
- `pages/Works.jsx` — 作品页：读 `getAllItems()`，**大类 Tab（`MAJORS`，但不含「经历」）+ 小类 chip 联动筛选**，卡片按 `cat` 着色、`<Link to="/item/:id">`，左下角标签。**作品页过滤掉纯经历（`cat` 仅为 `'life'`，如出生/结婚/签约/停摆），生平页不受影响**；同时属于其它大类的（如出道=经历+音乐）仍保留并按 `worksCat` 归类着色。`WorksChart` 同样规则、按 `worksCat` 统计，保持图表与列表一致。
- `components/HighlightsCarousel.jsx` — 首页「命运节点」轮播。从 `years.js` 的 `highlightYears()` 取重要年份，每张卡 `<Link to="/biography/:year">` 直达年份详情（不再用 `scrollToEra` state）。
- `components/WorksChart.jsx` — 纯 SVG 堆叠条形图，无图表库依赖。读 `getAllItems()`（排除纯经历）按年份 × `worksCat`（大类）统计，配色用内联 `var(--cat-XXX)`。改大类需同步 `CAT_ORDER`。
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
