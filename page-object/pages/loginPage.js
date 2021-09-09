import { Selector, t } from 'testcafe'
class LoginPage {
	constructor() {
		this.emailAddressInput = Selector('#login_input-email')
		this.passwordInput = Selector('#login_input-password')
		this.loginButton = Selector('#login_button-login')
		this.errorInvalidUserPass = Selector('.ng-star-inserted').withText(
			'Invalid username or password'
		)
		this.emailInvalidAlert = Selector('.ng-star-inserted').withText(
			'Please provide a valid email address.'
		)
		this.passwordInvalidAlert = Selector('.ng-star-inserted').withText(
			'Please fill in your password.'
		)
	}
	async loginToApplication(username, password) {
		await t
			.typeText(this.emailAddressInput, username, {
				paste: true,
				replace: true,
			})
			.typeText(this.passwordInput, password, { paste: true, replace: true })
			.click(this.loginButton)
	}
}
export default LoginPage
