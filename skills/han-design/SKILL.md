---
name: han-design
description: "Create or autonomously restyle polished, accessible web interfaces with a restrained, culturally contextual Chinese aesthetic using Han themes, full-page starters, CSS tokens, components, and visual review. Use when users explicitly invoke Han Design; request 中国风、国风、东方美学、朝代启发、宋韵、唐风、水墨、书法、印章、卷轴 or 窗棂; or ask Han to make a website, landing page, dashboard, exhibition, brand site, component, or existing UI look better while preserving its stack and behavior. Handle vague requests by inspecting the project, inferring a design brief, selecting the theme and visual intensity, completing realistic content, rendering desktop and mobile views, and revising once. Do not use for standalone raster image generation, logo-only work, print-only layouts, prose writing, or cultural research that does not require a web interface."
---

# Han

Build Chinese-inspired interfaces with the bundled Han assets while preserving the user's stack, content, and product requirements.

## Scope

- Treat Han as a design Skill and reusable visual asset bundle, not as a general-purpose UI component library.
- Use `assets/han.css` as the complete standalone-page entry point. Use `assets/han-scoped.css` inside an existing product or design system to avoid Han's global reset. Internal CSS files exist for maintenance and targeted inspection.
- Do not create npm packaging, framework-specific Han component packages, adapters, or a new runtime unless the user explicitly requests that separate project.
- Adapt Han snippets to the target project's existing framework and components without expanding Han itself into another framework library.
- Measure success by the quality, cultural context, usability, and consistency of generated interfaces, not by the number of bundled components.
- Take responsibility for routine design decisions. Do not require the user to know Han theme identifiers, component classes, or visual-system terminology.

## Workflow

1. Inspect the target project before editing.
   - Preserve its framework, routing, build system, accessibility conventions, and existing component architecture.
   - For an existing product, integrate Han selectively instead of replacing unrelated styles.
   - In the default fast path, inspect only the minimum relevant files plus one or two closest examples. Broaden the inspection only when the page cannot be implemented safely from that context.
   - Inspect available content and media. Identify the page archetype, audience, primary action, and gaps that would prevent a complete layout.

2. Compile the design brief.
   - For vague requests or delegated design decisions, read [references/autopilot.md](references/autopilot.md), infer the brief, and continue without asking the user to choose themes or components.
   - When the user gives qualitative visual direction or an explicit avoid instruction, read [references/intent-alignment.md](references/intent-alignment.md), compile a minimal intent contract, and keep non-measurable qualities in the brief-to-result review.
   - Ask only when missing information would materially change the product task, target audience, required content, or authorized scope.
   - Classify the request as historical reconstruction, historically inspired, or contemporary Chinese-inspired design.
   - Identify the relevant period, region, medium, social setting, and desired visual intensity when cultural accuracy matters.
   - Choose one primary theme as a starting point, not as a claim that one palette represents an entire dynasty or culture.
   - Choose visual intensity `0`, `1`, `2`, or `3` from `autopilot.md`; default to `1`, or `0` for dense application UI.
   - Read [references/cultural-methodology.md](references/cultural-methodology.md) for museums, education, heritage, religion, regional culture, ethnic culture, or historically specific work.
   - Read [references/design-guide.md](references/design-guide.md) when selecting colors, typography, spacing, or composition.
   - Read [references/contemporary-palettes.md](references/contemporary-palettes.md) when the user asks for 松麦绿、藤紫、海兰、焦糖、薄荷薰衣草、莓果奶油，或希望采用本 Skill 的当代色卡主题。
   - Read [references/component-catalog.md](references/component-catalog.md) only when choosing components or locating the relevant CSS file.
   - Read [references/task-recipes.md](references/task-recipes.md) for museums, brands, applications, festivals, tea or craft, and entertainment tasks.

3. Integrate the assets.
   - Use `assets/han.css` for a standalone page that should adopt Han's full base styles.
   - Use `assets/han-scoped.css` for an existing application. It omits the global `base.css`, retains Han's prefixed utilities and accessibility helpers, and keeps tokens inside `data-han-scope`.
   - Load `assets/fonts.css` separately only when remote web fonts are acceptable. The system fonts in the tokens remain the fallback.
   - Copy the required assets into the target project or import them through its bundler. Do not assume the installed skill directory is publicly served.
   - For a new page, read [references/page-archetypes.md](references/page-archetypes.md) and start from the closest file under `assets/starters/`.
   - Use files under `assets/snippets/` for individual structures. Replace placeholders and adapt paths, semantics, and framework syntax.

