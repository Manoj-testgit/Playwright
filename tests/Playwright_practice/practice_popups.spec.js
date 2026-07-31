const {test,expect} =require ("@playwright/test");


test("Testing hidden elements" , async ({page})  =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByRole("button" , {name:'Hide'}).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

});

test("Testing alerts with assertions", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    page.on('dialog', dialog => 
    {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toContain("Hello , Are you sure you want to confirm?");
        dialog.accept();
    });
        
    await page.getByRole("button", {name: "Confirm"}).click();
    
});

test("Testing alerts without assertions", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    page.on('dialog', dialog =>dialog.accept());
    await page.getByRole("button", {name: "Confirm"}).click();

});


