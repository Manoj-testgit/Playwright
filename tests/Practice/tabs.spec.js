const {test,expect} = require("@playwright/test")

test ("Testing 2 different tabs", async({browser}) =>
{
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://playwright.dev/java/docs/intro")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole("link",{name:"Maven"}).click()
    ])

    await newPage.waitForLoadState()
    await page.bringToFront()

})