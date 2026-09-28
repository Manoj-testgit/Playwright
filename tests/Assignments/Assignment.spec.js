/*What you are testing:
 Two separate tests — one booking with 1 ticket should show "Eligible for refund", 
 a booking with 3 tickets should show "Not eligible for refund".
Both tests verify the spinner appears and disappears before showing the result.*/


const {test, expect} = require("@playwright/test")


test ('test booking', async ({page}) =>
{

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.getByPlaceholder("you@email.com").fill("manojkumarc2994@gmail.com")
    await page.getByPlaceholder("••••••").fill("Radeon 123")
    await page.getByRole("button",{name:"Sign In"}).click()


});