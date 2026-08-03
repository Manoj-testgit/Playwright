const {test,expect} = require("@playwright/test")

test("Verify file uplaod" , async({page}) =>
{
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.locator("#file-upload").setInputFiles("/Users/manojkumar/Downloads/1784275228825.jpeg");
    await page.locator("#file-submit").click();
    await page.waitForLoadState();
    await expect (page.getByText("File Uploaded!")).toBeVisible();

});

test("Uploading file validation" , async({page}) =>
{
    await page.goto("https://demo.automationtesting.in/FileUpload.html")
    await page.locator("#input-4").setInputFiles("/Users/manojkumar/Downloads/Word.json")
    await expect(page.locator(".file-preview-thumbnails").first()).toContainText("Word.json (6.25 KB)")
    await page.getByRole("button" , {name:"Upload"}).click()

    await page.getByRole("button",{name:"Remove"}).click()
    await expect(page.locator(".file-preview-thumbnails").first()).not.toContainText("Word.json (6.25 KB)")

})