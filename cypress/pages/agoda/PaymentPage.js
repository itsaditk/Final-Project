// cypress/support/agoda/PaymentPage.js
class PaymentPage {
    constructor() {
        this.timeElements = () => cy.get('body')
    }

    validateFlightTimes(expectedDepartureTime, expectedArrivalTime) {
        cy.log('Validating departure and arrival times...')
        
        // Cari departure time di halaman
        if (expectedDepartureTime) {
            cy.contains(expectedDepartureTime, { timeout: 5000 })
                .should('be.visible')
            cy.log(`✓ Departure time ${expectedDepartureTime} found`)
        }
        
        // Cari arrival time di halaman  
        if (expectedArrivalTime) {
            cy.contains(expectedArrivalTime, { timeout: 5000 })
                .should('be.visible')
            cy.log(`✓ Arrival time ${expectedArrivalTime} found`)
        }
    }
}

export default PaymentPage