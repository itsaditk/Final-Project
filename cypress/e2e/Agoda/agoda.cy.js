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
        cy.fixture('agoda/PassengerData').as('passengerData');
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
            cy.fixture('agoda/PassengerData').then((data) => {
            passengerDetailsPage.fillContactInformation(data)
            passengerDetailsPage.fillPassengerInformation(data)
            })
            passengerDetailsPage.getPassengerData().then((passengerData) => {
                
                passengerDetailsPage.continueToAddOns()
                passengerDetailsPage.continueToPayment()

              // Step 4: Validate flight times on payment page
                paymentPage.validateFlightTimes();
            })
        })
    })
})