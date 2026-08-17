const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');
const {OrdersReviewPage} = require('../pageobjects/OrdersReviewPage');
const {Orderplacedandhistory} = require('../pageobjects/Orderplaced-history');

class PoManager
{
    constructor()
    {
            this.loginPage = new LoginPage(page);
            this.dashboardPage = new DashboardPage (page);

    }
}

getLoginPage()
{
    return this.loginPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}



