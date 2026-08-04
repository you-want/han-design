import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

test("scoped entry isolates host styles and exposes Han utilities", async ({ page }) => {
  await page.goto("/tests/fixtures/scoped-host.html");

  const isolation = await page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const hostTheme = getComputedStyle(document.querySelector("#host-theme"));
    const hanZone = getComputedStyle(document.querySelector("#han-zone"));
    const hostButton = getComputedStyle(document.querySelector(".host-button"));
    const container = getComputedStyle(document.querySelector(".han-container"));
    return {
      rootToken: rootStyle.getPropertyValue("--han-space-4").trim(),
      hostThemeToken: hostTheme.getPropertyValue("--han-color-bg").trim(),
      hanThemeToken: hanZone.getPropertyValue("--han-color-bg").trim(),
      bodyMargin: getComputedStyle(document.body).margin,
      hostBackground: hostButton.backgroundColor,
      hostBorderWidth: hostButton.borderTopWidth,
      containerPadding: container.paddingLeft,
    };
  });

  expect(isolation.rootToken).toBe("");
  expect(isolation.hostThemeToken).toBe("");
  expect(isolation.hanThemeToken).not.toBe("");
  expect(isolation.bodyMargin).toBe("17px");
  expect(isolation.hostBackground).toBe("rgb(91, 33, 182)");
  expect(isolation.hostBorderWidth).toBe("5px");
  expect(isolation.containerPadding).not.toBe("0px");
});

test("scoped focus and reduced-motion rules stay inside the Han zone", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/tests/fixtures/scoped-host.html");

  await page.locator(".han-btn-seal").focus();
  const hanFocus = await page.locator(".han-btn-seal").evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, duration: style.transitionDuration };
  });
  const hostMotion = await page.locator(".host-button").evaluate((element) => getComputedStyle(element).transitionDuration);

  expect(hanFocus.outlineStyle).not.toBe("none");
  expect(hanFocus.outlineWidth).not.toBe("0px");
  expect(Number.parseFloat(hanFocus.duration)).toBeLessThanOrEqual(0.00001);
  expect(hostMotion).toBe("0s");
});

test("core scoped fixture has no serious axe violations", async ({ page }) => {
  await page.goto("/tests/fixtures/scoped-host.html");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact))).toEqual([]);
});

test("contemporary palette themes preserve source swatches and accessible controls", async ({ page }) => {
  await page.goto("/tests/fixtures/contemporary-palettes.html");
  const expected = {
    "pine-wheat": ["#4D5B44", "#758B5D", "#A5BA8F", "#E9E2B4"],
    "plum-blush": ["#715480", "#B487B0", "#D7C2AD", "#F0D8EE"],
    "ocean-orchid": ["#2C5767", "#6487A3", "#BBA4B6", "#C1CFDA"],
    "caramel-cream": ["#8D6037", "#EBB5B5", "#E8D2BA", "#724526"],
    "mint-lavender": ["#4A7D6A", "#A8CCB0", "#D9EEE5", "#EBDCF3"],
    "berry-butter": ["#D11946", "#DE6052", "#F8969E", "#ECE6B9"],
  };

  for (const [theme, swatches] of Object.entries(expected)) {
    await page.locator("html").evaluate((element, name) => element.setAttribute("data-theme", name), theme);
    const tokens = await page.locator("html").evaluate((element) => {
      const style = getComputedStyle(element);
      return [
        style.getPropertyValue("--han-palette-1").trim(),
        style.getPropertyValue("--han-palette-2").trim(),
        style.getPropertyValue("--han-palette-3").trim(),
        style.getPropertyValue("--han-palette-4").trim(),
        style.getPropertyValue("--han-color-accent-text").trim(),
        style.getPropertyValue("--han-color-accent-control").trim(),
        style.getPropertyValue("--han-focus-ring").trim(),
      ];
    });
    expect(tokens.slice(0, 4)).toEqual(swatches);
    expect(tokens.slice(4).every(Boolean)).toBe(true);

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact))).toEqual([]);
  }
});

test("navbar snippet supports toggle, Escape, and focus return", async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 800 });
  const snippet = fs.readFileSync(
    path.join(root, "skills", "han-design", "assets", "snippets", "navbar.html"),
    "utf8",
  );
  const replacements = {
    navigation_label: "Primary",
    home_url: "/",
    brand: "Han",
    accent_char: "汉",
    nav_id: "primary-menu",
    active_url: "/current",
    active_item: "Current",
    item2_url: "/archive",
    item2: "Archive",
    item3_url: "/about",
    item3: "About",
  };
  const source = Object.entries(replacements).reduce(
    (source, [key, value]) => source.replaceAll(`{${key}}`, value),
    snippet,
  );
  const script = source.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";
  const navbar = source.replace(/<script>[\s\S]*?<\/script>/, "");
  await page.setContent(`<!doctype html><html lang="en" data-theme="song"><head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Navbar behavior</title>
    <link rel="stylesheet" href="http://127.0.0.1:4173/skills/han-design/assets/han.css">
    </head><body><main><h1>Navigation</h1>${navbar}</main></body></html>`);
  await page.addScriptTag({ content: script });

  const toggle = page.locator(".han-navbar__toggle");
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact))).toEqual([]);
});
