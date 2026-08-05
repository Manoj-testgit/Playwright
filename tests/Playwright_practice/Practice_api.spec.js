const { test, expect,request } = require("@playwright/test")
const loginpayload = {userEmail: "manojkumarc2994@gmail.com", userPassword: "Radeon 123"}
const orderpayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let token;
let orderId;
test.beforeAll( async()=>
{
    const apicontext = await request.newContext();
    const loginresponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:loginpayload})
        expect(loginresponse.ok()).toBeTruthy();
        const jsonresponse = await loginresponse.json();
        token = jsonresponse.token
        console.log(token)

    //
    const orderresponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {headers:{"authorization":token},
        "content-type":"application/json",data:orderpayload})

        const jsonorderresponse = await orderresponse.json()
        console.log(jsonorderresponse)
        orderId = jsonorderresponse.orders[0]

});

test('Cient App logc', async ({page}) =>{
    
    //to insert a token we need to use javaScript 

    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);

    await page.goto("https://rahulshettyacademy.com/client");

    
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
    await page.pause()
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