4. Build the interface.
   - For `han.css`, set `data-theme` on the document root. For `han-scoped.css`, set `data-han-scope` and `data-theme` on the same container.
   - Use `--han-*` tokens instead of duplicating colors, spacing, radii, shadows, and motion values.
   - Use `--han-color-accent-text`, `--han-color-accent-control`, `--han-color-on-accent`, and `--han-focus-ring` for functional UI. Reserve `--han-color-accent-decorative` for non-text decoration.
   - Prefer semantic HTML and existing application components.
   - Keep decorative elements subordinate to content and interaction.
   - When content is incomplete, create realistic editable draft content according to `autopilot.md`; do not use Lorem ipsum, generic feature labels, fake testimonials, or unsupported statistics.
   - Prefer relevant user or repository media. When no media exists, use an intentional CSS composition or a clearly replaceable media region rather than broken placeholders.
   - Treat behavior-required examples as visual recipes, not complete widgets. Supply the keyboard behavior, focus management, state, and ARIA required by the host framework.

5. Validate and deliver.
   - Read [references/validation-modes.md](references/validation-modes.md) and use fast mode by default for a single-page request.
   - In fast mode, run the strict static check and current-page mobile browser check once. Do not block the first usable result on screenshots, a forced visual revision, or repository-wide tests.
   - Treat fast mode as the default end-to-end delivery path: reuse a nearby shell or archetype, make one implementation pass, fix only reported blockers, and stop after the page passes.
   - Do not run extra screenshots, full example validation, full Playwright regression, or broad documentation scans in fast mode unless the user asks for them or a blocking issue requires escalation.
   - Use strict mode when the user requests formal review, shared Han files or interaction behavior changed, or the work is complex or culturally sensitive.
   - In strict mode, read [references/visual-review.md](references/visual-review.md), render desktop and mobile views, and revise when the review identifies an actionable issue.
   - Verify keyboard navigation, visible focus, contrast, semantic headings, labels, and reduced-motion behavior at the level required by the selected mode.
   - Check that every referenced asset is copied or resolvable in the final project.
   - Read [references/output-evaluation.md](references/output-evaluation.md) and score the result when the task is substantial or culturally sensitive.
   - In this repository, run `npm run check:page -- <output.html>` for fast mode or `npm run check:page:strict -- <output.html>` for strict mode.
   - Outside this repository, resolve `<skill-root>` as the directory containing this `SKILL.md`; run `node <skill-root>/scripts/check-output.mjs --strict <output.html>` plus `node <skill-root>/scripts/check-browser-output.mjs --fast --root <project-root> <output.html>` for the fast equivalent.
   - When an intent contract exists, pass `--contract <intent-contract.json> --report <intent-report.json>` to the browser checker, keep `data-han-intensity` on the root, and expose semantic accent-family evidence as described in `intent-alignment.md`.
   - Fix actionable issues found by rendering or checks, then rerun the failed check. Do not stop after reporting a fixable contrast, overflow, focus, asset, or runtime problem.
   - In strict mode, compare the rendered desktop and mobile result with the original brief. In fast mode, record measurable intent results and any obvious soft-alignment assumptions without delaying delivery for a second render.
   - Inspect specific CSS files with search tools only when extending or debugging a class; do not load every stylesheet into context.
   - Deliver the inferred brief, chosen theme and intensity, revision made, checks run, and remaining assumptions when they materially affect the result.

## Cultural reference routing

- Read [references/dynasty-contexts.md](references/dynasty-contexts.md) before making claims about a dynasty or combining motifs across periods.
- Read [references/motif-semantics.md](references/motif-semantics.md) before using dragons, phoenixes, bats, longevity characters, lotus, Buddhist imagery, rank or court symbols.
- Read [references/calligraphy-and-seals.md](references/calligraphy-and-seals.md) for calligraphy-led layouts, inscriptions, signatures, seals, seal script, or engraving-inspired graphics.
- Read [references/regional-and-ethnic-contexts.md](references/regional-and-ethnic-contexts.md) for region-specific, ethnic, religious, ritual, or living-tradition work.
- Use [references/cultural-sources.md](references/cultural-sources.md) to locate authoritative starting sources and record provenance.
- Use [references/output-evaluation.md](references/output-evaluation.md) to reject outputs that are decorative but unusable, culturally overconfident, or structurally incomplete.
- Use [references/intent-alignment.md](references/intent-alignment.md) to convert explicit visual direction into minimal measurable guardrails without freezing the design solution.
- Use [references/validation-modes.md](references/validation-modes.md) to choose the default fast path or an explicitly justified strict review.

