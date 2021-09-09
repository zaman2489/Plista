import { Selector, t, ClientFunction } from 'testcafe'
import xlsx from 'node-xlsx'
import LoginPage from '../page-object/pages/loginPage'

const loginPage = new LoginPage()

fixture`Login_Scenario_Test_Cases`
	.page`https://login-test.plista.com/de/`.beforeEach(
	async t => await t.setTestSpeed(1)
)

const excelFile = xlsx.parse('./data/testdata.xlsx')
const excelSheet = excelFile.find(sheets => sheets.name == 'loginData')
const excelSheetData = excelSheet.data
const headers = excelSheetData.shift()
const dataSet = excelSheetData.map(row => {
	const user = {}
	row.forEach((data, idx) => (user[headers[idx]] = data))
	return user
})

dataSet.forEach(data => {
	test(`Login - ${data.testName}`, async t => {
		await t
			.maximizeWindow()
			.typeText(loginPage.emailAddressInput, data.username)
			.typeText(loginPage.passwordInput, data.password)
			.click(loginPage.loginButton)

		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if (
			(data.username != null || data.username != '') &&
			!re.test(String(data.username).toLowerCase())
		) {
			await t
				.expect(loginPage.emailInvalidAlert.innerText)
				.contains(data.expectedMessage)
		} else {
			await t
				.expect(loginPage.errorInvalidUserPass.innerText)
				.contains(data.expectedMessage)
		}
	})
})

test('Blank_Username _With_Password_Should_Return_An_Alert', async t => {
	await t
		.typeText(loginPage.passwordInput, 'password')
		.click(loginPage.loginButton)
	await t
		.expect(loginPage.emailInvalidAlert.innerText)
		.contains('Please provide a valid email address')
})

test('Valid_Username _With_Blank_Password_Should_Return_An_Alert', async t => {
	await t
		.typeText(loginPage.emailAddressInput, 'username@gmail.com')
		.click(loginPage.loginButton)
	await t
		.expect(loginPage.passwordInvalidAlert.innerText)
		.contains('Please fill in your password')
})

test('Blank_Username _With_Blank_Password_Should_Return_Two_Alerts', async t => {
	await t.click(loginPage.loginButton)
	await t
		.expect(loginPage.passwordInvalidAlert.innerText)
		.contains('Please fill in your password')
	await t
		.expect(loginPage.emailInvalidAlert.innerText)
		.contains('Please provide a valid email address')
})
