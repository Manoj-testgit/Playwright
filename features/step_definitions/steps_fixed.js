const { Given, When, Then } = require("@cucumber/cucumber")
const { POManager } = require('../../pageObjectspractice/POManager_fixed')
const { chromium } = require("@playwright/test")

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
  this.browser = await chromium.launch();
  const context = await this.browser.newContext();
  const page = await context.newPage();
  this.poManager = new POManager(page);

  this.countryCode = "ind";
  this.countryName = "India";

  const loginPageP = this.poManager.getLoginPageP();
  await loginPageP.goTo();
  await loginPageP.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {
  const dashboardPageP = this.poManager.getDashboardPageP();
  await dashboardPageP.searchProductAddCart(productName);
  await dashboardPageP.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
  const cartPageP = this.poManager.getCartPageP();
  await cartPageP.checkOutitem(productName);
});

When('Enter validate details and Place the order', async function () {
  const ordersReviewPageP = this.poManager.getOrdersReviewsPage();
  await ordersReviewPageP.searchcountrycodeanselect(this.countryCode, this.countryName);
  await ordersReviewPageP.orderconfimationPage();
  this.orderId = await ordersReviewPageP.getorderId();
  console.log(this.orderId);
});

Then('Verify order presented in the OrderHistory', async function () {
  const orderHistoryPageP = this.poManager.getOrdersHistoryPage();
  await orderHistoryPageP.orderPlaced(this.orderId);
  await this.browser.close();
});
