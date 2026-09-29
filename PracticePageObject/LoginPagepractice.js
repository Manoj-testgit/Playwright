const { test, expect } = require("@playwright/test");

class LoginPagepractice
{
    constructor(page)
    {
        this.page = page;
        this.userName = page.getByLabel("Username")
        this.password =  page.getByLabel("Password")
        this.submitBtn = page.getByRole("button",{name:"Submit"})
        this.successful = page.getByRole('heading', { name: 'Logged In Successfully' })
        this.confirm = page.getByText('Congratulations student. You successfully logged in!')
        this.logout= page.getByRole("link",{name: "Log out"})
        this.incorrectusername = page.getByText('Your username is invalid!').first()
    }
    
    async goTo()
    {
          await this.page.goto("https://practicetestautomation.com/practice-test-login/")
    }

    async ValidLogin(username,password)
    {
        await this.userName.fill(username)
        await this.password.fill(password)
        await this.submitBtn.click()

        await expect (this.successful).toBeVisible()
        await expect (this.confirm).toBeVisible()

        await this.logout.click()

    }
    async InvalidLogin(password)
    {
        await this.userName.fill("manoj")
        await this.password.fill(password)
        await this.submitBtn.click()

        await expect (this.incorrectusername).toBeVisible()

    }
}
module.exports = {LoginPagepractice}