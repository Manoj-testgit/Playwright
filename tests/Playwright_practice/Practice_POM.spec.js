const { test, expect } = require("@playwright/test")
const {LoginPageP} = require('../../pageObjectspractice/LoginPageP')
const {DashboardPageP} = require('../../pageObjectspractice/DashboardPageP')
const {CartPageP} = require('../../pageObjectspractice/CartPageP')
const {POManager} = require('../../pageObjectspractice/POManager')

test ('Cient App logc', async ({page}) =>{
    
    const username = "manojkumarc2994@gmail.com"
    const password = "Radeon 123"
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    const loginPageP = new LoginPageP(page)
    await loginPageP.goTo();
    await loginPageP.validLogin(username,password)

    const dashboardPageP = new DashboardPageP(page)
    await dashboardPageP.searchProductAddCart(productName)
    await dashboardPageP.navigateToCart()

    const cartPageP = new CartPageP(page, productName)
    await cartPageP.checkOutitem(productName)
     

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    
    for (let i=0;i<optionsCount;i++)
        {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text === " India")
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }

        }

    //await page.locator(".icon-credit-card").click(); //did not worl=k

    //await page.locator(".input.ddl").nth(0).selectOption("4");
    //await page.locator(".input.ddl").nth(1).selectOption("15");


    await page.locator(".field.small .input.txt").first().fill("345");
    await page.locator(".field .input.txt").nth (2).fill("Manoj Kumar");


    await expect (page.locator(".user__name [type='text']").first()).toHaveText("manojkumarc2994@gmail.com");
    await page.locator(".action__submit").click();
    await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderId);
    
    
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