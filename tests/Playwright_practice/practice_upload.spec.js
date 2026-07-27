const {test,expect} = require("@playwright/test")

test("Verify file uplaod" , async({page}) =>
{
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.locator("#file-upload").setInputFiles("/Users/manojkumar/Downloads/1784275228825.jpeg");
    await page.locator("#file-submit").click();
    await page.waitForLoadState();
    await expect (page.getByText("File Uploaded!")).toBeVisible();

});