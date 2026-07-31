# 汉设计系统 · AI 设计规范指南

> 本文档是给 AI（Claude、GPT、文心一言等）看的设计规范。当用户让 AI 生成中国风页面时，AI 应严格遵循本指南。

---

## 一、核心原则

1. **意境优先**：中国风设计的核心是"意境"而非"符号"。不要堆砌龙凤纹样，而要追求留白、含蓄、深远。
2. **克制用色**：朱红印章色占比 ≤ 5%，金色装饰 ≤ 3%，大面积使用宣纸白/墨色。
3. **书法为魂**：标题用楷体，正文字体舒展，字间距要宽，行距要松。
4. **留白呼吸**：段落间距≥字符高度的 2 倍，区块间距≥96px。

---

## 二、色彩体系

### 2.1 主色定义

| 色彩 | 令牌 | 十六进制 | 文化含义 | 使用场景 |
|------|------|----------|----------|----------|
| **朱红** | `--dq-color-vermilion-500` | `#c0392b` | 朱砂、印章、喜庆 | 印章按钮、强调标记、≤5% 占比 |
| **靛蓝** | `--dq-color-indigo-500` | `#3a5285` | 青花瓷、沉静智慧 | 链接、导航、次要强调 |
| **金色** | `--dq-color-gold-500` | `#c68a2e` | 古金、尊贵典雅 | 装饰线、印章边框、≤3% 占比 |
| **墨色** | `--dq-color-ink-700` | `#2a2824` | 松烟墨、文字之本 | 大标题、核心文字 |
| **宣纸白** | `--dq-color-paper-100` | `#faf6ea` | 泾县宣纸、温润底色 | 页面背景、主色 |

### 2.2 色彩使用比例

```
宣纸白：70%  （底色、大面积留白）
墨  色：20%  （文字、结构）
靛  蓝：5%   （链接、次级强调）
朱  红：3%   （印章、关键 CTA）
金  色：2%   （装饰点缀）
```

### 2.3 功能色

```css
--dq-color-success: var(--dq-color-bamboo);   /* 竹青：成功 */
--dq-color-warning: var(--dq-color-gold-500);  /* 金色：警告 */
--dq-color-danger:  var(--dq-color-vermilion-500); /* 朱红：错误 */
--dq-color-info:    var(--dq-color-indigo-500);   /* 靛蓝：信息 */
```

---

## 三、字体排版

### 3.1 字体栈选择

```css
/* 标题、书法：优先楷体 */
font-family: var(--dq-font-kai);
/* = "KaiTi", "STKaiti", "楷体", "Noto Serif SC", serif */

/* 正文：宋体系 */
font-family: var(--dq-font-song);
/* = "Songti SC", "SimSun", "宋体", "Noto Serif SC", serif */

/* UI 界面：无衬线 */
font-family: var(--dq-font-sans);
/* = "PingFang SC", "Source Han Sans CN", sans-serif */
```

### 3.2 字号层级

```
Hero 书法标题: --dq-fs-5xl (64px) + --dq-ls-wider (0.3em) + --dq-lh-tight (1.1)
大标题:        --dq-fs-3xl (38px) + --dq-ls-wider (0.1em) + --dq-lh-snug (1.3)
小标题:        --dq-fs-xl (24px)  + --dq-ls-wide (0.05em) + --dq-lh-snug (1.3)
正  文:        --dq-fs-base (16px) + --dq-ls-normal (0)   + --dq-lh-relaxed (1.8)
辅助文字:      --dq-fs-sm (14px)  + --dq-ls-normal (0)   + --dq-lh-normal (1.5)
```

### 3.3 排版规则

- **书法标题**：用 `--dq-font-kai`，字间距 0.1em~0.3em，行高 1.1~1.3
- **诗词段落**：用 `.dq-poem` 类，行高 2.2，两端对齐，不缩进
- **正文段落**：首行缩进 2em，行高 1.8
- **竖排文字**：用 `.dq-vertical` 类，`writing-mode: vertical-rl`
- **书法落款**：用 `--dq-ls-widest`，字间距 0.3em

### 3.4 书法标题代码示例

```html
<h1 style="
  font-family: var(--dq-font-kai);
  font-size: var(--dq-fs-4xl);
  font-weight: var(--dq-fw-bold);
  letter-spacing: var(--dq-ls-wider);
  line-height: var(--dq-lh-tight);
  color: var(--dq-color-text-primary);
">
  墨落汉
</h1>
```

---

## 四、组件使用规范

### 4.1 印章按钮 `.dq-btn-seal`

**何时使用**：关键 CTA、表单提交、重要操作确认
**何时不用**：导航链接（用水墨导航）、次要操作
**使用规则**：
- 每页不超过 2 个印章按钮
- 必须带轻微倾斜 `rotate(-3deg)`
- hover 放大 8%
- 建议搭配 `.dq-btn-seal--drop` 盖章动画

