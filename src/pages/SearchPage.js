class SearchPage {
    constructor(page) {
        this.page = page;
    }

    async enterSearchQuery(item) {
        await this.page.getByPlaceholder('Search for anything').click();
        await this.page.getByPlaceholder('Search for anything').fill(item);
    }

    async clickSearchButton() {
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    async performSearch(item) {
        await this.enterSearchQuery(item);
        await this.clickSearchButton();
    }

    async applyFilter() {
        await this.page.getByLabel('10.5', { exact: true }).check();
    }

    async applyMultipleFilters() {
        await this.applyFilter();
        await this.page.getByLabel('Nike', { exact: true }).check();
        await this.page.getByLabel('adidas', { exact: true }).check();
    }
    

    async selectSortOption(option) {
        await this.page.pause();
        await this.page.getByLabel('Sort selector. Best Match').click();
        await this.page.getByRole('link', { name: option }).click();
    }


}

export default SearchPage;