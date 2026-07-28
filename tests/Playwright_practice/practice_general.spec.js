const {test,expect} = require("@playwright/test")

test.use({viewport:{width:1370,height:780}})//this change is for this test case only 

test("Change the screeen size", async({page}) =>
{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    console.log(await page.viewportSize().width)
    console.log(await page.viewportSize().height)//uses config file data

});

test("Drag and drop demo with iframe" , async({page}) =>
{
    await page.goto("https://www.globalsqa.com/demo-site/draganddrop/")
    const demoFrame = page.frameLocator('iframe[src*="photo-manager.html"]')
    await demoFrame.locator('#gallery').waitFor()
    const source = demoFrame.locator('#gallery li').first()
    const target = demoFrame.locator('#trash')
    await source.dragTo(target)


});

test("Drag and Drop", async({page}) =>
{
    await page.goto("https://demo.automationtesting.in/Dynamic.html")
        await page.waitForLoadState('load', { timeout: 50000 })
    const source = page.locator('#angular')
    const source1 = page.locator("#mongo")
    const source2 = page.locator("#node")
    const target = page.locator('#droparea')
    await source.dragTo(target)
    await source1.dragTo(target)
    await source2.dragTo(target)

});

test("page scroll up and down" ,async ({page}) =>
{
    await page.goto("https://playwright.dev/java/docs/intro")
    await page.waitForTimeout(2000)
    await page.evaluate(() => { //1st method, scroll by pixels
        window.scrollBy(0, 1000)
    });
        await page.waitForTimeout(2000);


    //2nd method, scroll until as element is visible
    const element = page.locator(".footer__bottom.text--center")
    await element.scrollIntoViewIfNeeded();
    await page.waitForTimeout(4000);


});

test("Working with multiple windows windows",async({browser}) =>
{
   const context = browser.newContext()
   const page = await context.newPage()

   await page.goto("https://playwright.dev/java/")

   const [newPage] = Promise.all([
      
    context.waitForEvent("page"),
    page.locator("li a[href*='https://code.visualstudio.com']:visible").click()
   ])


});