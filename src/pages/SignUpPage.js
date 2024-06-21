/**
 * Class representing the sign up page of ebay
 */
class SignUpPage {

    /**
     * Creates a sign up page instance
     * @param {object} page - Playwright page object, represents a browser tab
     */
    constructor(page) {

        this.page = page;
    }

    /**
     * Method call to navigate to the signup page of ebay
     */
    async goto() {

        await this.page.goto("https://signup.ebay.com/pa/crte");
    }
    
    /**
     * Method call to enter a first name into the the first name field
     * @param {string} firstName - The first name to enter
     */
    async enterFirstName(firstName) {

        const firstNameField = await this.page.getByLabel('First name');

        firstNameField.click();

        firstNameField.fill(firstName);
    }

    /**
     * Method call to enter a last name into the last name field
     * @param {string} lastName - The last name to enter
     */
    async enterLastName(lastName) {

        const lastNameField = await this.page.getByLabel('Last name');

        await lastNameField.click();

        await lastNameField.fill(lastName);
    }

    /**
     * Method call to enter an email into the email field
     * @param {string} email - The email to enter into the email field
     */
    async enterEmail(email) {

        const emailField = await this.page.getByLabel('Email');

        await emailField.click();

        await emailField.fill(email);
    }

    /**
     * Method call to enter a password into the password field
     * @param {string} password - The password to enter 
     */
    async enterPassword(password) {

        const passwordField = await this.page.getByLabel('Password', { exact: true });

        await passwordField.click();

        await passwordField.fill(password);
    }

    /**
     * Method call to:
     * * Enter a password
     * * * Copy the password
     * * * * Navigate to the google homepage
     * * * * * Click the search bar and try to paste
     * @param {string} password - The password to enter
     * @returns - The value it pasted into the google search bar
     */
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

    /**
     * Method call to enter credentials to create an account
     * @param {string} firstName - The first name to enter 
     * @param {string} lastName - The last name to enter
     * @param {string} email - The email to enter
     * @param {string} password - The password to enter
     */
    async createAccount(firstName, lastName, email, password) {

        await this.enterFirstName(firstName);

        await this.enterLastName(lastName);

        await this.enterEmail(email);

        await this.enterPassword(password);

        await this.page.getByRole('button', { name: 'Create personal account' }).click();
    }

    /**
     * Method call to verify that the mobile phone heading is displayed
     * @returns - The content of the heading
     */
    async loggedInHomepage() {

        const addPhoneNumber = await this.page.getByRole('heading', { name: 'Add your phone number' });

        const headingText = await addPhoneNumber.textContent();

        return headingText;
    }

    /**
     * Method call to click the sign in from the create account page
     */
    async loginPageRedirect() {

        await this.page.getByRole('link', { name: 'Sign in' }).click();
    }

    /**
     * Method call to click the create business account from the create account page
     * @returns {Promise<string>} - Text content from the legal text at the bottom of the form
     */
    async createBusinessAccountRedirect() {

        await this.page.getByText('Business').click();

        const legalText = await this.page.locator('#legalTextId');

        return legalText.textContent();
    }

    /**
     * Method to enter an email, password and last name but no first name
     * @param {string} email - A valid email to enter
     * @param {string} password - A valid password to enter
     * @param {string} lastName - A valid last name to enter
     */
    async noFirstName(email, password, lastName) {

        await this.enterLastName(lastName);

        await this.enterEmail(email);

        await this.enterPassword(password);
    }

    /**
     * Method to enter an email, password, and first name but no last name
     * @param {string} email - A valid email to enter
     * @param {string} password - A valid password to enter
     * @param {string} firstName - A valid first name to enter
     */
    async noLastName(email, password, firstName) {

        await this.enterFirstName(firstName);

        await this.enterEmail(email);

        await this.enterPassword(password);
    }

    /**
     * Method to enter an invalid email address but a valid first name, last name, and password
     * @param {string} email - An invalid email address to enter
     * @param {string} password - A valid password to enter
     * @param {string} firstName - A valid first name to enter
     * @param {string} lastName - A valid last name to enter
     */
    async invalidEmail(email, password, firstName, lastName) {

        await this.enterFirstName(firstName);

        await this.enterLastName(lastName);

        await this.enterEmail(email);

        await this.enterPassword(password);
    }

    /**
     * Method to enter a valid password, first name, and last name but no email address
     * @param {string} password - A valid password to enter
     * @param {string} firstName - A valid first name to enter
     * @param {string} lastName - A valid last name to enter
     */
    async noEmail(password, firstName, lastName) {

        await this.enterFirstName(firstName);

        await this.enterLastName(lastName);

        await this.enterPassword(password);
    }

    /**
     * Method to enter a valid email, first name, and last name but an invalid password
     * @param {string} email - A valid email address to enter
     * @param {string} password - An invalid password to enter
     * @param {string} firstName - A valid first name to enter
     * @param {string} lastName - A valid last name to enter
     */
    async invalidPassword(email, password, firstName, lastName) {

        await this.enterFirstName(firstName);

        await this.enterLastName(lastName);

        await this.enterEmail(email);

        await this.enterPassword(password);
    }

    /**
     * Method to check the state of the button
     * @returns {Promise<boolean>} - True if the button is disabled, false if not
     */
    async buttonIsDisabled() {

        let button = await this.page.getByRole('button', { name: 'Create personal account' });

        return button.isDisabled();
    }

    /**
     * Method to verify that you cannot sign up with an existing email
     * @param {string} email 
     * @param {string} password 
     * @param {string} firstName 
     * @param {string} lastName 
     * @returns {Promise<boolean>} - True if a heading is found that says "Account already exists", false if not
     */
    async existingEmail(email, password, firstName, lastName) {

        await this.createAccount(firstName, lastName, email, password);

        const accountExists = await this.page.getByRole('heading', { name: "An account already exists" });
        
        return accountExists;
    }
}

export default SignUpPage;