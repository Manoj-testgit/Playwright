import {test,expect,Locator, Page } from "@playwright/test"
export class CartPageP
{
    cartProducts: Locator
    checkOut: Locator
    page: Page

    constructor(page: Page)
    {
        this.page = page;
        this.cartProducts = page.locator("div li").first()
        this.checkOut = page.locator("text=Checkout")

    }


    async checkOutitem(productName:string)
    {
        await this.cartProducts.waitFor();
        const selectedProduct = this.page.locator("h3:has-text('"+productName+"')")
        const bool = await selectedProduct.isVisible();
        expect (bool).toBeTruthy();
        await this.checkOut.click(); 

    }
}
module.exports = {CartPageP};