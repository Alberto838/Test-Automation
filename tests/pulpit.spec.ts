import { test, expect } from '@playwright/test'

test.describe('Pulpit tests', () => {
	test.describe.configure({ retries: 3 })
	test.only('quick payment with correct data', async ({ page }) => {
		await page.goto('https://demo-bank.vercel.app/')
		await page.getByTestId('login-input').fill('test1234')
		await page.getByTestId('password-input').fill('12345567')
		await page.getByTestId('login-button').click()

		await page.waitForLoadState('domcontentloaded')

		await page.locator('#widget_1_transfer_receiver').selectOption('2')
		await page.locator('#widget_1_transfer_amount').fill('200')
		await page.locator('#widget_1_transfer_title').fill('Podróż')

		await page.getByRole('button', { name: 'wykonaj' }).click()
		await page.getByTestId('close-button').click()

		await expect(page.getByTestId('message-text')).toHaveText(
			'Przelew wykonany! Chuck Demobankowy - 200,00PLN - Podróż'
		)
	})
})
