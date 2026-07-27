const {test,expect,request} = require("@playwright/test");
const { ValueType } = require("exceljs");
const loginPayLoad = {userEmail:"manojkumarc2994@gmail.com",userPassword:"Radeon 123"}
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let token; //delcaring token here to that it can accessed everywhere
let orderId;
test.beforeAll( async()=>
{
    //Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayLoad
        }
    )
    expect(loginResponse.ok()).toBeTruthy();
    //success codes for api - 200,201, 202 etc
    const loginResponsejson = await loginResponse.json();
    token = loginResponsejson.token;
    //const statuscode = loginResponsejson.
    console.log(token);
    //

    //Create order api
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayLoad,
        headers:{
                 'Authorization' : token,
                 'Content-Type' : 'application/json',
        },
    })
    const orderResponsejson = await orderResponse.json();
    orderId = orderResponsejson.orders[0];
    console.log(orderResponsejson)

});

test.beforeEach(()=>
{

});

test ('Cient App logc with API', async ({page}) =>{
    
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value);
    },
    token);

    await page.goto("https://rahulshettyacademy.com/client")
    
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
