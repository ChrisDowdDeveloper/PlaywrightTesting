require('dotenv').config();
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage').default;

let loginPage;

/**
 *  Initializes the login page object and navigates to the login page before each test
 */
test.beforeEach(async({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

/**
 * Group of tests for Valid test case scenarios
 */
test.describe('Valid scenarios', () => {

    /**
    * Verifies the user can view login page elements
    */
    test('user can view the page elements', async () => {
        let pageLoad = await loginPage.pageLoadsCorrectly();
        expect(pageLoad).toBeTruthy();
    });

    /**
     * Verifies the user can be redirected to create an account from the login page
     */
    test('user can be redirected to the create account page from the login page', async () => {
        await loginPage.createAccountRedirect();
        expect(loginPage.page.url()).toBe("https://signup.ebay.com/pa/crte?siteid=0&co_partnerId=0&UsingSSL=1&rv4=1&ru=https%3A%2F%2Fwww.ebay.com%2F&signInUrl=https%3A%2F%2Fsignin.ebay.com%2Fsignin%3Fsgn%3Dreg%26siteid%3D0%26co_partnerId%3D0%26UsingSSL%3D1%26rv4%3D1%26ru%3Dhttps%253A%252F%252Fwww.ebay.com%252F&_trksid=p2487285.m5021.l46827");
    });

    /**
    * Verifies that the user can log in with valid credentials
    */
    test('user can login with valid credentials', async () => {
        await loginPage.completeSignIn(process.env.EBAY_EMAIL, process.env.EBAY_PASSWORD);
        const loggedIn = await loginPage.homepageRedirect("Christopher");
        expect(loggedIn).toBeTruthy();
    });


    /**
     * Verifies when the user signs out his email is remembered
     */
    test('users email is remembered after logging out', async() => {
        await loginPage.completeSignIn(process.env.EBAY_EMAIL, process.env.EBAY_PASSWORD);
        await loginPage.signOut("Christopher");
        const credential = await loginPage.rememberUsername();
        expect(credential).toBe(process.env.EBAY_EMAIL);
    });

});

/**
 * Group of tests for invalid test case scenarios
 */
test.describe('Invalid scenarios', async() => {

    /**
    * Verifies that the user cannot login with an invalid email
    */
    test('user cannot login with an invalid email', async() => {
        await loginPage.enterEmail("fakeuser4321@gmail.com");
        await loginPage.clickSignInButton();
        const invalid = await loginPage.invalidSignIn();
        expect(invalid).toBeTruthy();
    });

    /**
    * Verifies that the user cannot login with an invalid username
    */
    test('user cannot login with an invalid username', async () => {

        // Method call to enter a non existsing username
        await loginPage.enterEmail("fakeuser1234");
        await loginPage.clickSignInButton();
        const invalid = await loginPage.invalidSignIn();
        expect(invalid).toBeTruthy();
    });

    /**
    * Verifies that the user cannot login with an invalid password
    */
    test('user cannot login with an invalid password', async() => {
        await loginPage.enterEmail(process.env.EBAY_EMAIL);
        await loginPage.clickSignInButton();
        await loginPage.enterPassword("N0tTh3P4ssw0rd!");
        const invalid = await loginPage.invalidSignIn();
        expect(invalid).toBeTruthy();
    });

});