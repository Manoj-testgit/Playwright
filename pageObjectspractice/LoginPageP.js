class LoginPageP
{
    constructor(page)
    {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }
async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(username,password)
{
    await this.userName.fill("manojkumarc2994@gmail.com");
    await this.password.fill("Radeon 123");
    await this.signInbutton.click();
}

}

module.exports = {LoginPageP}