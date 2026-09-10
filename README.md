# E-Commerce Test Automation Framework

End-to-end test automation framework for an e-commerce web application, built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** design pattern.

**Application under test:** [saucedemo.com](https://www.saucedemo.com) (public demo e-commerce site)

## Tech Stack
- **Language:** TypeScript
- **Framework:** Playwright Test Runner
- **Design Pattern:** Page Object Model (POM)
- **Test Data:** JSON-based, data-driven
- **CI/CD:** GitHub Actions
- **Reporting:** Playwright HTML Reporter

## Project Structure
```
ecommerce-playwright-framework/
├── pages/                       # Page Object classes
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                       # Test specs (20 test cases total)
│   ├── login.spec.ts            # TC-01 to TC-04
│   ├── products.spec.ts         # TC-05 to TC-08
│   ├── productDetails.spec.ts   # TC-09 to TC-10
│   ├── cart.spec.ts             # TC-11 to TC-14
│   ├── checkout.spec.ts         # TC-15 to TC-18
│   └── sessionAndResponsive.spec.ts # TC-19 to TC-20
├── data/
│   └── testData.json            # Centralized test data
├── .github/workflows/
│   └── playwright.yml           # CI pipeline
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Test Coverage (20 Test Cases)
| Module | Test Cases | Count |
|---|---|---|
| Login | Valid/invalid login, empty fields, locked-out user | 4 |
| Product Listing & Sorting | Load products, price/name sort | 4 |
| Product Details | Detail view accuracy, add to cart | 2 |
| Cart | Add/remove items, persistence, navigation | 4 |
| Checkout | Form validation, order summary, tax calc, order placement | 4 |
| Session & Responsive UI | Logout/session clear, mobile viewport rendering | 2 |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Run all tests
npm test

# 4. Run tests in headed (visible browser) mode
npm run test:headed

# 5. Run tests in interactive UI mode
npm run test:ui

# 6. View HTML report after a run
npm run test:report
```

## Run a Specific Module
```bash
npm run test:login
npm run test:cart
npm run test:checkout
```

## Continuous Integration
Every push and pull request to `main` automatically triggers the full suite via GitHub Actions (`.github/workflows/playwright.yml`), running across Chromium, Firefox, and a mobile viewport, with an HTML report uploaded as a build artifact.

## Key Highlights
- **Page Object Model** for maintainable, reusable locators and actions
- **Data-driven testing** via external JSON — no hardcoded credentials or product names in test logic
- **Cross-browser & mobile** coverage (Chromium, Firefox, Pixel 5/iPhone 12 viewports)
- **CI-integrated** with automatic HTML reporting on every run
- **Negative + positive scenarios** covering functional, regression, and validation testing
