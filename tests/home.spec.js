const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

test.beforeEach(async ({ page }) => {
  const homePage = pathToFileURL(path.resolve('public/index.html')).href;
  await page.goto(homePage);
});

test('muestra la pantalla de bienvenida', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Bienvenido a nuestro sistema de autoservicio' })).toBeVisible();
  await expect(page.getByLabel('Ingrese su nombre')).toBeVisible();
});

test('valida que se ingrese un nombre', async ({ page }) => {
  const dialogPromise = page.waitForEvent('dialog').then(async (dialog) => {
    expect(dialog.message()).toBe('Ingrese un nombre por favor.');
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await dialogPromise;
});

test('continua al catálogo con el nombre ingresado', async ({ page }) => {
  await page.getByLabel('Ingrese su nombre').fill('Ada');
  await page.getByRole('button', { name: 'Aceptar' }).click();

  await expect(page).toHaveURL(/public\/html\/productos\.html$/);
});