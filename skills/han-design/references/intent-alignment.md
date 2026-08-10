# Intent alignment

Use this reference when the user gives qualitative visual direction such as quiet, restrained, clear, warm, lively, dramatic, or explicitly asks to avoid a visual behavior.

## Three-layer model

Keep three layers separate:

1. The natural-language design brief records the audience, product task, interpretation, and desired experience.
2. The intent contract converts only explicit, measurable requirements into hard constraints.
3. The rendered review compares the brief with the desktop and mobile result, including soft qualities that cannot be reduced to stable browser metrics.

Hard constraints are guardrails, not a complete design specification. Do not use them to prescribe exact colors, typography, component counts, or page composition unless the user explicitly requested those details.

## Intent contract v1

Use this shape:

```json
{
  "version": 1,
  "sourcePrompt": "original user request",
  "brief": "one-line internal design brief",
  "intent": {
    "keywords": ["quiet"],
    "confidence": "high",
    "rationale": "The user explicitly requested a quiet direction."
  },
  "interpretation": {
    "intensity": 1,
    "mode": "contemporary-chinese-inspired"
  },
  "constraints": {
    "hard": [],
    "soft": []
  }
}
```

Create no more than five hard constraints. Each hard constraint must include `id`, `metric`, `operator`, `value`, and a short `reason`. Supported operators are `eq`, `lte`, `gte`, and `in`.

## Quiet and restrained direction

When the user explicitly says 安静、克制、低调、清透, or uses an equivalent phrase with high confidence:

- use the canonical intent keyword `quiet`;
- cap visual intensity at `1`, unless a conflicting product requirement is stated and explained;
- use no more than one brand or decorative accent family;
- default entry and scroll-reveal animations to zero;
- keep hover, focus, loading, disclosure, and state feedback when they serve usability;
- treat one primary first-screen focal point, restrained ornament, and readable rhythm as soft review criteria.

Recommended hard constraints:

```json
[
  {
    "id": "intensity-cap",
    "metric": "visualIntensity",
    "operator": "lte",
    "value": 1,
    "reason": "Quiet direction should not become expressive or theatrical."
  },
  {
    "id": "accent-family-cap",
    "metric": "accentColorFamilies",
    "operator": "lte",
    "value": 1,
    "reason": "Avoid multiple decorative accents competing for attention."
  },
  {
    "id": "entry-motion-default-off",
    "metric": "entryAnimations",
    "operator": "eq",
    "value": 0,
    "reason": "Quiet direction defaults to no entry or scroll-reveal animation."
  }
]
```

## Browser evidence

Expose machine-checkable evidence in the rendered document:

- Keep `data-han-intensity="0|1|2|3"` on the root element.
- Declare brand or decorative accent families with `data-han-accent-families="family-name"` on the root element. Separate multiple families with commas or spaces. An empty attribute explicitly declares zero accent families.
- Alternatively, mark individual accent elements with `data-han-accent-family="family-name"`.
- Do not label neutral surfaces or semantic success, warning, and error colors as brand accent families.
- Mark intentional entry or scroll-reveal elements with `data-han-entry-animation` so the browser checker can count them even before they start.

Run:

```bash
node skills/han-design/scripts/check-browser-output.mjs \
  --contract path/to/intent-contract.json \
  --report path/to/intent-report.json \
  --strict path/to/output.html
```

The checker evaluates the hard constraints. A passing browser report does not replace the brief-to-result visual review.

## Brief-to-result review

After rendering desktop and mobile views, compare the result with the brief:

- Does one element clearly receive attention first?
- Does decoration reinforce the product task instead of becoming a second narrative?
- Does motion remain limited to useful interaction and state feedback?
- Does lowering visual intensity preserve the primary action and content hierarchy?
- Does the result contradict any explicit avoid or do-not instruction?

Record a short `briefAlignmentNote` describing the evidence and any revision made. If a hard constraint fails, revise and rerun rather than explaining the failure away.
