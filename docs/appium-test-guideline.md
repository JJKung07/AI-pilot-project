---
inclusion: manual
---

# AI Test Generation Guide — PigPro Mobile Application

## Purpose

This document provides structure and templates for AI to generate Robot Framework test cases, page keywords, locators, and test data for the PigPro mobile application. Follow this structure exactly to ensure consistency and pass the code audit pipeline.

---

## Project Structure Overview

```
PigProApplication/
├── imports/                              # Centralized resource imports (hub pattern)
│   ├── import.resource                   # Master import file (tests import this only)
│   ├── import_common_keywords.resource   # Imports common keywords
│   ├── import_features_keywords.resource # Imports feature keywords
│   ├── import_pages_keywords.resource    # Imports page keywords
│   └── import_pages_locators.resource    # Imports page locators
├── keywords/
│   ├── common/
│   │   └── common_keywords.resource      # Shared utility keywords
│   ├── features/
│   │   └── {feature_name}_feature.resource  # High-level business flows
│   └── pages/
│       └── {page_name}_page.resource     # Page-level action keywords
├── page_locators/
│   └── {page_name}_locator.resource      # Locator variables per page
├── resources/
│   ├── framework_setting.yaml            # Framework configuration
│   └── global_config.yaml                # Global variables
├── test_data/
│   └── {page_name}_test_data.yaml        # Test data per page (YAML)
└── tests/
    └── {feature_name}/                   # 1 folder per feature
        └── TCS{NNN}_{description}.robot  # Test case files
```

---

## File Generation Templates

### 1. Locator File (`page_locators/{page_name}_locator.resource`)

```robot
*** Settings ***
Resource    ${CURDIR}${/}..${/}imports${/}import.resource

*** Variables ***
# Header
${PAGE_NAME.HEADER.TEXT.TITLE}                          accessibility_id=<element_content_desc>
${PAGE_NAME.HEADER.ICON.BACK}                           android=new UiSelector().className("android.widget.Button").instance(0)

# Filter
${PAGE_NAME.ICON.FILTER}                                android=new UiSelector().className("android.widget.ImageView").instance(<index>)
${PAGE_NAME.FILTER.BUTTON.APPLY}                        android=new UiSelector().description("<text>")
${PAGE_NAME.FILTER.BUTTON.RESET}                        android=new UiSelector().description("<text>")

# List / Content
${PAGE_NAME.LIST.TEXT.ITEM_TITLE}                       accessibility_id=<element_content_desc>
${PAGE_NAME.LIST.VALUE.STATUS}                          android=new UiSelector().descriptionContains("<text>")

# Detail
${PAGE_NAME.DETAIL.TEXT.LABEL}                          accessibility_id=<element_content_desc>
${PAGE_NAME.DETAIL.BUTTON.SAVE}                         android=new UiSelector().description("<text>")
${PAGE_NAME.DETAIL.BUTTON.CANCEL}                       android=new UiSelector().description("<text>")

# Modal
${PAGE_NAME.MODAL.CONFIRM.TEXT.TITLE}                   accessibility_id=<modal_title_desc>
${PAGE_NAME.MODAL.CONFIRM.BUTTON.OK}                    android=new UiSelector().description("<text>")
${PAGE_NAME.MODAL.CONFIRM.BUTTON.CANCEL}                android=new UiSelector().description("<text>")

# Dynamic locators (use {placeholder} for runtime replacement)
${PAGE_NAME.CHIP.STATUS}                                android=new UiSelector().descriptionContains("{status}").instance(0)
${PAGE_NAME.ITEM.BY_NAME}                               android=new UiSelector().descriptionContains("{item_name}")
```

#### Locator Variable Naming Convention

Format: `${PAGE.SECTION.TYPE.ELEMENT}`

| Segment | Description | Examples |
|---------|-------------|----------|
| PAGE | Page name in UPPER_CASE | `SALE_ORDER`, `HOME`, `CHECK_HOUSE` |
| SECTION | Page area | `HEADER`, `FILTER`, `LIST`, `DETAIL`, `MODAL`, `CHIP` |
| TYPE | Element type | `TEXT`, `ICON`, `BUTTON`, `INPUT`, `DROPDOWN`, `LINK`, `VALUE` |
| ELEMENT | Element name | `SAVE`, `BACK`, `TITLE`, `SEARCH`, `STATUS` |

#### Locator Strategy Priority

1. `accessibility_id=<content_desc>` — Best option
2. `android=new UiSelector().<method>` — Using `descriptionContains()`, `className()`, `instance()`
3. `xpath=//android.view.View[...]` — Last resort only

---

### 2. Page Keywords File (`keywords/pages/{page_name}_page.resource`)

