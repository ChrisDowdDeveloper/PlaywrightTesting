class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&sgfl=gh&ru=https%3A%2F%2Fwww.ebay.com%2F");
    }

    async pageLoadsCorrectly() {

    }

    async enterEmail(email) {
        await this.page.getByTestId(userid).click().fill(email);
    }
}

export default LoginPage;