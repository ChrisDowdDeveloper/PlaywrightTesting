const { test, expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage').default;

let searchPage;

/**
 * Creates a fresh page and navigates to the homepage before each test
 */
test.beforeEach(async({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goto();
});

/**
 * Verifies that the user can search for an item and the item appears in the url
 */
test('user can search for an item and the item appears as a search parameter', async () => {
    await searchPage.performSearch('airplanes');
    expect(searchPage.page.url()).toContain('airplanes');
});

/**
 * Verifies that the user can apply a filter and the filter appears in the url
 */
test('user can apply a result filter and the filter appears as a url parameter', async () => {
    await searchPage.performSearch('shoes');
    await searchPage.applyFilter();
    expect(searchPage.page.url()).toMatch(/Shoe.*Size/);
});

/**
 * Verifies that the user can apply multiple filters and the filters appear in the url
 */
test('user can apply multiple filters and the filters appear as url parameters', async() => {
    await searchPage.performSearch('shoes');
    await searchPage.applyMultipleFilters();
    expect(searchPage.page.url()).toMatch(/Shoe.*Size.*Brand.*Nike.*adidas/);
});

/**
 * Verifies that the user can sort the results 
 */
test('user can sort the results', async() => {
    await searchPage.performSearch('shoes');
    const beforeSort = await searchPage.getSearchResults();
    await searchPage.selectSortOption('Time: ending soonest');
    const afterSort = await searchPage.getSearchResults();
    expect(beforeSort).not.toEqual(afterSort)
});

/**
 * Verifies that after searching for an item, they can search for another
 */
test('user can use the search bar for another item after already searching for 1 item', async() => {
    await searchPage.performSearch('airplanes');
    await searchPage.performSearch('games');
    expect(searchPage.page.url()).toContain('games')
});

/**
 * Verifies that the user cannot see any results for an item that doesn't exist
 */
test("user cannot see results for items that do not exist", async() => {
    await searchPage.performSearch('lasdkjfsadl');
    const noResults = await searchPage.noResults();
    expect(noResults).toBe('No exact matches found');
});

/**
 * Verifies that the user can see suggested items while typing
 */
test('user can see suggested items while searching in the search bar', async() => {
    const result = await searchPage.suggestedSearches("fire");
    expect(result[0]).toContain('fire');
});

