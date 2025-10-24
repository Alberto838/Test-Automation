import { test, expect } from '@playwright/test'

test.describe('Pulpit tests', () => {
	test.describe.configure({ retries: 3 })
	test('quick payment with correct data', async ({ page }) => {
		// Arrange
		const url = 'https://demo-bank.vercel.app/'
		const userId = 'test1234'
		const userPassword = '12345567'
		const receiverId = '2'
		const transferAmount = '200'
		const transferTitle = 'Podróż'
		const expectedReceiver = 'Chuck Demobankowy'

		// Act
		await page.goto(url)
		await page.getByTestId('login-input').fill(userId)
		await page.getByTestId('password-input').fill(userPassword)
		await page.getByTestId('login-button').click()

		await page.waitForLoadState('domcontentloaded')

		await page.locator('#widget_1_transfer_receiver').selectOption(receiverId)
		await page.locator('#widget_1_transfer_amount').fill(transferAmount)
		await page.locator('#widget_1_transfer_title').fill(transferTitle)

		await page.getByRole('button', { name: 'wykonaj' }).click()
		await page.getByTestId('close-button').click()

		// Assert
		await expect(page.getByTestId('message-text')).toHaveText(
			`Przelew wykonany! ${expectedReceiver} - ${transferAmount},00PLN - ${transferTitle}`
		)
	})

	test('successful mobile top-up', async ({ page }) => {
		await page.goto('https://demo-bank.vercel.app/')
		await page.getByTestId('login-input').fill('testerlo')
		await page.getByTestId('password-input').fill('password')
		await page.getByTestId('login-button').click()
		await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx')
		await page.locator('#widget_1_topup_amount').fill('100')
		await page.locator('#uniform-widget_1_topup_agreement > span').click()
		await page.getByRole('button', { name: 'doładuj telefon' }).click()
		await page.getByTestId('close-button').click()

		await expect(page.getByTestId('message-text')).toHaveText(
			'Doładowanie wykonane! 100,00PLN na numer 502 xxx xxx'
		)
	})
})
