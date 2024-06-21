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

        await this.page.getByLabel('Sort selector. Best Match').click();

        await this.page.getByRole('link', { name: option }).click();
    }

    /**
     * Method to get the search results.
     * @returns {Promise<Array<string>>} - An array of search result identifiers (e.g., item titles or ids).
     */
    async getSearchResults() {

        await this.page.waitForSelector('.s-item');

        const searchResults = await this.page.$$('.s-item');

        const itemTitles = [];

        for (const result of searchResults) {
            const titleElement = await result.$('.s-item__title');
            const title = await titleElement.textContent();
            itemTitles.push(title);
        };

        return itemTitles;
    }

    /**
     * Method to look for a heading that says "No exact matches found"
     * @returns {string} - Returns a string of the heading "No exact matches found"
     */
    async noResults() {

        const result = await this.page.getByRole('heading', { name: 'No exact matches found' });
        
        return result.textContent();
    }

    /**
     * Method to search for an item and create an array of all the suggestions and return it
     * @param {string} partialItem - The partial item of a name
     * @returns {Array} - Returns an array of strings of the suggestions that come up
     */
    async suggestedSearches(partialItem) {
        await this.enterSearchQuery(partialItem);

        await this.page.waitForSelector('[role="option"]');

        const suggestions = await this.page.$$('[role="option"]');

        let allSuggestions = [];

        for (const suggestion of suggestions) {
            const text = await suggestion.textContent();
            allSuggestions.push(text);
        }

        return allSuggestions;
    }

}

export default SearchPage;