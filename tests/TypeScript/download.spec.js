const {test,expect} = require ("@playwright/test")
const fs = require("fs")
const path = require("path")
const os = require("os")



test("testing download and read the file", async ({page}) =>
{
    await page.goto("https://jsonlint.com/datasets")

    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator("button").filter({hasText:"Download"}).first().click()
    ])

    const custompath = path.join(os.homedir(),'Downloads',"worldairport.json")
    await download.saveAs(custompath)

    expect(fs.existsSync(custompath)).toBeTruthy()

    const data = JSON.parse(fs.readFileSync(custompath))
    console.log(data)


});