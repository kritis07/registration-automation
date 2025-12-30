# Intelligent Registration System – Automation Assignment

## Objective
Develop a modern registration system with client-side validations and automate testing using Selenium.

---

## Tech Stack
- HTML, CSS, JavaScript
- Selenium WebDriver (Java)
- TestNG
- Maven
- ChromeDriver
- OBS (screen recording)

---

## Part 1: Web Application
The registration form includes:
- Mandatory fields validation
- Inline error messages
- Error summary at top
- Password strength indicator
- Dynamic Country → State → City dropdowns
- Terms & Conditions validation
- Success message with form reset

---

## Part 2: Automation Testing

### Automation Flow A – Negative Scenario
- Missing Last Name
- Error message validated
- Screenshot captured (`error-state.png`)

### Automation Flow B – Positive Scenario
- All valid inputs
- Successful submission
- Screenshot captured (`success-state.png`)

### Automation Flow C – Form Logic Validation
- Country → State update
- State → City update
- Password strength check
- Confirm password mismatch validation
- Submit button validation
- Screenshot captured (`flowC-validation.png`)

---

## How to Run Automation
1. Start local server for web page
2. Open automation project in IntelliJ
3. Run `SmokeTest.java`
4. Screenshots auto-generated

---

## Deliverables
- Source code (HTML, CSS, JS)
- Selenium automation scripts
- Screenshots
- Execution video
