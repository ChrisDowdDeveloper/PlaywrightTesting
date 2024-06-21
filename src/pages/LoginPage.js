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
     * @param {string} email 
     */
    async enterEmail(email) {
        await this.page.getByTestId('userid').click();
        await this.page.getByTestId('userid').fill(email);
    }

    async signInButton() {
        await this.page.getByTestId('signin-continue-btn').click();
    }

    async enterPassword(password) {
        await this.page.getByTestId('pass').click();
        await this.page.getByTestId('pass').fill(password);
        await this.page.getByRole('button', { name: 'Sign in' }).click()

    }

    async completeSignIn(email, password) {
        await this.enterEmail(email);
        await this.signInButton();
        await this.enterPassword(password);
    }

    async createRedirect() {

        const link = await this.page.getByRole('link', { name: 'create an account' });
        await link.click();
    }

    async invalidSignIn() {

        const error = await this.page.getByText('We couldn\'t find this eBay account.');
        return error;
    }

    async homepageRedirect(firstName) {
        await this.page.getByLabel('Cancel').click();
        const greeting = await this.page.getByRole('button', { name: `Hi ${firstName}!` });
        return greeting
    }

    async signOut(firstName) {
        await this.page.pause();
        await this.page.getByRole('button', { name: `Hi ${firstName}!` }).click();
        await this.page.getByRole('link', { name: 'Sign out' }).click();
    }

    async rememberUsername() {
        await this.page.getByRole('link', { name: 'Sign in', exact: true }).click();
        const signIn = await this.page.locator('#user-info');
        await this.page.pause();
        return signIn.textContent();
    }

}

export default LoginPage;