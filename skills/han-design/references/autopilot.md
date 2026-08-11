# Autopilot and brief compiler

Use this workflow when the user gives a broad request, delegates visual decisions, or says only that a page should look better.

## Question policy

- Inspect the repository, current page, content, routes, and existing components before asking questions.
- Infer design decisions such as theme, typography, spacing, component choice, and visual intensity.
- Ask only when missing information would materially change the product task, target audience, required content, or authorized scope.
- Ask no more than three short questions at once. Continue with safe assumptions when answers are useful but non-blocking.
- Do not ask users to choose Han theme identifiers or component class names unless they explicitly want that control.

## Internal design brief

Before editing, write a private one-line brief in this form:

```text
Page archetype + audience + primary action + interpretation mode + primary theme + visual intensity + content or cultural constraints.
```

Example:

```text
Contemporary product landing page for small design teams; primary action is request access; ocean-orchid theme; intensity 1; preserve the React form and avoid generic neon AI imagery.
```

Use the brief to keep every layout and decoration decision aligned. Share a short version at delivery when it helps explain the result.

When the user gives qualitative visual direction or an explicit avoid instruction, read [intent-alignment.md](intent-alignment.md). Keep the one-line brief, then compile a versioned intent contract containing only the small set of explicit requirements that can be measured reliably. Do not turn the contract into a complete visual specification.

## Defaults for vague requests

- Preserve the existing stack, behavior, routes, and product terminology.
- Prefer contemporary Chinese-inspired interpretation unless historical specificity is visible in the content.
- Use one primary theme and one prominent decorative family.
- Default to intensity 1 for websites and intensity 0 for dashboards or dense applications.
- Keep one obvious primary action per page or major flow.
- Preserve brand colors when they already carry product recognition; borrow Han surface, typography, rhythm, and ornament selectively.
- Build mobile-first and verify at approximately 375 px and 1280–1440 px.

## Visual intensity

| Level | Name | Default use | Allowed expression |
|---|---|---|---|
| `0` | Token layer | Dashboards, enterprise tools, dense application UI | Theme colors, type hierarchy, borders, spacing, focus, subtle dividers. No iconic structures. |
| `1` | Restrained | Product sites, SaaS, portfolios, general brand pages | Token layer plus one quiet editorial accent such as a stamp, ink divider, framed quote, or vertical caption. |
| `2` | Expressive | Tea, craft, fashion, culture, hospitality, editorial brands | One iconic structure family, stronger composition, richer material surfaces, limited display typography. |
| `3` | Theatrical | Festivals, exhibitions, games, entertainment campaigns | Strong scene-setting composition and up to two iconic families. Keep navigation and primary actions conventional. |

Treat the level as a design budget, not a CSS switch. Do not increase intensity merely because more Han components are available.

## Content completeness

Good layout requires enough real content to establish hierarchy. When the user has not supplied complete copy:

- infer realistic, editable draft content from the product context;
- include a clear value proposition, supporting proof, primary action, section headings, and useful footer information;
- for commerce, include product, origin or process, decision support, and purchase information;
- for applications, include realistic labels, table values, states, filters, and empty or error copy when relevant;
- for exhibitions, include dates, venue, object metadata, captions, sources, and visitor information;
- avoid Lorem ipsum, “Feature 1,” “Card title,” fake testimonials, invented awards, unverifiable numbers, or unsupported cultural claims;
- clearly mark assumptions that need the user to replace or approve.

## Media strategy

- Reuse user-provided or repository media when it is licensed and relevant.
- Prefer meaningful product, material, place, process, or editorial imagery over generic decorative backgrounds.
- If no media exists, use a deliberate CSS composition or clearly labeled replaceable media region instead of broken image placeholders.
- Do not let a hero image carry information that is absent from the HTML text.
- Add useful alternative text for informative images and hide purely decorative media from assistive technology.

## Autonomous delivery loop

1. Inspect only the files needed to identify the stack, closest page archetype, content source, and existing Han entry point.
2. Read `validation-modes.md` and select `fast` unless strict mode is explicitly requested or required by shared changes, complex interaction, or cultural sensitivity.
3. Select a page archetype, primary theme, and intensity. Compile an intent contract when the request contains measurable visual direction.
4. Start from the closest file in `assets/starters/` or an existing page example; do not rebuild a complete visual system from scratch when a suitable structure already exists.
5. Fill the page with realistic content and a complete action path.
6. In fast mode, run `npm run check:page -- <page>` once, fix only blocking issues it reports, and deliver the first usable result. Do not add screenshots, full-repository validation, strict-mode checks, or cosmetic revision loops unless the user asks for them or the fast check exposes a problem that needs them.
7. In strict mode, run `npm run check:page:strict -- <page>`, read `visual-review.md`, review desktop and mobile renders, and revise when an actionable issue is found.
8. Record the selected mode, brief alignment, completed checks, and assumptions still requiring user review.

### Fast-path budget

Fast mode is an end-to-end delivery choice, not only a browser-check setting. For a single standalone page, the default path is:

- inspect the minimum relevant skill guidance and one or two closest examples;
- reuse an existing shell, starter, or page archetype when available;
- create the page, local styles, and intent contract in one implementation pass;
- run `npm run check:page -- <page>` once and fix only reported blockers;
- stop after the page passes and report any manual follow-up separately.

Do not default to repository-wide tests, desktop and mobile screenshots, visual scorecards, or a second render in fast mode. Escalate to strict mode when the fast check fails repeatedly, the change touches shared Han assets or validation logic, the page introduces behavior-heavy interaction, or the user requests formal visual review.