## Theme selection

Use one primary theme:

All bundled themes are contemporary interpretations. Use them as visual starting points, not historical reconstructions.

| Intent | Theme |
|---|---|
| Minimal, scholarly, contemporary | `song` |
| Festive, ceremonial, expressive | `tang` or `vermilion` |
| Historic, literary, archival | `weijin` or `ink` |
| Premium commercial presentation | `ming` or `imperial` |
| Monumental, rugged, martial | `qinhan`, `yuan`, or `wuxia` |
| Porcelain, refined craft | `qing`, `porcelain`, or `celadon` |
| Landscape, tea, meditation | `landscape` or `tea` |
| Mural-inspired warm ornament | `dunhuang` |
| Calm botanical and wheat tones | `pine-wheat` |
| Soft plum, blush, and cream | `plum-blush` |
| Cool ocean blue and orchid mist | `ocean-orchid` |
| Warm caramel, walnut, and cream | `caramel-cream` |
| Fresh mint with lavender mist | `mint-lavender` |
| Bright berry, coral, and butter cream | `berry-butter` |

Example:

```html
<html lang="zh-CN" data-theme="song">
```

Use `data-color-mode="dark"` only when the user requests dark mode or the surrounding product already supports it.

## Visual rules

- Prioritize hierarchy, whitespace, rhythm, and typography over literal cultural symbols.
- Use paper tones for large surfaces and ink tones for text and structure.
- Keep vermilion and gold as restrained accents.
- Use no more than two prominent decorative component families on one page.
- Avoid pure black, heavy shadows, oversized radii, emoji as interface icons, and excessive animation.
- Do not mix unrelated dynasty motifs merely to make the page look more “Chinese.”
- Do not describe a theme as the definitive appearance of a dynasty, region, ethnic group, religion, or living tradition.
- Distinguish documented cultural meaning from Han's modern UI heuristics. State uncertainty instead of inventing provenance.
- Treat all cultural and gender associations as optional visual suggestions, never as assumptions about the user or audience.

## Component guidance

- Use seal buttons for primary or ceremonial actions, not every action.
- Use scroll cards, albums, frames, or screens for highlighted editorial content.
- Use ink dividers and patterns sparingly between major sections.
- Use plaques for short headings and brand marks, not long paragraphs.
- Use semantic links inside navigation and cards.
- Add real button labels, link destinations, image alternatives, and form labels before delivery.
- Prefer native controls or the host project's accessible components for select, dialog, tabs, accordion, date picker, tree, upload, menu, tooltip, toast, and other behavior-heavy UI.
- Never copy a static showcase state into production and imply it is interactive.

## Output expectations

- For standalone HTML, start from `assets/snippets/page-shell.html` and replace `{asset_base}`.
- For complete new pages, prefer the closest `assets/starters/*.html` composition over assembling unrelated components from scratch.
- In an existing framework project, translate snippets into that project's native component syntax instead of embedding raw HTML strings. This is output adaptation, not a Han framework package.
- For an existing design system, import `assets/han-scoped.css`, add `data-han-scope` and `data-theme` to the Han container, and keep the host reset.
- Keep content editable and separate from decorative markup when practical.

## Final checklist

- [ ] The chosen theme matches the requested mood.
- [ ] Historical or cultural claims are scoped, sourced when needed, and described as reconstruction, inspiration, or contemporary interpretation.
- [ ] The asset base path resolves in the delivered project.
- [ ] Headings, navigation, buttons, links, forms, and images are semantic and accessible.
- [ ] Behavior-required components include complete keyboard, focus, state, and ARIA behavior.
- [ ] Functional text and controls use functional accent tokens rather than decorative accent colors.
- [ ] Layout remains usable at narrow widths.
- [ ] Animation respects `prefers-reduced-motion`.
- [ ] Decorative accents remain restrained.
- [ ] No undefined `--han-*` variables or nonexistent component classes are introduced.
- [ ] Scoped integrations do not expose Han tokens or generic element rules outside `data-han-scope`.
