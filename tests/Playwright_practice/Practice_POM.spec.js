const { test, expect } = require("@playwright/test")

const {POManager} = require('../../pageObjectspractice/POManager')

test.only ('Cient App logc', async ({page}) =>{

    const poManager = new POManager(page);
    
    const username = "manojkumarc2994@gmail.com"
    const password = "Radeon 123"
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const countryCode = "ind"
    const countryName = "India"

    const loginPageP = poManager.getLoginPageP()
    await loginPageP.goTo();
    await loginPageP.validLogin(username,password)

    const dashboardPageP = poManager.getDashboardPageP()
    await dashboardPageP.searchProductAddCart(productName)
    await dashboardPageP.navigateToCart()

    const cartPageP = poManager.getCartPageP()
    await cartPageP.checkOutitem(productName)

    const ordersReviewPageP = poManager.getOrdersReviewsPage()
    await ordersReviewPageP.searchcountrycodeanselect(countryCode,countryName)
    await ordersReviewPageP.orderconfimationPage()

    const orderId = await ordersReviewPageP.getorderId()
    console.log(orderId)

    const orderHistoryPageP = poManager.getOrdersHistoryPage()
    await orderHistoryPageP.orderPlaced(orderId)

});