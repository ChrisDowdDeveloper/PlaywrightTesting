const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage').default;

let loginPage;

test.beforeEach(async({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto();
});

test.describe('Valid scenarios', () => {

    test('test that page loads correctly', async () => {
        
    });

    test('test that create account redirects correctly', async () => {

    });

    test('test that login works with valid email', async () => {

    });

});

test.describe('Invalid scenarios', async() => {

    test('test that entering invalid username displays error', async() => {

    });

    test('test that entering invalid email displays error', async () => {

    });

});