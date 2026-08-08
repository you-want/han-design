# 汉 · Han

A Chinese-culture design Skill for AI Agents. It turns rice paper, ink, vermilion, calligraphy, scroll layouts, and traditional composition into reusable design tokens, themes, visual recipes, and cultural decision rules.

**Languages:** [简体中文](README.md) · [English](README.en.md)（current） · [日本語](README.ja.md) · [한국어](README.ko.md)

## Why "Han"

Our ID cards say Han ethnicity, we speak the Han language, and we write Han characters. The Chinese-style design system we built is naturally called han-design.

## Features

- 7 dynasty-inspired themes: Qin-Han, Wei-Jin, Tang, Song, Yuan, Ming, Qing
- 9 cultural themes: ink wash, blue-green landscape, blue-and-white porcelain, Dunhuang, imperial gold, wuxia, tea, vermilion, celadon
- Complete CSS tokens, components, icons, patterns, and motion
- 6 full-page starters covering brand, product, dashboard, exhibition, event, and long-form
- Autopilot design flow supporting theme, visual intensity, content completion, and screenshot review
- Standard Agent Skill frontmatter with an independently installable directory
- Responsive, keyboard focus, and reduced-motion baseline support
- Static HTML examples with no build step

## Current Version

Han is currently `v0.1.0-preview.0`, suitable for installation trials, page generation, and feedback collection. It is a design Skill and visual asset pack, not a general-purpose frontend component library; complex interactions should continue to use the target project's existing native or accessible components.

## Repository Structure

```text
han/
├── .codex-plugin/plugin.json   # Codex Plugin manifest
├── skills/
│   └── han-design/              # independently installable Skill
│       ├── SKILL.md
│       ├── agents/openai.yaml
│       ├── references/
│       └── assets/
│           ├── han.css          # full CSS entry
│           ├── han-scoped.css   # tokens and rules constrained by data-han-scope
│           ├── base.css         # global base styles used only by the full entry
│           ├── utilities.css    # scoped-safe layout and typography utilities
│           ├── accessibility.css
│           ├── fonts.css        # optional remote fonts
│           ├── *.css
│           └── snippets/
├── examples/                    # demo website, not part of Skill/Plugin core
├── scripts/validate.mjs
├── vercel.json
├── LICENSE
└── README.md
```

## Install as an Agent Skill

Clone the repo:

```bash
git clone https://github.com/you-want/han-design.git han
```

The installable Skill directory is:

```text
skills/han-design
```

The recommended common install location for Agent Skills is `~/.agents/skills/`:

```bash
mkdir -p "$HOME/.agents/skills"
cp -R skills/han-design "$HOME/.agents/skills/han-design"
```

PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME/.agents/skills" | Out-Null
Copy-Item -Recurse -Force "skills/han-design" "$HOME/.agents/skills/han-design"
```

Codex still supports `~/.codex/skills/`. For other tools that support Agent Skills, point their installer or config at `skills/han-design/`; auto-discovery directories differ across tools.

The repo root also contains `.codex-plugin/plugin.json`, which can be used as a Codex Plugin source. Generate a release directory without repo examples and third-party demo images:

```bash
node scripts/package-plugin.mjs
```

After installation, call it like this:

> Use han-design to generate a restrained Song-style product landing page.

> Refactor the current page with han-design, keeping the existing React components and interactions.

You can also hand the design judgment to Han directly:

> Use han-design to make the current page look better. Inspect the project and decide the page type, theme, and visual intensity yourself; keep the functionality and tech stack; complete desktop and mobile review and revise one round.

Users don't need to know theme IDs, component class names, or which Starter to use. Han first generates an internal design brief, then selects full-page composition, theme, visual intensity, and content completion strategy.

For more copy-ready tasks see [Skill prompt examples](examples/skill-prompts.md).

## Use the CSS Directly

Copy `skills/han-design/assets/` into your project. Standalone pages use the full entry:

```html
<!-- Optional: loads fonts from jsDelivr and Google Fonts -->
<link rel="stylesheet" href="/han/fonts.css">

<!-- Design tokens, themes, and all components -->
<link rel="stylesheet" href="/han/han.css">
```

Existing apps or design systems should use the entry without a global reset:

```html
<link rel="stylesheet" href="/han/han-scoped.css">

<section data-han-scope data-theme="song">
  <button type="button" class="han-btn-seal">Confirm</button>
