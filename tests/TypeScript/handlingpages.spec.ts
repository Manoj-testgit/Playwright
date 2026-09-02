 import {test,expect} from '@playwright/test'

/*test("multiple page handling", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://vinothqaacademy.com/multiple-windows/");

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.locator("#button1").nth(1).click()
    ]);

    await newPage.waitForLoadState(10000);

    console.log("New page URL:", newPage.url());

    await newPage.close();
});*/

test ("handling multiple tabs" , async ({browser}) =>
{
    const context = await browser.newContext()
    const page = await context.newPage()
    
    await page.goto("https://testautomationpractice.blogspot.com/")

    const [newPage] = await Promise.all ([
        context.waitForEvent("page"),
        page.getByRole("button",{name:"New Tab"}).click()

    ])
    await newPage.waitForLoadState()

    /*const title = await newPage.title()
    await expect(title).toHaveTitle("SDET-QA Blog pavantestingtools.com")*/
    await expect((newPage).locator("#header-inner")).toContainText("SDET-QA Blog")
    await newPage.close()
    
});