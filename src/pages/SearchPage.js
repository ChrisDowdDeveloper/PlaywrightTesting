/**
 * Class representing the search bar on the homepage of ebay
 */
class SearchPage {

    /**
     * Creates an instance of the homepage of ebay to make use of the search bar
     * @param {object} page - Playwright page object, represents a browser tab
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Method to navigate to the homepage of ebay
     */
    async goto() {
        await this.page.goto("https://www.ebay.com");
    }

    /**
     * Method to search for a specific item
     * @param {string} item - The item to search for
     */
    async enterSearchQuery(item) {
        await this.page.getByPlaceholder('Search for anything').click();
        await this.page.getByPlaceholder('Search for anything').fill(item);
    }

    /**
     * Method to click the search button
     */
    async clickSearchButton() {
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    /**
     * Method that calls th enterSearchQuery method and the clickSearchButton method
     * Combines it into one method
     * @param {string} item - The item to search for
     */
    async performSearch(item) {
        await this.enterSearchQuery(item);
        await this.clickSearchButton();
    }

    /**
     * Method to apply a single filter
     */
    async applyFilter() {
        await this.page.getByLabel('10.5', { exact: true }).check();
    }

    /**
     * Method to apply multiple filters
     */
    async applyMultipleFilters() {
        await this.applyFilter();
        await this.page.getByLabel('Nike', { exact: true }).check();
        await this.page.getByLabel('adidas', { exact: true }).check();
    }
    

    /**
     * Method to sort results by a specific option
     * @param {string} option - The option to sort by
     */
    async selectSortOption(option) {
        await this.page.pause();
        await this.page.getByLabel('Sort selector. Best Match').click();
        await this.page.getByRole('link', { name: option }).click();
    }


}

export default SearchPage;