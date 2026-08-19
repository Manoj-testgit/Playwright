const {test,expect} = require("@playwright/test")
class CartPageP
{
    constructor(page)
    {
        this.page = page;
        this.cartProducts = page.locator("div li").first()
        this.checkOut = page.locator("text=Checkout")

    }


    async checkOutitem(productName)
    {
        await this.cartProducts.waitFor();
        const selectedProduct = this.page.locator("h3:has-text('"+productName+"')")
        const bool = await selectedProduct.isVisible();
        expect (bool).toBeTruthy();
        await this.checkOut.click(); 

    }
}
module.exports = {CartPageP};