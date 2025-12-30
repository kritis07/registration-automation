const form = document.getElementById("registrationForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const submitBtn = document.getElementById("submitBtn");

const passwordStrengthText = document.getElementById("passwordStrength");
const stateDropdown = document.getElementById("state");
const cityDropdown = document.getElementById("city");

const locationData = {
    India: {
        Maharashtra: ["Mumbai", "Pune"],
        Karnataka: ["Bengaluru", "Mysuru"]
    },
    USA: {
        California: ["Los Angeles", "San Francisco"],
        Texas: ["Houston", "Dallas"]
    }
};

function showErrorSummary(errors) {
    const errorSummary = document.getElementById("errorSummary");

    if (errors.length === 0) {
        errorSummary.style.display = "none";
        errorSummary.innerHTML = "";
        return;
    }

    errorSummary.style.display = "block";
    errorSummary.innerHTML =
        "<b>Please fix the following errors:</b><ul>" +
        errors.map(err => `<li>${err}</li>`).join("") +
        "</ul>";
}



function checkPasswordStrength() {
    const value = password.value;
    passwordStrengthText.className = "";

    if (value.length === 0) {
        passwordStrengthText.innerText = "";
        return;
    }

    // STRONG first
    if (
        value.length >= 6 &&
        /[A-Za-z]/.test(value) &&
        /\d/.test(value) &&
        /[@$!%*?&]/.test(value)
    ) {
        passwordStrengthText.innerText = "Strong password";
        passwordStrengthText.classList.add("strong");
    }
    // MEDIUM second
    else if (
        value.length >= 6 &&
        /[A-Za-z]/.test(value) &&
        /\d/.test(value)
    ) {
        passwordStrengthText.innerText = "Medium password";
        passwordStrengthText.classList.add("medium");
    }
    // WEAK last
    else {
        passwordStrengthText.innerText = "Weak password";
        passwordStrengthText.classList.add("weak");
    }
}



function checkFormValidity() {
    let isValid = true;

    if (firstName.value.trim() === "") isValid = false;
    if (lastName.value.trim() === "") isValid = false;
    if (email.value.trim() === "") isValid = false;
    if (phone.value.trim() === "") isValid = false;
    if (password.value.trim() === "") isValid = false;
    if (confirmPassword.value.trim() === "") isValid = false;

    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) isValid = false;

    if (!terms.checked) isValid = false;

    // ✅ THIS LINE MUST EXIST
    submitBtn.disabled = !isValid;
}

firstName.addEventListener("input", checkFormValidity);
lastName.addEventListener("input", checkFormValidity);
email.addEventListener("input", checkFormValidity);
phone.addEventListener("input", checkFormValidity);
password.addEventListener("input", checkFormValidity);
confirmPassword.addEventListener("input", checkFormValidity);
terms.addEventListener("change", checkFormValidity);
password.addEventListener("input", () => {
    checkPasswordStrength();
    checkFormValidity();
});

confirmPassword.addEventListener("input", checkFormValidity);

country.addEventListener("change", function () {
    const selectedCountry = country.value;

    // Reset state & city
    stateDropdown.innerHTML = '<option value="">Select State</option>';
    cityDropdown.innerHTML = '<option value="">Select City</option>';
    cityDropdown.disabled = true;

    if (selectedCountry === "") {
        stateDropdown.disabled = true;
        return;
    }

    // Populate states
    const states = Object.keys(locationData[selectedCountry]);
    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateDropdown.appendChild(option);
    });

    stateDropdown.disabled = false;
});

stateDropdown.addEventListener("change", function () {
    const selectedCountry = country.value;
    const selectedState = stateDropdown.value;

    cityDropdown.innerHTML = '<option value="">Select City</option>';

    if (selectedState === "") {
        cityDropdown.disabled = true;
        return;
    }

    const cities = locationData[selectedCountry][selectedState];
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityDropdown.appendChild(option);
    });

    cityDropdown.disabled = false;
});




document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener("change", checkFormValidity);
});




form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop form from refreshing

    document.getElementById("successMessage").style.display = "none";


    let hasError = false;
    let errors = [];


    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.innerText = "");
    document.querySelectorAll("input, select").forEach(el => el.classList.remove("error-border"));

    // First Name
    if (firstName.value.trim() === "") {
    document.getElementById("firstNameError").innerText = "First name is required";
    firstName.classList.add("error-border");
    errors.push("First Name is required");
    hasError = true;
   }


    // Last Name
    if (lastName.value.trim() === "") {
        document.getElementById("lastNameError").innerText = "Last name is required";
        lastName.classList.add("error-border");
        errors.push("Last Name is required");
        hasError = true;
    }

    // Email
    if (email.value.trim() === "") {
        document.getElementById("emailError").innerText = "Email is required";
        email.classList.add("error-border");
        errors.push("Email is required");
        hasError = true;
    }

    // Phone
    if (phone.value.trim() === "") {
        document.getElementById("phoneError").innerText = "Phone number is required";
        phone.classList.add("error-border");
        errors.push("Phone Number is required");
        hasError = true;
    }

    // Gender
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
        document.getElementById("genderError").innerText = "Please select gender";
        errors.push("Gender is required");
        hasError = true;
    }

    // Password
    if (password.value.trim() === "") {
        document.getElementById("passwordError").innerText = "Password is required";
        password.classList.add("error-border");
        errors.push("Password is required");
        hasError = true;
    }

    // Confirm Password
    if (confirmPassword.value.trim() === "") {
        document.getElementById("confirmPasswordError").innerText = "Confirm your password";
        confirmPassword.classList.add("error-border");
        hasError = true;
    }
    if (password.value !== confirmPassword.value) {
    document.getElementById("confirmPasswordError").innerText = "Passwords do not match";
    confirmPassword.classList.add("error-border");
    errors.push("Passwords do not match");
    hasError = true;
    }


    // Terms
    if (!terms.checked) {
        document.getElementById("termsError").innerText = "You must accept terms";
        errors.push("You must accept Terms & Conditions");
        hasError = true;
    }

    showErrorSummary(errors);
    if (!hasError) {
    document.getElementById("successMessage").style.display = "block";

    // Reset form
    form.reset();

    // Reset dropdowns
    stateDropdown.innerHTML = '<option value="">Select State</option>';
    cityDropdown.innerHTML = '<option value="">Select City</option>';
    stateDropdown.disabled = true;
    cityDropdown.disabled = true;

    // Clear password strength
    passwordStrengthText.innerText = "";

    // Disable submit again
    //submitBtn.disabled = true;
}

});
