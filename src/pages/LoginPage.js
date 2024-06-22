/**
 * Class that represents the login page of Ebay
 */
class LoginPage {

    /**
     * Creates a login page instance
     * @param {object} page - Playwright page object, represents a browser tab
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Method call to navigate to the signin page on ebay
     */
    async goto() {
        await this.page.goto("https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&sgfl=gh&ru=https%3A%2F%2Fwww.ebay.com%2F");
    }

    /**
     * Method to verify that page elements exist on the page
     */
    async pageLoadsCorrectly() {
        const emailOrUsername = await this.page.getByRole('textbox', { name: 'userId' });
        const facebook = await this.page.getByRole('button', { name: 'Continue with Facebook' });
        const google = await this.page.getByRole('button', { name: 'Continue with Google' });
        const apple = await this.page.getByRole('button', { name: 'Continue with Apple' });

        if(emailOrUsername && facebook && google && apple) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Method to enter a valid email into the email textbox
     * @param {string} email - The email to be used
     */
    async enterEmail(email) {
        await this.page.getByTestId('userid').click();
        await this.page.getByTestId('userid').fill(email);
    }

    /**
     * Method to click the sign in button
     */
    async clickSignInButton() {
        await this.page.getByTestId('signin-continue-btn').click();
    }

    /**
     * Method to enter the password into the password field and click th sign in button
     * @param {string} password 
     */
    async enterPassword(password) {
        await this.page.getByTestId('pass').click();
        await this.page.getByTestId('pass').fill(password);
        await this.page.getByRole('button', { name: 'Sign in' }).click()

    }

    /**
     * Method that combines the enterEmail method, signInButton method, and enterPassword method
     * @param {string} email - The email to use for the email field
     * @param {string} password  - The Password to use for the password field
     */
    async completeSignIn(email, password) {
        await this.enterEmail(email);
        await this.signInButton();
        await this.enterPassword(password);
    }

    /**
     * Method that finds the element on the login page that redirects you to the create account page and clicks it
     */
    async createAccountRedirect() {
        const link = await this.page.getByRole('link', { name: 'create an account' });
        await link.click();
    }

    /**
     * Method that finds the error message on the screen indicating it couldn't find that ebay account
     * @returns {boolean} - True if the error message was found, false if not
     */
    async invalidSignIn() {
        const error = await this.page.getByText('We couldn\'t find this eBay account.');
        return error;
    }

    /**
     * Method that clicks the cancel button for the "sign in easier prompt", then looks for the button that has the firstName parameter in it
     * @param {string} firstName - The first name of the person with the ebay account
     * @returns {boolean} - True if the button was found, False if not
     */
    async homepageRedirect(firstName) {
        await this.page.getByLabel('Cancel').click();
        const greeting = await this.page.getByRole('button', { name: `Hi ${firstName}!` });
        return greeting
    }

    /**
     * Method to sign out of the logged in account
     * @param {string} firstName - The first name of the user with the ebay account
     */
    async signOut(firstName) {
        await this.page.getByRole('button', { name: `Hi ${firstName}!` }).click();
        await this.page.getByRole('link', { name: 'Sign out' }).click();
    }

    /**
     * Method that looks for the remembered email / username of the user that was just signed in 
     * @returns {string} - The text content of the element with the ID of user-info
     */
    async rememberUsername() {
        await this.page.getByRole('link', { name: 'Sign in', exact: true }).click();
        const signIn = await this.page.locator('#user-info');
        return signIn.textContent();
    }

}

export default LoginPage;