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

});
