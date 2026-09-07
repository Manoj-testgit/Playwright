import {test,expect} from "@playwright/test"
import fs from "fs"
import path from "path"
import os from "os"



test("testing download and read the file", async ({page}) =>
{
    await page.goto("https://jsonlint.com/datasets")

    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator("button").filter({hasText:"Download"}).first().click()
    ])

    const custompath:string = path.join(os.homedir(),'Downloads',"worldairport.json")
    await download.saveAs(custompath)

    expect(fs.existsSync(custompath)).toBeTruthy()

    const data = JSON.parse(fs.readFileSync(custompath, "utf-8"))
    console.log(data)
});
