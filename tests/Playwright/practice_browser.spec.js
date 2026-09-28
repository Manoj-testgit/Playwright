const {test,expect,chromium} = require ("@playwright/test")

test ("launchig an app without page fixture ", async()=>
{
    const browser  = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://www.youtube.com/")

})