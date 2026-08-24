const {Given, When, Then } = require("@cucumber/cucumber")
const {POManager} = require('../../pageObjectspractice/POManager')
const { test, expect, playwright } = require("@playwright/test")



Given('a login to Ecommerce application with {username} and {password}',{timeout:100*1000}, async function (username, password) {
  // Write code here that turns the phrase above into concrete actions

  const browser = await playwright.chromium.launch(); /* since we did not have a way to access page 
  we used this imported playwright from the top and used it to lauch the browser*/ 

  const context = await browser.newContext();
  const page = await context.newPage();
  this.poManager = new POManager(page);/*we will use this.poManager to give access 
  of POManager to next block of codes, if not the poManager dies within this block */

  //const username = "manojkumarc2994@gmail.com"
  //const password = "Radeon 123"
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const countryCode = "ind"
  const countryName = "India"

  const loginPageP = this.poManager.getLoginPageP()
  await loginPageP.goTo();
  await loginPageP.validLogin(username,password)
});

When('Add {string} to Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
   const dashboardPageP = this.poManager.getDashboardPageP()
   await dashboardPageP.searchProductAddCart(productName)
   await dashboardPageP.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
   const cartPageP = this.poManager.getCartPageP()
   await cartPageP.checkOutitem(productName);
});

When('Enter validate details and Place the order', async function () {
  // Write code here that turns the phrase above into concrete actions
   const ordersReviewPageP = this.poManager.getOrdersReviewsPage()
   await ordersReviewPageP.searchcountrycodeanselect(countryCode,countryName)
   await ordersReviewPageP.orderconfimationPage()
   const orderId = await ordersReviewPageP.getorderId()
   console.log(orderId);
});

Then('Verify order presented in the OrderHistory', async function (orderId) {
  // Write code here that turns the phrase above into concrete actions
   const orderHistoryPageP = this.poManager.getOrdersHistoryPage()
   await orderHistoryPageP.orderPlaced(orderId);
});