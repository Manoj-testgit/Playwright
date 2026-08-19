const { test, expect } = require("@playwright/test")

const {POManager} = require('../../pageObjectspractice/POManager')

test ('Cient App logc', async ({page}) =>{

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

    const ordersReviewPageP = poManager.getOrderReviewsPage()
    await ordersReviewPageP.searchcountrycodeanselect(countryCode,countryName)
    await ordersReviewPageP.orderconfimationPage()
    
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    
    await page.locator("button[routerlink*='myorders']").first().click();
    await expect (page.locator("h1.ng-star-inserted")).toHaveText("Your Orders");
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");


    for (let i=0; i<await rows.count(); i++)
    {
        const roworderId = await rows.nth(i).locator ("th").textContent();
        if (orderId.includes(roworderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();



});