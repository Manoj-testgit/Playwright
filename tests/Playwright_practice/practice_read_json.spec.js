const { test, expect } = require("@playwright/test")
const fs = require("fs") //allows you to read files from the computer
const path = require("path") //helps build file paths correctly across operating systems
const os = require("os")//gives access to operating system details like the home directory.


const testdata = JSON.parse(JSON.stringify(require("../../testdata.json")))

const filePath = path.join(os.homedir(), "Downloads", "testdata.json");
const localTestData = JSON.parse(fs.readFileSync(filePath, "utf8"))

test("Read JSON file from playwright", async ({ page }) => {
    await page.goto("https://freelance-learn-automation.vercel.app/login")

    await page.getByPlaceholder("Enter Email").fill(testdata.username)
    await page.getByPlaceholder("Enter Password").fill(testdata.password)
})

test("Read many data from json file", async ({ page }) => {
    await page.goto("https://freelance-learn-automation.vercel.app/login")

    await page.getByRole("link", { name: "New user? Signup" }).click()

    await page.getByPlaceholder("Name").fill(testdata.username)
    await page.getByPlaceholder("Email").fill(testdata.email)
    await page.getByPlaceholder("Password").fill(testdata.password)
    await page.pause()
    await page.getByPlaceholder("Name").fill("")
    await page.getByPlaceholder("Email").fill("")
    await page.pause()
    await page.getByPlaceholder("Name").fill(testdata.address.city)
    await page.getByPlaceholder("Email").fill(testdata.Interests[2]) // it will select JMeter
})

test("Read JSON file from local", async ({ page }) => {
    await page.goto("https://freelance-learn-automation.vercel.app/login")

    await page.getByPlaceholder("Enter Email").fill(localTestData.email)
    await page.getByPlaceholder("Enter Password").fill(localTestData.password)
    await page.pause()
})