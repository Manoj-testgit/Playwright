const { test, expect } = require("@playwright/test");

class OrdersReviewPageP
{
    constructor(page)
    {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']")
        this.dropdown = page.locator(".ta-results");
        this.submit = page.locator(".action__submit");
        this.emailId = this.page.locator(".user__name [type='text']").first()
        this.orderconfimation = this.page.locator(".hero-primary")
        this.cvv = this.page.locator(".field.small .input.txt").first()
        this.name = page.locator(".field .input.txt").nth (2)
        this.orderId = this.page.locator(".em-spacer-1 .ng-star-inserted")



    }


    async searchcountrycodeanselect(countryCode,countryName)
    {
        await this.country.pressSequentially(countryCode,{delay:100});
            await this.dropdown.waitFor();
            const optionsCount = await this.dropdown.locator("button").count();
            
            for (let i=0;i<optionsCount;i++)
                {
                    const text = await this.dropdown.locator("button").nth(i).textContent();
                    if (text.trim() ===  countryName)
                    {
                        await this.dropdown.locator("button").nth(i).click();
                        break;
                    }
        
                }
        
            //await page.locator(".icon-credit-card").click(); //did not worl=k
        
            //await page.locator(".input.ddl").nth(0).selectOption("4");
            //await page.locator(".input.ddl").nth(1).selectOption("15");
        
        
            await this.cvv.fill("345");
            await this.name.fill("Manoj Kumar");
        
        
            await expect (this.emailId).toHaveText("manojkumarc2994@gmail.com");
            await this.submit.click();

    }

        
    async orderconfimationPage()
    {

            await expect (this.orderconfimation).toHaveText(" Thankyou for the order. ");
            this.orderId.textContent();
            console.log(this.orderId);

    }

}

module.exports = {OrdersReviewPageP}