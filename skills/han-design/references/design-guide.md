# Han 设计规范

按需读取本指南，为中国风界面选择颜色、字体、间距和构图。先满足产品内容、可用性和可访问性，再应用文化视觉语言。

## 目录

- [一、核心原则](#一核心原则)
- [二、色彩体系](#二色彩体系)
- [三、字体排版](#三字体排版)
- [四、组件规范](#四组件规范)
- [五、布局原则](#五布局原则)
- [六、禁忌清单](#六禁忌清单)
- [七、代码引用](#七代码引用)
- [八、质量自检清单](#八质量自检清单)

## 一、核心原则

1. **语境优先**：先判断是历史复原、历史启发还是当代中国风，再选择时期、地域、媒介和场景。中国文化不是一套统一符号库。
2. **意境优先**：优先用层级、比例、留白、节奏和材质感表达气质，不靠堆砌龙凤、祥云、印章证明“中国风”。
3. **功能优先**：正文、导航、表单和状态必须先满足可读性、可访问性和产品任务，再应用装饰语言。
4. **来源透明**：把历史依据、现代设计转译和 Han 的 UI 经验分开说明；不把主题描述成某一朝代或群体的唯一面貌。

---

## 二、色彩体系

### 2.1 主色定义

| 色彩 | 令牌 | 十六进制 | 文化含义 | 使用场景 |
|------|------|----------|----------|----------|
| **朱红** | `--han-color-vermilion-500` | `#c0392b` | 朱砂、印章、喜庆 | 印章按钮、强调标记、≤5% 占比 |
| **靛蓝** | `--han-color-indigo-500` | `#3a5285` | 青花瓷、沉静智慧 | 链接、导航、次要强调 |
| **金色** | `--han-color-gold-500` | `#c68a2e` | 古金、尊贵典雅 | 装饰线、印章边框、≤3% 占比 |
| **墨色** | `--han-color-ink-700` | `#2a2824` | 松烟墨、文字之本 | 大标题、核心文字 |
| **宣纸白** | `--han-color-paper-100` | `#faf6ea` | 泾县宣纸、温润底色 | 页面背景、主色 |

### 2.2 Han 默认配色比例

以下比例是 Han 为现代展示型页面提供的经验起点，不是历史配色定律。数据密集型产品、深色页面、品牌系统和无障碍需求可以调整。

```
宣纸白：70%  （底色、大面积留白）
墨  色：20%  （文字、结构）
靛  蓝：5%   （链接、次级强调）
朱  红：3%   （印章、关键 CTA）
金  色：2%   （装饰点缀）
```

### 2.3 功能色

```css
--han-color-success: var(--han-color-bamboo);   /* 竹青：成功 */
--han-color-warning: var(--han-color-gold-500);  /* 金色：警告 */
--han-color-danger:  var(--han-color-vermilion-500); /* 朱红：错误 */
--han-color-info:    var(--han-color-indigo-500);   /* 靛蓝：信息 */
```

### 2.4 装饰色与功能色

主题色不一定适合承载文字。使用以下语义令牌：

```css
--han-color-accent-decorative; /* 纹样、背景块、非文字装饰 */
--han-color-accent-text;       /* 链接、文字强调，需满足文字对比度 */
--han-color-accent-control;    /* 控件边框、选中状态 */
--han-color-on-accent;         /* 强调底色上的文字 */
--han-focus-ring;              /* 键盘焦点环 */
```

不要用 `--han-color-accent-decorative` 设置正文、链接或关键状态文字。

---

## 三、字体排版

### 3.1 字体栈选择

```css
/* 短标题、书法联想：可使用楷体或文楷 */
font-family: var(--han-font-kai);
/* = "KaiTi", "STKaiti", "楷体", "Noto Serif SC", serif */

/* 正文：宋体系 */
font-family: var(--han-font-song);
/* = "Songti SC", "SimSun", "宋体", "Noto Serif SC", serif */

/* UI 界面：无衬线 */
font-family: var(--han-font-sans);
/* = "PingFang SC", "Source Han Sans CN", sans-serif */
```

### 3.2 字号层级

```
Hero 书法标题: --han-fs-5xl (64px) + --han-ls-wider (0.3em) + --han-lh-tight (1.1)
大标题:        --han-fs-3xl (38px) + --han-ls-wider (0.1em) + --han-lh-snug (1.3)
小标题:        --han-fs-xl (24px)  + --han-ls-wide (0.05em) + --han-lh-snug (1.3)
正  文:        --han-fs-base (16px) + --han-ls-normal (0)   + --han-lh-relaxed (1.8)
辅助文字:      --han-fs-sm (14px)  + --han-ls-normal (0)   + --han-lh-normal (1.5)
```

### 3.3 排版规则

- **书法联想标题**：可用 `--han-font-kai`，根据字体实际字面测试字距，不机械套用宽字距
- **诗词段落**：用 `.han-poem` 类，行高 2.2，两端对齐，不缩进
- **正文段落**：首行缩进 2em，行高 1.8
- **竖排文字**：用 `.han-vertical` 类，`writing-mode: vertical-rl`
- **落款与钤印**：区分正文、署名、日期和印章；涉及真实书法、篆书或印面时读取 `calligraphy-and-seals.md`

系统字体只能产生书法联想，不能被描述为历史书体复原或某位书家的真实笔迹。

### 3.4 书法标题代码示例

```html
<h1 style="
  font-family: var(--han-font-kai);
  font-size: var(--han-fs-4xl);
  font-weight: var(--han-fw-bold);
  letter-spacing: var(--han-ls-wider);
  line-height: var(--han-lh-tight);
  color: var(--han-color-text-primary);
">
  墨落汉
</h1>
```

---

## 四、组件使用规范

### 4.1 印章按钮 `.han-btn-seal`

**何时使用**：关键 CTA、表单提交、重要操作确认
**何时不用**：导航链接（用水墨导航）、次要操作
**使用规则**：
- 每页不超过 2 个印章按钮
- 倾斜和盖章动效是可选装饰，不应降低文字清晰度或造成布局抖动
- hover 缩放保持克制，并为键盘焦点提供同等清晰的视觉反馈
- 建议搭配 `.han-btn-seal--drop` 盖章动画

```html
<!-- 标准印章按钮 -->
<button class="han-btn-seal">确认</button>

<!-- 大号 + 盖章动画（Hero CTA） -->
<button class="han-btn-seal han-btn-seal--lg han-animate-seal-drop">立即开始</button>

<!-- 自定义颜色 -->
<button class="han-btn-seal"
  style="--han-seal-bg: var(--han-color-indigo-500);">
  靛蓝印章
</button>
```

### 4.2 水墨导航 `.han-navbar`

**何时使用**：网站顶部主导航
**使用规则**：
- `sticky` 粘性定位 + `backdrop-filter` 毛玻璃
- 导航项用 `.han-navbar__item`，激活项加 `.han-navbar__item--active`
- 品牌名用 `.han-navbar__brand`，其中一字用 `<span>` 包朱红色

```html
<nav class="han-navbar">
  <div class="han-navbar__inner">
    <a class="han-navbar__brand" href="/">汉<span>设</span></a>
    <ul class="han-navbar__menu">
      <li class="han-navbar__item han-navbar__item--active">首页</li>
      <li class="han-navbar__item">作品</li>
      <li class="han-navbar__item">关于</li>
    </ul>
  </div>
</nav>
```

### 4.3 卷轴卡片 `.han-card-scroll`

**何时使用**：产品展示、文章列表、特色内容
**使用规则**：
- 必须包含 `.han-card-scroll__header` 和 `.han-card-scroll__body`
- 可选四角 `.han-rivet` 铆钉装饰
- hover 上浮 4px + 阴影加深

```html
<article class="han-card-scroll">
  <span class="han-rivet han-rivet--tl"></span>
  <span class="han-rivet han-rivet--tr"></span>
  <span class="han-rivet han-rivet--bl"></span>
  <span class="han-rivet han-rivet--br"></span>
  <header class="han-card-scroll__header">千里江山图</header>
  <div class="han-card-scroll__body">
    <p>北宋王希孟的传世之作…</p>
  </div>
  <footer class="han-card-scroll__footer">
    <span>王希孟</span>
    <a href="#">赏析 →</a>
  </footer>
</article>
```

### 4.4 窗花边框 `.han-frame-window`

**何时使用**：名言警句、诗词展示、重要区域框定
**使用规则**：
- 四角需要 `.han-corner-tr` 和 `.han-corner-bl`
- 不要嵌套在深色背景上
- 金色变体 `.han-frame-window--gold` 用于高端场景

```html
<div class="han-frame-window han-frame-window--gold">
  <span class="han-corner-tr"></span>
  <span class="han-corner-bl"></span>
  <h4>品牌故事</h4>
  <p>墨落宣纸成汉，笔走龙蛇绘古今。</p>
</div>
```

### 4.5 水墨分割线

**何时使用**：章节之间的过渡
**使用规则**：
- 线条可用 2px 高度，渐变透明→墨色→透明
- 可在章节分隔处增加一个小印章 `.han-stamp`，但不要用于每个列表项
- 表达主题切换时优先保留语义 `<hr>`，再用 `.han-divider-ink` 美化

```html
<!-- 印章分割线；装饰内容对辅助技术隐藏 -->
<div class="han-divider-ink" role="separator">
  <div style="position:absolute; top:50%; left:0; right:0; height:2px;
    background: linear-gradient(90deg, transparent, var(--han-color-ink-400) 20%, var(--han-color-ink-400) 80%, transparent);
    transform: translateY(-50%); filter: blur(0.5px);"></div>
  <div style="display:flex; justify-content:center; position:relative;">
    <div class="han-stamp han-stamp--sm" aria-hidden="true">汉</div>
  </div>
</div>
```

### 4.6 印章 `.han-stamp`

**何时使用**：文章署名、作品落款、品牌认证
**使用规则**：
- 默认带 `-5deg` 倾斜 + 印泥阴影
- 单字用默认尺寸，双字用 `.han-stamp--2char`
- 多个印章并排用 `.han-stamp-group`
- `.han-stamp` 默认是当代印章风格徽记，不等同于传统篆刻作品
- 不伪造政府、法律、机构、认证、收藏或艺术家印章

```html
<!-- 单字印章 -->
<div class="han-stamp">华</div>

<!-- 双字印章 -->
<div class="han-stamp han-stamp--2char">汉</div>

<!-- 署名印章组 -->
<div class="han-stamp-group">
  <div class="han-stamp han-stamp--sm">作者</div>
  <div class="han-stamp han-stamp--sm">之印</div>
</div>
```

---

## 五、布局原则

### 5.1 构图与留白

- **按内容选择构图**：对称适合礼仪、厅堂和正式场景；文人画启发页面也可使用非对称、虚实和疏密关系
- **侧边留白**：移动端 ≥ 16px，桌面端 ≥ 24px
- **区块间距**：以 `--han-section-gap` 为起点，根据信息密度和视口调整
- **元素间距**：使用 `--han-space-*`，不要为追求“空灵”破坏任务连续性

### 5.2 长卷式滚动

- 内容型展示页可以采用长卷叙事，应用页面不强制使用
- 不使用固定“每屏 80%”规则；让内容长度、标题层级和滚动位置自然决定分节
- 内容分节用卷轴卡片或水墨分割线过渡
- 多列数量由内容和断点决定，移动端必须回落为可读布局

### 5.3 竖排文字

- 用于侧边装饰、标题补充
- 使用 `writing-mode: vertical-rl`（从右到左竖排）
- 字间距 8px，字号小于正文

```html
<div class="han-vertical">汉不语 · 笔墨传心</div>
```

### 5.4 栅格系统

```css
.container { max-width: var(--han-container-lg); } /* 1040px */
.grid { display: grid; gap: var(--han-space-6); }
.grid-3 { grid-template-columns: repeat(3, 1fr); } /* 最多 3 列 */
.grid-2 { grid-template-columns: repeat(2, 1fr); }
```

---

## 六、禁忌清单

### 绝对禁止

1. ❌ **不要伪造文化来源** —— 不编造历史、书法、篆文、年代、地域、作者和象征意义
2. ❌ **不要把主题称为历史全貌** —— 朝代主题都是当代视觉诠释，不是历史复原
3. ❌ **不要让装饰替代功能** —— 不能牺牲语义、对比度、键盘操作和信息层级
4. ❌ **不要复制静态交互外观冒充可用组件** —— Modal、Tabs、Select 等必须补齐行为
5. ❌ **不要冒用受管制或敏感符号** —— 龙凤、章服、宗教、礼仪等按时期、等级、器物和语境核对
6. ❌ **不要用伪汉字、伪篆书或无意义题字**

### 谨慎使用

- ⚠️ 金色占比 ≤ 3%
- ⚠️ 朱红占比 ≤ 5%
- ⚠️ 避免在同一页面同时使用超过 3 种主色
- ⚠️ 不建议使用 emoji 代替图标
- ⚠️ 装饰性纹样不要超过 2 种

以上比例是 Han 的现代 UI 经验值，不是历史规则；有明确品牌、内容或可访问性依据时可以调整。

---

## 七、代码引用

### 7.1 独立页面最小引入

```html
<head>
  <!-- 可选远程字体 -->
  <link rel="stylesheet" href="/han/fonts.css">
  <!-- 完整设计系统 -->
  <link rel="stylesheet" href="/han/han.css">
</head>
```

### 7.2 已有应用局部引入

已有应用、Dashboard 或设计系统使用不含全局 reset 的入口。宿主项目继续负责 `body`、标题、段落、表单控件、媒体元素与布局基础：

```html
<link rel="stylesheet" href="/han/han-scoped.css">

<section data-han-scope data-theme="song" class="han-zone">
  <button type="button" class="han-btn-seal">确认</button>
</section>
```

### 7.3 最小页面模板

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="song">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题 · 汉</title>
  <link rel="stylesheet" href="/han/han.css">
</head>
<body>
  <nav class="han-navbar">
    <div class="han-navbar__inner">
      <a class="han-navbar__brand" href="/">品<span>名</span></a>
      <ul class="han-navbar__menu">
        <li class="han-navbar__item han-navbar__item--active"><a href="/" aria-current="page">首页</a></li>
        <li class="han-navbar__item"><a href="/about">关于</a></li>
      </ul>
    </div>
  </nav>

  <main class="han-container han-section">
    <h1 class="han-calligraphy">书法标题</h1>
    <p>正文内容…</p>
    <button type="button" class="han-btn-seal han-btn-seal--lg">确认</button>
  </main>
</body>
</html>
```

### 7.3 中国风 Hero 区模板

```html
<section style="min-height: 80vh; display: flex; align-items: center; justify-content: center; position: relative;">
  <!-- 竖排装饰 -->
  <div class="han-vertical" style="position:absolute; left:64px; top:50%; transform:translateY(-50%); color: var(--han-color-ink-300);">
    汉不语 · 笔墨传心
  </div>

  <div style="text-align:center; max-width: 720px;">
    <h1 style="font-family: var(--han-font-kai); font-size: var(--han-fs-5xl); font-weight: var(--han-fw-bold);
         letter-spacing: var(--han-ls-wider); color: var(--han-color-text-primary); position: relative; display: inline-block;">
      汉
      <span class="han-stamp han-stamp--lg han-stamp--border"
            style="position:absolute; top:-16px; right:-72px;">
        之印
      </span>
    </h1>
    <p style="font-family: var(--han-font-kai); font-size: var(--han-fs-xl);
             color: var(--han-color-text-secondary); margin: 16px 0 24px;">
      让东方美学在网页上优雅绽放
    </p>
    <button type="button" class="han-btn-seal han-btn-seal--lg han-animate-seal-drop">立即体验</button>
  </div>
</section>
```

---

## 八、质量自检清单

生成中国风页面后，请自检以下项目：

- [ ] 是否明确这是历史复原、历史启发还是当代中国风
- [ ] 历史、地域、民族、宗教、纹样和书法声明是否有边界与来源
- [ ] 配色是否以 70/20/5/3/2 作为可调整的现代经验，而非历史定律
- [ ] 标题字体是否适合内容并经过实际字距测试
- [ ] 间距是否基于 `--han-space-*` 令牌
- [ ] 交互印章是否清晰、可聚焦且不过度倾斜
- [ ] 分割线是否保留正确语义
- [ ] 装饰纹理是否不影响文字和性能
- [ ] 龙凤、宗教、等级与礼仪符号是否经过语境检查
- [ ] 功能文字和控件是否使用功能色令牌并满足对比度
- [ ] 复杂组件是否具备键盘、焦点、状态和 ARIA 行为
- [ ] 动画是否克制（时长 ≤ 600ms）
- [ ] 是否支持响应式（移动端适配）

独立页面配合 `assets/han.css` 使用；已有应用配合 `assets/han-scoped.css` 使用。仅在允许外部字体请求时额外加载 `assets/fonts.css`。