```robot
*** Settings ***
Resource    ${CURDIR}${/}..${/}..${/}imports${/}import.resource

*** Keywords ***
Verify {page_name} page header displayed correctly
    AppiumLibrary.Wait Until Element Is Visible             ${PAGE_NAME.HEADER.TEXT.TITLE}

Tap back icon in {page_name} page
    common_keywords.Tap when ready                          ${PAGE_NAME.HEADER.ICON.BACK}

Tap filter icon in {page_name} page
    common_keywords.Tap when ready                          ${PAGE_NAME.ICON.FILTER}

Tap save button in {page_name} page
    common_keywords.Tap when ready                          ${PAGE_NAME.DETAIL.BUTTON.SAVE}

Verify {element_description} displayed correctly in {page_name} page
    [Arguments]    ${value}
    ${locator}=    Replace String    ${PAGE_NAME.ITEM.BY_NAME}    {item_name}    ${value}
    AppiumLibrary.Wait Until Element Is Visible             ${locator}

Verify chip status displayed correctly in {page_name} page
    [Arguments]    ${status}
    ${locator.status}=    Replace String    ${PAGE_NAME.CHIP.STATUS}    {status}    ${status}
    AppiumLibrary.Wait Until Element Is Visible             ${locator.status}

Input text in {field_name} field in {page_name} page
    [Arguments]    ${text}
    common_keywords.Input text when ready                   ${PAGE_NAME.DETAIL.INPUT.FIELD}    ${text}

Scroll down to {element_description} in {page_name} page
    common_keywords.Scroll down until element is visible    ${PAGE_NAME.DETAIL.TEXT.LABEL}
```

#### Page Keywords Rules

- Keyword names MUST start with action verb: `Verify`, `Tap`, `Input`, `Select`, `Search`, `Scroll`, `Swipe`, `Generate`
- Keyword names MUST end with page context: `...in {page_name} page`
- Use only locators from the paired locator file (no cross-page references)
- Align library calls at column 52
- Use `common_keywords.` prefix for utility calls

---

### 3. Feature Keywords File (`keywords/features/{feature_name}_feature.resource`)

```robot
*** Settings ***
Resource    ${CURDIR}${/}..${/}..${/}imports${/}import.resource

*** Keywords ***
Navigate to {page_name} page from home
    home_page.Tap all menu icon
    see_all_page.Tap search in all menu page
    see_all_page.Search menu name    ${MENU.PAGE_NAME}
    see_all_page.Tap {page_name} menu in all menu page

Complete {feature_name} flow with required data
    [Arguments]    ${data}
    # Step 1: Navigate
    Navigate to {page_name} page from home
    # Step 2: Fill form
    {page_name}_page.Input text in {field} field in {page_name} page    ${data["field_value"]}
    # Step 3: Submit
    {page_name}_page.Tap save button in {page_name} page
    # Step 4: Confirm
    {page_name}_page.Tap confirm button in modal in {page_name} page
```

---

### 4. Test Data File (`test_data/{page_name}_test_data.yaml`)

```yaml
{page_name}_data:
    field_name_1:           <value>
    field_name_2:           <value>
    status.pending:         <status_text>
    status.completed:       <status_text>
    org_name:               <organization_name>
    org_id:                 <organization_id>
    date.start:             <date_value>
    date.end:               <date_value>
```

#### Test Data Rules

- File name: `{page_name}_test_data.yaml`
- Root key: `{page_name}_data`
- Use dot-notation for grouping related data
- Contains INPUT data only
- Expected text values go in locator files, NOT in test data

---

### 5. Test Case File (`tests/{feature_name}/TCS{NNN}_{description}.robot`)

```robot
*** Settings ***
Resource                ${CURDIR}${/}..${/}..${/}imports${/}import.resource
Test Teardown           Default test teardown
Force Tags              Regression    High

*** Test Cases ***
TCS{NNN} : {Description in Title Case}
    [Documentation]    TestcaseID : {test_management_tool_id}
    [Tags]             {featureNameCamelCase}{NNN}

    # Setup - Open app and login
    Open PigPro application
    Login with username and password then tap pin code    ${login_data["account_key"]}    ${login_data["password_key"]}

    # Navigate to target page
    home_page.Tap all menu icon
    see_all_page.Tap search in all menu page
    see_all_page.Search menu name    ${MENU.PAGE_NAME}
    see_all_page.Tap {page_name} menu in all menu page

    # Section: Verify page loaded
    {page_name}_page.Verify {page_name} page header displayed correctly

    # Section: Perform action
    {page_name}_page.Tap {element} in {page_name} page
    {page_name}_page.Input text in {field} field in {page_name} page    ${test_data["key"]}

    # Section: Verify result
    {page_name}_page.Verify {expected_result} displayed correctly in {page_name} page
```

#### Test Case Rules

- File name: `TCS{3-digit}_{description}.robot`
- Test Case Name: `TCS{3-digit} : {Description in Title Case}`
- `[Documentation]` MUST contain `TestcaseID : <id>`
- `[Tags]` format: `{featureNameCamelCase}{NNN}` (e.g., `saleOrder001`, `confirmSaleOrder002`)
- Use `# comment` to divide logical sections
- Access test data via `${variable_name["key"]}` syntax
- Force Tags include: `Regression`, priority tag (`High`, `Medium`, `Low`)

