# Output evaluation

Use this rubric after completing a substantial Han task. Fix hard failures before scoring.

## Hard failures

Reject or revise the output when any item applies:

- unresolved placeholders, missing assets, broken links, or nonexistent Han classes;
- no clear main heading, navigation structure, labels, image alternatives, or mobile layout;
- keyboard-inaccessible controls, hidden focus, or a static showcase state presented as working interaction;
- decorative accent colors used for text without sufficient contrast;
- invented cultural provenance, pseudo-characters, false historical certainty, or an entire dynasty reduced to one definitive style;
- sacred, funerary, rank-specific, ethnic, regional, or living-tradition material used without necessary context;
- the design solves “look Chinese” but fails the user's actual product task.
- the rendered result contradicts an explicit user visual direction or avoid instruction without a documented product reason.

## Scoring rubric

Score each category, then revise any category below half marks.

| Category | Points | Questions |
|---|---:|---|
| User task | 20 | Is the primary user action obvious? Is the real content present and editable? |
| Cultural context | 20 | Is the interpretation mode clear? Are claims scoped and sourced when needed? |
| Information design | 15 | Are hierarchy, density, reading order, and responsive behavior appropriate? |
| Accessibility | 20 | Do semantics, keyboard use, focus, contrast, labels, motion, and alternatives work? |
| Visual coherence | 15 | Is there one primary theme, restrained ornament, and consistent token use? |
| Asset integrity | 10 | Do paths resolve? Are placeholders removed? Are only existing classes and tokens used? |

Interpretation:

- 90–100: ready for delivery after normal project checks.
- 75–89: good direction; fix the weakest category.
- 60–74: visually plausible but not yet dependable.
- Below 60: redesign the brief or implementation rather than adding more decoration.

## Anti-pattern checks

- More Han classes do not imply a better result.
- More motifs do not imply greater cultural accuracy.
- A visually minimal page is not automatically “Song.”
- Red and gold are not automatically festive, imperial, or appropriate.
- A Kai-style font with wide spacing is not automatically calligraphy.
- A red square containing text is not automatically traditional seal engraving.
- A complete screenshot is not proof of working interaction.

## Mode-specific evidence

Fast mode should report the target-page static check, mobile browser check, intent constraints when present, and any known manual checks. It does not require a desktop screenshot or a forced revision.

Strict mode should include evidence from [visual-review.md](visual-review.md):

- a desktop render was reviewed;
- a mobile render was reviewed;
- any actionable issue found after rendering was revised and checked again;
- the weakest craft areas were identified when a revision was needed;
- the selected theme and visual intensity are stated.
- any intent contract hard constraints were checked, and the rendered result was compared with the brief.

If no browser or screenshot capability is available, say so explicitly and perform the strongest static review available instead of claiming visual verification.

## Delivery note

Summarize these decisions when they materially affect the result:

```text
Primary task:
Interpretation mode:
Primary theme and visual intensity:
Cultural references used:
Modern adaptations:
Desktop and mobile reviewed:
Revision made after rendering:
Accessibility checks:
Intent checks and brief alignment:
Known limitations or specialist review needed:
```
