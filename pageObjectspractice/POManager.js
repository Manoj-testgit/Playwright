const {LoginPageP} = require('../pageObjectspractice/LoginPageP')
const {DashboardPageP} = require('../pageObjectspractice/DashboardPageP')
const {CartPageP} = require('../pageObjectspractice/CartPageP');
const { test, expect } = require("@playwright/test")
const {OrdersReviewPageP} = require('../pageObjectspractice/OrdersReviewPageP')
const {OrdersHistoryPageP} = require('../pageObjectspractice/OrdersHistoryPageP')



class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPageP = new LoginPageP(this.page);
        this.dashboardPageP = new DashboardPageP (this.page);
        this.cartPageP = new CartPageP(this.page);
        this.ordersReviewPageP = new OrdersReviewPageP(this.page);
        this.ordersHistoryPageP = new OrdersHistoryPageP(this.page);

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
getOrdersReviewsPage()
{
    return this.ordersReviewPageP;
}
getOrdersHistoryPage()
{
    return this.ordersHistoryPageP;
}

}


module.exports = {POManager}


