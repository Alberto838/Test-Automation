import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('siemano1');
  await page.getByTestId('login-button').click();
  await page.getByTestId('user-name').click();
  await page.getByRole('link', { name: 'płatności' }).click();
});