```html
<!-- 标准印章按钮 -->
<button class="dq-btn-seal">确认</button>

<!-- 大号 + 盖章动画（Hero CTA） -->
<button class="dq-btn-seal dq-btn-seal--lg dq-animate-seal-drop">立即开始</button>

<!-- 自定义颜色 -->
<button class="dq-btn-seal"
  style="--dq-seal-bg: var(--dq-color-indigo-500);">
  靛蓝印章
</button>
```

### 4.2 水墨导航 `.dq-navbar`

**何时使用**：网站顶部主导航
**使用规则**：
- `sticky` 粘性定位 + `backdrop-filter` 毛玻璃
- 导航项用 `.dq-navbar__item`，激活项加 `.dq-navbar__item--active`
- 品牌名用 `.dq-navbar__brand`，其中一字用 `<span>` 包朱红色

```html
<nav class="dq-navbar">
  <div class="dq-navbar__inner">
    <div class="dq-navbar__brand">丹<span>青</span></div>
    <ul class="dq-navbar__menu">
      <li class="dq-navbar__item dq-navbar__item--active">首页</li>
      <li class="dq-navbar__item">作品</li>
      <li class="dq-navbar__item">关于</li>
    </ul>
  </div>
</nav>
```

### 4.3 卷轴卡片 `.dq-card-scroll`

**何时使用**：产品展示、文章列表、特色内容
**使用规则**：
- 必须包含 `.dq-card-scroll__header` 和 `.dq-card-scroll__body`
- 可选四角 `.dq-rivet` 铆钉装饰
- hover 上浮 4px + 阴影加深

```html
<article class="dq-card-scroll">
  <span class="dq-rivet dq-rivet--tl"></span>
  <span class="dq-rivet dq-rivet--tr"></span>
  <span class="dq-rivet dq-rivet--bl"></span>
  <span class="dq-rivet dq-rivet--br"></span>
  <header class="dq-card-scroll__header">千里江山图</header>
  <div class="dq-card-scroll__body">
    <p>北宋王希孟的传世之作…</p>
  </div>
  <footer class="dq-card-scroll__footer">
    <span>王希孟</span>
    <a href="#">赏析 →</a>
  </footer>
</article>
```

### 4.4 窗花边框 `.dq-frame-window`

**何时使用**：名言警句、诗词展示、重要区域框定
**使用规则**：
- 四角需要 `.dq-corner-tr` 和 `.dq-corner-bl`
- 不要嵌套在深色背景上
- 金色变体 `.dq-frame-window--gold` 用于高端场景

```html
<div class="dq-frame-window dq-frame-window--gold">
  <span class="dq-corner-tr"></span>
  <span class="dq-corner-bl"></span>
  <h4>品牌故事</h4>
  <p>墨落宣纸成汉，笔走龙蛇绘古今。</p>
</div>
```

### 4.5 水墨分割线

**何时使用**：章节之间的过渡
**使用规则**：
- 线条用 2px 高度，渐变透明→墨色→透明
- 建议中间加一个小印章 `.dq-stamp` 作为分割标记
- 不用标准 `<hr>` 元素

```html
<!-- 印章分割线 -->
<div style="position:relative; margin: 48px 0;">
  <div style="position:absolute; top:50%; left:0; right:0; height:2px;
    background: linear-gradient(90deg, transparent, var(--dq-color-ink-400) 20%, var(--dq-color-ink-400) 80%, transparent);
    transform: translateY(-50%); filter: blur(0.5px);"></div>
  <div style="display:flex; justify-content:center; position:relative;">
    <div class="dq-stamp dq-stamp--sm">汉</div>
  </div>
</div>
```

### 4.6 印章 `.dq-stamp`

**何时使用**：文章署名、作品落款、品牌认证
**使用规则**：
- 默认带 `-5deg` 倾斜 + 印泥阴影
- 单字用默认尺寸，双字用 `.dq-stamp--2char`
- 多个印章并排用 `.dq-stamp-group`

```html
<!-- 单字印章 -->
<div class="dq-stamp">华</div>

<!-- 双字印章 -->
<div class="dq-stamp dq-stamp--2char">汉</div>

<!-- 署名印章组 -->
<div class="dq-stamp-group">
  <div class="dq-stamp dq-stamp--sm">作者</div>
  <div class="dq-stamp dq-stamp--sm">之印</div>
</div>
```

---

## 五、布局原则

### 5.1 对称与留白

- **整体对称**：主要内容区域居中对齐
- **侧边留白**：移动端 ≥ 16px，桌面端 ≥ 24px
- **区块间距**：`--dq-section-gap` (96px)
- **元素间距**：≥ 24px，宁可空勿拥挤

### 5.2 长卷式滚动

- 页面整体采用长卷滚动模式
- 每屏内容不超过视口高度的 80%
- 内容分节用卷轴卡片或水墨分割线过渡
- 避免密集的多列布局（最多 3 列）

