const { test, expect } = require('@playwright/test');
const SignUpPage = require('../pages/SignUpPage').default;

let signUp;

// Defined test data
const email = "valoy85133@dovinou.com";
const password = "Obvi0uslyF4k3!";
const firstName = "Bob";
const lastName = "Bobington";
const invalidEmail = "InvalidEmail";

/**
 * Before each test, create the sign in page and navigate to it
 */
test.beforeEach(async({ page }) => {
    signUp = new SignUpPage(page);
    await signUp.goto();
});

/**
 * Grouping of tests for valid scenarios
 */
test.describe('Valid Scenarios', () => {

    /**
     * Test to verify that entering valid credentials creates an account
     */
    test('user can create an account using valid login credentials', async() => {
        await signUp.createAccount(firstName, lastName, email, password);
        const isLoggedIn = await signUp.loggedInHomepage(firstName);
        expect(isLoggedIn).toContain("Add your phone number");
    });

    /**
     * Test to verify that a user can click the "already have an account? sign in" link and be redirected to the login page
     */
    test('user can successfully be redirected to the login page from the create account page', async({ page }) => {
        await signUp.loginPageRedirect();
        expect(page.url()).toContain("https://signin.ebay.com/signin?sgn=reg&siteid=0&co_partnerId=0&UsingSSL=1&rv4=1&ru=https%3A%2F%2Fwww.ebay.com%2F&regUrl=https%3A%2F%2Fsignup.ebay.com%2Fpa%2Fcrte%3Fsiteid%3D0%26co_partnerId%3D0%26UsingSSL%3D1%26rv4%3D1%26ru%3Dhttps%253A%252F%252Fwww.ebay.com%252F%26_trksid%3Dp2487285.m5021.l46827")
    });

    /**
     * Test to verify that the password cannot be copied from the password field and be pasted elsewhere.
     */
    test("user cannot copy and paste the password", async () => {
        const pastedValue = await signUp.copyPassword(password);
        expect(pastedValue).not.toBe(password);
    });

    /**
     * Test to verify that clicking the "Create Business Account" gives the user the correct form
     */
    test('user can click create business account and the create business form is displayed', async() => {
        const createBusinessAcct = await signUp.createBusinessAccountRedirect();
        expect(createBusinessAcct).toContain('Create business account');
    });

    /**
     * Test to verify that a user cannot create an account with an email address that already exists in database
     */
    test('user is prompted that an email is already in use if trying to sign up with email', async() => {
        const createAttempt = await signUp.existingEmail("tokig42046@elahan.com", password, firstName, lastName);
        expect(createAttempt).toBeTruthy();
    });

});


/**
 * Grouping of tests for invalid scenarios
 */
test.describe('Invalid Scenarios', () => {

    /**
     * Test to verify that the user cannot create an account if the First Name field is empty
     */
    test("user cannot create an account without a first name", async() => {
        await signUp.noFirstName(email, password, lastName);
        const buttonState = await signUp.buttonIsDisabled();
        expect(buttonState).toBeTruthy();
    });

    /**
     * Test to verify that the user cannot create an account if the Last Name field is empty
     */
    test("user cannot create an account without a last name", async () => {
        await signUp.noLastName(email, password, firstName);
        const buttonState = await signUp.buttonIsDisabled();
        expect(buttonState).toBeTruthy()
    });

    /**
     * Test to verify that the user cannot create an account if the Email field isn't formatted properly
     */
    test("user cannot create an account with an invalid email format", async() => {
        await signUp.invalidEmail(invalidEmail, password, firstName, lastName);
        const buttonState = await signUp.buttonIsDisabled();
        expect(buttonState).toBeTruthy()
    });

    /**
     * Test to verify that the user cannot create an account if the Email field is empty
     */
    test('user cannot create an account without an email', async() => {
        await signUp.noEmail(password, firstName, lastName);
        const buttonState = await signUp.buttonIsDisabled();
        expect(buttonState).toBeTruthy()
    });

    /**
     * Test to verify that the user cannot create an account if the password doesn't contain a number or special character
     */
    test("user cannot create an account without at least 1 number or special character in the password", async() => {
        await signUp.invalidPassword(email, "ObviouslyFake", firstName, lastName);
        const buttonState = await signUp.buttonIsDisabled();
        expect(buttonState).toBeTruthy()
    });

    /**
     * Test to verify that the user cannot create an account without at least 1 capital letter in the password
     */
    test("user cannot create an account without at least 1 capital letter in the password", async() => {
        await signUp.invalidPassword(email, "obvi0uslyf4k3!", firstName, lastName);
        const buttonState = await signUp.buttonIsDisabled();
        expect(buttonState).toBeTruthy()
    });

    /**
     * Test to verify that the user cannot create an account without at least 1 letter in the password
     */
    test("user cannot create an account without at least 1 letter in the password", async() => {
        await signUp.invalidPassword(email, "08^10*514324$5", firstName, lastName);
        const buttonState = await signUp.buttonIsDisabled();
        expect(buttonState).toBeTruthy()
    });

    /** 
     * Test to verify that the user cannot create an account if the password is less than 8 characters
     */
    test("user cannot create an account without at least 8 characters in the password", async() => {
        await signUp.invalidPassword(email, "Obv10s", firstName, lastName);
        const buttonState = await signUp.buttonIsDisabled();
        expect(buttonState).toBeTruthy()
    });

});