</section>
```

`han-scoped.css` does not define Han tokens on `:root`, nor does it modify the global `body`, headings, paragraphs, links, form controls, media elements, or scrollbars. Tokens, dark mode, and theme variables only take effect inside `data-han-scope`; layout basics and element defaults remain the host project's responsibility.

Choose a theme:

```html
<html lang="zh-CN" data-theme="song">
```

Dark mode:

```html
<html lang="zh-CN" data-theme="song" data-color-mode="dark">
```

Han's core release is the `skills/han-design/` Skill package; it does not target an npm component library. After copying assets, standalone pages use `han.css` and existing apps use `han-scoped.css`.

## Themes

### Dynasty Themes

These themes are visual interpretations for the modern web, not historical reconstructions, nor do they represent the full visual culture of a dynasty.

| Theme | `data-theme` | Mood |
|---|---|---|
| Qin-Han inspired | `qinhan` | Lacquerware, stone carving, heavy material feel |
| Wei-Jin | `weijin` | Airy and austere |
| Tang | `tang` | Grand and vivid |
| Song | `song` | Refined and restrained |
| Yuan | `yuan` | Pluralistic, sharp contrast |
| Ming | `ming` | Delicate and orderly |
| Qing | `qing` | Ornate and elaborate |

### Cultural Themes

| Theme | `data-theme` |
|---|---|
| Ink wash | `ink` |
| Blue-green landscape | `landscape` |
| Blue-and-white porcelain | `porcelain` |
| Dunhuang | `dunhuang` |
| Imperial gold | `imperial` |
| Wuxia ink | `wuxia` |
| Contemporary tea space | `tea` |
| Vermilion festive | `vermilion` |
| Celadon | `celadon` |

### Contemporary Palette Themes

These themes are translated from color cards of in-repo reference images. They are palette systems for the modern web, not any official currency color spec.

| Theme | `data-theme` | Mood |
|---|---|---|
| Pine-Wheat | `pine-wheat` | Natural, fresh, quiet |
| Plum-Blush | `plum-blush` | Soft, romantic, light-luxury |
| Ocean-Orchid | `ocean-orchid` | Calm, clear, elegant |
| Caramel-Cream | `caramel-cream` | Warm, vintage, premium |
| Mint-Lavender | `mint-lavender` | Clear, natural, airy |
| Berry-Butter | `berry-butter` | Bright, trendy, energetic |

## Examples

- [Quick Start](examples/quick-start.html) — full structure example
- [Mac concept page](examples/mac-han.html) — full structure example, image license noted below
- [Scoped theme integration](examples/scoped-integration.html) — scoped CSS full structure example
- [Brand visual experiment](examples/landing-page.html) — static visual reference
- [Theme showcase](examples/theme-showcase.html) — static visual reference
- [Full component showcase](examples/showcase.html) — static visual reference
- [Single component examples](examples/components/) — static visual reference

`examples/` is an independent demo website, not part of the Skill or Plugin core release, and does not participate in core validity checks. Examples use relative paths within the repo and can be deployed as a static site directly; the full-structure/visual-reference grading is recorded in `examples/validation.json`. The Vercel config maps the homepage to the brand visual experiment page.

Pages with `data-han-static-reference="true"` only show visual states. Complex controls such as Modal, Tabs, custom Select, Date Picker, Tree, and Upload cannot be put into production by copying the display structure alone; please complete keyboard, focus, state, and ARIA per the component catalog, or apply Han styles to the target project's existing accessible components.

## Skill Resources

- [Skill instructions](skills/han-design/SKILL.md)
- [Detailed design guide](skills/han-design/references/design-guide.md)
- [Contemporary palettes](skills/han-design/references/contemporary-palettes.md)
- [Component catalog](skills/han-design/references/component-catalog.md)
- [Cultural methodology](skills/han-design/references/cultural-methodology.md)
- [Dynasty theme boundaries](skills/han-design/references/dynasty-contexts.md)
- [Motif semantics](skills/han-design/references/motif-semantics.md)
- [Calligraphy and seals](skills/han-design/references/calligraphy-and-seals.md)
- [Regional, ethnic, and living culture](skills/han-design/references/regional-and-ethnic-contexts.md)
- [Cultural source index](skills/han-design/references/cultural-sources.md)
- [Task recipes](skills/han-design/references/task-recipes.md)
- [Autopilot and design brief](skills/han-design/references/autopilot.md)
- [Page types and full-page starters](skills/han-design/references/page-archetypes.md)
- [Visual review and revision](skills/han-design/references/visual-review.md)
- [Output quality evaluation](skills/han-design/references/output-evaluation.md)
- [Full CSS entry](skills/han-design/assets/han.css)
- [Scoped CSS entry](skills/han-design/assets/han-scoped.css)
- [HTML snippets](skills/han-design/assets/snippets/)
- [Standalone HTML output check](skills/han-design/scripts/check-output.mjs)
- [Browser output check](skills/han-design/scripts/check-browser-output.mjs)

The Skill reads references on demand and does not load all CSS at the start of each task. When building a full page, prefer selecting a brand, product, dashboard, exhibition, event, or long-form composition from `skills/han-design/assets/starters/`, then translate it to the target framework.

Visual intensity has four levels: `0` tokens only, for dashboards; `1` restrained, for product and brand pages; `2` distinct, for tea, craft, and cultural brands; `3` dramatic, for festivals, exhibitions, and game events. It is a decoration budget, not a request to pile more components onto a page.

## Development and Validation

Core Skill / Plugin validation:

```bash
npm ci
npm run generate:scoped
npm run validate
npm run eval:check
npm run test:browser
npm run check:browser-output -- --strict tests/fixtures/scoped-host.html
npm run package:plugin
```

`check-output.mjs` is a zero-dependency static pre-check; `check-browser-output.mjs` uses Playwright and axe to inspect computed accessibility, focus, horizontal overflow, runtime exceptions, and reduced-motion in the browser.

`evals/cases.json` no longer does schema validation only. Real forward testing runs through an adapter:

```bash
node scripts/run-evals.mjs --adapter /path/to/agent-adapter.mjs
```

The adapter receives only the case id and user prompt from stdin; it does not see `shouldTrigger`, expected references, or expected entry points. It outputs `triggered`, `references`, `assetEntry`, and optional `starter`, `intensity`, `designBrief`, `reviewedViewports`, `revisionPerformed`, `checksPassed`, and `outputPath`. Autopilot cases check whether the Agent actually completes the design brief, desktop and mobile review, at least one revision round, and fixes tractable issues until checks pass. The repo provides a generic external Agent command adapter:

```bash
HAN_EVAL_AGENT=/path/to/agent \
HAN_EVAL_AGENT_ARGS='["arguments","for-a-fresh-session"]' \
node scripts/run-evals.mjs --adapter scripts/eval-adapters/agent-command.mjs
```

`evals/fixtures/smoke-adapter.mjs` only validates the runner pipeline; it must be explicitly passed `--allow-smoke-adapter` and must not be treated as a model quality result.

Example site validation runs separately:

```bash
node scripts/validate-examples.mjs
```

Validation covers:

- Skill frontmatter and directory naming
- Required files and local references
- CSS custom properties
- Theme functional color contrast and semantic tokens
- Cultural references and high-risk absolute statements
- Basic semantic issues in HTML snippets
- Plugin manifest and scoped CSS entry
- Skill eval case structure
- Executable eval runner and adapter result scoring
- Dark mode functional color contrast
- Internal references and release package boundaries of the Skill package
- Official Skill/Plugin validator snapshots
- Playwright, axe, scoped isolation, keyboard, and reduced-motion tests

GitHub Actions uses two independent jobs: `Validate Skill and Plugin core` runs repo validation, Codex standard validator snapshots, eval runner contracts, Playwright/axe browser tests, and release package re-validation; `Validate demo website` separately checks the README and the example site. Example site issues will not be described as Skill schema or runtime package issues.

## Contributing

Contributions of themes, components, accessibility fixes, examples, and docs are welcome.

1. Fork the repo and create a feature branch.
2. After modifying Skill, assets, references, evals, or Plugin manifest, run `node scripts/validate.mjs`.
3. After modifying `examples/`, README example links, or Vercel pages, run `node scripts/validate-examples.mjs`.
4. Ensure new components include styles, a maturity note, and examples; complex interactions must document keyboard, focus, state, and ARIA behavior.
5. Submit a Pull Request describing the visual intent and validation approach.

When adding historical, regional, ethnic, religious, motif, or living-culture content, also provide sources, applicable boundaries, and modern-translation notes.

## Fonts and Network

`fonts.css` loads LXGW WenKai, Noto Serif SC, and Noto Sans SC. For offline, strict CSP, privacy-sensitive, or mainland-China network environments, it is recommended not to load this file, and instead use the system font fallback defined in the design tokens, or self-host the fonts.

## License

[MIT](LICENSE)

The MIT license covers Han's own code, docs, and self-made assets, and does not automatically cover third-party demo materials. `examples/assets/apple-mac/` is not included in the Plugin release directory generated by `scripts/package-plugin.mjs`; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for the exact boundary.
