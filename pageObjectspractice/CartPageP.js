const {test,expect} = require("@playwright/test")
class CartPageP
{
    constructor(page,productName)
    {
        this.page = page;
        this.cartProducts = page.locator("div li").first()
        this.selectedProduct = page.locator("h3:has-text('"+productName+"')")
        this.checkOut = page.locator("text=Checkout")
        
    }


    async checkOutitem(productNme)
    {
        await this.cartProducts.waitFor();
        const bool = await this.selectedProduct.isVisible(); 
        expect (bool).toBeTruthy();
        await this.checkOut.click(); 

    }
}
module.exports = {CartPageP};