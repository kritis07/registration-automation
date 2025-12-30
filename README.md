# Intelligent Registration System – Automation Project

## Objective
Develop a modern registration system with smart validations and automate testing using Selenium and TestNG.

---

## Features Implemented

### Web Application
- Responsive registration form
- Mandatory field validation
- Inline error messages and error summary
- Password strength indicator (Weak / Medium / Strong)
- Dynamic Country → State → City dropdowns
- Submit button disabled until form is valid
- Success message and form reset on successful submission

---

## Automation Framework
- Selenium WebDriver
- TestNG
- Java
- Page Object Model (POM)
- WebDriverManager

---

## Automated Test Scenarios

### Flow A – Negative Scenario
- Last Name skipped
- Validation error displayed
- Error field highlighted
- Screenshot captured: `error-state.png`

### Flow B – Positive Scenario
- All valid inputs provided
- Successful submission
- Success message displayed
- Screenshot captured: `success-state.png`

### Flow C – Form Logic Validation
- Country → State → City dependency validated
- Password strength indicator verified
- Confirm password mismatch validation
- Screenshot captured: `flowC-validation.png`

---

## How to Run
1. Open the project in IntelliJ IDEA
2. Start the HTML page using Live Server or local server
3. Run `SmokeTest.java` using TestNG
4. Screenshots are stored in `/screenshots`

---

## Author
Kriti Singh Behl

