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

    }

    /**
     * Method to enter a valid email into the email textbox
     * @param {string} email 
     */
    async enterEmail(email) {
        await this.page.getByTestId(userid).click().fill(email);
    }
}

export default LoginPage;