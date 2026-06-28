# Business Rules

**Cross-References**: [User Stories](User-Stories.md) | [Acceptance Criteria](Acceptance-Criteria.md)

## Authentication Rules
| Rule ID | Description | Source | Test Coverage |
|---------|-------------|--------|---------------|
| AUTH-01 | Valid usernames are: `standard_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`. | BRD REQ-01 | Login Happy Path |
| AUTH-02 | Locked account username is `locked_out_user`. | BRD REQ-01 | Login Negative Path |
| AUTH-03 | The universal password for all valid accounts is `secret_sauce`. | BRD REQ-01 | All Login Tests |
| AUTH-04 | Failed login attempts (invalid user/pass) must trigger the error: "Epic sadface: Username and password do not match any user in this service." | Product Owner | Login Negative Path |
| AUTH-05 | Login attempts with a locked account must trigger the error: "Epic sadface: Sorry, this user has been locked out." | Product Owner | Login Negative Path |

## Product Catalog Rules
| Rule ID | Description | Source | Test Coverage |
|---------|-------------|--------|---------------|
| PROD-01 | The catalog page must always display exactly 6 predefined products. | BRD REQ-02 | Catalog Verification |
| PROD-02 | Every product must possess a Title, Description, Image, and Price. | BRD REQ-02 | UI Verification |
| PROD-03 | All prices must be formatted in USD ($x.xx). | UX Guide | UI Verification |
| PROD-04 | The default sorting order upon login is Name (A-Z). | UX Guide | Sorting Tests |
| PROD-05 | Sorting options available: Name (A-Z), Name (Z-A), Price (Low-High), Price (High-Low). | BRD REQ-03 | Sorting Tests |

## Shopping Cart Rules
| Rule ID | Description | Source | Test Coverage |
|---------|-------------|--------|---------------|
| CART-01 | Clicking "Add to cart" must dynamically change the button text and state to "Remove". | BRD REQ-05 | Cart State Tests |
| CART-02 | The cart badge must show a numeric count representing the number of unique items added. | BRD REQ-07 | Badge Validation |
| CART-03 | The cart state (items in cart) must persist across page navigation within the same active session. | System Arch | State Persistence Tests |
| CART-04 | The shopping cart must be completely cleared immediately after a successful checkout completion. | BRD REQ-10 | E2E Checkout Test |

## Checkout Rules
| Rule ID | Description | Source | Test Coverage |
|---------|-------------|--------|---------------|
| CHK-01 | Checkout Step 1 requires First Name, Last Name, and Postal Code. | BRD REQ-08 | Checkout Validation |
| CHK-02 | Missing any of the three fields in Step 1 must trigger a specific validation error for that field. | BRD REQ-08 | Checkout Validation |
| CHK-03 | Checkout Step 2 must display the item list, item subtotal, calculated tax, and final total. | BRD REQ-09 | Checkout Calculation |
| CHK-04 | Tax is fixed and calculated as exactly 8% of the item subtotal, rounded to two decimal places. | Finance Dept | Checkout Calculation |
| CHK-05 | Checkout Step 3 must display the confirmation text "Thank you for your order!". | BRD REQ-10 | E2E Checkout Test |

## Session Management Rules
| Rule ID | Description | Source | Test Coverage |
|---------|-------------|--------|---------------|
| SESS-01 | The user's session ends immediately upon selecting "Logout". | BRD REQ-11 | Logout Test |
| SESS-02 | Direct URL access to internal pages (e.g., `/inventory.html`) without a valid session cookie must redirect to the login page. | Security | URL Boundary Tests |
