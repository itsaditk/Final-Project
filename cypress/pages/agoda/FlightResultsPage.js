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
        cy.contains('Departure time').click()
        cy.wait(5000)
    }
    
    filterByAirline(airlineName) {
        this.filterButton().click().should('be.exist')
        cy.contains(/^Show all \d+ airlines$/).click()
        cy.get(`label[data-element-value="${airlineName}"]`).click()
        cy.get(`label[data-element-value="${airlineName}"] input[type="checkbox"]`)
            .scrollIntoView().check();
        cy.wait(1000) 
        this.applyButton().click()
    }

    selectEarliestFlight() {
        // Simpan waktu keberangkatan dan kedatangan
        let flightTimes = { departureTime: '', arrivalTime: '' }
        
        return this.flightCards()
            .should('have.length.greaterThan', 0)
            .first()
            .then(($card) => {
                const cardText = $card.text()
                const timePattern = /(\d{2}:\d{2})/g
                const times = cardText.match(timePattern)
                
                if (times && times.length >= 2) {
                    flightTimes.departureTime = times[0]  
                    flightTimes.arrivalTime = times[1]    
                    cy.log(`Found times - Departure: ${times[0]}, Arrival: ${times[1]}`)
                }
                cy.wrap($card).find('[data-testid="flightCard-flight-detail"]').click()
            })
            .then(() => {
                cy.wait(2000)
                this.bookButton().click()
                
                cy.wrap(flightTimes).as('selectedFlightTimes')
                return cy.wrap(flightTimes)
            })
    }
    
    // Method untuk validasi bahwa kita di halaman results
    validateResultsPage() {
        cy.url().should('include', 'flight')
        cy.get('[data-testid="web-refresh-flights-card"], [class*="flight"]')
            .should('have.length.greaterThan', 0)
    }
}

export default FlightResultsPage