# 汉 · Han Design System

> 让东方美学在网页上优雅绽放

![version](https://img.shields.io/badge/version-0.1.0-emerald)
![license](https://img.shields.io/badge/license-MIT-amber)
![deploy](https://img.shields.io/badge/deploy-Vercel-black)

**汉** 是一个汲取千年中华文化的 CSS 设计系统。我们将朱红印章、水墨笔触、宣纸质感、书法章法，转化为可组合的设计令牌和组件，让东方美学在现代网页上优雅绽放。

---

## ✨ 核心特色

- 🎨 **7 大主题系统** — 秦、魏晋、唐、宋、元、明、清七朝风格一键切换
- 🎨 **10 国风主题** — 水墨、青绿山水、青花瓷、敦煌、宫廷金等
- ✍️ **书法排版系统** — 楷体标题，宽松字距，留白呼吸
- 🏮 **中国风组件** — 印章按钮、水墨导航、卷轴卡片、窗花边框
- 🤖 **AI 友好** — 提供完整的 AI 设计规范，AI 可生成一致性代码
- 📱 **响应式设计** — 完美适配桌面、平板、手机
- 🌙 **深色模式** — 内置深色主题支持
- 🚀 **Vercel 部署** — 一键部署到 Vercel，GitHub Actions 自动化

---

## 🎨 主题系统

### 朝代主题 👑

一键穿越千年，为你的项目赋予历史质感：

| 朝代 | data-theme | 时代气质 | 核心色彩 |
|------|-----------|----------|----------|
| **汉** | `qinhan` | 雄浑质朴 | 玄黑 #1A1A1A + 土黄 #C4A882 + 漆红 #8B1A1A |
| **魏晋** | `weijin` | 飘逸超然 | 月白 #E8EDF0 + 青灰 #8A9CA8 + 黛紫 #5A4B66 |
| **唐** ⭐ | `tang` | 雍容华美 | 朱红 #C43B3B + 明黄 #D4A039 + 翠绿 #2E8B57 |
| **宋** ⭐ | `song` | 清雅极简 | 天青 #87A6B3 + 粉青 #A7BFC6 + 墨色 #3A3A3A |
| **元** | `yuan` | 粗放多元 | 青花蓝 #1D3B5C + 深红 #8B1A1A + 暗绿 #3E5C42 |
| **明** | `ming` | 精致秩序 | 霁红 #9B2C2C + 宝石蓝 #1E3A6B + 明黄 #DAA520 |
| **清** | `qing` | 繁缛富贵 | 胭脂粉 #E5A1A1 + 大金 #D4AF37 + 孔雀蓝 #1D4A6B |

> ⭐ 标注为最推荐、最适合现代审美

**快速使用：**

```html
<!-- 汉·雄浑质朴 -->
<html data-theme="qinhan">

<!-- 魏晋·飘逸超然 -->
<html data-theme="weijin">

<!-- 唐·雍容华美 -->
<html data-theme="tang">

<!-- 宋·清雅极简 -->
<html data-theme="song">

<!-- 明·精致秩序 -->
<html data-theme="ming">

<!-- 清·繁缛富贵 -->
<html data-theme="qing">
```

### 国风主题 🎋

除了朝代主题，还提供 10 种国风主题：

| 主题 | data-theme | 风格描述 |
|------|-----------|----------|
| 水墨 | `ink` | 黑白灰，文人画意境 |
| 青绿山水 | `landscape` | 青山绿水，宋画意境 |
| 青花瓷 | `porcelain` | 蓝白雅致，景德镇风 |
| 敦煌 | `dunhuang` | 暖橙壁画，千年艺术 |
| 宫廷金 | `imperial` | 金色尊贵，皇室气派 |
| 武侠玄墨 | `wuxia` | 玄黑侠气，江湖暗色 |
| 茶道禅意 | `tea` | 素雅禅茶，枯山水 |
| 朱砂喜庆 | `vermilion` | 大红喜庆，中国年味儿 |
| 青瓷 | `celadon` | 温润如玉，龙泉青瓷 |

---

## 📦 快速开始

### 方式一：直接引用 CSS

```html
<!-- 在 HTML 中引入 -->
<link rel="stylesheet" href="skill/assets/tokens.css">
<link rel="stylesheet" href="skill/assets/base.css">
<link rel="stylesheet" href="skill/assets/components.css">
<link rel="stylesheet" href="skill/assets/themes.css">
```

### 方式二：CDN 引用

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/han-design@0.1.0/skill/assets/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/han-design@0.1.0/skill/assets/base.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/han-design@0.1.0/skill/assets/components.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/han-design@0.1.0/skill/assets/themes.css">
```

### 方式三：npm 安装

```bash
npm install han-design
```

```css
/* 在项目中使用 */
@import 'han-design/skill/assets/tokens.css';
@import 'han-design/skill/assets/base.css';
@import 'han-design/skill/assets/components.css';
@import 'han-design/skill/assets/themes.css';
```

---

## 🤖 作为 AI Skill 使用（通用）

本项目本身就是一个**标准的 AI Skill 包**，包含：

```
han-design/
├── SKILL.md           ← AI 指令文件（定义设计规范、组件用法、禁忌）
└── skill/
    ├── assets/        ← CSS 资产（tokens/base/components/themes）
    └── snippets/      ← 组件代码片段
```

AI 读取 `SKILL.md` 后会自动遵循全部设计规范。

### 使用方式

**1. 直接在项目中使用**

Clone 到本地后，在支持 AI 的编辑器（VS Code + Copilot、Cursor、Trae 等）中打开项目根目录，AI 会自动识别 `SKILL.md`。

**2. 作为 Skill 安装到全局**

```bash
# 克隆仓库
git clone https://github.com/your-username/han-design.git

# 在任意项目中引用
cd your-project
# 将 SKILL.md 和 skill/ 目录作为上下文提供给 AI
```

**3. 使用时对 AI 说：**

> "帮我生成一个中国风的落地页" 或 "用宋韵主题做一个产品展示页"

AI 会自动：
- 读取 `SKILL.md` 中的设计规范
- 引入 `skill/assets/` 下的 CSS 文件
- 使用 `--dq-` 前缀的设计令牌
- 从 `skill/snippets/` 引用组件代码
- 遵循色彩比例、排版、布局原则和禁忌

---

## 🚀 部署到 Vercel

### 一键部署

点击下方按钮，直接部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/han-design)

### 本地部署

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署（预览环境）
vercel

# 4. 部署到生产环境
vercel --prod
```

### Git 自动部署

在 Vercel 控制台导入 GitHub 仓库后，每次 push 到 `main` 分支会自动触发部署，无需额外配置：

```bash
git add .
git commit -m "feat: update design tokens"
git push origin main
```

### 手动部署

```bash
# 构建预览版本
vercel

# 发布到生产环境
vercel --prod
```

---

## 🧩 组件列表

### 1. 印章按钮 `.dq-btn-seal`

红色方形印章风格按钮，带金色边框和盖章动画。

```html
<button class="dq-btn-seal dq-btn-seal--lg dq-animate-seal-drop">立即开始</button>
```

### 2. 水墨导航 `.dq-navbar`

底部毛笔下划线 + 墨迹扩散悬停效果。

```html
<nav class="dq-navbar">
  <div class="dq-navbar__inner">
    <div class="dq-navbar__brand">汉<span>之</span></div>
    <ul class="dq-navbar__menu">
      <li class="dq-navbar__item dq-navbar__item--active">首页</li>
      <li class="dq-navbar__item">作品</li>
    </ul>
  </div>
</nav>
```

### 3. 卷轴卡片 `.dq-card-scroll`

模拟中国传统卷轴形态，左右卷轴头 + 四角铆钉。

```html
<article class="dq-card-scroll">
  <span class="dq-rivet dq-rivet--tl"></span>
  <span class="dq-rivet dq-rivet--tr"></span>
  <span class="dq-rivet dq-rivet--bl"></span>
  <span class="dq-rivet dq-rivet--br"></span>
  <header class="dq-card-scroll__header">标题</header>
  <div class="dq-card-scroll__body"><p>内容…</p></div>
</article>
```

### 4. 窗花边框 `.dq-frame-window`

传统中式窗花纹样边框装饰，支持金色变体。

```html
<div class="dq-frame-window dq-frame-window--gold">
  <span class="dq-corner-tr"></span>
  <span class="dq-corner-bl"></span>
  <p>内容…</p>
</div>
```

### 5. 水墨分割线

毛笔笔触效果的分割线，配合印章作为中间装饰。

```html
<div style="position:relative; margin: 48px 0;">
  <div style="position:absolute; top:50%; left:0; right:0; height:2px;
    background: linear-gradient(90deg, transparent, var(--dq-color-ink-400) 20%, transparent);
    transform: translateY(-50%); filter: blur(0.5px);"></div>
  <div style="display:flex; justify-content:center; position:relative;">
    <div class="dq-stamp dq-stamp--sm">印</div>
  </div>
</div>
```

### 6. 印章 `.dq-stamp`

红色方形印章组件，可用于署名或强调。

```html
<div class="dq-stamp dq-stamp--2char">汉</div>
```

---

## 📐 设计令牌

### 色彩

| 令牌 | 色值 | 用途 |
|------|------|------|
| `--dq-color-vermilion-500` | `#c0392b` | 朱红 · CTA / 印章 |
| `--dq-color-indigo-500` | `#3a5285` | 靛蓝 · 链接 / 导航 |
| `--dq-color-gold-500` | `#c68a2e` | 金色 · 装饰点缀 |
| `--dq-color-ink-700` | `#2a2824` | 浓墨 · 标题文字 |
| `--dq-color-paper-100` | `#faf6ea` | 宣纸 · 页面底色 |

### 字体

| 令牌 | 含义 |
|------|------|
| `--dq-font-kai` | 楷体（标题、书法） |
| `--dq-font-song` | 宋体（正文） |
| `--dq-font-sans` | 思源黑体（UI 界面） |

### 间距

基于 4px 基础单位：`--dq-space-1`(4px) → `--dq-space-16`(192px)

> 💡 **完整令牌列表**请查看 [tokens.css](skill/assets/tokens.css)

---

## 📚 文档

- [设计令牌](skill/assets/tokens.css) — 所有设计变量
- [基础样式](skill/assets/base.css) — 重置与排版
- [组件样式](skill/assets/components.css) — 组件 CSS
- [主题系统](skill/assets/themes.css) — 7 朝代 + 10 国风主题
- [AI 设计规范](DESIGN_GUIDE.md) — AI 系统提示词
- [组件示例](examples/components/) — 每个组件的 HTML 演示
- [品牌首页示例](examples/landing-page.html) — 完整落地页
- [主题切换示例](examples/theme-showcase.html) — 所有主题预览

---

## 🗂️ 项目结构

```
han-design/
├── SKILL.md              # AI 指令文件（核心）
├── skill/                # Skill 核心（给所有用户）
│   ├── assets/           # CSS 资产
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── components.css
│   │   └── themes.css
│   └── snippets/         # 组件代码片段
│       ├── page-shell.html
│       ├── btn-seal.html
│       ├── navbar.html
│       ├── card-scroll.html
│       ├── divider-ink.html
│       ├── stamp.html
│       ├── frame-window.html
│       └── hero-section.html
├── examples/             # 示例页面
│   ├── components/       # 组件演示
│   ├── landing-page.html
│   ├── quick-start.html
│   └── theme-showcase.html
├── DESIGN_GUIDE.md       # 设计规范
├── LICENSE
└── README.md
```

---

## 🤝 贡献指南

欢迎贡献代码！

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 贡献方向

- 新的中国风组件
- 更多设计令牌
- 深色主题完善
- 更多文化主题（如山水、花鸟系列）
- AI 生成模板
- 更多朝代主题

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

---

## 致谢

- 灵感来源于千年中华文化
- 字体：楷体、思源黑体
- 色彩：中国画传统颜料

---

> **汉** — 墨落宣纸，笔走龙蛇。
