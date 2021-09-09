import { Selector, ClientFunction } from 'testcafe'
import xPathToCss from 'xpath-to-css'
import { data, MrktSelector } from '../page-object/pages/marketSelectionPage'
const mrktSelector = new MrktSelector()

fixture`Select_Default_Market_and_Select_other_Option_From_Dropdown`
	.page`https://login-test.plista.com/de/`.beforeEach(async t => {
	await t.maximizeWindow()
	await t.setTestSpeed(0.7)
})

test('Default_Market_check_& Market_selection_from_Dropdown_Test_Should_Select_Default_Selection_First_Then_Select_Other_Option', async t => {
	await t.expect(mrktSelector.selectCountry.innerText).contains('Germany')
	await t
		.click(mrktSelector.selectCountry)
		.click(mrktSelector.selectCountryName.withText('Australia'))
		.expect(mrktSelector.selectCountry.innerText)
		.contains('Australia')
})

const getOptionNames = ClientFunction(() => {
	const select = document.querySelector('#login_select-country')
	const options = select.querySelectorAll('option')
	const values = []

	for (let option of options) values.push(option.textContent)
	return values
})

test('Varifty_All_Available_Options_From_Dropdown', async t => {
	// console.log(data)
	await t.expect(getOptionNames()).eql(data)
})
