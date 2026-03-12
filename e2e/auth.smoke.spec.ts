import { expect, test } from '@playwright/test';

test('redirects unauthenticated users to login', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/login$/);
  await expect(
    page.getByRole('heading', { name: 'Bienvenido de nuevo' }),
  ).toBeVisible();
});

test('login shows a friendly error for invalid credentials', async ({
  page,
}) => {
  await page.goto('/login');

  await page.getByLabel('Correo electronico').fill('nadie@example.com');
  await page.getByLabel('Contrasena').fill('incorrecta');
  await page.getByRole('button', { name: 'Iniciar sesion' }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(
    page
      .getByRole('alert')
      .filter({ hasText: 'Correo o contraseña incorrectos.' }),
  ).toBeVisible();
});

test('user can sign up, create a tip, sign out and sign back in', async ({
  page,
}) => {
  const stamp = Date.now();
  const email = `propi-auth-${stamp}@example.com`;
  const password = 'prueba123';

  await page.goto('/register');
  await page.getByLabel('Correo electronico').fill(email);
  await page.getByLabel('Contrasena').fill(password);
  await page.getByRole('button', { name: 'Crear cuenta' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText(`Sesion activa: ${email}`)).toBeVisible();
  await expect(page.getByText('US$ 0,00')).toHaveCount(3);

  await page.getByRole('link', { name: 'Registrar propina' }).click();
  await expect(page).toHaveURL(/\/add$/);
  await page.getByLabel('Monto').fill('0');
  await page.getByRole('button', { name: 'Guardar propina' }).click();

  await expect(page).toHaveURL(/\/add$/);
  await expect(
    page.getByRole('alert').filter({ hasText: 'Ingresa un monto mayor a 0.' }),
  ).toBeVisible();

  await page.getByLabel('Monto').fill('20');
  await page.getByRole('button', { name: 'Guardar propina' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText('US$ 20,00')).toHaveCount(4);

  await page.getByRole('link', { name: 'Historial', exact: true }).click();
  await expect(page).toHaveURL(/\/history$/);
  await expect(page.getByText('US$ 20,00')).toBeVisible();

  await page.getByRole('button', { name: 'Cerrar sesion' }).click();
  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel('Correo electronico').fill(email);
  await page.getByLabel('Contrasena').fill(password);
  await page.getByRole('button', { name: 'Iniciar sesion' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText(`Sesion activa: ${email}`)).toBeVisible();
  await expect(page.getByText('US$ 20,00')).toHaveCount(4);
});