---

## Registration Checklist

When generating files for a new page/feature, register them in the import hub:

| New File | Register In |
|----------|-------------|
| `page_locators/{page}_locator.resource` | `imports/import_pages_locators.resource` |
| `keywords/pages/{page}_page.resource` | `imports/import_pages_keywords.resource` |
| `keywords/features/{feature}_feature.resource` | `imports/import_features_keywords.resource` |
| `test_data/{page}_test_data.yaml` | `imports/import.resource` (as `Variables`) |

### Import Registration Format

```robot
# In import_pages_locators.resource
Resource        ${CURDIR}${/}..${/}page_locators${/}{page_name}_locator.resource

# In import_pages_keywords.resource
Resource        ${CURDIR}${/}..${/}keywords${/}pages${/}{page_name}_page.resource

# In import_features_keywords.resource
Resource        ${CURDIR}${/}..${/}keywords${/}features${/}{feature_name}_feature.resource

# In import.resource (test data)
Variables       ${CURDIR}${/}..${/}test_data${/}{page_name}_test_data.yaml
```

---

## Common Keywords Available (from `common_keywords.resource`)

These shared keywords are available for use in page keywords:

| Keyword | Purpose |
|---------|---------|
| `Tap when ready` | Wait + Tap element |
| `Input text when ready` | Wait + Input text |
| `Get text when ready` | Wait + Get element text |
| `Scroll down until element is visible` | Scroll down to find element |
| `Default test teardown` | Screenshot on fail + Close app |
| `Open PigPro application` | Launch app based on device version |

---

## Existing Pages (for reference — do NOT duplicate)

| Page Name | Locator File | Page Keyword | Test Data |
|-----------|-------------|--------------|-----------|
| login | ✅ | ✅ | ✅ |
| home | ✅ | ✅ | ✅ |
| see_all | ✅ | ✅ | ✅ |
| check_house | ✅ | ✅ | ✅ |
| spray_medicine | ✅ | ✅ | ✅ |
| purchase_order | ✅ | ✅ | ✅ |
| sale_order | ✅ | ✅ | ✅ |
| confirm_sale_order | ✅ | ✅ | ✅ |
| pig_damage | ✅ | ✅ | ✅ |
| used_feed | ✅ | ✅ | ✅ |
| notification | ✅ | ✅ | — |
| create_qr_code | ✅ | ✅ | ✅ |
| transfer_out | ✅ (locator only) | — | ✅ |

---

## Existing Feature Keywords

| Feature Name | File |
|-------------|------|
| login | `login_feature.resource` |
| pig_damage | `pig_damage_feature.resource` |

---

## Existing Test Suites

| Feature Folder | Test Files |
|---------------|------------|
| `tests/login/` | `TCS001_Verify the user can be login to the system successfully.robot` |
| `tests/sale_order/` | `TCS001_Verify filer modal and require field displayed in sale order correctly.robot`, `TCS002_Verify create edit and cancel sale order successfully.robot` |
| `tests/check_house/` | (test files exist) |
| `tests/confirm_sale_order/` | (test files exist) |
| `tests/create_qr_code/` | (test files exist) |
| `tests/home/` | (test files exist) |
| `tests/notification/` | (test files exist) |
| `tests/pig_damage/` | (test files exist) |
| `tests/purchase_order/` | (test files exist) |
| `tests/used_feed/` | (test files exist) |

---

## Generation Instructions for AI

When asked to generate tests for a new page or feature:

1. **Ask for**: Page name, UI elements (content descriptions), user flows, and test scenarios
2. **Generate in order**:
   - Locator file → Page keywords → Test data → Feature keywords (if needed) → Test cases
3. **Follow naming conventions** exactly as documented above
4. **Register** all new files in the import hub
5. **Use TCS numbering** that does not conflict with existing files in the same feature folder
6. **Validate** that:
   - No cross-page locator usage
   - All locator variables align at column 52
   - Library calls align at column 52
   - No hardcoded values (use test data or locator variables)
   - Expected text is embedded in locator files, not test data
   - Tags use camelCase without underscore

---

## Quality Audit Criteria (Score ≥ 80/100 required)

| Category | What is checked |
|----------|----------------|
| Naming | Files, keywords, locators, test cases follow naming conventions |
| Structure | Proper 3-tier keyword architecture maintained |
| Imports | All resources properly registered in hub |
| Spacing | 4+ space separator, column 52 alignment |
| No dead code | No commented-out code blocks |
| Documentation | All test cases have `[Documentation]` with TestcaseID |
| Tags | Proper format, no duplicates |
| Locators | Correct strategy priority, no absolute XPath nesting |
