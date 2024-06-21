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

    // Method call to perform a search for airplanes
    await searchPage.performSearch('airplanes');

    // Assert that the current URL contains the word airplanes verifying that it searched properly
    expect(searchPage.page.url()).toContain('airplanes');
});

/**
 * Verifies that the user can apply a filter and the filter appears in the url
 */
test('user can apply a result filter and the filter appears as a url parameter', async () => {

    // Method call to perform a search for shoes
    await searchPage.performSearch('shoes');

    // Method call to apply a filter
    await searchPage.applyFilter();

    // Assert that the current URL contains shoes and size verifying that the search and filter was applied
    expect(searchPage.page.url()).toMatch(/Shoe.*Size/);
});

/**
 * Verifies that the user can apply multiple filters and the filters appear in the url
 */
test('user can apply multiple filters and the filters appear as url parameters', async() => {

    // Method call to perform a search for shoes
    await searchPage.performSearch('shoes');

    // Method call to apply multiple filters
    await searchPage.applyMultipleFilters();

    // Assert that the current URL contains shoes, size, and the brands from the applied filters
    expect(searchPage.page.url()).toMatch(/Shoe.*Size.*Brand.*Nike.*adidas/);
});

/**
 * Verifies that the user can sort the results 
 */
test('user can sort the results', async() => {

    // Method call to perform a search for shoes
    await searchPage.performSearch('shoes');

    // Method call to create an array of the search results before sorting
    const beforeSort = await searchPage.getSearchResults();

    // Method call to apply the sort for the listing that are ending the soonest
    await searchPage.selectSortOption('Time: ending soonest');

    // Method call to create an array of the search results after sorting
    const afterSort = await searchPage.getSearchResults();
    
    // Assert that the array before the sort does not exactly equal the array after the sort
    expect(beforeSort).not.toEqual(afterSort)
});

/**
 * Verifies that after searching for an item, they can search for another
 */
test('user can use the search bar for another item after already searching for 1 item', async() => {

    // Method call to perform a search for airplanes
    await searchPage.performSearch('airplanes');

    // Method call to perform a search for games
    await searchPage.performSearch('games');

    // Assert that the new URL contains "games"
    expect(searchPage.page.url()).toContain('games')
});

/**
 * Verifies that the user cannot see any results for an item that doesn't exist
 */
test("user cannot see results for items that do not exist", async() => {

    // Method call to perform a search for a random string of characters
    await searchPage.performSearch('lasdkjfsadl');

    // Method call to look for a no results found heading
    const noResults = await searchPage.noResults();

    // Assert that the method returned the heading "No exact matches found"
    expect(noResults).toBe('No exact matches found');
});

/**
 * Verifies that the user can see suggested items while typing
 */
test('user can see suggested items while searching in the search bar', async() => {

    // Method call to view all of the suggested searches using the word fire
    const result = await searchPage.suggestedSearches("fire");
    
    // Assert that the first element in the array that was returned of the suggestions contains the word fire
    expect(result[0]).toContain('fire');
});

