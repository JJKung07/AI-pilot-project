# Test Data Specification

**Cross-References**: [Acceptance Criteria](Acceptance-Criteria.md) | [Business Rules](Business-Rules.md)

## 1. Authentication Test Data

| User Type | Username | Password | Expected Outcome | Notes |
|-----------|----------|----------|------------------|-------|
| Happy Path | `standard_user` | `secret_sauce` | Success -> `/inventory.html` | Primary test user |
| Locked | `locked_out_user` | `secret_sauce` | Error -> "locked out" | Account locked |
| Problem | `problem_user` | `secret_sauce` | Success, but UI is broken | Used for visual/functional bug testing |
| Performance | `performance_glitch_user` | `secret_sauce` | Success, but slow | Used for timeout/wait testing |
| Error | `error_user` | `secret_sauce` | Success, triggers errors | Used for error handling tests |
| Visual | `visual_user` | `secret_sauce` | Success, visual diffs | Used for visual regression |
| Invalid Pass | `standard_user` | `wrongpassword` | Error -> "do not match" | Invalid credentials |
| Empty Fields| `[Empty]` | `[Empty]` | Error -> "Username is required" | Form validation |

## 2. Product Catalog Test Data

The system contains exactly these 6 items.

| Product Name | Description Snippet | Price |
|--------------|---------------------|-------|
| Sauce Labs Backpack | carry.allTheThings() with the sleek... | $29.99 |
| Sauce Labs Bike Light | A red light isn't the desired state... | $9.99 |
| Sauce Labs Bolt T-Shirt | Get your testing superhero on... | $15.99 |
| Sauce Labs Fleece Jacket | It's not every day that you come... | $49.99 |
| Sauce Labs Onesie | Rib snap infant onesie... | $7.99 |
| Test.allTheThings() T-Shirt (Red) | This classic Sauce Labs t-shirt... | $15.99 |

## 3. Sort Order Expected Results

**Price (Low to High)**:
1. Sauce Labs Onesie ($7.99)
2. Sauce Labs Bike Light ($9.99)
3. Sauce Labs Bolt T-Shirt ($15.99)
4. Test.allTheThings() T-Shirt (Red) ($15.99)
5. Sauce Labs Backpack ($29.99)
6. Sauce Labs Fleece Jacket ($49.99)

**Price (High to Low)**:
*(Reverse of Low to High)*

**Name (A-Z)**:
1. Sauce Labs Backpack
2. Sauce Labs Bike Light
3. Sauce Labs Bolt T-Shirt
4. Sauce Labs Fleece Jacket
5. Sauce Labs Onesie
6. Test.allTheThings() T-Shirt (Red)

**Name (Z-A)**:
*(Reverse of A-Z)*

## 4. Checkout Test Data

**Step 1 (Information) Data**:
| Scenario | First Name | Last Name | Postal Code | Result |
|----------|------------|-----------|-------------|--------|
| Valid | John | Doe | 12345 | Success |
| Missing First | `[Empty]` | Doe | 12345 | Error: First Name required |
| Missing Last | John | `[Empty]` | 12345 | Error: Last Name required |
| Missing Zip | John | Doe | `[Empty]` | Error: Postal Code required |
| Boundary Long | Joooooooooooooooo... | Dooooooooooo... | 123456789012345 | Success |
| Alphanumeric Zip| John | Doe | AB12 CD34 | Success |

## 5. API Test Data (Restful Booker)

| Scenario | Data Payload |
|----------|--------------|
| Auth Credentials | `{"username": "admin", "password": "password123"}` |
| Valid Booking | `{"firstname": "Jim", "lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2024-01-01", "checkout": "2024-01-02"}, "additionalneeds": "Breakfast"}` |
| Partial Update | `{"firstname": "James", "lastname": "Brown"}` |
| Invalid Booking | `{"firstname": "Jim"}` (Missing required fields) |
