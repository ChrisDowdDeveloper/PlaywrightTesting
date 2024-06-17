const { test, expect } = require('@playwright/test');
const SignUpPage = require('../pages/SignUpPage').default;

let signUp;

test.beforeEach(async({ page }) => {
    signUp = new SignUpPage(page);
    await signUp.goto();
});

test.describe('Valid Scenarios', () => {

    test('test that entering valid credentials creates an account', async() => {
        const email = "valoy85133@dovinou.com";
        const password = "Obvi0uslyF4k3!";
        const firstName = "Bob";
        const lastName = "Bobington";
        await signUp.createAccount(firstName, lastName, email, password);

        const isLoggedIn = await signUp.loggedInHomepage(firstName);

        expect(isLoggedIn).toContain("Add your phone number");
    });

    test('test that redirect to sign in page works', async({ page }) => {
        await signUp.loginPageRedirect();
        expect(page.url()).toContain("https://signin.ebay.com/signin?sgn=reg&siteid=0&co_partnerId=0&UsingSSL=1&rv4=1&ru=https%3A%2F%2Fwww.ebay.com%2F&regUrl=https%3A%2F%2Fsignup.ebay.com%2Fpa%2Fcrte%3Fsiteid%3D0%26co_partnerId%3D0%26UsingSSL%3D1%26rv4%3D1%26ru%3Dhttps%253A%252F%252Fwww.ebay.com%252F%26_trksid%3Dp2487285.m5021.l46827")
    });

    test("test that password cannot be copied and pasted", async () => {
        const password = 'Obvi0uslyF4k3!'
        const pastedValue = await signUp.copyPassword(password);
        expect(pastedValue).not.toBe(password);
    });

    test('test that create business account button works', async() => {
        const createBusinessAcct = await signUp.createBusinessAccountRedirect();
        expect(createBusinessAcct).toContain('Create business account');
    });

});

test.describe('Invalid Scenarios', () => {

    test("test that create account doesn't work if first name is less than 2 characters", async() => {

    });

    test("test that create account doesn't work if last name is less than 2 characters", async () => {

    });

    test("test that create account doesn't work with an invalid email", async() => {

    });

    test("test that create account doesn't work without at least 1 number in password", async() => {

    });

    test("test that create account doesn't work without at least 1 capital letter in password", async() => {

    });

    test("test that create account doesn't work without at least 1 special character in password", async() => {

    });

});