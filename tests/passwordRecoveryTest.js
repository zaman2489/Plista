import { Selector, t, ClientFunction} from "testcafe"
import xlsx from 'node-xlsx'
import PasswordRecoverySelectors from '../page-object/pages/selectorPasswordRecovery'
const passwordRecoverySelectors = new PasswordRecoverySelectors()


fixture `Password_Recovery_For_Registred_User`
    .page `https://login-test.plista.com/de/`
    .beforeEach(async t=>{
        await t.resizeWindow(1280,700)
        await t.setTestSpeed(1)
    })

    test('Forgot_Password_Scenario_Page_loading_and_Invalid_Email_InputTest_Should_Return_Alert', async t => {   
        await t.click(passwordRecoverySelectors.forgotPassword)
        await t.expect(passwordRecoverySelectors.passwordResetPageTitle.innerText).contains('Reset Your Password')
        await t
            .typeText(passwordRecoverySelectors.resetInputEmailField, 'test')
            .click(passwordRecoverySelectors.resetPasswordbutton)
        await t.expect(passwordRecoverySelectors.resetEmailValidation.innerText).contains('Please provide a valid email address.')
    })

    test('User_Should_Return_Back_To_Home_Page_By_clicking_on_RetunToLogin_Button', async t => {   
        await t.click(passwordRecoverySelectors.forgotPassword)
        await t.click(passwordRecoverySelectors.retunToLoginpage)
        await t.expect(passwordRecoverySelectors.loginForm.exists).ok()
    })

    test('Forgot_Password_Scenario_Test_with_Valid_Email_Should_be_Successfull', async t => {   
        await t.click(passwordRecoverySelectors.forgotPassword)
                .typeText(passwordRecoverySelectors.resetInputEmailField, 'test@gmail.com')
        console.log("Need to disable captcha functionality at the site level during testing - Screenshort Taken")
        await t.click(passwordRecoverySelectors.resetPasswordbutton)
        //TestCafe can not execute reCaptcha funtionality, to test this forgot validation we need to disabling captcha functionality at the site level:https://testcafe-discuss.devexpress.com/t/handle-recaptcha/578
        await t.click(passwordRecoverySelectors.retunToLoginpage).expect(passwordRecoverySelectors.loginForm.exists).ok()
    })
    
