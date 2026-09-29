const {test,expect} = require("@playwright/test")
const fs = require("fs")
const os = require("os")
const path = require("path")

test ("Validating download", async({page}) =>
{
    await page.goto("https://jsonlint.com/datasets")


    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button',{name:"Download"}).first().click()
    ])

    const newpath = path.join(os.homedir(),'Downloads','filename.json')

    await download.saveAs(newpath)

    expect (fs.existsSync(newpath)).toBeTruthy()

    const ddata = JSON.parse(fs.readFileSync(newpath))
    console.log(ddata)



})