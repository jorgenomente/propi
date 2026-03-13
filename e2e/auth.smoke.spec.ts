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
  const formatDateInput = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
      date.getDate(),
    ).padStart(2, '0')}`;

  const stamp = Date.now();
  const email = `propi-auth-${stamp}@example.com`;
  const password = 'prueba123';
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayIso = formatDateInput(yesterday);

  await page.goto('/register');
  await page.getByLabel('Correo electronico').fill(email);
  await page.getByLabel('Contrasena').fill(password);
  await page.getByRole('button', { name: 'Crear cuenta' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText(`Sesion activa: ${email}`)).toBeVisible();
  await expect(page.getByText('$0,00')).toHaveCount(3);
  await expect(
    page.getByRole('link', { name: 'Agregar propina' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Estadisticas' })).toBeVisible();

  await page.getByRole('link', { name: 'Registrar propina' }).click();
  await expect(page).toHaveURL(/\/add$/);
  await page.getByLabel('Monto').fill('0');
  await page.getByRole('button', { name: 'Guardar propina' }).click();

  await expect(page).toHaveURL(/\/add$/);
  await expect(
    page.getByRole('alert').filter({ hasText: 'Ingresa un monto mayor a 0.' }),
  ).toBeVisible();

  await page.getByLabel('Monto').fill('20');
  await page.getByLabel('Fecha de la propina').fill(yesterdayIso);
  await page.getByRole('button', { name: 'Guardar propina' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(
    page
      .locator('article')
      .filter({ hasText: 'Propinas de hoy' })
      .getByText('$0,00'),
  ).toBeVisible();
  await expect(
    page
      .locator('article')
      .filter({ hasText: 'Propinas esta semana' })
      .getByText('$20,00'),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Historial', exact: true }).click();
  await expect(page).toHaveURL(/\/history$/);
  await expect(page.getByText('$20,00')).toBeVisible();
  await page.getByRole('link', { name: 'Editar' }).click();
  await expect(page).toHaveURL(/\/edit\//);
  await page.getByLabel('Monto').fill('35');
  await page.getByRole('button', { name: 'Guardar cambios' }).click();

  await expect(page).toHaveURL(/\/history$/);
  await expect(page.getByText('$35,00')).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Agregar propina' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Estadisticas' }).click();

  await expect(page).toHaveURL(/\/stats/);
  await expect(
    page.getByRole('heading', { name: 'Estadisticas' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Ultimos 7 dias' }),
  ).toBeVisible();
  await expect(page.getByText('$35,00').first()).toBeVisible();

  await page.getByRole('button', { name: 'Cerrar sesion' }).click();
  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel('Correo electronico').fill(email);
  await page.getByLabel('Contrasena').fill(password);
  await page.getByRole('button', { name: 'Iniciar sesion' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText(`Sesion activa: ${email}`)).toBeVisible();
  await expect(
    page
      .locator('article')
      .filter({ hasText: 'Propinas esta semana' })
      .getByText('$35,00'),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Historial', exact: true }).click();
  await page.getByRole('link', { name: 'Editar' }).click();
  await page.getByRole('button', { name: 'Eliminar propina' }).click();

  await expect(page).toHaveURL(/\/history$/);
  await expect(page.getByText('$35,00')).toHaveCount(0);
});
