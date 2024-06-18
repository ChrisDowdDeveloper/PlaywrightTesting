class SignUpPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("https://signup.ebay.com/pa/crte");
    }

    async enterFirstName(firstName) {
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

    async invalidFirstName(email, password, lastName) {
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    async invalidLastName(email, password, firstName, lastName) {
        await this.enterFirstName(firstName);
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    async invalidEmail(email, password, firstName, lastName) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    async noEmail(password, firstName, lastName) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPassword(password);
    }

    async invalidPassword(email, password, firstName, lastName) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    async buttonIsDisabled() {
        let button = await this.page.getByRole('button', { name: 'Create personal account' });
        return button.isDisabled();
    }
}

export default SignUpPage;