package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.Select;
import java.util.List;

public class RegistrationPage {

    WebDriver driver;

    public RegistrationPage(WebDriver driver) {
        this.driver = driver;
    }

    By firstName = By.id("firstName");
    By lastName = By.id("lastName");
    By email = By.id("email");
    By phone = By.id("phone");
    By femaleGender = By.xpath("//input[@name='gender' and @value='Female']");
    By country = By.id("country");
    By password = By.id("password");
    By confirmPassword = By.id("confirmPassword");
    By terms = By.id("terms");
    By submitBtn = By.id("submitBtn");
    By lastNameError = By.id("lastNameError");
    By successMessage = By.id("successMessage");
    By stateDropdown = By.id("state");
    By cityDropdown = By.id("city");
    By passwordStrength = By.id("passwordStrength");
    By confirmPasswordError = By.id("confirmPasswordError");


    public void fillFirstName(String value) {
        driver.findElement(firstName).sendKeys(value);
    }

    public void fillLastName(String value) {
        driver.findElement(lastName).sendKeys(value);
    }

    public void fillEmail(String value) {
        driver.findElement(email).sendKeys(value);
    }

    public void fillPhone(String value) {
        driver.findElement(phone).sendKeys(value);
    }

    public void selectFemaleGender() {
        driver.findElement(femaleGender).click();
    }

    public void selectCountry(String value) {
        new Select(driver.findElement(country)).selectByVisibleText(value);
    }

    public void fillPassword(String value) {
        driver.findElement(password).sendKeys(value);
        driver.findElement(confirmPassword).sendKeys(value);
    }

    public void acceptTerms() {
        driver.findElement(terms).click();
    }

    public void enableSubmit() {
        ((JavascriptExecutor) driver)
                .executeScript("document.getElementById('submitBtn').disabled=false;");
    }

    public void submitForm() {
        driver.findElement(submitBtn).click();
    }

    public boolean isLastNameErrorVisible() {
        return driver.findElement(lastNameError).isDisplayed();
    }

    public boolean isSuccessMessageVisible() {
        return driver.findElement(successMessage).isDisplayed();
    }
    public boolean isStateDropdownEnabled() {
        return driver.findElement(stateDropdown).isEnabled();
    }

    public boolean isCityDropdownEnabled() {
        return driver.findElement(cityDropdown).isEnabled();
    }

    public void selectState(String state) {
        new Select(driver.findElement(stateDropdown)).selectByVisibleText(state);
    }

    public void selectCity(String city) {
        new Select(driver.findElement(cityDropdown)).selectByVisibleText(city);
    }

    public boolean isPasswordStrengthDisplayed() {
        return driver.findElement(passwordStrength).isDisplayed();
    }

    public boolean isConfirmPasswordErrorVisible() {
        return driver.findElement(confirmPasswordError).isDisplayed();
    }

    public boolean isSubmitDisabled() {
        return !driver.findElement(submitBtn).isEnabled();
    }

    public void fillConfirmPassword(String value) {
        driver.findElement(confirmPassword).sendKeys(value);
    }

}
