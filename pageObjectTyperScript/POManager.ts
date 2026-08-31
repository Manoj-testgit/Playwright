import { LoginPageP } from "../pageObjectTyperScript/LoginPageP"
import { DashboardPageP } from "../pageObjectTyperScript/DashboardPageP";
import { CartPageP } from "../pageObjectTyperScript/CartPageP";
const { test, expect } = require("@playwright/test")
import { OrdersReviewPageP } from "../pageObjectTyperScript/OrdersReviewPageP";
import { OrdersHistoryPageP } from "../pageObjectTyperScript/OrdersHistoryPageP";
import { Page } from "@playwright/test";



export class POManager
{
    loginPageP: LoginPageP  /*login page class object is going inside the logicPage, 
    hence the type of it is class name that is LoginPageP*/
    dashboardPageP: DashboardPageP
    cartPageP: CartPageP
    ordersReviewPageP: OrdersReviewPageP
    ordersHistoryPageP: OrdersHistoryPageP
    page: Page // imported page at the top , hence the type of it is Page

    constructor(page:any)
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


