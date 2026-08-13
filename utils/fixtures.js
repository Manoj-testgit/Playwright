const base = require("@playwright/test");
const { request } = require("@playwright/test");
const { ApiUtils } = require("../utils/ApiUtils.js")
const loginPayLoad = {userEmail:"manojkumarc2994@gmail.com",userPassword:"Radeon 123"}
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
//test will accept only inbuild fixtures, it cannot any custom fixtures 
//we tweak the testby using base 
exports.customtest = base.test.extend(
    {

        authenticatedPage: async ({ page }, use) => {
            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator("#userEmail").fill("manojkumarc2994@gmail.com");
            await page.locator("#userPassword").fill("Radeon 123");
            await page.waitForLoadState('networkidle');
            await page.locator("[value='Login']").click();
            await page.waitForLoadState('networkidle');
            await use(page);
        },

        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new ApiUtils(apiContext, loginPayLoad);
            const response = await apiUtils.createOrder(orderPayLoad);
            await use(response)

        },

        testDataForOrder :{

            productName: "ADIDAS ORIGINAL"

        }
    })