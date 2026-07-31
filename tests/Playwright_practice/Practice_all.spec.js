const {test,expect}=require("@playwright/test")

const fs = require("fs")
const os = require("os")
const path = require("path")

test("Valdiate the download, assert it and read it", async({page})=>
{
    await page.goto("https://jsonlint.com/datasets")
    await page.waitForLoadState()
    const configtext = page.getByRole('link', { name: 'Prettier Config' })
    await configtext.scrollIntoViewIfNeeded()

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole("button",{name:"Download"}).nth(4).click()
    ])
    const configPath = path.join(os.homedir(),"Downloads","config.json")
    await download.saveAs(configPath)

    expect(fs.existsSync(configPath)).toBeTruthy()

    const jsonfile = JSON.parse(fs.readFileSync(configPath))
    console.log(jsonfile)

})

test.only("Testing downloads, asset and read json" , async({page}) =>
{
    await page.goto("https://jsonlint.com/datasets")
    await page.waitForLoadState();
    
    const [download] =await Promise.all([
        page.waitForEvent("download"),
        page.getByRole("button",{name:"Download"}).nth(7).click()
        
    ])
    const WorldPath = path.join(os.homedir(),"Downloads","Word.json")
    await download.saveAs(WorldPath)

    expect(fs.existsSync(WorldPath)).toBeTruthy()

    const world = JSON.parse (fs.readFileSync(WorldPath))
    console.log(world)



});