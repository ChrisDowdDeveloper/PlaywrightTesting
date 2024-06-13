class SearchResults {
    constructor(page) {
        this.page = page;
        this.results = '';
    }

    async getResultsCount() {
        return this.page.$$eval(this.results, items => items.length);
    }
}

module.exports = SearchResults;