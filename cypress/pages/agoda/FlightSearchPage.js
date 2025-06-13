// cypress/support/agoda/FlightSearchPage.js
import dayjs from 'dayjs'

class FlightSearchPage {
    constructor() {
        this.flightTab = () => cy.contains("Flights")
        this.originInput = () => cy.get('#flight-origin-search-input')
        this.destinationInput = () => cy.get('#flight-destination-search-input')
        this.autocompleteList = () => cy.get(".AutocompleteList, .AutocompleteSearch__AutocompleteList")
        this.searchButton = () => cy.get('[data-selenium="searchButton"]')
    }

    visitHomePage() {
        cy.visit('/')
    }

    goToFlightSection() {
        this.flightTab().click()
    }

    selectOriginDestination(origin, destination) {
        // Input asal
        this.originInput().type(origin)
        this.autocompleteList().contains(origin).click()
        
        // Input tujuan
        this.destinationInput().type(destination)
        this.autocompleteList().contains(destination).click()
    }

    selectTomorrowDeparture() {
        const tomorrow = dayjs().add(1, 'day')
        const tomorrowAriaLabel = tomorrow.format('ddd MMM DD YYYY')
        
        cy.get(`[aria-label="${tomorrowAriaLabel} "]`).click()
        
        return tomorrow.format('YYYY-MM-DD') // return untuk validasi
    }

    searchFlights() {
        this.searchButton().click()
    }

    validateSearchResults(expectedDate) {
        cy.url({ timeout: 50000 }).should('include', '/flights/results')
        cy.url().then((url) => {
            const params = new URL(url).searchParams
            expect(params.get('departureFrom')).to.eq('JKT')
            expect(params.get('arrivalTo')).to.include('SIN')
            expect(params.get('departDate')).to.eq(expectedDate)
        })
        cy.wait(5000) // Tunggu hasil pencarian muncul
    }
}

export default FlightSearchPage