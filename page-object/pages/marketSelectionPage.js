import { Selector, t } from "testcafe";
 class MrktSelector{
    constructor(){
        this.selectCountry = Selector('#login_select-country')
        this.selectCountryName = this.selectCountry.find('option')

    }
}

var data = ['Australia', 'Austria', 'Belgium', 'Canada', 'China', 'Croatia', 'Czech Republic', 'Denmark', 'Finland', 'Germany','Global', 'Hong Kong', 'Hungary','India','Italy','Malaysia','Mena','Netherlands','New Zealand','Norway','Poland','Portugal','Romania','Russia','Singapore','Slovakia','Slovenia','Spain','Sweden','Switzerland','Taiwan','Thailand','Turkey','United Kingdom']

export {
    MrktSelector,
    data

}
