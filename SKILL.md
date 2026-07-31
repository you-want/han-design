# Han Design System (汉设计系统)

> 让东方美学在网页上优雅绽放 — 中国风 CSS 设计系统 AI 指令

## When to Activate

Activate this skill when the user:
- Requests a Chinese-style / 中国风 / 国风 / oriental web page
- Mentions han-design, 丹青, 汉设计, or Chinese aesthetic
- Asks for dynasty-themed interface (唐/宋/明/清 etc.)
- Wants ink-painting, seal, scroll, or calligraphy style UI

## Asset Files

Before generating code, read these local CSS files to understand the full design system:

- `skill/assets/tokens.css` — All design tokens (colors, typography, spacing, shadows, radii)
- `skill/assets/base.css` — Reset, base styles, utility classes (`.dq-container`, `.dq-section`, `.dq-calligraphy`, `.dq-vertical`, `.dq-poem`)
- `skill/assets/components.css` — All component styles (seal buttons, scroll cards, navbar, frames, dividers, stamps)
- `skill/assets/themes.css` — Dynasty themes (7) + cultural themes (9)

Read these snippet files when building specific components:

- `skill/snippets/page-shell.html` — Minimal HTML shell with CSS imports
- `skill/snippets/btn-seal.html` — Seal button variants
- `skill/snippets/navbar.html` — Ink-wash navigation
- `skill/snippets/card-scroll.html` — Scroll card with rivets
- `skill/snippets/divider-ink.html` — Ink divider
- `skill/snippets/stamp.html` — Seal/stamp variants
- `skill/snippets/frame-window.html` — Window frame with corners
- `skill/snippets/hero-section.html` — Chinese-style hero section

---

## 1. Core Principles

1. **意境优先**: Pursue 留白 (breathing space), 含蓄 (subtlety), 深远 (depth). Do NOT pile dragon/phoenix motifs.
2. **克制用色**: Vermilion ≤ 5%, Gold ≤ 3%. Large areas use 宣纸白/墨色.
3. **书法为魂**: Titles use 楷体 (KaiTi), wide letter-spacing (0.1em~0.3em), loose line-height (1.1~1.3).
4. **留白呼吸**: Section gaps ≥ 96px, paragraph gaps ≥ 2× character height.

## 2. Color Rules (MUST follow)

### Ratio: 70/20/5/3/2
```
宣纸白 Paper:    70%  — backgrounds, large whitespace
墨色   Ink:      20%  — text, structure
靛蓝   Indigo:    5%  — links, secondary accent
朱红   Vermilion: 3%  — seals, key CTA
金色   Gold:      2%  — decorative accents
```

### Primary Tokens
| Token | Hex | Usage |
|-------|-----|-------|
| `--dq-color-vermilion-500` | `#c0392b` | 朱红 · Seals, CTA, ≤5% |
| `--dq-color-indigo-500` | `#3a5285` | 靛蓝 · Links, navigation |
| `--dq-color-gold-500` | `#c68a2e` | 金色 · Decorative, ≤3% |
| `--dq-color-ink-700` | `#2a2824` | 浓墨 · Headings, body text |
| `--dq-color-paper-100` | `#faf6ea` | 宣纸 · Page background |

### Functional Colors
```css
--dq-color-success: #4a7c59;   /* 竹青 Bamboo */
--dq-color-warning: #c68a2e;   /* 金色 Gold */
--dq-color-danger:  #c0392b;   /* 朱红 Vermilion */
--dq-color-info:    #3a5285;   /* 靛蓝 Indigo */
```

### Semantic Mapping
```css
--dq-color-text-primary:   var(--dq-color-ink-700);
--dq-color-text-secondary: var(--dq-color-ink-500);
--dq-color-text-tertiary:  var(--dq-color-ink-300);
--dq-color-bg:             var(--dq-color-paper-100);
--dq-color-bg-surface:     var(--dq-color-paper-50);
--dq-color-border:         var(--dq-color-ink-200);
--dq-color-accent:         var(--dq-color-vermilion-500);
```

## 3. Typography

### Font Stacks
```css
/* Titles & calligraphy */
font-family: var(--dq-font-kai);
/* = "KaiTi", "STKaiti", "楷体", "LXGW WenKai", serif */

/* Body text */
font-family: var(--dq-font-song);
/* = "Songti SC", "SimSun", "宋体", "Noto Serif SC", serif */

/* UI elements */
font-family: var(--dq-font-sans);
/* = "PingFang SC", "Source Han Sans CN", "Noto Sans SC", sans-serif */
```

