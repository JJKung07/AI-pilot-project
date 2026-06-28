# Acceptance Criteria

**Cross-References**: [User Stories](User-Stories.md) | [BRD](BRD.md)

## Definition of Done (DoD)
- [ ] Code is peer-reviewed
- [ ] Passes all unit and UI automation tests
- [ ] Deployed to staging environment without errors
- [ ] Acceptance criteria verified by QA

---

### US-001: Login with valid credentials
**Scenario 1: Happy Path Login**
* **Given** the user is on the login page
* **When** the user enters username "standard_user" and password "secret_sauce"
* **And** clicks the Login button
* **Then** the user is redirected to the products page

### US-002: Login with locked-out user
**Scenario 1: Locked User Warning**
* **Given** the user is on the login page
* **When** the user enters username "locked_out_user" and password "secret_sauce"
* **And** clicks the Login button
* **Then** an error message "Epic sadface: Sorry, this user has been locked out." is displayed
* **And** the user remains on the login page

### US-003: Login with invalid credentials
**Scenario 1: Invalid Password**
* **Given** the user is on the login page
* **When** the user enters username "standard_user" and password "wrong_pass"
* **And** clicks the Login button
* **Then** an error message "Epic sadface: Username and password do not match any user in this service." is displayed

**Scenario 2: Empty Fields**
* **Given** the user is on the login page
* **When** the user leaves the username and password blank
* **And** clicks the Login button
* **Then** an error message "Epic sadface: Username is required" is displayed

### US-004: View product catalog
**Scenario 1: Verify Product Count**
* **Given** the user is logged in and on the products page
* **Then** exactly 6 products should be visible in the catalog list

### US-005 to US-008: Sort products
**Scenario 1: Sort Price Low to High**
* **Given** the user is logged in and on the products page
* **When** the user selects "Price (low to high)" from the sort dropdown
* **Then** the first product listed should be "Sauce Labs Onesie" ($7.99)
* **And** the last product listed should be "Sauce Labs Fleece Jacket" ($49.99)

**Scenario 2: Sort Name Z to A**
* **Given** the user is logged in and on the products page
* **When** the user selects "Name (Z to A)" from the sort dropdown
* **Then** the first product listed should be "Test.allTheThings() T-Shirt (Red)"

### US-009: View product detail page
**Scenario 1: Navigation to Details**
* **Given** the user is logged in and on the products page
* **When** the user clicks on the "Sauce Labs Backpack" title
* **Then** the product detail page is displayed
* **And** the price shown is "$29.99"

### US-010 to US-012, US-020: Cart Management (Add/Remove)
**Scenario 1: Add Item updates badge**
* **Given** the user is logged in and cart is empty
* **When** the user clicks "Add to cart" for "Sauce Labs Backpack"
* **Then** the cart badge should display "1"
* **And** the button text should change to "Remove"

**Scenario 2: Remove Item updates badge**
* **Given** the user has 1 item in the cart
* **When** the user clicks "Remove" on that item on the catalog page
* **Then** the cart badge should disappear (or show 0)
* **And** the button text should change back to "Add to cart"

### US-013 to US-014, US-019: View Shopping Cart
**Scenario 1: Cart reflects added items**
* **Given** the user has added "Sauce Labs Backpack" and "Sauce Labs Bike Light"
* **When** the user navigates to the cart page
* **Then** exactly 2 items should be listed in the cart with their correct prices

**Scenario 2: Empty Cart**
* **Given** the user has no items in the cart
* **When** the user navigates to the cart page
* **Then** no product items should be listed

### US-015: Proceed to checkout step 1
**Scenario 1: Valid Information**
* **Given** the user is on the "Checkout: Your Information" page
* **When** the user enters "John" for First Name, "Doe" for Last Name, and "12345" for Postal Code
* **And** clicks "Continue"
* **Then** the user is redirected to the "Checkout: Overview" page

**Scenario 2: Missing Postal Code**
* **Given** the user is on the "Checkout: Your Information" page
* **When** the user enters "John" and "Doe" but leaves Postal Code blank
* **And** clicks "Continue"
* **Then** an error message "Error: Postal Code is required" is displayed

### US-016: Complete checkout step 2
**Scenario 1: Order Summary Accuracy**
* **Given** the user is on the "Checkout: Overview" page
* **And** the cart contains only "Sauce Labs Backpack" ($29.99)
* **Then** the Item total should be "$29.99"
* **And** the Tax should be "$2.40" (8% of subtotal)
* **And** the Total should be "$32.39"

### US-017: Complete checkout and see confirmation
**Scenario 1: Successful Order**
* **Given** the user is on the "Checkout: Overview" page
* **When** the user clicks "Finish"
* **Then** the user is redirected to the "Checkout: Complete!" page
* **And** the message "Thank you for your order!" is displayed

### US-018: Logout from the application
**Scenario 1: Successful Logout**
* **Given** the user is logged in
* **When** the user opens the hamburger menu and clicks "Logout"
* **Then** the user is redirected to the login page
