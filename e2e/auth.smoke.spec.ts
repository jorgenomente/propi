import { expect, test } from '@playwright/test';

test('redirects unauthenticated users to login', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/login$/);
  await expect(
    page.getByRole('heading', { name: 'Bienvenido de nuevo' }),
  ).toBeVisible();
});

test('user can sign up, sign out and sign back in', async ({ page }) => {
  const stamp = Date.now();
  const email = `propi-auth-${stamp}@example.com`;
  const password = 'prueba123';

  await page.goto('/register');
  await page.getByLabel('Correo electronico').fill(email);
  await page.getByLabel('Contrasena').fill(password);
  await page.getByRole('button', { name: 'Crear cuenta' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText(`Sesion activa: ${email}`)).toBeVisible();

  await page.getByRole('button', { name: 'Cerrar sesion' }).click();
  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel('Correo electronico').fill(email);
  await page.getByLabel('Contrasena').fill(password);
  await page.getByRole('button', { name: 'Iniciar sesion' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText(`Sesion activa: ${email}`)).toBeVisible();
});
