# 汉 · Han

一个面向 AI Agent 的中国文化设计 Skill。它将宣纸、墨色、朱红、书法、卷轴和传统构图转化为可复用的设计令牌、主题、视觉配方与文化决策规则。

[![License: MIT](https://img.shields.io/badge/license-MIT-c68a2e.svg)](LICENSE)

## 项目特点

- 7 个朝代启发主题：秦汉、魏晋、唐、宋、元、明、清
- 9 个文化主题：水墨、青绿山水、青花瓷、敦煌、宫廷金、武侠、茶道、朱砂、青瓷
- 完整的 CSS 令牌、组件、图标、纹样和动效
- 标准 Agent Skill frontmatter 与独立可安装目录
- 响应式、键盘焦点和 reduced-motion 基础支持
- 无构建步骤的静态 HTML 示例

## 当前版本

Han 当前作为 `v0.1.0-preview` 发布，适合安装试用、生成页面和收集反馈。它是设计 Skill 与视觉资产包，不是通用前端组件库；复杂交互应继续使用目标项目已有的原生或可访问组件。

## 仓库结构

```text
han/
├── skills/
│   └── han-design/              # 可独立安装的 Skill
│       ├── SKILL.md
│       ├── agents/openai.yaml
│       ├── references/
│       └── assets/
│           ├── han.css          # 完整 CSS 入口
│           ├── fonts.css        # 可选远程字体
│           ├── *.css
│           └── snippets/
├── examples/                    # 仓库示例，不属于 Skill 运行时包
├── scripts/validate.mjs
├── vercel.json
├── LICENSE
└── README.md
```

## 安装为 Agent Skill

克隆仓库：

```bash
git clone https://github.com/you-want/han-design.git han
```

Skill 的可安装目录是：

```text
skills/han-design
```

以 Codex 为例，可复制到个人 Skill 目录：

```bash
cp -R skills/han-design "${CODEX_HOME:-$HOME/.codex}/skills/han-design"
```

其他支持 Agent Skills 的工具，请让其安装器或配置指向 `skills/han-design/`。不同工具的自动发现目录并不相同，因此本项目不假设“打开仓库后所有 AI 编辑器都会自动识别”。

安装后可以这样调用：

> 使用 han-design，帮我生成一个克制的宋韵产品落地页。

> 用汉重构当前页面，保留现有 React 组件和交互。

更多可直接复制的调用任务见 [Skill 调用示例](examples/skill-prompts.md)。

## 直接使用 CSS

复制 `skills/han-design/assets/` 到你的项目，然后引入完整入口：

```html
<!-- 可选：会从 jsDelivr 与 Google Fonts 加载字体 -->
<link rel="stylesheet" href="/han/fonts.css">

<!-- 设计令牌、主题和全部组件 -->
<link rel="stylesheet" href="/han/han.css">
```

选择主题：

```html
<html lang="zh-CN" data-theme="song">
```

深色模式：

```html
<html lang="zh-CN" data-theme="song" data-color-mode="dark">
```

Han 的核心发布物是 `skills/han-design/` Skill 包，不以 npm 组件库为目标。需要 CSS 时复制 Skill 中的 assets，并继续使用单一入口 `han.css`。

## 主题

### 朝代主题

这些主题是面向现代网页的视觉诠释，不是历史复原，也不代表一个朝代的全部视觉文化。

| 主题 | `data-theme` | 气质 |
|---|---|---|
| 秦汉启发 | `qinhan` | 漆器、石刻与厚重材质感 |
| 魏晋 | `weijin` | 飘逸清峻 |
| 唐 | `tang` | 雍容明丽 |
| 宋 | `song` | 清雅克制 |
| 元 | `yuan` | 多元交汇、对比鲜明 |
| 明 | `ming` | 精致有序 |
| 清 | `qing` | 华丽繁复 |

### 文化主题

| 主题 | `data-theme` |
|---|---|
| 水墨 | `ink` |
| 青绿山水 | `landscape` |
| 青花瓷 | `porcelain` |
| 敦煌 | `dunhuang` |
| 宫廷金 | `imperial` |
| 武侠玄墨 | `wuxia` |
| 当代茶空间 | `tea` |
| 朱砂喜庆 | `vermilion` |
| 青瓷 | `celadon` |

## 示例

- [品牌落地页](examples/landing-page.html)
- [快速开始](examples/quick-start.html)
- [主题展示](examples/theme-showcase.html)
- [完整组件展示](examples/showcase.html)
- [单组件示例](examples/components/)

示例使用仓库内的相对路径，可直接部署为静态站点。Vercel 配置会将首页映射到品牌落地页。

`showcase.html` 主要用于展示视觉状态。Modal、Tabs、自定义 Select、Date Picker、Tree、Upload 等复杂控件不能仅复制展示结构用于生产；请按照组件目录补齐键盘、焦点、状态和 ARIA，或将 Han 样式应用到目标项目已有的可访问组件上。

## Skill 资源

- [Skill 指令](skills/han-design/SKILL.md)
- [详细设计规范](skills/han-design/references/design-guide.md)
- [组件目录](skills/han-design/references/component-catalog.md)
- [文化方法](skills/han-design/references/cultural-methodology.md)
- [朝代主题边界](skills/han-design/references/dynasty-contexts.md)
- [纹样语义](skills/han-design/references/motif-semantics.md)
- [书法与印章](skills/han-design/references/calligraphy-and-seals.md)
- [地域、民族与活态文化](skills/han-design/references/regional-and-ethnic-contexts.md)
- [文化来源索引](skills/han-design/references/cultural-sources.md)
- [真实任务配方](skills/han-design/references/task-recipes.md)
- [输出质量评测](skills/han-design/references/output-evaluation.md)
- [完整 CSS 入口](skills/han-design/assets/han.css)
- [HTML snippets](skills/han-design/assets/snippets/)
- [独立 HTML 输出检查](skills/han-design/scripts/check-output.mjs)

Skill 会按需读取 references，不会在每次任务开始前加载全部 CSS。

## 开发与校验

运行无依赖校验：

```bash
node scripts/validate.mjs
```

校验内容包括：

- Skill frontmatter 和目录命名
- 必需文件与本地引用
- CSS 自定义变量
- 主题功能色对比度与语义令牌
- 文化 references 和高风险绝对化表述
- HTML snippet 的基础语义问题
- README 中失效的占位发布说明

Pull Request 也会通过 GitHub Actions 执行相同校验。

## 贡献

欢迎提交主题、组件、可访问性修复、示例和文档改进。

1. Fork 仓库并创建功能分支。
2. 完成修改后运行 `node scripts/validate.mjs`。
3. 确保新增组件同时包含样式、成熟度说明和示例；复杂交互必须说明键盘、焦点、状态与 ARIA 行为。
4. 提交 Pull Request，并说明视觉意图和验证方式。

新增历史、地域、民族、宗教、纹样或活态文化内容时，还应提供来源、适用边界和现代转译说明。

## 字体与网络

`fonts.css` 会加载 LXGW WenKai、Noto Serif SC 和 Noto Sans SC。对于离线、严格 CSP、隐私敏感或中国大陆网络环境，建议不加载该文件，改用设计令牌中定义的系统字体回退，或自行托管字体。

## License

[MIT](LICENSE)
