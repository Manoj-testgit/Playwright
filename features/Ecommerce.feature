Feature: Ecommerce validations

  Scenario: Placing the Order
    Given a login to Ecommerce application with "manojkumarc2994@gmail.com" and "Radeon 123"
    When Add "zara coat 4" to Cart
    Then Verify "zara coat 4" is displayed in the Cart
    When Enter validate details and Place the order 
    Then Verify order presented in the OrderHistory