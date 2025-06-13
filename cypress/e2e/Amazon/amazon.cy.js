const HomePage = require('../../pages/amazon/HomePage')
const SearchResultsPage = require('../../pages/amazon/SearchResultsPage')
const ProductDetailsPage = require('../../pages/amazon/ProductDetailsPage')

describe('E2E - Amazon Chair Search', () => {
    const homePage = new HomePage()
    const searchResultsPage = new SearchResultsPage()
    const productDetailsPage = new ProductDetailsPage()

    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
        Cypress.on('uncaught:exception', () => false)

        // Initialize default test results
        cy.wrap({
            searchedItem: 'chair',
            sortedBy: 'price-desc-rank',
            selectedPosition: 'rightmost-first-row-non-ad',
            finalProductName: 'Test not completed',
            finalProductPrice: 'Test not completed',
            status: 'initialized'
        }).as('testResults')
    })

    it('Search chair, sort by highest price, select rightmost non-ad item', () => {
        // Step 1: Visit Amazon and search for chair
        homePage.visitAmazon()
        homePage.searchItem('chair')
        
        // Step 2: Validate search results and sort by highest price
        searchResultsPage.validateSearchResultsPage()
        searchResultsPage.sortByPriceHighToLow()
        
        // Step 3: Select rightmost non-ad item from first row
        searchResultsPage.selectRightmostNonAdItem()
        
        // Step 4: Get selected product info and validate on product page
        searchResultsPage.getSelectedProductInfo().then((selectedProduct) => {
            // Step 5: Validate product details on product page
            productDetailsPage.validateProductDetails(
                selectedProduct.name, 
                selectedProduct.price
            ).then((finalProductDetails) => {
                // Final validation - expect name contains chair and price is displayed
                expect(finalProductDetails.name.toLowerCase()).to.include('chair')
                expect(finalProductDetails.price).to.match(/^\$\d{1,3}(,\d{3})*(\.\d{2})?$/)
                
                // Update final results for reporting
                cy.wrap({
                    searchedItem: 'chair',
                    sortedBy: 'price-desc-rank',
                    selectedPosition: 'rightmost-first-row-non-ad',
                    finalProductName: finalProductDetails.name,
                    finalProductPrice: finalProductDetails.price,
                    status: 'completed_successfully'
                }).as('testResults')
            })
        })
    })

    afterEach(() => {
        // Generate final report - akan selalu ada karena di-initialize di beforeEach
        cy.get('@testResults').then((results) => {
            cy.log('=== AMAZON CHAIR SEARCH TEST RESULTS ===')
            cy.log(`Test Status: ${results.status}`)
            cy.log(`Searched Item: ${results.searchedItem}`)
            cy.log(`Sorted By: ${results.sortedBy}`)
            cy.log(`Selected Position: ${results.selectedPosition}`)
            cy.log(`Final Product Name: ${results.finalProductName}`)
            cy.log(`Final Product Price: ${results.finalProductPrice}`)
            cy.log('=== TEST REPORT GENERATED ===')
        })
    })
})
