const {LoginPageP} = require('../pageObjectspractice/LoginPageP')
const {DashboardPageP} = require('../pageObjectspractice/DashboardPageP')
const {CartPageP} = require('../pageObjectspractice/CartPageP');
const { test, expect } = require("@playwright/test")



class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPageP = new LoginPageP(this.page);
        this.dashboardPageP = new DashboardPageP (this.page);
        this.cartPageP = new CartPageP(this.page);

    }


getLoginPageP()
{
    return this.loginPageP;
}

getDashboardPageP()
{
    return this.dashboardPageP;
}

getCartPageP()
{
    return this.cartPageP;
}
}

module.exports = {POManager}


