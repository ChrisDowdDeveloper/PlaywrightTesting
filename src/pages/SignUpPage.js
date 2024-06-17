class SignUpPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("https://signup.ebay.com/pa/crte?siteid=0&co_partnerId=0&UsingSSL=1&rv4=1&ru=https%3A%2F%2Fwww.ebay.com%2F&signInUrl=https%3A%2F%2Fsignin.ebay.com%2Fsignin%3Fsgn%3Dreg%26siteid%3D0%26co_partnerId%3D0%26UsingSSL%3D1%26rv4%3D1%26ru%3Dhttps%253A%252F%252Fwww.ebay.com%252F&_trksid=p2487285.m5021.l46827");
    }

    async enterFirstName(firstName) {
        await this.page.pause();
        const firstNameField = await this.page.getByLabel('First name')
        firstNameField.click()
        firstNameField.fill(firstName);
    }

    async enterLastName(lastName) {
        const lastNameField = await this.page.getByLabel('Last name')
        await lastNameField.click()
        await lastNameField.fill(lastName);
    }

    async enterEmail(email) {
        const emailField = await this.page.getByLabel('Email')
        await emailField.click()
        await emailField.fill(email);
    }

    async enterPassword(password) {
        const passwordField = await this.page.getByLabel('Password', { exact: true })
        await passwordField.click();
        await passwordField.fill(password);
    }

    async copyPassword(password) {
        await this.enterPassword(password);
        await this.page.getByLabel('Password', { exact: true }).press('ControlOrMeta+a');
        await this.page.getByLabel('Password', { exact: true }).press('ControlOrMeta+c');
        await this.page.goto('https://www.google.com');
        const searchInput = await this.page.getByLabel('Search', { exact: true });
        await searchInput.click();
        await searchInput.press('ControlOrMeta+v');
        const pastedValue = await searchInput.inputValue();
        return pastedValue;
    }

    async createAccount(firstName, lastName, email, password) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);

        await this.page.getByRole('button', { name: 'Create personal account' }).click();
    }

    async loggedInHomepage() {
        const addPhoneNumber = await this.page.getByRole('heading', { name: 'Add your phone number' });
        const headingText = await addPhoneNumber.textContent();
        return headingText;
    }

    async loginPageRedirect() {
        await this.page.pause();
        await this.page.getByRole('link', { name: 'Sign in' }).click();
    }

    async createBusinessAccountRedirect() {
        await this.page.pause();
        await this.page.getByText('Business').click();
        const legalText = await this.page.locator('#legalTextId');
        return legalText.textContent();
    }
    
}

export default SignUpPage;