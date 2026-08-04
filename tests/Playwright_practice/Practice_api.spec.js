const { test, expect,request } = require("@playwright/test")
const loginpayload = {userEmail: "manojkumarc2994@gmail.com", userPassword: "Radeon 123"}

let token;
test.beforeAll( async()=>
{
    const apicontext = await request.newContext();
    const loginresponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:loginpayload})
        expect(loginresponse.ok()).toBeTruthy();
        const jsonresponse = await loginresponse.json();
        token = jsonresponse.token
        console.log(token)

});

test('Cient App logc', async ({page}) =>{
    
    //to insert a token we need to use javaScript 

    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);

    const email = "";
    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client");
    
    
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    for (let i=0; i<count; i++ ) //logic to find the item
    {
        if (await products.nth(i).locator("b").textContent() === productName) //checking for item with productname
        {
            await products.nth(i).locator("text= Add To Cart").click();// after finding item, adding it to the card 
            break;

        }
    }

    await page.locator("[routerlink$='/dashboard/cart']").first().click(); //
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //used tag h3 with the text to identify the product
    /*isVisible wont wait for page to load so we are using waitfor above */
    expect (bool).toBeTruthy();
    await page.locator("text=Checkout").click(); //using generic text for checkout

    await page.locator("[placeholder*='Country']").pressSequentially("ind");/* press sequentially
    is used to type in the less in order to get the sorting list, delay of 150 ms is introduced
    between each key press */
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
