import {test,expect} from '@playwright/test'
const dataSetP = (JSON.parse (JSON.stringify(require("../../utils/placeorderPracticedata.json"))))

import {POManager} from "../../pageObjectTyperScript/POManager"

    //Basically in playwright we have to declare all the return type 


test ('Cient App logc', async ({page}) =>{

    const poManager = new POManager(page);
    
    const products = page.locator(".card-body");
   

    const loginPageP = poManager.getLoginPageP()
    await loginPageP.goTo();
    await loginPageP.validLogin(dataSetP.username,dataSetP.password)

    const dashboardPageP = poManager.getDashboardPageP()
    await dashboardPageP.searchProductAddCart(dataSetP.productName)
    await dashboardPageP.navigateToCart()

    const cartPageP = poManager.getCartPageP()
    await cartPageP.checkOutitem(dataSetP.productName)

    const ordersReviewPageP = poManager.getOrdersReviewsPage()
    await ordersReviewPageP.searchcountrycodeanselect(dataSetP.countryCode,dataSetP.countryName)
    await ordersReviewPageP.orderconfimationPage()

    const orderId = await ordersReviewPageP.getorderId()
    console.log(orderId)

    const orderHistoryPageP = poManager.getOrdersHistoryPage()
    await orderHistoryPageP.orderPlaced(orderId)

});