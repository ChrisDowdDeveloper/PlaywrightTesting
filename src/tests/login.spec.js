const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage').default;

let loginPage;

/**
 * 
 */
test.beforeEach(async({ page }) => {
    
    //
    loginPage = new LoginPage(page);

    //
    await page.goto();
});

/**
 * 
 */
test.describe('Valid scenarios', () => {

    /**
    * Verifies the user can view login page elements
    */
    test('user can view the page elements', async () => {
        //TODO - finish test
    });

    /**
     * Verifies the user can be redirected to create an account from the login page
     */
    test('user can be redirected to the create account page from the login page', async () => {
        //TODO - finish test
    });

    /**
    * Verifies that the user can log in with valid credentials
    */
    test('user can login with valid credentials', async () => {
        //TODO - finish test
    });

    /**
    * Verifies the user cannot copy and paste their password
    */
    test('user cannot copy and paste password', async() => {
        //TODO - finish test
    });

});

/**
 * 
 */
test.describe('Invalid scenarios', async() => {

    /**
    * Verifies that the user cannot login with an invalid username
    */
    test('user cannot login with an invalid username', async() => {
        //TODO - finish test
    });

    /**
    * Verifies that the user cannot login with an invalid email
    */
    test('user cannot login with an invalid email', async () => {
        //TODO - finish test
    });

    /**
    * Verifies that the user cannot login with an invalid password
    */
    test('user cannot login with an invalid password', async() => {
        //TODO - finish test
    });

});