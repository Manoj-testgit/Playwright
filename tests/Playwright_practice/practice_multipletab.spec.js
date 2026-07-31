const {test,expect} = require("@playwright/test")


test("Working with mutliple tab", async ({browser})=>

{
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://freelance-learn-automation.vercel.app/login")

    const [newPage] = await Promise.all
    (
        [
            context.waitForEvent("page"),
            await page.locator('.social-btns a').nth(3).click()
        ]
    )
    await newPage.waitForTimeout(3000)
    await newPage.locator(".x1jchvi3.x1fcty0u").nth(0).fill("Manoj Kumar")
    await newPage.waitForTimeout(3000)
    await newPage.close()
    await page.getByPlaceholder("Enter Email").fill("manojkumarc2994@gmail.com")
    await page.waitForTimeout(3000)

});

test("Playwright mutiple tabs", async ({browser}) =>
{
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://playwright.dev/java/")

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.locator("li a[href*='https://code.visualstudio.com']:visible").click()
    ])

    await newPage.waitForLoadState() //waits for new page to load

    await page.bringToFront() //switch to the orginal page

    await newPage.close() // closes the new page 
});

test ("handling multiple tabs" , async({browser}) =>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    
    await page.goto("https://demo.automationtesting.in/Windows.html")
    await page.getByRole("link",{name:"Open New Tabbed Windows"}).click()

    const [newPage]= await Promise.all([
        context.waitForEvent("page"),
        await page.getByRole("button",{name:"click"}).click()

    ])
    await newPage.waitForLoadState()
    const anotherPage = await context.newPage()
    await anotherPage.goto("https://www.youtube.com/")


});

test("Muliple windows handling" , async({browser}) =>
{
    const context = await browser.newContext()
    const window = await context.newPage()

    await window.goto("https://demo.automationtesting.in/Windows.html")

    /*await window.addLocatorHandler(window.locator('iframe[name^="aswift"]')
    .contentFrame().locator('#ad_position_box'), async()=>
    {
        await window.locator('iframe[name^="aswift"]').contentFrame()
        .getByRole('button', { name: 'Close ad' }).click();
    });*/

    await window.getByRole("link", {name:"Open New Seperate Windows"}).click()

    const [newWindow] = await Promise.all([
        context.waitForEvent("page"),
        window.getByRole("button",{name:"click"}).click()

    ])

    await newWindow.waitForLoadState()
    await newWindow.close()

})

