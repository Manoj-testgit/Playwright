const {test,expect}=require("@playwright/test")
const fs = require("fs")
const path = require("path")
const os = require("os")

test("Validate the download" , async({page}) =>
{
    await page.goto("https://jsonlint.com/datasets")
    await page.waitForLoadState()
    const title = await page.title()
    console.log("Page title is " +title)
    await expect(page).toHaveTitle("Free JSON Datasets - Download Open Source Data | JSONLint | JSONLint")


    const [download] = await Promise.all([

        page.waitForEvent('download'),
        page.getByRole("button", {name:"Download"}).first().click()

    ])

    // save the file in custom path (locally)
    const customPath = path.join(os.homedir(),'Downloads',"filename.json")
    await download.saveAs(customPath)

    //asserting if the file is downloaded
    expect(fs.existsSync(customPath)).toBeTruthy();

    //reading the json file 
    const localdata = JSON.parse(fs.readFileSync(customPath))
    console.log(localdata)

})


test.only("Testing download and data from file", async({page}) =>
{
    await page.goto("https://jsonlint.com/datasets")

    const [download] = await Promise.all([
         page.waitForEvent('download'),
         page.getByRole("button",{name:"Download"}).nth(1).click()

    ])

    const newPath = path.join(os.homedir(),'Downloads',"jsonfile.json")
    await download.saveAs(newPath)

    expect(fs.existsSync(newPath)).toBeTruthy()

    const newlocal = JSON.parse(fs.readFileSync(newPath))
    console.log(newlocal)

})


test("Dowaload the file again and read " , async({page}) =>
{
    await page.goto("https://jsonlint.com/datasets")

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole("buttom",{name:"Download"}).nth(2).click()

    ])

    const placePath = path.join(os.homedir(),"Downloads","place.json")
    await download.saveAs(placePath)

    expect(fs.existsSync(placePath)).toBeTruthy()

    const placejson = JSON.parse(fs.readFileSync(placePath))
    console.log(placejson)

})