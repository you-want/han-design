# Han component catalog

Use this reference to choose an existing component and identify the stylesheet that defines it. Load the referenced CSS file only when implementation details or debugging require it.

## Contents

- [Core layout and typography](#core-layout-and-typography)
- [Navigation and actions](#navigation-and-actions)
- [Content and decoration](#content-and-decoration)
- [Iconic structures](#iconic-structures)
- [Application components](#application-components)
- [Maturity and behavior requirements](#maturity-and-behavior-requirements)
- [Motion](#motion)
- [Snippets](#snippets)

## Core layout and typography

| Purpose | Primary classes | Source |
|---|---|---|
| Container and sections | `.han-container`, `.han-section` | `assets/base.css` |
| Painting composition | `.han-layout-painting` | `assets/base.css` |
| Calligraphy and poetry | `.han-calligraphy`, `.han-poem`, `.han-vertical` | `assets/base.css`, `assets/typography.css` |
| Titles, couplets, signatures | `.han-title-*`, `.han-couplet`, `.han-signature` | `assets/typography.css` |
| Themes | `[data-theme]`, `[data-color-mode]` | `assets/themes.css` |

## Navigation and actions

| Purpose | Primary classes | Source |
|---|---|---|
| Navigation | `.han-navbar`, `.han-navbar__menu`, `.han-navbar__item` | `assets/components.css`; mobile toggle behavior in `assets/snippets/navbar.html` |
| Seal buttons | `.han-btn-seal`, `.han-btn-seal--sm`, `.han-btn-seal--lg`, `.han-btn-seal--circle` | `assets/components.css` |
| Tags and badges | `.han-tag`, `.han-badge` | `assets/components.css` |
| Tabs and breadcrumbs | `.han-tabs`, `.han-breadcrumb` | `assets/components.css`, `assets/structure.css` |

## Content and decoration

| Purpose | Primary classes | Source |
|---|---|---|
| Scroll card | `.han-card-scroll`, `.han-rivet` | `assets/components.css` |
| Paper and ornament cards | `.han-card--paper`, `.han-card--ornament` | `assets/components.css` |
| Window frame | `.han-frame-window`, `.han-frame-window--gold` | `assets/components.css` |
| Ink divider | `.han-divider-ink`, `.han-divider-ink--seal` | `assets/components.css` |
| Stamps | `.han-stamp`, `.han-stamp--sm`, `.han-stamp--lg`, `.han-stamp-group` | `assets/components.css` |
| Patterns | `.han-pattern-*` | `assets/patterns.css` |
| Icons | `.han-icon`, `.han-icon-*` | `assets/icons.css` |

## Iconic structures

| Purpose | Primary classes | Source |
|---|---|---|
| Hand scroll | `.han-scroll`, `.han-scroll--paper`, `.han-scroll--vertical` | `assets/iconic.css` |
| Plaque | `.han-plaque`, `.han-plaque--gold`, `.han-plaque--redwood` | `assets/iconic.css` |
| Folding fan | `.han-fan`, `.han-fan--spread` | `assets/iconic.css` |
| Screen | `.han-screen`, `.han-screen__panel` | `assets/iconic.css` |
| Lantern | `.han-lantern`, `.han-lantern-group` | `assets/iconic.css` |
| Album | `.han-album`, `.han-album--blue`, `.han-album--cloth` | `assets/iconic.css` |
| Main hall composition | `.han-layout-hall`, `.han-couplet-panel` | `assets/iconic.css` |
| Decorative frame | `.han-frame`, `.han-frame--scroll`, `.han-frame--wood` | `assets/iconic.css` |

Use no more than two prominent iconic structure families on a page unless the user explicitly requests a component showcase.

## Application components

`assets/enhanced.css` contains galleries, forms, date pickers, uploads, empty states, and related application UI.

`assets/structure.css` contains breadcrumbs, steps, timelines, tree navigation, and supporting layout structures.

Inspect those files with targeted search before using a specialized class:

```bash
rg -n "\\.han-(gallery|form|date|upload|empty|steps|timeline|tree)" assets
```

## Maturity and behavior requirements

| Level | Meaning | Components |
|---|---|---|
| `static` | CSS and semantic markup are sufficient | cards, dividers, frames, stamps used as decoration, plaques, albums, screens |
| `native` | Use a native HTML element and apply Han styling | links, buttons, inputs, textarea, select when native appearance is acceptable, details/summary |
| `behavior-required` | CSS supplies appearance only; use the target project's existing accessible component or a native pattern | modal, tabs, custom select, accordion, date picker, tree, upload, menu, tooltip, toast |
| `reference-only` | Showcase markup demonstrates appearance and must not be copied as a production widget | any example with forced open state, placeholder links, static progress, or clickable `div` elements |

For `behavior-required` components:

- preserve the host project's component API and accessibility conventions;
- implement keyboard interaction, focus management, state synchronization, and required ARIA;
- prefer native HTML or the target project's established accessible component over custom JavaScript;
- use Han classes and tokens as the visual layer;
- do not describe the CSS alone as a complete component.

Han does not own or publish a separate runtime implementation for these controls. The Skill guides the Agent to style the behavior layer that already belongs to the target project.

Minimum checks:

| Pattern | Required behavior |
|---|---|
| Dialog | accessible name, initial focus, contained tab sequence, Escape, focus return, `role="dialog"`, `aria-modal="true"` |
| Tabs | `tablist`/`tab`/`tabpanel`, selected state, relationships, arrow keys, Home/End where appropriate |
| Custom select | combobox/listbox semantics, active option, keyboard navigation, value and open-state synchronization |
| Accordion | button trigger, `aria-expanded`, `aria-controls`, associated panel |
| Date picker | labeled input, grid semantics when custom, keyboard date navigation, locale-aware labels and parsing |
| Tree | tree/treeitem semantics, level and expanded state, arrow-key navigation |
| Upload | real file input, keyboard-equivalent activation, progress and error announcements |

## Motion

`assets/motion.css` contains optional ink, writing, seal, lantern, and entrance animations. Prefer static UI by default and add motion only when it reinforces meaning. Reduced-motion overrides are included.

## Snippets

Reusable markup lives in `assets/snippets/`:

- `page-shell.html`: standalone page shell using `{asset_base}`
- `navbar.html`: semantic navigation links
- `hero-section.html`: hero structure
- `btn-seal.html`: button variants
- `card-scroll.html`: editorial card
- `divider-ink.html`: divider variants
- `frame-window.html`: framed content
- `stamp.html`: stamp variants
- `iconic-components.html`: larger decorative structures

Replace every placeholder, link destination, image path, label, and alternative text before delivery.
