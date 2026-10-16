# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.js >> muestra la pantalla de bienvenida
- Location: tests/home.spec.js:10:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByLabel('Ingrese su nombre')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByLabel('Ingrese su nombre') with timeout 5000ms
  - waiting for getByLabel('Ingrese su nombre')

```

```yaml
- img
- heading "Bienvenido a nuestro sistema de autoservicio" [level=2]
- text: Ingrese sus nombres
- textbox "Ingrese sus nombres"
- button "Aceptar"
- button "¿Eres Admin?"
- button "🌙"
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const path = require('node:path');
  3  | const { pathToFileURL } = require('node:url');
  4  | 
  5  | test.beforeEach(async ({ page }) => {
  6  |   const homePage = pathToFileURL(path.resolve('public/index.html')).href;
  7  |   await page.goto(homePage);
  8  | });
  9  | 
  10 | test('muestra la pantalla de bienvenida', async ({ page }) => {
  11 |   await expect(page.getByRole('heading', { name: 'Bienvenido a nuestro sistema de autoservicio' })).toBeVisible();
> 12 |   await expect(page.getByLabel('Ingrese su nombre')).toBeVisible();
     |                                                      ^ Error: expect(locator).toBeVisible() failed
  13 | });
  14 | 
  15 | test('valida que se ingrese un nombre', async ({ page }) => {
  16 |   const dialogPromise = page.waitForEvent('dialog').then(async (dialog) => {
  17 |     expect(dialog.message()).toBe('Ingrese un nombre por favor.');
  18 |     await dialog.accept();
  19 |   });
  20 |   await page.getByRole('button', { name: 'Aceptar' }).click();
  21 |   await dialogPromise;
  22 | });
  23 | 
  24 | test('continua al catálogo con el nombre ingresado', async ({ page }) => {
  25 |   await page.getByLabel('Ingrese su nombre').fill('Ada');
  26 |   await page.getByRole('button', { name: 'Aceptar' }).click();
  27 | 
  28 |   await expect(page).toHaveURL(/public\/html\/productos\.html$/);
  29 | });
```