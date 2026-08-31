//This is continued version with data parameterization from exernal json files
const { test, expect } = require("@playwright/test")
const dataSetP = (JSON.parse (JSON.stringify(require("../../utils/placeorderparamtiztion.json"))));
const {POManager} = require('../../pageObjectspractice/POManager')

for(const data of dataSetP)
{
test (`Cient App logc for ${data.productName}`, async ({page}) =>{

    const poManager = new POManager(page);
    
    const products = page.locator(".card-body");
   

    const loginPageP = poManager.getLoginPageP()
    await loginPageP.goTo();
    await loginPageP.validLogin(data.username,data.password)

    const dashboardPageP = poManager.getDashboardPageP()
    await dashboardPageP.searchProductAddCart(data.productName)
    await dashboardPageP.navigateToCart()

    const cartPageP = poManager.getCartPageP()
    await cartPageP.checkOutitem(data.productName)

    const ordersReviewPageP = poManager.getOrdersReviewsPage()
    await ordersReviewPageP.searchcountrycodeanselect(data.countryCode,data.countryName)
    await ordersReviewPageP.orderconfimationPage()

    const orderId = await ordersReviewPageP.getorderId()
    console.log(orderId)

    const orderHistoryPageP = poManager.getOrdersHistoryPage()
    await orderHistoryPageP.orderPlaced(orderId)

});
}