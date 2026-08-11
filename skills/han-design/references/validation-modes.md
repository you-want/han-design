# Validation modes

Han page work has two delivery modes. Use `fast` unless the user explicitly requests strict review or the change affects shared behavior.

## Fast mode

Fast mode is the default for creating or restyling a single page.

1. Inspect the minimum relevant context and infer the brief.
2. Reuse the closest shell or page archetype, then build the complete page and compile an intent contract when explicit visual constraints are measurable.
3. Run the current page's fast check once.
4. Fix blocking errors, rerun the failed check, then deliver the usable page immediately.

Run:

```bash
npm run check:page -- path/to/page.html
```

Fast mode checks the current page only. It includes semantic structure, asset references, mobile overflow, Axe serious or critical violations, keyboard focus, runtime errors, and intent hard constraints. It does not run the repository-wide browser suite, require desktop screenshots, or force a visual revision when no actionable problem is visible. A passing fast check ends the default delivery loop; extra screenshots, full example validation, and broad regression checks are opt-in or strict-mode work.

## Strict mode

Use strict mode when:

- the user asks for strict review, formal acceptance, production release, or desktop and mobile comparison;
- shared Han CSS, starters, components, validation scripts, or interaction behavior changed;
- the page contains complex forms, menus, dialogs, stateful widgets, or culturally sensitive material;
- fast mode exposes a problem that needs broader regression coverage.

Run:

```bash
npm run check:page:strict -- path/to/page.html
```

Strict automated checks add desktop coverage, reduced-motion verification, warning-as-failure behavior, repository validation, example registry validation when applicable, and the full Playwright regression suite. The Agent must also review desktop and mobile renders, compare the result with the brief, and revise only when the review identifies an actionable issue.

## Mode selection rules

- Do not silently upgrade an ordinary single-page request to strict mode.
- Do not block the first usable result on repository-wide tests.
- Do not claim strict visual review from automated checks alone.
- A user can request strict mode at any time after receiving the fast result.
- When shared files change during page work, finish the page quickly, then run strict mode before final delivery.

## Delivery note

State the selected mode and the checks completed:

```text
Validation mode: fast | strict
Page checks:
Intent checks:
Visual review:
Remaining manual checks:
```
