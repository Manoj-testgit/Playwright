const { test, expect } = require("@playwright/test")
const testdata2 = JSON.parse(JSON.stringify(require("../../testdata2.json")))

test.describe("Data driaven login test", function()
{
    for (const data of testdata2)
    {
        test.describe(`Login with users ${data.id}`,function()
        {
           test("Read JSON file", async ({ page }) => {
            await page.goto("https://freelance-learn-automation.vercel.app/login")

            await page.getByPlaceholder("Enter Email").fill(data.username)
            await page.getByPlaceholder("Enter Password").fill(data.password)
            
           })  
        })  
    }
})