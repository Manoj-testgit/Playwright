const { test, expect } = require("@playwright/test")

class OrdersHistoryPageP
{
    constructor(page)
    {
        this.page = page;
        this.orderHistory = page.locator("button[routerlink*='myorders']").first()
        this.header = page.locator("h1.ng-star-inserted")
        this.orderList = page.locator("tbody")
        this.orderIdDetails = page.locator(".col-text")

    }

    async orderPlaced(orderId)
    {
        

            await this.orderHistory.click();
            await expect(this.header).toHaveText("Your Orders");
            await this.orderList.waitFor();
        
            const rows = this.page.locator("tbody tr");
        
        
            for (let i=0; i<await rows.count(); i++)
            {
                const roworderId = await rows.nth(i).locator ("th").textContent();
                if (orderId.includes(roworderId))
                {
                    await rows.nth(i).locator("button").first().click();
                    break;
                }
            }
            const orderIdDetailsText = await this.orderIdDetails.textContent();
            expect(orderId.includes(orderIdDetailsText)).toBeTruthy();
        
    }
    
}
module.exports = {OrdersHistoryPageP}