const {test,expect} =require ("@playwright/test");


test ("Testing iFrames" ,  async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    const framespage = page.frameLocator("#courses-iframe");
    
    await framespage.getByRole('link', { name: 'NEW All Access plan' }).click();
    //await page.locator('iframe[name="iframe-name"]').contentFrame().getByRole('link', 
       //{ name: 'NEW All Access plan' }).click();
    //await framespage.locator("li a[href*='lifetime-access']:visible").click();
    const textcheck = await framespage.locator(".text h2").textContent();
    console.log(textcheck.split("")[1]);
     
});

test ("Testing iFrames 2" , async ({page}) =>
{
    await page.goto("https://docs.oracle.com/javase/8/docs/api/");
    const framespage2 =   page.frameLocator('[name="packageListFrame"]');

    await framespage2.getByRole('link' , {name:'java.awt.dnd'}).click();
    await expect(framespage2.getByRole('heading',{name:'java.awt.dnd'})).toBeTruthy();

});