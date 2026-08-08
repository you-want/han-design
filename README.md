# 汉 · Han

一个面向 AI Agent 的中国文化设计 Skill。它将宣纸、墨色、朱红、书法、卷轴和传统构图转化为可复用的设计令牌、主题、视觉配方与文化决策规则。

**语言 / Languages：** [简体中文](README.md)（默认） · [English](README.en.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

## 为什么叫 Han

我们身份证上写的是汉族，说的是汉语，写的是汉字。我们做的这套中国风设计系统，自然就该叫 han-design。

## 项目特点

- 7 个朝代启发主题：秦汉、魏晋、唐、宋、元、明、清
- 9 个文化主题：水墨、青绿山水、青花瓷、敦煌、宫廷金、武侠、茶道、朱砂、青瓷
- 完整的 CSS 令牌、组件、图标、纹样和动效
- 6 个整页 Starter，覆盖品牌、产品、Dashboard、展览、活动和长文
- 自动驾驶设计流程，支持主题、视觉强度、内容补全和截图复盘
- 标准 Agent Skill frontmatter 与独立可安装目录
- 响应式、键盘焦点和 reduced-motion 基础支持
- 无构建步骤的静态 HTML 示例

## 当前版本

Han 当前版本为 `v0.1.0-preview.0`，适合安装试用、生成页面和收集反馈。它是设计 Skill 与视觉资产包，不是通用前端组件库；复杂交互应继续使用目标项目已有的原生或可访问组件。

## 仓库结构

```text
han/
├── .codex-plugin/plugin.json   # Codex Plugin 清单
├── skills/
│   └── han-design/              # 可独立安装的 Skill
│       ├── SKILL.md
│       ├── agents/openai.yaml
│       ├── references/
│       └── assets/
│           ├── han.css          # 完整 CSS 入口
│           ├── han-scoped.css   # token 与规则受 data-han-scope 约束
│           ├── base.css         # 仅完整入口使用的全局基础样式
│           ├── utilities.css    # scoped 安全的布局与排版工具
│           ├── accessibility.css
│           ├── fonts.css        # 可选远程字体
│           ├── *.css
│           └── snippets/
├── examples/                    # 示例网站，不属于 Skill/Plugin 核心内容
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

Agent Skills 通用安装位置推荐使用 `~/.agents/skills/`：

```bash
mkdir -p "$HOME/.agents/skills"
cp -R skills/han-design "$HOME/.agents/skills/han-design"
```

PowerShell：

```powershell
New-Item -ItemType Directory -Force "$HOME/.agents/skills" | Out-Null
Copy-Item -Recurse -Force "skills/han-design" "$HOME/.agents/skills/han-design"
```

Codex 仍兼容 `~/.codex/skills/`。其他支持 Agent Skills 的工具，请让其安装器或配置指向 `skills/han-design/`；不同工具的自动发现目录并不完全相同。

仓库根目录同时包含 `.codex-plugin/plugin.json`，可作为 Codex Plugin 源。生成不含仓库示例和第三方演示图片的发布目录：

```bash
node scripts/package-plugin.mjs
```

安装后可以这样调用：

> 使用 han-design，帮我生成一个克制的宋韵产品落地页。

> 用 han-design 重构当前页面，保留现有 React 组件和交互。

也可以把设计判断直接交给 Han：

> 使用 han-design，把当前页面做得更好看。请检查项目后自行判断页面类型、主题和视觉强度，保留功能和技术栈，完成桌面与移动端检查并修改一轮。

用户不需要知道主题 ID、组件类名或应该使用哪一个 Starter。Han 会先生成内部设计简报，再选择整页构图、主题、视觉强度和内容补全策略。

更多可直接复制的调用任务见 [Skill 调用示例](examples/skill-prompts.md)。

## 直接使用 CSS

复制 `skills/han-design/assets/` 到你的项目。独立页面引入完整入口：

```html
<!-- 可选：会从 jsDelivr 与 Google Fonts 加载字体 -->
<link rel="stylesheet" href="/han/fonts.css">

<!-- 设计令牌、主题和全部组件 -->
<link rel="stylesheet" href="/han/han.css">
```

已有应用或设计系统应使用不含全局 reset 的入口：

```html
<link rel="stylesheet" href="/han/han-scoped.css">

<section data-han-scope data-theme="song">
  <button type="button" class="han-btn-seal">确认</button>
</section>
```

`han-scoped.css` 不会在 `:root` 定义 Han token，也不会修改全局 `body`、标题、段落、链接、表单控件、媒体元素和滚动条。Token、深色模式与主题变量只在 `data-han-scope` 内生效；布局基础与元素默认样式继续由宿主项目负责。

选择主题：

```html
<html lang="zh-CN" data-theme="song">
```

深色模式：

```html
<html lang="zh-CN" data-theme="song" data-color-mode="dark">
```

Han 的核心发布物是 `skills/han-design/` Skill 包，不以 npm 组件库为目标。复制 assets 后，独立页面使用 `han.css`，已有应用使用 `han-scoped.css`。

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

### 当代配色主题

这些主题由项目内参考图的色卡转译而来，是面向现代网页的配色系统，不是任何官方货币色彩规范。

| 主题 | `data-theme` | 气质 |
|---|---|---|
| 松麦 | `pine-wheat` | 自然、清新、安静 |
| 藤紫 | `plum-blush` | 柔和、浪漫、轻奢 |
| 海兰 | `ocean-orchid` | 冷静、清透、优雅 |
| 焦糖 | `caramel-cream` | 温暖、复古、高级 |
| 薄荷 | `mint-lavender` | 清透、自然、轻盈 |
| 莓果 | `berry-butter` | 明快、时尚、有活力 |

## 示例

- [快速开始](examples/quick-start.html) — 完整结构示例
- [Mac 概念页](examples/mac-han.html) — 完整结构示例，图片许可见下方说明
- [局部主题集成](examples/scoped-integration.html) — scoped CSS 完整结构示例
- [品牌视觉实验](examples/landing-page.html) — 静态视觉参考
- [主题展示](examples/theme-showcase.html) — 静态视觉参考
- [完整组件展示](examples/showcase.html) — 静态视觉参考
- [单组件示例](examples/components/) — 静态视觉参考

`examples/` 是独立的演示网站，不属于 Skill 或 Plugin 核心发布物，也不参与核心有效性判定。示例使用仓库内的相对路径，可直接部署为静态站点；完整结构/视觉参考分级记录在 `examples/validation.json`。Vercel 配置会将首页映射到品牌视觉实验页。

带有 `data-han-static-reference="true"` 的页面只展示视觉状态。Modal、Tabs、自定义 Select、Date Picker、Tree、Upload 等复杂控件不能仅复制展示结构用于生产；请按照组件目录补齐键盘、焦点、状态和 ARIA，或将 Han 样式应用到目标项目已有的可访问组件上。

## Skill 资源

- [Skill 指令](skills/han-design/SKILL.md)
- [详细设计规范](skills/han-design/references/design-guide.md)
- [当代配色主题](skills/han-design/references/contemporary-palettes.md)
- [组件目录](skills/han-design/references/component-catalog.md)
- [文化方法](skills/han-design/references/cultural-methodology.md)
- [朝代主题边界](skills/han-design/references/dynasty-contexts.md)
- [纹样语义](skills/han-design/references/motif-semantics.md)
- [书法与印章](skills/han-design/references/calligraphy-and-seals.md)
- [地域、民族与活态文化](skills/han-design/references/regional-and-ethnic-contexts.md)
- [文化来源索引](skills/han-design/references/cultural-sources.md)
- [真实任务配方](skills/han-design/references/task-recipes.md)
- [自动驾驶与设计简报](skills/han-design/references/autopilot.md)
- [页面类型与整页 Starter](skills/han-design/references/page-archetypes.md)
- [视觉回看与二次修改](skills/han-design/references/visual-review.md)
- [输出质量评测](skills/han-design/references/output-evaluation.md)
- [完整 CSS 入口](skills/han-design/assets/han.css)
- [Scoped CSS 入口](skills/han-design/assets/han-scoped.css)
- [HTML snippets](skills/han-design/assets/snippets/)
- [独立 HTML 输出检查](skills/han-design/scripts/check-output.mjs)
- [浏览器输出检查](skills/han-design/scripts/check-browser-output.mjs)

Skill 会按需读取 references，不会在每次任务开始前加载全部 CSS。新建完整页面时，优先从 `skills/han-design/assets/starters/` 选择品牌、产品、Dashboard、展览、活动或长文构图，再翻译到目标框架。

视觉强度分为四档：`0` 只用令牌层，适合 Dashboard；`1` 克制，适合产品和品牌页；`2` 鲜明，适合茶、工艺和文化品牌；`3` 戏剧化，适合节庆、展览和游戏活动。它是装饰预算，不是要求页面堆更多组件。

## 开发与校验

核心 Skill / Plugin 校验：

```bash
npm ci
npm run generate:scoped
npm run validate
npm run eval:check
npm run test:browser
npm run check:browser-output -- --strict tests/fixtures/scoped-host.html
npm run package:plugin
```

`check-output.mjs` 是零依赖静态预检；`check-browser-output.mjs` 使用 Playwright 与 axe 检查浏览器计算后的可访问性、焦点、横向溢出、运行时异常和 reduced-motion。

`evals/cases.json` 不再只做 schema 校验。真实前向测试通过 adapter 执行：

```bash
node scripts/run-evals.mjs --adapter /path/to/agent-adapter.mjs
```

Adapter 从标准输入只接收 case id 与用户 prompt，不会看到 `shouldTrigger`、预期 reference 或预期入口；它输出 `triggered`、`references`、`assetEntry` 及可选的 `starter`、`intensity`、`designBrief`、`reviewedViewports`、`revisionPerformed`、`checksPassed` 和 `outputPath`。自动驾驶用例会检查 Agent 是否真的完成设计简报、桌面与移动端回看、至少一轮修改，并修复可处理的问题直到检查通过。仓库提供通用的外部 Agent command adapter：

```bash
HAN_EVAL_AGENT=/path/to/agent \
HAN_EVAL_AGENT_ARGS='["arguments","for-a-fresh-session"]' \
node scripts/run-evals.mjs --adapter scripts/eval-adapters/agent-command.mjs
```

`evals/fixtures/smoke-adapter.mjs` 只验证 runner 管道，必须显式传入 `--allow-smoke-adapter`，不能当作模型质量结果。

示例网站单独校验：

```bash
node scripts/validate-examples.mjs
```

校验内容包括：

- Skill frontmatter 和目录命名
- 必需文件与本地引用
- CSS 自定义变量
- 主题功能色对比度与语义令牌
- 文化 references 和高风险绝对化表述
- HTML snippet 的基础语义问题
- Plugin 清单与 scoped CSS 入口
- Skill eval 用例结构
- 可执行 eval runner 与 adapter 结果评分
- 深色模式功能色对比度
- Skill 包内部引用和发布包边界
- 官方 Skill/Plugin validator 快照
- Playwright、axe、scoped 隔离、键盘与 reduced-motion 测试

GitHub Actions 使用两个独立任务：`Validate Skill and Plugin core` 会运行仓库校验、Codex 标准 validator 快照、eval runner 合约、Playwright/axe 浏览器测试及发布包复验；`Validate demo website` 单独检查 README 与示例站点。示例站点问题不会被描述成 Skill schema 或运行时包问题。

## 贡献

欢迎提交主题、组件、可访问性修复、示例和文档改进。

1. Fork 仓库并创建功能分支。
2. 修改 Skill、assets、references、evals 或 Plugin 清单后运行 `node scripts/validate.mjs`。
3. 修改 `examples/`、README 的示例链接或 Vercel 页面后运行 `node scripts/validate-examples.mjs`。
4. 确保新增组件同时包含样式、成熟度说明和示例；复杂交互必须说明键盘、焦点、状态与 ARIA 行为。
5. 提交 Pull Request，并说明视觉意图和验证方式。

新增历史、地域、民族、宗教、纹样或活态文化内容时，还应提供来源、适用边界和现代转译说明。

## 字体与网络

`fonts.css` 会加载 LXGW WenKai、Noto Serif SC 和 Noto Sans SC。对于离线、严格 CSP、隐私敏感或中国大陆网络环境，建议不加载该文件，改用设计令牌中定义的系统字体回退，或自行托管字体。

## License

[MIT](LICENSE)

MIT 许可覆盖 Han 自身的代码、文档与自制资产，不自动覆盖第三方演示素材。`examples/assets/apple-mac/` 不会进入 `scripts/package-plugin.mjs` 生成的 Plugin 发布目录，具体边界见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