### 5.3 竖排文字

- 用于侧边装饰、标题补充
- 使用 `writing-mode: vertical-rl`（从右到左竖排）
- 字间距 8px，字号小于正文

```html
<div class="dq-vertical">汉不语 · 笔墨传心</div>
```

### 5.4 栅格系统

```css
.container { max-width: var(--dq-container-lg); } /* 1040px */
.grid { display: grid; gap: var(--dq-space-6); }
.grid-3 { grid-template-columns: repeat(3, 1fr); } /* 最多 3 列 */
.grid-2 { grid-template-columns: repeat(2, 1fr); }
```

---

## 六、禁忌清单

### 绝对禁止

1. ❌ **不要乱用龙纹、凤纹** —— 这些是皇家专属符号，会显得廉价
2. ❌ **不要使用过于花哨的渐变** —— 中国风讲究含蓄之美
3. ❌ **不要堆砌印章** —— 每页印章不超过 3 个
4. ❌ **不要使用过重的阴影** —— 阴影 opacity ≤ 0.12
5. ❌ **不要使用圆角过大的卡片** —— 最大 `--dq-radius-xl` (12px)
6. ❌ **不要使用过多的动画** —— 动画时长 ≤ 600ms
7. ❌ **不要用纯黑 (#000000)** —— 用 `--dq-color-ink-800` 代替

### 谨慎使用

- ⚠️ 金色占比 ≤ 3%
- ⚠️ 朱红占比 ≤ 5%
- ⚠️ 避免在同一页面同时使用超过 3 种主色
- ⚠️ 不建议使用 emoji 代替图标
- ⚠️ 装饰性纹样不要超过 2 种

---

## 七、完整代码引用

### 7.1 最小引入

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/han-design@0.1.0/skill/assets/tokens.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/han-design@0.1.0/skill/assets/base.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/han-design@0.1.0/skill/assets/components.css">
</head>
```

### 7.2 最小页面模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题 · 汉</title>
  <link rel="stylesheet" href="path/to/tokens.css">
  <link rel="stylesheet" href="path/to/base.css">
  <link rel="stylesheet" href="path/to/components.css">
</head>
<body>
  <nav class="dq-navbar">
    <div class="dq-navbar__inner">
      <div class="dq-navbar__brand">品<span>名</span></div>
      <ul class="dq-navbar__menu">
        <li class="dq-navbar__item dq-navbar__item--active">首页</li>
        <li class="dq-navbar__item">关于</li>
      </ul>
    </div>
  </nav>

  <main class="dq-container dq-section">
    <h1 class="dq-calligraphy">书法标题</h1>
    <p>正文内容…</p>
    <button class="dq-btn-seal dq-btn-seal--lg">确认</button>
  </main>
</body>
</html>
```

### 7.3 中国风 Hero 区模板

```html
<section style="min-height: 80vh; display: flex; align-items: center; justify-content: center; position: relative;">
  <!-- 竖排装饰 -->
  <div class="dq-vertical" style="position:absolute; left:64px; top:50%; transform:translateY(-50%); color: var(--dq-color-ink-300);">
    汉不语 · 笔墨传心
  </div>

  <div style="text-align:center; max-width: 720px;">
    <h1 style="font-family: var(--dq-font-kai); font-size: var(--dq-fs-5xl); font-weight: var(--dq-fw-bold);
         letter-spacing: var(--dq-ls-wider); color: var(--dq-color-text-primary); position: relative; display: inline-block;">
      汉
      <div class="dq-stamp dq-stamp--lg dq-stamp--border"
           style="position:absolute; top:-16px; right:-72px;">
        之印
      </div>
    </h1>
    <p style="font-family: var(--dq-font-kai); font-size: var(--dq-fs-xl);
             color: var(--dq-color-text-secondary); margin: 16px 0 24px;">
      让东方美学在网页上优雅绽放
    </p>
    <button class="dq-btn-seal dq-btn-seal--lg dq-animate-seal-drop">立即体验</button>
  </div>
</section>
```

---

## 八、质量自检清单

生成中国风页面后，请自检以下项目：

- [ ] 色彩占比是否符合 70/20/5/3/2 原则
- [ ] 是否使用了 `--dq-font-kai` 作为标题字体
- [ ] 间距是否基于 `--dq-space-*` 令牌
- [ ] 印章是否有倾斜 + 阴影效果
- [ ] 是否使用了水墨分割线而非标准 `<hr>`
- [ ] 滚动条是否有中国风样式（墨色）
- [ ] 是否有宣纸白背景 + 纹理
- [ ] 是否避免了龙纹凤纹等禁忌元素
- [ ] 动画是否克制（时长 ≤ 600ms）
- [ ] 是否支持响应式（移动端适配）

---

*本指南版本：v0.1.0*
*配合 `han-design` CSS 框架使用效果最佳*
