# User Stories

**Cross-References**: [BRD](BRD.md) | [Acceptance Criteria](Acceptance-Criteria.md)

## Authentication Features

### US-001: Login with valid credentials
**As a** standard user  
**I want** to log in with valid credentials  
**So that** I can access the SwagLabs catalog  
* **Priority**: High
* **Story Points**: 3
* **Acceptance Criteria**: 
  - Given valid credentials, when submitted, then redirect to `/inventory.html`.

### US-002: Login with locked-out user
**As a** locked-out user  
**I want** to see an error message when attempting to log in  
**So that** I know my account is locked  
* **Priority**: High
* **Story Points**: 2
* **Acceptance Criteria**: 
  - Given locked credentials, when submitted, then show error "Epic sadface: Sorry, this user has been locked out."

### US-003: Login with invalid credentials
**As an** unregistered user  
**I want** to see an error message when using invalid credentials  
**So that** I know my login failed  
* **Priority**: High
* **Story Points**: 2
* **Acceptance Criteria**: 
  - Given invalid credentials, when submitted, then show error "Epic sadface: Username and password do not match any user in this service."

### US-018: Logout from the application
**As an** authenticated user  
**I want** to log out  
**So that** my session is securely closed  
* **Priority**: Medium
* **Story Points**: 2
* **Acceptance Criteria**: 
  - Given an active session, when I click logout in the sidebar, then redirect to login page and clear session.

## Catalog Features

### US-004: View product catalog
**As a** customer  
**I want** to view a list of available products  
**So that** I can decide what to buy  
* **Priority**: High
* **Story Points**: 3
* **Acceptance Criteria**: 
  - Catalog must display exactly 6 products with title, description, image, and price.

### US-005: Sort products by Name A-Z
**As a** customer  
**I want** to sort products alphabetically  
**So that** I can find products easily  
* **Priority**: Medium
* **Story Points**: 2
* **Acceptance Criteria**: 
  - When sorted A-Z, products appear in alphabetical order.

### US-006: Sort products by Name Z-A
**As a** customer  
**I want** to sort products reverse-alphabetically  
**So that** I can see products starting with later letters first  
* **Priority**: Medium
* **Story Points**: 2
* **Acceptance Criteria**: 
  - When sorted Z-A, products appear in reverse alphabetical order.

### US-007: Sort products by Price Low to High
**As a** bargain hunter  
**I want** to sort products by lowest price first  
**So that** I can find the cheapest items  
* **Priority**: High
* **Story Points**: 2
* **Acceptance Criteria**: 
  - When sorted Low-High, prices ascend from $7.99 to $49.99.

### US-008: Sort products by Price High to Low
**As a** premium shopper  
**I want** to sort products by highest price first  
**So that** I can find premium items  
* **Priority**: Medium
* **Story Points**: 2
* **Acceptance Criteria**: 
  - When sorted High-Low, prices descend from $49.99 to $7.99.

### US-009: View product detail page
**As a** customer  
**I want** to view specific product details  
**So that** I can learn more before purchasing  
* **Priority**: Medium
* **Story Points**: 3
* **Acceptance Criteria**: 
  - Clicking a product title opens detail page with large image, full description, and add to cart button.

## Cart Features

### US-010: Add product to cart from catalog
**As a** customer  
**I want** to add items to my cart from the catalog list  
**So that** I can shop quickly  
* **Priority**: High
* **Story Points**: 2
* **Acceptance Criteria**: 
  - Clicking "Add to cart" changes button to "Remove" and increments cart badge.

### US-011: Add product to cart from detail page
**As a** customer  
**I want** to add items to my cart from the product detail page  
**So that** I can buy an item after reading about it  
* **Priority**: Medium
* **Story Points**: 2
* **Acceptance Criteria**: 
  - Detail page has working "Add to cart" button.

### US-012: Remove product from cart on catalog page
**As a** customer  
**I want** to remove an item directly from the catalog page  
**So that** I can easily change my mind  
* **Priority**: Medium
* **Story Points**: 2
* **Acceptance Criteria**: 
  - Clicking "Remove" changes button back to "Add to cart" and decrements badge.

### US-013: View shopping cart
**As a** customer  
**I want** to view all items in my cart  
**So that** I can review my order before checkout  
* **Priority**: High
* **Story Points**: 3
* **Acceptance Criteria**: 
  - Cart page lists all added items with title, description, and price.

### US-014: Remove item from cart page
**As a** customer  
**I want** to remove items while viewing my cart  
**So that** I can manage my total order  
* **Priority**: High
* **Story Points**: 2
* **Acceptance Criteria**: 
  - Clicking "Remove" deletes the item row from the cart page.

### US-019: Navigate back from cart to shopping
**As a** customer  
**I want** to return to the catalog from the cart  
**So that** I can continue shopping  
* **Priority**: Low
* **Story Points**: 1
* **Acceptance Criteria**: 
  - "Continue Shopping" button redirects to `/inventory.html`.

### US-020: Cart badge count reflects items added
**As a** customer  
**I want** a visual indicator of how many items I have selected  
**So that** I know my cart status without opening it  
* **Priority**: High
* **Story Points**: 2
* **Acceptance Criteria**: 
  - Badge number accurately matches the number of unique items added.

## Checkout Features

### US-015: Proceed to checkout step 1 (customer information)
**As a** customer  
**I want** to enter my shipping information  
**So that** my order can be delivered  
* **Priority**: High
* **Story Points**: 3
* **Acceptance Criteria**: 
  - Valid first name, last name, and postal code allow navigation to step 2. Empty fields show validation error.

### US-016: Complete checkout step 2 (order overview)
**As a** customer  
**I want** to review my final totals including tax  
**So that** I know exactly what I am paying  
* **Priority**: High
* **Story Points**: 5
* **Acceptance Criteria**: 
  - Page displays item total, calculates 8% tax, and shows accurate final total.

### US-017: Complete checkout and see confirmation
**As a** customer  
**I want** to confirm my order and receive a success message  
**So that** I know my purchase was successful  
* **Priority**: High
* **Story Points**: 2
* **Acceptance Criteria**: 
  - Clicking "Finish" redirects to confirmation page showing "Thank you for your order!".
