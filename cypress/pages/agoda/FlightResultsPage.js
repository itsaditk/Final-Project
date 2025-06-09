// cypress/support/agoda/FlightResultsPage.js
class FlightResultsPage {
    constructor() {
        this.sortButton = () => cy.get('[data-testid="show-sort-btn"]')
        this.filterButton = () => cy.get('[data-testid="show-filter-btn"]')
        this.flightCards = () => cy.get('[data-testid="web-refresh-flights-card"]')
        this.applyButton = () => cy.contains('button', 'Apply')
        this.bookButton = () => cy.contains('button', 'Book')
    }


    sortByDepartureTime() {
        this.sortButton().click()
        cy.wait(1000) // Wait for the dropdown to open
        cy.contains('Departure time').click()
        cy.wait(5000)
    }
    filterByAirline(airlineName) {
        this.filterButton().click().should('be.exist')
        cy.contains(/^Show all \d+ airlines$/).click()
        cy.get(`label[data-element-value="${airlineName}"]`).click()
        cy.get(`label[data-element-value="${airlineName}"] input[type="checkbox"]`)
            .scrollIntoView().check();
        cy.wait(1000) // Wait for the checkbox to be checked
        this.applyButton().click()
    }

    selectEarliestFlight() {
        // Store flight details before selection
        let flightDetails = {}
        
        this.flightCards()
            .should('have.length.greaterThan', 0)
            .first()
            .within(() => {
                // Capture flight details
                cy.get('[data-testid="flightCard-flight-detail"]').then(($card) => {
                    // Extract departure and arrival times
                    cy.get('[data-testid="departure-time"]').invoke('text').then((depTime) => {
                        flightDetails.departureTime = depTime.trim()
                    })
                    cy.get('[data-testid="arrival-time"]').invoke('text').then((arrTime) => {
                        flightDetails.arrivalTime = arrTime.trim()
                    })
                })
                
                cy.get('[data-testid="flightCard-flight-detail"]').click()
            })
        
        // Store in cypress env for later validation
        cy.wrap(flightDetails).as('selectedFlightDetails')
        
        this.bookButton().click()
        
        return cy.get('@selectedFlightDetails')
    }
}

export default FlightResultsPage