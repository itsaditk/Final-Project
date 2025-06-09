import FlightSearchPage from '../../pages/agoda/FlightSearchPage'
import FlightResultsPage from '../../pages/agoda/FlightResultsPage'
import PassengerDetailsPage from '../../pages/agoda/PassengerDetailsPage'
import PaymentPage from '../../pages/agoda/PaymentPage'

describe('E2E - Agoda Flight Booking', () => {
    const flightSearchPage = new FlightSearchPage()
    const flightResultsPage = new FlightResultsPage()
    const passengerDetailsPage = new PassengerDetailsPage()
    const paymentPage = new PaymentPage()
    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('Book Jakarta to Singapore flight with Malaysia Airlines', () => {
        // Step 1: Search for flights
        flightSearchPage.visitHomePage()
        flightSearchPage.goToFlightSection()
        flightSearchPage.selectOriginDestination('Jakarta', 'Singapore')
        const expectedDate = flightSearchPage.selectTomorrowDeparture()
        flightSearchPage.searchFlights()
        flightSearchPage.validateSearchResults(expectedDate)

        // Step 2: Select flight
        flightResultsPage.sortByDepartureTime()
        flightResultsPage.filterByAirline('Malaysia Airlines')
        flightResultsPage.selectEarliestFlight().then((selectedFlightDetails) => {
            
            // Step 3: Fill passenger details
            passengerDetailsPage.fillContactInformation()
            passengerDetailsPage.fillPassengerInformation()
            passengerDetailsPage.getPassengerData().then((passengerData) => {
                
                passengerDetailsPage.continueToAddOns()
                passengerDetailsPage.continueToPayment()

                // Step 4: Validate booking summary on payment page
                paymentPage.validateBookingSummary(selectedFlightDetails, passengerData)
            })
        })
    })
})