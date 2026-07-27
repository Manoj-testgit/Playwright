const {test,expect} = require("@playwright/test")


test ("Keyboard Events in playwright", async({page}) =>
{
    await page.goto("https://www.google.com/");
    await page.getByPlaceholder("").type("Manoj Kumar");
    await page.keyboard.press("Meta+A")
    await page.keyboard.press("Meta+C")
    await page.keyboard.press("Backspace")
    await page.keyboard.press("Meta+V")
    await page.keyboard.press("Enter")
    

});

test ("Keyboard Events in playwright different approach", async({page}) =>
{
   await page.goto("https://www.google.com/");
   await page.getByPlaceholder("").pressSequentially("Manoj Kumar!");
   await page.keyboard.press("ArrowLeft")
   await page.keyboard.down("Shift")
   for(let i=0;i<'Kumar'.lenght;i++)
   {
    await page.keyboard.press("ArrowLeft")
   }
   await page.keyboard.up("Shift")
   await page.keyboard.press("Backspace")
   await page.keyboard.press("Enter")

});