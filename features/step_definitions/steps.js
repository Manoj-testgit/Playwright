const {Given, When, Then } = require("@cucumber/cucumber")
const {POManager} = require('../../pageObjectspractice/POManager')
const { test, expect, playwright } = require("@playwright/test")



Given('a login to Ecommerce application with {username} and {password}', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions

  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);

  const username = "manojkumarc2994@gmail.com"
  const password = "Radeon 123"
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const countryCode = "ind"
  const countryName = "India"

  const loginPageP = poManager.getLoginPageP()
  await loginPageP.goTo();
  await loginPageP.validLogin(username,password)
});

When('Add {string} to Cart', async function (string) {
  // Write code here that turns the phrase above into concrete actions
   const dashboardPageP = poManager.getDashboardPageP()
   await dashboardPageP.searchProductAddCart(productName)
   await dashboardPageP.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (string) {
   const cartPageP = poManager.getCartPageP()
   await cartPageP.checkOutitem(productName);
});

When('Enter validate details and Place the order', async function () {
  // Write code here that turns the phrase above into concrete actions
   const ordersReviewPageP = poManager.getOrdersReviewsPage()
   await ordersReviewPageP.searchcountrycodeanselect(countryCode,countryName)
   await ordersReviewPageP.orderconfimationPage()
   const orderId = await ordersReviewPageP.getorderId()
   console.log(orderId);
});

Then('Verify order presented in the OrderHistory', async function () {
  // Write code here that turns the phrase above into concrete actions
   const orderHistoryPageP = poManager.getOrdersHistoryPage()
   await orderHistoryPageP.orderPlaced(orderId);
});