package tests;

import pages.RegistrationPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class SmokeTest {

    WebDriver driver;
    RegistrationPage page;

    @BeforeMethod
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://127.0.0.1:5500/index.html");
        page = new RegistrationPage(driver);
    }

    // ---------- Screenshot Helper ----------
    private void takeScreenshot(String fileName) {
        try {
            File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            File dest = new File("screenshots/" + fileName);
            Files.copy(src.toPath(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // ---------- NEGATIVE TEST ----------
    @Test
    public void negativeTest_MissingLastName() {

        page.fillFirstName("Kriti");
        // last name intentionally skipped
        page.fillEmail("kriti@gmail.com");
        page.fillPhone("9876543210");
        page.selectFemaleGender();
        page.acceptTerms();
        page.enableSubmit();
        page.submitForm();

        Assert.assertTrue(
                page.isLastNameErrorVisible(),
                "Last Name error should be visible"
        );

        takeScreenshot("error-state.png");
    }

    // ---------- POSITIVE TEST ----------
    @Test
    public void positiveTest_ValidRegistration() {

        page.fillFirstName("Kriti");
        page.fillLastName("Behl");
        page.fillEmail("kriti@gmail.com");
        page.fillPhone("9876543210");
        page.selectFemaleGender();
        page.selectCountry("India");
        page.fillPassword("Strong@123");
        page.acceptTerms();
        page.enableSubmit();
        page.submitForm();

        Assert.assertTrue(
                page.isSuccessMessageVisible(),
                "Success message should be visible"
        );

        takeScreenshot("success-state.png");
    }

    // ---------- FLOW C : FORM LOGIC VALIDATION ----------
    @Test
    public void flowC_FormLogicValidation() {

        // 1️⃣ Country → State update
        page.selectCountry("India");
        Assert.assertTrue(
                page.isStateDropdownEnabled(),
                "State dropdown should enable after selecting country"
        );

        // 2️⃣ State → City update
        page.selectState("Maharashtra");
        Assert.assertTrue(
                page.isCityDropdownEnabled(),
                "City dropdown should enable after selecting state"
        );
        page.selectCity("Mumbai");

        // 3️⃣ Password strength validation
        page.fillPassword("Test123");
        Assert.assertTrue(
                page.isPasswordStrengthDisplayed(),
                "Password strength indicator should appear"
        );

        // 4️⃣ Wrong confirm password → error expected
        page.fillConfirmPassword("Wrong123");
        page.enableSubmit();
        page.submitForm();

        Assert.assertTrue(
                page.isConfirmPasswordErrorVisible(),
                "Error should appear for mismatched passwords"
        );

        takeScreenshot("flowC-validation.png");
    }

    @AfterMethod
    public void tearDown() {
        driver.quit();
    }
}
