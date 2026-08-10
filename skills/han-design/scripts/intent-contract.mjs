const SUPPORTED_OPERATORS = new Set(["eq", "lte", "gte", "in"]);

export function validateIntentContract(contract) {
  const errors = [];
  if (!contract || typeof contract !== "object") {
    return ["intent contract must be an object"];
  }
  if (contract.version !== 1) errors.push("intent contract version must be 1");
  if (typeof contract.sourcePrompt !== "string" || !contract.sourcePrompt.trim()) {
    errors.push("intent contract requires a non-empty sourcePrompt");
  }
  if (typeof contract.brief !== "string" || !contract.brief.trim()) {
    errors.push("intent contract requires a non-empty brief");
  }
  if (!contract.intent || typeof contract.intent !== "object") {
    errors.push("intent contract requires intent metadata");
  } else {
    if (
      !Array.isArray(contract.intent.keywords) ||
      contract.intent.keywords.some((keyword) => typeof keyword !== "string" || !keyword.trim())
    ) {
      errors.push("intent.keywords must be an array of non-empty strings");
    }
    if (!["high", "medium", "low"].includes(contract.intent.confidence)) {
      errors.push("intent.confidence must be high, medium, or low");
    }
    if (typeof contract.intent.rationale !== "string" || !contract.intent.rationale.trim()) {
      errors.push("intent.rationale must be a non-empty string");
    }
  }
  if (!contract.interpretation || typeof contract.interpretation !== "object") {
    errors.push("intent contract requires interpretation metadata");
  } else {
    const intensity = contract.interpretation.intensity;
    if (!Number.isInteger(intensity) || intensity < 0 || intensity > 3) {
      errors.push("interpretation.intensity must be an integer from 0 to 3");
    }
    if (typeof contract.interpretation.mode !== "string" || !contract.interpretation.mode.trim()) {
      errors.push("interpretation.mode must be a non-empty string");
    }
  }

  const hardConstraints = contract.constraints?.hard;
  if (!Array.isArray(hardConstraints)) {
    errors.push("intent contract requires constraints.hard as an array");
  } else {
    const ids = new Set();
    for (const constraint of hardConstraints) {
      if (!constraint || typeof constraint !== "object") {
        errors.push("each hard constraint must be an object");
        continue;
      }
      if (typeof constraint.id !== "string" || !constraint.id.trim()) {
        errors.push("each hard constraint requires a non-empty id");
      } else if (ids.has(constraint.id)) {
        errors.push(`duplicate hard constraint id: ${constraint.id}`);
      } else {
        ids.add(constraint.id);
      }
      if (typeof constraint.metric !== "string" || !constraint.metric.trim()) {
        errors.push("each hard constraint requires a metric");
      }
      if (!SUPPORTED_OPERATORS.has(constraint.operator)) {
        errors.push(`unsupported hard constraint operator: ${constraint.operator ?? "null"}`);
      }
      if (
        ["lte", "gte"].includes(constraint.operator) &&
        typeof constraint.value !== "number"
      ) {
        errors.push(`${constraint.operator} constraint ${constraint.id ?? "unknown"} requires a number value`);
      }
      if (constraint.operator === "in" && !Array.isArray(constraint.value)) {
        errors.push(`in constraint ${constraint.id ?? "unknown"} requires an array value`);
      }
      if (typeof constraint.reason !== "string" || !constraint.reason.trim()) {
        errors.push(`hard constraint ${constraint.id ?? "unknown"} requires a non-empty reason`);
      }
    }
    if (hardConstraints.length > 5) errors.push("intent contract allows at most 5 hard constraints");
  }

  if (
    contract.constraints?.soft !== undefined &&
    (!Array.isArray(contract.constraints.soft) ||
      contract.constraints.soft.some((item) => typeof item !== "string" || !item.trim()))
  ) {
    errors.push("constraints.soft must be an array of non-empty strings when provided");
  }
  return errors;
}

export function evaluateConstraint(actual, constraint) {
  switch (constraint.operator) {
    case "eq":
      return actual === constraint.value;
    case "lte":
      return typeof actual === "number" && actual <= constraint.value;
    case "gte":
      return typeof actual === "number" && actual >= constraint.value;
    case "in":
      return Array.isArray(constraint.value) && constraint.value.includes(actual);
    default:
      return false;
  }
}

export function evaluateHardConstraints(contract, actualMetrics) {
  const validationErrors = validateIntentContract(contract);
  if (validationErrors.length > 0) {
    return {
      passed: false,
      validationErrors,
      results: [],
      violations: validationErrors.map((message) => ({ id: "contract", message })),
    };
  }

  const results = contract.constraints.hard.map((constraint) => {
    const actual = actualMetrics[constraint.metric];
    const passed = evaluateConstraint(actual, constraint);
    return {
      id: constraint.id,
      metric: constraint.metric,
      operator: constraint.operator,
      expected: constraint.value,
      actual: actual ?? null,
      passed,
      reason: constraint.reason ?? null,
    };
  });

  return {
    passed: results.every((result) => result.passed),
    validationErrors: [],
    results,
    violations: results
      .filter((result) => !result.passed)
      .map((result) => ({
        id: result.id,
        metric: result.metric,
        expected: result.expected,
        actual: result.actual,
        reason: result.reason,
      })),
  };
}
