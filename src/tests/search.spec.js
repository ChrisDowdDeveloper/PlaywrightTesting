const { test, expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage').default;

let searchPage;

test.beforeEach(async({ page }) => {
    searchPage = new SearchPage(page);
    await page.goto('https://www.ebay.com');
});


test('test that basic search displays results', async ({ page }) => {
    await searchPage.performSearch('airplanes');
    expect(page.url()).toContain('airplanes');
});


test('test that applying a filter works as intended', async ({ page }) => {
    await searchPage.performSearch('shoes');
    await searchPage.applyFilter();
    expect(page.url()).toMatch(/Shoe.*Size/);
});


test('test that applying multiple filters to search results works as intended', async({ page }) => {
    await searchPage.performSearch('shoes');
    await searchPage.applyMultipleFilters();
    expect(page.url()).toMatch(/Shoe.*Size.*Brand.*Nike.*adidas/);
});

test.only('test that sorting search results works as inteded', async() => {
    await searchPage.performSearch('shoes');
    let sorted = await searchPage.selectSortOption('Time: ending soonest')
    expect(sorted)
});

test('test that users can search for more items after search results are displayed', async() => {

});

test("test that no results are displayed on non-existing items", () => {

});

test('test that suggested items are displayed when typing in search bar', async() => {

});

