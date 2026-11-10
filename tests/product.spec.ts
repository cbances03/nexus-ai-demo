import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/caracteristicas",
  "/herramientas",
  "/precios",
  "/dashboard",
];
async function openHistory(page: Page) {
  const toggle = page.getByRole("button", { name: "Historial", exact: true });
  if (await toggle.isVisible()) await toggle.click();
}
for (const route of routes) {
  test(`ruta ${route}: carga, accesibilidad y ancho`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    const broken: string[] = [];
    page.on("response", (r) => {
      if (r.status() >= 400) broken.push(`${r.status()} ${r.url()}`);
    });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
    expect(broken).toEqual([]);
  });
}
test("navegación completa y menú por teclado", async ({ page }) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: /^(Abrir|Cerrar) menú$/ });
  if (await menu.isVisible()) {
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await menu.click();
    await page
      .getByRole("navigation", { name: "Navegación móvil" })
      .getByRole("link", { name: "Características" })
      .click();
  } else
    await page
      .getByRole("navigation", { name: "Navegación principal" })
      .getByRole("link", { name: "Características" })
      .click();
  await expect(page).toHaveURL(/caracteristicas/);
  await page
    .getByRole("navigation", { name: "Navegación del pie" })
    .getByRole("link", { name: "Herramientas" })
    .click();
  await expect(page).toHaveURL(/herramientas/);
  await page.getByRole("link", { name: "Abrir Prism" }).click();
  await expect(page).toHaveURL(/dashboard\?tool=prism/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Encuentra las palabras.",
  );
});
test("catálogo: filtros combinados y estado vacío", async ({ page }) => {
  await page.goto("/herramientas");
  await page.getByRole("button", { name: "Escritura", exact: true }).click();
  await expect(page.locator(".catalog-card")).toHaveCount(1);
  await expect(page.locator(".catalog-card")).toContainText("Prism");
  await page.getByLabel("Buscar herramientas").fill("atlas");
  await expect(page.locator(".catalog-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Restablecer búsqueda" }).click();
  await expect(page.locator(".catalog-card")).toHaveCount(4);
  await page.getByLabel("Buscar herramientas").fill("síntesis inexistente");
  await page.getByRole("button", { name: "Limpiar búsqueda" }).click();
  await expect(page.locator(".catalog-card")).toHaveCount(4);
});
test("precios: periodicidad, comparación, formulario y foco", async ({
  page,
}) => {
  await page.goto("/precios");
  await expect(page.locator(".plan-price strong")).toHaveText([
    "0",
    "19",
    "49",
  ]);
  await page.getByRole("button", { name: /Anual/ }).click();
  await expect(page.locator(".plan-price strong")).toHaveText([
    "0",
    "15",
    "39",
  ]);
  await expect(page.locator(".billing-detail").nth(1)).toContainText("180");
  await page.getByLabel("Destacar plan").selectOption("Studio");
  await expect(page.locator("thead .highlight-column")).toHaveText("Studio");
  await page.getByRole("button", { name: "Me interesa Creator" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Me interesa Creator" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Me interesa Creator" }).click();
  await page.getByRole("button", { name: "Simular interés" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText("nombre");
  await page.getByLabel("Nombre", { exact: true }).fill("Claudio");
  await page.getByLabel("Correo electrónico").fill("correo-invalido");
  await page.getByRole("button", { name: "Simular interés" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "correo electrónico válido",
  );
  const outgoing: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") outgoing.push(r.url());
  });
  await page.getByLabel("Correo electrónico").fill("demo@example.com");
  await page.getByRole("button", { name: "Simular interés" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText(
    "No se han enviado ni guardado",
  );
  expect(outgoing).toEqual([]);
});
test("chat: validación, respuesta, persistencia y eliminación", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await openHistory(page);
  await page
    .getByRole("button", { name: "Nueva conversación", exact: true })
    .click();
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "Escribe una idea",
  );
  await page
    .getByRole("textbox", { name: /Tu mensaje/ })
    .fill("Organizar un taller de diseño inclusivo");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(page.locator(".message.assistant")).toHaveCount(1);
  await expect(page.locator(".message.assistant")).toContainText(
    "Organizar un taller",
  );
  await page.reload();
  await expect(page.locator(".message.user")).toContainText(
    "taller de diseño inclusivo",
  );
  await openHistory(page);
  await page
    .getByRole("button", {
      name: "Eliminar Organizar un taller de diseño inclusivo",
    })
    .click();
  await page.getByRole("button", { name: "Cancelar", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page
    .getByRole("button", {
      name: "Eliminar Organizar un taller de diseño inclusivo",
    })
    .click();
  await page.getByRole("button", { name: "Confirmar eliminación" }).click();
  await expect(
    page.getByRole("button", {
      name: "Eliminar Organizar un taller de diseño inclusivo",
    }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Borrar todo el historial" }).click();
  await page.getByRole("button", { name: "Confirmar eliminación" }).click();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Planifica con claridad.",
  );
});
for (const tool of [
  { id: "atlas", output: "PLAN INICIAL" },
  { id: "prism", output: "BORRADOR ESTRUCTURADO" },
  { id: "vector", output: "EXTRACCIÓN DE TEXTO" },
  { id: "code", output: "CHECKLIST FRONTEND" },
])
  test(`herramienta ${tool.id}: lógica local y ejemplo editable`, async ({
    page,
  }) => {
    await page.goto(`/dashboard?tool=${tool.id}`);
    await page.locator(".starter-prompts button").click();
    await expect(
      page.getByRole("textbox", { name: /Tu mensaje/ }),
    ).not.toHaveValue("");
    await page
      .getByRole("textbox", { name: /Tu mensaje/ })
      .fill("Primera frase. Segunda frase. Tercera frase. Cuarta frase.");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();
    await expect(page.locator(".message.assistant")).toContainText(tool.output);
    if (tool.id === "vector") {
      await expect(page.locator(".message.assistant")).toContainText(
        "8 palabras",
      );
      await expect(page.locator(".message.assistant")).not.toContainText(
        "Cuarta frase",
      );
    }
  });
test("almacenamiento corrupto: aviso y recuperación", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("nexus.workspace.v1", '{"conversations":false}'),
  );
  await page.goto("/dashboard");
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "historial guardado no es válido",
  );
  await openHistory(page);
  await page
    .getByRole("button", { name: "Nueva conversación", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: /Tu mensaje/ })
    .fill("Recuperar una idea");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(page.locator(".message.assistant")).toHaveCount(1);
  await expect(page.locator("main").getByRole("alert")).toHaveCount(0);
});
test("almacenamiento bloqueado: conversación temporal funcional", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
  });
  await page.goto("/dashboard?tool=vector");
  await page
    .getByRole("textbox", { name: /Tu mensaje/ })
    .fill("Una idea local.");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(page.locator(".message.assistant")).toContainText("EXTRACCIÓN");
  await expect(page.getByRole("status")).toContainText("solo en esta pestaña");
  await openHistory(page);
  await page.getByRole("button", { name: "Borrar todo el historial" }).click();
  await page.getByRole("button", { name: "Confirmar eliminación" }).click();
  await expect(page.getByRole("status")).toContainText(
    "solo se aplica en esta pestaña",
  );
});
test("tamaños intermedios y movimiento reducido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} a ${width}px`,
      ).toBe(true);
    }
  }
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});
test("ruta desconocida devuelve 404 y permite volver", async ({ page }) => {
  const response = await page.goto("/pagina-inexistente");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Volver al inicio" }).click();
  await expect(page).toHaveURL(/\/$/);
});
test("captura visual de landing y workspace", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath("landing.png"),
    fullPage: true,
    animations: "disabled",
  });
  await page.goto("/dashboard?tool=atlas");
  await page.screenshot({
    path: testInfo.outputPath("workspace.png"),
    fullPage: true,
    animations: "disabled",
  });
});
