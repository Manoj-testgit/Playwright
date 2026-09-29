const {test,expect} = require("@playwright/test")
const {LoginPagepractice} = require("../../PracticePageObject/LoginPagepractice")

test("Login practice here" , async({page}) => 
{
    const username = "student"
    const password = "Password123"

    const loginpage = new LoginPagepractice(page)
    await loginpage.goTo()
    await loginpage.ValidLogin(username,password)
    await loginpage.InvalidLogin(password)

   /* await page.goto("https://practicetestautomation.com/practice-test-login/")
    await page.getByLabel("Username").fill("student")
    await page.getByLabel("Password").fill("Password123")
    await page.getByRole("button",{name:"Submit"}).click();

    //expect(page.getByTitle("post-title")).toHaveText("Logged In Successfully")
   // expect(page.locator(".post-title")).toHaveText("Logged In Successfully")
   await expect (page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible()
   await expect (page.getByText('Congratulations student. You successfully logged in!')).toBeVisible()*/

})