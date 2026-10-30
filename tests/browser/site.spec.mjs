import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
const pages = [
  "/",
  "/universo/",
  "/bitacora/",
  "/roadmap/",
  "/wiki/",
  "/banda-sonora/",
  "/comunidad/",
  "/contacto/",
  "/prensa/",
];
async function revealForCapture(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 650) {
      scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 35));
    }
    scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(900);
}
test("Desktop pages load images, have one heading and no horizontal overflow", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await fs.mkdir("build/review", { recursive: true });
  for (const route of pages) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    const broken = await page
      .locator("main img")
      .evaluateAll((images) =>
        images
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.src),
      );
    expect(broken).toEqual([]);
    await revealForCapture(page);
    await page.screenshot({
      path: `build/review/desktop-${route.replaceAll("/", "") || "inicio"}.png`,
      fullPage: true,
    });
  }
  expect(errors).toEqual([]);
});
test("Mobile menu, layouts and navigation remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of pages) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await revealForCapture(page);
    await page.screenshot({
      path: `build/review/mobile-${route.replaceAll("/", "") || "inicio"}.png`,
      fullPage: true,
    });
  }
  await page.getByRole("button", { name: "Abrir navegación" }).click();
  await expect(page.locator("#main-nav")).toBeVisible();
  await page
    .locator("#main-nav")
    .getByRole("link", { name: "Wiki", exact: true })
    .click();
  await expect(page).toHaveURL(/\/wiki\/$/);
});
test("Wiki searches accents, filters categories and reports zero results", async ({
  page,
}) => {
  await page.goto("/wiki/");
  await page.getByRole("searchbox").fill("nucleo");
  await expect(page.locator(".wiki-row:visible")).toHaveCount(2);
  await page.getByRole("link", { name: /Núcleo y construcción/ }).click();
  await expect(page.locator("h1")).toHaveText("Núcleo y construcción");
  await page.goto("/wiki/");
  await page.getByRole("button", { name: "Jefes", exact: true }).click();
  await expect(page.locator(".wiki-row:visible")).toHaveCount(5);
  await page.getByRole("searchbox").fill("imposiblexyz");
  await expect(page.locator(".empty-results")).toBeVisible();
});
test("Soundtrack is opt-in, plays and pauses, and retains selection without autoplay", async ({
  page,
}) => {
  await page.goto("/banda-sonora/");
  expect(await page.locator("audio").evaluate((a) => a.paused)).toBeTruthy();
  await page.locator('.track[data-track="menu"]').click();
  await expect(page.locator(".mini-title")).toHaveText("Dusk Beacon");
  await expect
    .poll(() => page.locator("audio").evaluate((a) => a.currentTime))
    .toBeGreaterThan(0);
  await page.locator("#audio-volume").focus();
  await page.keyboard.press("Home");
  expect(await page.locator("audio").evaluate((a) => a.volume)).toBe(0);
  await page.locator("[data-audio-next]").click();
  await expect(page.locator(".mini-title")).toHaveText("Colony Dawn");
  await page.locator("[data-audio-prev]").click();
  await expect(page.locator(".mini-title")).toHaveText("Dusk Beacon");
  await page
    .getByRole("button", { name: "Pausar música", exact: true })
    .click();
  expect(await page.locator("audio").evaluate((a) => a.paused)).toBeTruthy();
  await page
    .locator("#main-nav")
    .getByRole("link", { name: "Wiki", exact: true })
    .click();
  await expect(page.locator(".mini-title")).toHaveText("Dusk Beacon");
  expect(await page.locator("audio").evaluate((a) => a.paused)).toBeTruthy();
  expect(await page.locator("audio").evaluate((a) => a.volume)).toBe(0);
});
test("Gallery and teaser dialogs open, focus and close with Escape", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Ampliar captura de la colonia" })
    .click();
  await expect(page.locator("#gallery-dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#gallery-dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Ver teaser" }).click();
  await expect(page.locator("#trailer-dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#trailer-dialog")).not.toBeVisible();
  await expect
    .poll(() => page.locator("video").evaluate((v) => v.paused))
    .toBeTruthy();
});
test("Reduced motion, keyboard skip and unknown routes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
  expect(
    await page
      .locator(".hero-art img")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  const response = await page.goto("/via-inexistente/");
  expect(response.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("señal");
});
