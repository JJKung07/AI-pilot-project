# Business Requirements Document (BRD)

**Project Name**: SwagLabs Commerce Platform  
**Document Version**: 1.0  
**Date**: 2026-06-28  
**Author**: Enterprise QA Architect  
**Status**: Approved  

## Executive Summary
SwagLabs is a web-based B2C e-commerce platform enabling customers to browse, filter, and purchase products. This document outlines the business and functional requirements for the core purchasing flow.

## Business Objectives
1. **Reduce Cart Abandonment**: Ensure a smooth, intuitive 3-step checkout process.
2. **Improve Checkout Conversion**: Increase successful order completion rates by 15%.
3. **Cross-Browser Reliability**: Ensure flawless functionality across Chrome, Firefox, Safari, and Edge.
4. **Mobile Responsiveness**: Provide an equal or better experience on mobile web views.
5. **Secure Authentication**: Ensure robust session management and data privacy.

## Scope
**In-Scope**:
* User Authentication (Login/Logout)
* Product Catalog and Sorting
* Product Detail Page
* Shopping Cart Management
* Checkout Flow (Info -> Overview -> Confirmation)

**Out-of-Scope**:
* Payment Gateway Integration (Simulated only)
* Admin Dashboard
* User Registration (Pre-provisioned users only)

## Stakeholders

| Role | Name | Responsibilities |
|------|------|------------------|
| Product Owner | Jane Doe | Requirement sign-off |
| QA Lead | John Smith | Test strategy and execution |
| Dev Lead | Alice Johnson | Technical implementation |
| Business Analyst| Bob Lee | Requirement gathering |

## Business Requirements

1. **REQ-01: User Authentication**
   Users must be able to log in using predefined credentials. The system must handle locked-out states and invalid credentials gracefully.

2. **REQ-02: Product Catalog Browsing**
   The catalog must display exactly 6 products with images, titles, descriptions, and prices.

3. **REQ-03: Product Sorting and Filtering**
   Users must be able to sort the catalog by Name (A-Z, Z-A) and Price (Low-High, High-Low).

4. **REQ-04: Product Detail Page**
   Clicking a product title or image must navigate to a detailed view of that specific product.

5. **REQ-05: Shopping Cart Management - Add**
   Users must be able to add products to their cart from both the catalog and detail pages.

6. **REQ-06: Shopping Cart Management - Remove**
   Users must be able to remove products from their cart from the catalog, detail, and cart pages.

7. **REQ-07: Shopping Cart Badge**
   A numeric badge on the cart icon must accurately reflect the total number of items in the cart.

8. **REQ-08: Checkout Flow - Step 1 (Information)**
   Users must provide First Name, Last Name, and Postal Code to proceed. All fields are mandatory.

9. **REQ-09: Checkout Flow - Step 2 (Overview)**
   Users must see an itemized list, subtotal, an 8% tax calculation, and the final total before confirming.

10. **REQ-10: Checkout Flow - Step 3 (Confirmation)**
    Upon confirmation, users must see a success message and the cart must be emptied.

11. **REQ-11: User Logout and Session Management**
    Users must be able to log out from the sidebar menu. Unauthenticated access to internal pages must redirect to the login screen.

## Non-Functional Requirements
* **Performance**: Page load times must be < 3 seconds on broadband.
* **Security**: All traffic must use HTTPS. Sessions expire upon logout.
* **Compatibility**: Chrome (Latest), Firefox (Latest), Safari (Latest), Edge (Latest).
* **Accessibility**: Must comply with WCAG 2.1 AA standards.

## Assumptions and Constraints
* **Assumptions**: Users have Javascript enabled.
* **Constraints**: Hardcoded test users will be used for the pilot. No real credit card processing.

## Glossary
* **POM**: Page Object Model
* **B2C**: Business to Consumer

## Cross-References
* [User Stories](User-Stories.md)
* [Acceptance Criteria](Acceptance-Criteria.md)
