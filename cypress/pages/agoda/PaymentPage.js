    // cypress/support/agoda/PaymentPage.js
    class PaymentPage {
        constructor() {
            this.flightSummary = () => cy.get('[data-testid="flight-summary"]')
            this.passengerSummary = () => cy.get('[data-testid="passenger-summary"]')
            this.totalPriceElement = () => cy.get('[data-testid="total-price"]')
            this.departureTimeElement = () => cy.get('[data-testid="summary-departure-time"]')
            this.arrivalTimeElement = () => cy.get('[data-testid="summary-arrival-time"]')
        }

        validateFlightDetails(expectedFlightDetails) {
            // Validate departure and arrival times
            this.departureTimeElement().should('contain.text', expectedFlightDetails.departureTime)
            this.arrivalTimeElement().should('contain.text', expectedFlightDetails.arrivalTime)
            
            // Validate total price
            this.totalPriceElement().should('contain.text', expectedFlightDetails.totalPrice)
        }

        validatePassengerData(expectedPassengerData) {
            // Validate passenger information in summary
            this.passengerSummary().within(() => {
                cy.should('contain.text', expectedPassengerData.firstName)
                cy.should('contain.text', expectedPassengerData.lastName)
                cy.should('contain.text', expectedPassengerData.email)
            })
        }

        validateBookingSummary(flightDetails, passengerData) {
            this.validateFlightDetails(flightDetails)
            this.validatePassengerData(passengerData)
        }
    }

    export default PaymentPage