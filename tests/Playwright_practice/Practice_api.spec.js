const { test, expect,request } = require("@playwright/test")
const loginpayload = {userEmail: "manojkumarc2994@gmail.com", userPassword: "Radeon 123"}
const orderpayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const {ApiUtils} = require('../../utils/ApiUtils')
let token;
let orderId;

let response;
test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext,loginpayload)
    response = await apiUtils.createOrder(orderpayload)

});

test('Cient App logc', async ({page}) =>
{

    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").first().click();
    await expect (page.locator("h1.ng-star-inserted")).toHaveText("Your Orders");
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    for (let i=0; i<await rows.count(); i++)
    {
        const roworderId = await rows.nth(i).locator ("th").textContent();
        if (response.orderId.includes(roworderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});
