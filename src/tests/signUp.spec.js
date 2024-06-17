const { test, expect } = require('@playwright/test');
const SignUpPage = require('../pages/SignUpPage').default;

let signUp;

/**
 * Before each test, create the sign in page and navigate to it
 */
test.beforeEach(async({ page }) => {

    // Initialize the SignUpPage object with the given page
    signUp = new SignUpPage(page);

    // Navigate to the sign-up page.
    await signUp.goto();
});

/**
 * Grouping of tests for valid scenarios
 */
test.describe('Valid Scenarios', () => {

    /**
     * Test to verify that entering valid credentials creates an account
     */
    test('test that entering valid credentials creates an account', async() => {

        // Defined test data
        const email = "valoy85133@dovinou.com";
        const password = "Obvi0uslyF4k3!";
        const firstName = "Bob";
        const lastName = "Bobington";

        // Method call to create an account with the defined test data
        await signUp.createAccount(firstName, lastName, email, password);

        // Method call to verify if the user is redirected to page asking for a phone number
        const isLoggedIn = await signUp.loggedInHomepage(firstName);

        // Assert that the user is prompted to add their phone number as the final step to create account.
        expect(isLoggedIn).toContain("Add your phone number");
    });

    /**
     * Test to verify that a user can click the "already have an account? sign in" link and be redirected to the login page
     */
    test('test that redirect to sign in page works', async({ page }) => {

        // Method call to redirect the user to the login page
        await signUp.loginPageRedirect();

        // Assert that the user was redirected to the proper URL by comparing the current URL to the login page URL.
        expect(page.url()).toContain("https://signin.ebay.com/signin?sgn=reg&siteid=0&co_partnerId=0&UsingSSL=1&rv4=1&ru=https%3A%2F%2Fwww.ebay.com%2F&regUrl=https%3A%2F%2Fsignup.ebay.com%2Fpa%2Fcrte%3Fsiteid%3D0%26co_partnerId%3D0%26UsingSSL%3D1%26rv4%3D1%26ru%3Dhttps%253A%252F%252Fwww.ebay.com%252F%26_trksid%3Dp2487285.m5021.l46827")
    });

    /**
     * Test to verify that the password cannot be copied from the password field and be pasted elsewhere.
     */
    test("test that password cannot be copied and pasted", async () => {

        // Defined password data
        const password = 'Obvi0uslyF4k3!'

        // Method call to copy and paste the defined password data
        const pastedValue = await signUp.copyPassword(password);

        // Assert that the attempted copy and paste of the password does not match the defined password data
        expect(pastedValue).not.toBe(password);
    });

    /**
     * Test to verify that clicking the "Create Business Account" gives the user the correct form
     */
    test('test that create business account button works', async() => {

        // Method call to click the "Create Business Account" button
        const createBusinessAcct = await signUp.createBusinessAccountRedirect();

        // Assert that the legal text at the bottom includes "Create business account" which verifies that the form was properly changed
        expect(createBusinessAcct).toContain('Create business account');
    });

});


/**
 * Grouping of tests for invalid scenarios
 */
test.describe('Invalid Scenarios', () => {

    /**
     * Test to verify that the user cannot create an account if the First Name field has less than 2 characters
     */
    test("test that create account doesn't work if first name is less than 2 characters", async() => {

    });

    /**
     * Test to verify that the user cannot create an account if the Last Name field has less than 2 characters
     */
    test("test that create account doesn't work if last name is less than 2 characters", async () => {

    });

    /**
     * Test to verify that the user cannot create an account if the Email field has less than 2 characters
     */
    test("test that create account doesn't work with an invalid email", async() => {

    });

    /**
     * Test to verify that the user cannot create an account if the password doesn't contain a number or special character
     */
    test("test that create account doesn't work without at least 1 number or special character in password", async() => {

    });

    /**
     * Test to verify that the user cannot create an account without at least 1 capital letter in the password
     */
    test("test that create account doesn't work without at least 1 capital letter in password", async() => {

    });

    /**
     * Test to verify that the user cannot create an account without at least 1 letter in the password
     */
    test("test that create account doesn't work without at least 1 letter in password", async() => {

    });

    /**
     * Test to verify that the user cannot create an account if the password is less than 8 characters
     */
    test("test that create account doesn't work if the password length is less than 8 characters", async() => {

    });

});