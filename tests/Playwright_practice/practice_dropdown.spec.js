const {test,expect} =require ("@playwright/test");


test ("Testing dropdown in Playwright page" , async ({page}) =>
{
    await page.goto("https://playwright.dev/");
    await page.waitForLoadState();
    const pagetitle = page.locator(".navbar__title.text--truncate");
    await expect(page.locator(".navbar__title.text--truncate")).toHaveText("Playwright");

    await page.getByRole("button",{name:'Node.js'}).hover();
    await page.locator(".dropdown__menu").isVisible();
    const dropdown = page.locator(".dropdown__menu");
    await dropdown.getByText("Java").click();
    await expect(page.locator(".navbar__title.text--truncate")).toHaveText("Playwright for Java");

}),

test("Testing dropdown in Rahulshetty page" , async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.waitForLoadState();
    await page.getByLabel("username").fill("manojkumarc2994@gmail.com")
    await page.getByLabel("password").fill("Radeon@123")

    await page.getByRole('combobox').selectOption('consult');//used ARIA component from accessibility tab 

    await page.getByRole("button", {name:'Sign In'}).click();

});

test("Testing dropdown again" ,async ({page}) =>
{

    await page.goto("https://maestro.dev/")
    await page.getByRole('button', { name: 'Choose download option' }).click();
    await page.getByRole('menu', { name: 'Choose download option' }).waitForLoadState()
    





});