### Type Scale
| Element | Token | Size | Letter-spacing | Line-height |
|---------|-------|------|----------------|-------------|
| Hero calligraphy | `--dq-fs-5xl` | 64px | `0.3em` | 1.1 |
| H1 | `--dq-fs-4xl` | 48px | `0.1em` | 1.3 |
| H2 | `--dq-fs-3xl` | 38px | `0.1em` | 1.3 |
| H3 | `--dq-fs-2xl` | 30px | `0.05em` | 1.3 |
| H4 | `--dq-fs-xl` | 24px | `0.05em` | 1.3 |
| Body | `--dq-fs-base` | 16px | `0` | 1.8 |
| Small | `--dq-fs-sm` | 14px | `0` | 1.5 |

### Typography Rules
- **Calligraphy titles**: `.dq-calligraphy` class, uses `--dq-font-kai`, letter-spacing 0.1em~0.3em
- **Poetry paragraphs**: `.dq-poem` class, line-height 2.2, justified, no indent
- **Body paragraphs**: First-line indent 2em, line-height 1.8
- **Vertical text**: `.dq-vertical` class, `writing-mode: vertical-rl`

## 4. Spacing & Layout

### Spacing Tokens (4px base)
```
--dq-space-1:  4px     --dq-space-5:  24px    --dq-space-9:  80px
--dq-space-2:  8px     --dq-space-6:  32px    --dq-space-10: 96px
--dq-space-3:  12px    --dq-space-7:  48px    --dq-space-12: 128px
--dq-space-4:  16px    --dq-space-8:  64px    --dq-space-16: 192px
```

### Layout Tokens
```css
--dq-container-sm:  640px
--dq-container-md:  800px
--dq-container-lg:  1040px   /* Default */
--dq-container-xl:  1200px
--dq-section-gap:   96px
--dq-gutter:        24px
```

### Radius
```css
--dq-radius-sm:   2px     /* Seals, tags */
--dq-radius-md:   4px     /* Buttons, inputs */
--dq-radius-lg:   8px     /* Cards */
--dq-radius-xl:  12px     /* Max for large cards */
--dq-radius-pill: 999px   /* Pills */
```

### Shadows (restrained, opacity ≤ 0.12)
```css
--dq-shadow-sm:   0 2px 4px rgba(26,24,22,0.06);
--dq-shadow-md:   0 4px 12px rgba(26,24,22,0.08);
--dq-shadow-lg:   0 8px 24px rgba(26,24,22,0.10);
--dq-shadow-xl:   0 16px 48px rgba(26,24,22,0.12);
--dq-shadow-seal: 2px 3px 6px rgba(192,57,43,0.35);
```

## 5. Components

### 5.1 Seal Button `.dq-btn-seal`
**Max 2 per page.** Tilt -3deg, hover scale 1.05. Read `skill/snippets/btn-seal.html` for variants.

```html
<button class="dq-btn-seal">确认</button>
<button class="dq-btn-seal dq-btn-seal--lg dq-animate-seal-drop">立即开始</button>
<button class="dq-btn-seal dq-btn-seal--circle">印</button>
```

### 5.2 Ink Navigation `.dq-navbar`
Sticky + backdrop-blur. Read `skill/snippets/navbar.html` for full markup.

```html
<nav class="dq-navbar">
  <div class="dq-navbar__inner">
    <div class="dq-navbar__brand">品<span>名</span></div>
    <ul class="dq-navbar__menu">
      <li class="dq-navbar__item dq-navbar__item--active">首页</li>
    </ul>
  </div>
</nav>
```

### 5.3 Scroll Card `.dq-card-scroll`
Must include header + body. Read `skill/snippets/card-scroll.html`.

### 5.4 Window Frame `.dq-frame-window`
Need 4 corner decorations. Read `skill/snippets/frame-window.html`.

### 5.5 Ink Divider `.dq-divider-ink`
Gradient transparent→ink→transparent. Read `skill/snippets/divider-ink.html`.

### 5.6 Stamp `.dq-stamp`
Max 3 per page. Default tilt -5deg. Read `skill/snippets/stamp.html`.

### 5.7 Tags & Badges
```html
<span class="dq-tag">标签</span>
<span class="dq-tag dq-tag--vermilion">朱红</span>
<span class="dq-tag dq-tag--gold">金色</span>
<span class="dq-badge">3</span>
```

### 5.8 Animation Classes
```html
<div class="dq-animate-fade-in">淡入</div>
<div class="dq-animate-fade-in-up">上滑淡入</div>
<div class="dq-animate-ink-spread">墨迹扩散</div>
<button class="dq-btn-seal dq-animate-seal-drop">盖章</button>
```

### 5.9 Utility Classes
```html
<div class="dq-container">居中容器</div>
<section class="dq-section">区块 (padding: 96px 0)</section>
<h1 class="dq-calligraphy">书法标题</h1>
<div class="dq-vertical">竖排文字</div>
<div class="dq-poem"><p>诗词段落</p></div>
```

## 6. Theme System

