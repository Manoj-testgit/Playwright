const {test,expect,request} = require("@playwright/test");
const { ValueType } = require("exceljs");
const loginPayLoad = {userEmail:"manojkumarc2994@gmail.com",userPassword:"Radeon 123"}
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
const mockPayloadorders = {data:[],"message":"No Orders"};

let token; 
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
    const loginResponsejson = await loginResponse.json();
    token = loginResponsejson.token;
    console.log(token);


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


test ('Cient App logc with API mock response', async ({page}) =>{
    
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value);
    },
    token);

    await page.goto("https://rahulshettyacademy.com/client")
    
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a2013f417ee3e78bab644d9",
    //^ calling the URL for which we want to route - first argument 
    //how to route follow below - second argument 
    async route=>
    {
       const response = await page.request.fetch(route.request())
       let body = JSON.stringify(mockPayloadorders); //using stringyfy to make JS object into JSON object
       route.fulfill(
        {
            response,
            body,
        }
       )
        //intercepting the response - api response ->{mock/fake response}-> browser - render data on front

    })
    await page.locator("button[routerlink*='myorders']").first().click();
    //await expect (page.locator("h1.ng-star-inserted")).toHaveText("Your Orders");
    //await page.locator("tbody").waitFor();

    //const rows = page.locator("tbody tr");
    await page.pause()


});
