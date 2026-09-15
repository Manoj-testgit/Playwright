import { test, expect, request } from "@playwright/test"

declare const window: any;

const loginPayload = {userEmail:"manojkumarc2994@gmail.com",userPassword:"Radeon 123"}
let token: any; 
test.beforeAll( async()=>
{
    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:loginPayload})
        expect(loginResponse.ok()).toBeTruthy();
        const jsonresponse = await  loginResponse.json()
         token = jsonresponse.token;
        //console.log(token)

})

test ('Cient App logc', async ({page}) =>{
    
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);

    await page.goto("https://rahulshettyacademy.com/client");
   
    await page.locator(".card-body b").first().waitFor()
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button",{name:"Add to Cart"}).click();

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

    await page.locator("div li").first().waitFor();
    await expect (page.getByText("ZARA COAT 3")).toBeVisible(); 
    await page.getByRole("button", {name:"Checkout"}).click(); 
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", {name:"India"}).nth(1).click(); 

    await page.locator(".field.small .input.txt").first().fill("345");
    await page.locator(".field .input.txt").nth(2).fill("Manoj Kumar");

    await expect (page.locator(".user__name [type='text']").first()).toHaveText("manojkumarc2994@gmail.com");
    await page.getByText("PLACE ORDER").click();
    await expect (page.getByText(" Thankyou for the order. ")).toBeVisible();
    let orderId: any
     orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    expect(orderId).not.toBeNull();

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
