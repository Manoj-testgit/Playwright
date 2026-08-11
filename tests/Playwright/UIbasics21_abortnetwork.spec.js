const {test,expect} = require("@playwright/test");
const { request } = require("node:http");

test ('Cient App logc', async ({page}) =>{
    
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    page.route('**/*.{jpg,png,jpeg}',route=>route.abort());
    //page.route('**/*.css',route=>route.abort());
    //**/* indicates any URL with css OR jpg,png,jpeg will abort the CSS OR loading of pictures of page


    page.on('request',request=>console.log(request.url()))
    /*this helps us retriveing the request call*/
    page.on('response',response=>console.log(response.url(),response.status()))
    /*this helps us retriveing the response call*/

    await page.goto("https://rahulshettyacademy.com/client");
    const title = await page.title();
    console.log (title);
    await expect (page).toHaveTitle("Let's Shop");

    await page.locator('#userEmail').fill("manojkumarc2994@gmail.com");
    await page.locator('#userPassword').fill("Radeon 123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle'); 
    await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

   


})