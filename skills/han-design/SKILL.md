---
name: han-design
description: "Create or restyle accessible web interfaces with a restrained, culturally contextual Chinese aesthetic using Han CSS tokens, themes, components, and reusable HTML snippets. Use for 中国风、国风、东方美学、朝代启发、宋韵、唐风、水墨、书法、印章、卷轴、窗棂 and other Chinese-inspired websites, landing pages, dashboards, web exhibitions, brand sites, components, or UI visual systems. Do not use for standalone raster image generation, logo-only work, print-only layouts, prose writing, or cultural research that does not require a web interface."
---

# Han

Build Chinese-inspired interfaces with the bundled Han assets while preserving the user's stack, content, and product requirements.

## Scope

- Treat Han as a design Skill and reusable visual asset bundle, not as a general-purpose UI component library.
- Use `assets/han.css` as the complete standalone-page entry point. Use `assets/han-scoped.css` inside an existing product or design system to avoid Han's global reset. Internal CSS files exist for maintenance and targeted inspection.
- Do not create npm packaging, framework-specific Han component packages, adapters, or a new runtime unless the user explicitly requests that separate project.
- Adapt Han snippets to the target project's existing framework and components without expanding Han itself into another framework library.
- Measure success by the quality, cultural context, usability, and consistency of generated interfaces, not by the number of bundled components.

## Workflow

1. Inspect the target project before editing.
   - Preserve its framework, routing, build system, accessibility conventions, and existing component architecture.
   - For an existing product, integrate Han selectively instead of replacing unrelated styles.

2. Clarify or infer the visual direction.
   - Classify the request as historical reconstruction, historically inspired, or contemporary Chinese-inspired design.
   - Identify the relevant period, region, medium, social setting, and desired visual intensity when cultural accuracy matters.
   - Choose one primary theme as a starting point, not as a claim that one palette represents an entire dynasty or culture.
   - Read [references/cultural-methodology.md](references/cultural-methodology.md) for museums, education, heritage, religion, regional culture, ethnic culture, or historically specific work.
   - Read [references/design-guide.md](references/design-guide.md) when selecting colors, typography, spacing, or composition.
   - Read [references/component-catalog.md](references/component-catalog.md) only when choosing components or locating the relevant CSS file.
   - Read [references/task-recipes.md](references/task-recipes.md) for museums, brands, applications, festivals, tea or craft, and entertainment tasks.

3. Integrate the assets.
   - Use `assets/han.css` for a standalone page that should adopt Han's full base styles.
   - Use `assets/han-scoped.css` for an existing application. It omits the global `base.css`, retains Han's prefixed utilities and accessibility helpers, and keeps tokens inside `data-han-scope`.
   - Load `assets/fonts.css` separately only when remote web fonts are acceptable. The system fonts in the tokens remain the fallback.
   - Copy the required assets into the target project or import them through its bundler. Do not assume the installed skill directory is publicly served.
   - Use files under `assets/snippets/` as starting points. Replace placeholders and adapt paths, semantics, and framework syntax.

4. Build the interface.
   - For `han.css`, set `data-theme` on the document root. For `han-scoped.css`, set `data-han-scope` and `data-theme` on the same container.
   - Use `--han-*` tokens instead of duplicating colors, spacing, radii, shadows, and motion values.
   - Use `--han-color-accent-text`, `--han-color-accent-control`, `--han-color-on-accent`, and `--han-focus-ring` for functional UI. Reserve `--han-color-accent-decorative` for non-text decoration.
   - Prefer semantic HTML and existing application components.
   - Keep decorative elements subordinate to content and interaction.
   - Treat behavior-required examples as visual recipes, not complete widgets. Supply the keyboard behavior, focus management, state, and ARIA required by the host framework.

5. Verify the result.
   - Test desktop and mobile layouts.
   - Verify keyboard navigation, visible focus, contrast, semantic headings, labels, and reduced-motion behavior.
   - Check that every referenced asset is copied or resolvable in the final project.
   - Read [references/output-evaluation.md](references/output-evaluation.md) and score the result when the task is substantial or culturally sensitive.
   - Resolve `<skill-root>` as the directory containing this `SKILL.md`. Run `node <skill-root>/scripts/check-output.mjs --strict <output.html>` as a dependency-free static preflight.
   - When Playwright and axe are available in the host project, also run `node <skill-root>/scripts/check-browser-output.mjs --strict --root <project-root> <output.html>` for computed accessibility, focus, overflow, runtime errors, and reduced-motion checks.
   - Inspect specific CSS files with search tools only when extending or debugging a class; do not load every stylesheet into context.

## Cultural reference routing

- Read [references/dynasty-contexts.md](references/dynasty-contexts.md) before making claims about a dynasty or combining motifs across periods.
- Read [references/motif-semantics.md](references/motif-semantics.md) before using dragons, phoenixes, bats, longevity characters, lotus, Buddhist imagery, rank or court symbols.
- Read [references/calligraphy-and-seals.md](references/calligraphy-and-seals.md) for calligraphy-led layouts, inscriptions, signatures, seals, seal script, or engraving-inspired graphics.
- Read [references/regional-and-ethnic-contexts.md](references/regional-and-ethnic-contexts.md) for region-specific, ethnic, religious, ritual, or living-tradition work.
- Use [references/cultural-sources.md](references/cultural-sources.md) to locate authoritative starting sources and record provenance.
- Use [references/output-evaluation.md](references/output-evaluation.md) to reject outputs that are decorative but unusable, culturally overconfident, or structurally incomplete.

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
