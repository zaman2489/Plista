import { Selector, t } from 'testcafe'

class PasswordRecoverySelectors{
    constructor(){
        this.forgotPassword = Selector('#login_link-forgot-password')
        this.passwordResetPageTitle = Selector('.ng-tns-c26-1').withText("Reset Your Password")
        this.resetInputEmailField = Selector('#reset_input-email')
        this.resetPasswordbutton = Selector('#reset_button-reset-password')
        this.resetEmailValidation = Selector('.ng-star-inserted').withText("Please provide a valid email address.")
        this.retunToLoginpage = Selector('#reset_link-login')
        this.loginForm = Selector('#login-form')
        this.resendButton = Selector('.ng-tns-c29-2').withText("resend")

                }
}

export default PasswordRecoverySelectors