### Dynasty Themes (7)
| Theme | `data-theme` | Vibe |
|-------|-------------|------|
| 汉 | `qinhan` | 雄浑质朴 — 玄黑+土黄+漆红 |
| 魏晋 | `weijin` | 飘逸超然 — 月白+青灰+黛紫 |
| 唐 ⭐ | `tang` | 雍容华美 — 朱红+明黄+翠绿 |
| 宋 ⭐ | `song` | 清雅极简 — 天青+粉青+墨色 |
| 元 | `yuan` | 粗放多元 — 青花蓝+深红+暗绿 |
| 明 | `ming` | 精致秩序 — 霁红+宝石蓝+明黄 |
| 清 | `qing` | 繁缛富贵 — 胭脂粉+大金+孔雀蓝 |

⭐ = Most recommended for modern aesthetics

### Cultural Themes (9)
| Theme | `data-theme` |
|-------|-------------|
| 水墨 | `ink` |
| 青绿山水 | `landscape` |
| 青花瓷 | `porcelain` |
| 敦煌 | `dunhuang` |
| 宫廷金 | `imperial` |
| 武侠玄墨 | `wuxia` |
| 茶道禅意 | `tea` |
| 朱砂喜庆 | `vermilion` |
| 青瓷 | `celadon` |

### Usage
```html
<html data-theme="song">
<html data-theme="tang">
<html data-theme="ink">
```

### Dark Mode
```html
<html data-theme="song" data-color-mode="dark">
```

### Custom Theme
```css
[data-theme='my-theme'] {
  --dq-color-bg:              #XXXXXX;
  --dq-color-bg-surface:      #XXXXXX;
  --dq-color-text-primary:    #XXXXXX;
  --dq-color-text-secondary: #XXXXXX;
  --dq-color-accent:          #XXXXXX;
  --dq-seal-bg:               #XXXXXX;
  --dq-seal-text:             #XXXXXX;
  --dq-scroll-roller:         #XXXXXX;
  --dq-color-gold-500:        #XXXXXX;
}
```

## 7. Page Generation Rules

### Step 1: Create HTML Shell
Read `skill/snippets/page-shell.html` as base. Import 4 CSS files. Set `data-theme` on `<html>`.

### Step 2: Build Structure
Use `.dq-navbar` for navigation → `.dq-section` for content sections → footer.

### Step 3: Apply Components
- Hero: `.dq-calligraphy` title + `.dq-stamp` + `.dq-btn-seal dq-animate-seal-drop`
- Content cards: `.dq-card-scroll` with rivets
- Transitions: `.dq-divider-ink` between sections
- Quotes: `.dq-frame-window--gold`
- Tags: `.dq-tag` for categories

### Step 4: Apply Theme
Set `data-theme` attribute based on user's desired dynasty/style.

## 8. Prohibitions

### ABSOLUTELY FORBIDDEN
1. ❌ Dragon/phoenix motifs — look cheap when overused
2. ❌ Flashy gradients — Chinese style values subtlety
3. ❌ Over-piling seals — max 3 stamps per page
4. ❌ Heavy shadows — shadow opacity ≤ 0.12
5. ❌ Large border-radius — max `--dq-radius-xl` (12px)
6. ❌ Excessive animation — duration ≤ 600ms
7. ❌ Pure black (#000000) — use `--dq-color-ink-800` instead
8. ❌ Emoji instead of icons
9. ❌ More than 3 primary colors per page
10. ❌ More than 2 decorative pattern types

### USE SPARINGLY
- ⚠️ Gold ≤ 3% of page area
- ⚠️ Vermilion ≤ 5% of page area

## 9. Motion Tokens
```css
--dq-ease-out:    cubic-bezier(0.22, 1, 0.36, 1);
--dq-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--dq-duration-fast:   100ms;
--dq-duration-normal: 200ms;
--dq-duration-slow:   400ms;
--dq-duration-slower: 600ms;  /* Max */
```

## 10. Z-Index Scale
```
--dq-z-base:    0
--dq-z-sticky:  100
--dq-z-overlay: 200
--dq-z-modal:   300
--dq-z-tooltip: 400
--dq-z-max:     999
```

## 11. Quality Checklist

After generating a page, verify:

- [ ] Color ratio follows 70/20/5/3/2
- [ ] Titles use `--dq-font-kai` (KaiTi)
- [ ] Spacing uses `--dq-space-*` tokens
- [ ] Seals have tilt + shadow
- [ ] Uses ink divider, not `<hr>`
- [ ] Paper-white background with texture
- [ ] No dragon/phoenix motifs
- [ ] Animations ≤ 600ms
- [ ] Responsive (mobile adapted)
- [ ] All `--dq-` prefixed tokens
- [ ] No pure black (#000000)
- [ ] Border-radius ≤ 12px
- [ ] Max 3 seals on page

---

*Han Design v0.1.0 · MIT License*
