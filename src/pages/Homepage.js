/**
 * Class that represents the homepage of ebay
 */
class Homepage {

    /**
     * Creates homepage instance
     * @param {object} page - Playwright page object which represents a browser tab 
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Method to navigate to the ebay homepage
     */
    async goto() {
        await this.page.goto('https://www.ebay.com');
    }

    /**
     * Method to check the visibility of the ebay logo
     * @returns {Promise<boolean>} - True if the logo is visbile, false if not
     */
    async isLogoVisible() {
        const logo = await this.page.getByRole('link', { name: 'eBay Home' });
        return logo.isVisible();
    }

    /**
     * Method to check the visiblilty of the search bar
     * @returns {Promise<boolean>} - True if the search bar is visible, false if not
     */
    async isSearchVisible() {
        const search = await this.page.getByPlaceholder('Search for anything')
        return search.isVisible();
    }

    /**
     * Method to check the visibility of the sign in link
     * @returns {Promise<boolean>} - True if the sign in link is visible, false if not
     */
    async isSignInLinkVisible() {
        const signInLink = await this.page.getByRole('link', { name: 'Sign in' });
        return signInLink.isVisible();
    }

    /**
     * Method to check the visibility of the shopping cart icon
     * @returns {Promise<boolean>} - True if the shopping cart icon is visible, false if not
     */
    async isCartVisible() {
        const cartIcon = await this.page.getByRole('link', { name: 'Your shopping cart' });
        return cartIcon.isVisible();
    }

    /**
     * Method to check the visiblity of a specific footer link
     * @param {string} linkName - The name of the footer link
     * @returns {Promise<boolean>} - True if the specific footer link is visible, false if not
     */
    async isFooterLinkVisible(linkName) {
        const footerLink = await this.page.getByRole('heading', { name: linkName }).getByRole('link');
        return footerLink.isVisible();
    }

    /**
     * Method to perform a search for a specific item
     * @param {string} item - The name of an item
     */
    async searchFor(item) {
        await this.page.getByPlaceholder('Search for anything').click();
        await this.page.getByPlaceholder('Search for anything').fill(item);
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    /**
     * Method call to click the Daily Deals link
     */
    async dailyDeals() {
        await this.page.getByRole('link', { name: 'Daily Deals' }).click();
    }

    /**
     * Method to click a specific navbar link
     * @param {string} linkName 
     */
    async navbar(linkName) {
        await this.page.getByRole('link', { name: linkName, exact: true }).click();
    }
}

export default Homepage;