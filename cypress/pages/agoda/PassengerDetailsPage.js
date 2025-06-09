// cypress/support/agoda/PassengerDetailsPage.js
class PassengerDetailsPage {
    constructor() {
        this.contactFirstName = () => cy.get('[data-testid="contact.contactFirstName"]')
        this.contactLastName = () => cy.get('[data-testid="contact.contactLastName"]')
        this.contactEmail = () => cy.get('[data-testid="contact.contactEmail"]')
        this.contactPhone = () => cy.get('[data-testid="contact.contactPhoneNumber-PhoneNumberDataTestId"]')
        
        this.passengerSection = () => cy.get('[data-testid="0"]')
        this.passengerFirstName = () => cy.get('[data-testid="flight.forms.i0.units.i0.passengerFirstName"]')
        this.passengerLastName = () => cy.get('[data-testid="flight.forms.i0.units.i0.passengerLastName"]')
        this.passengerDOBDate = () => cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]')
        this.passengerDOBMonth = () => cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]')
        this.passengerDOBYear = () => cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]')
        this.passengerNationality = () => cy.get('[data-testid="flight.forms.i0.units.i0.passengerNationality"]')
        this.passportNumber = () => cy.get('[data-testid="flight.forms.i0.units.i0.passportNumber"]')
        this.passportCountry = () => cy.get('[data-testid="flight.forms.i0.units.i0.passportCountryOfIssue"]')
        this.passportExpiryDate = () => cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]')
        this.passengerExpiryMonth = () => cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]')
        this.passportExpiryYear = () => cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]')
        
        this.continueToAddOnsButton = () => cy.xpath(`//button[@data-component="flight-continue-to-addOns-button"]`)
        this.continueToPaymentButton = () => cy.get('[data-testid="continue-to-payment-button"]')
    }

    fillContactInformation() {
        this.contactFirstName().type(Cypress.env('PASSENGER_FIRST_NAME'))
        this.contactLastName().type(Cypress.env('PASSENGER_LAST_NAME'))
        this.contactEmail().type(Cypress.env('PASSENGER_EMAIL'))
        this.contactPhone().type(Cypress.env('PASSENGER_PHONE'))
    }

    fillPassengerInformation() {
        this.passengerSection().click()
        
        // Basic information
        this.passengerFirstName().type(Cypress.env('PASSENGER_FIRST_NAME'))
        this.passengerLastName().type(Cypress.env('PASSENGER_LAST_NAME'))
        
        // Date of birth
        this.passengerDOBDate().type(Cypress.env('PASSENGER_DOB_DATE'))
        this.passengerDOBMonth().click()
        cy.get("li").contains(Cypress.env('PASSENGER_DOB_MONTH')).click()
        this.passengerDOBYear().type(Cypress.env('PASSENGER_DOB_YEAR'))
        
        // Nationality
        this.passengerNationality().click()
        cy.get("li").contains(Cypress.env('PASSENGER_NATIONALITY')).click()
        
        // Passport information
        this.passportNumber().type(Cypress.env('PASSPORT_NUMBER'))
        this.passportCountry().click()
        cy.get("li").contains(Cypress.env('PASSPORT_COUNTRY')).click()
        
        // Passport expiry
        this.passportExpiryDate().type(Cypress.env('PASSPORT_EXPIRY_DATE'))
        this.passengerExpiryMonth().click()
        cy.get("li").contains(Cypress.env('PASSPORT_EXPIRY_MONTH')).click()
        this.passportExpiryYear().type(Cypress.env('PASSPORT_EXPIRY_YEAR'))
    }

    continueToAddOns() {
        this.continueToAddOnsButton().click({ force: true })
        
    }

    continueToPayment() {
        this.continueToPaymentButton().scrollIntoView().click()
    }

    getPassengerData() {
        const passengerData = {
            firstName: Cypress.env('PASSENGER_FIRST_NAME'),
            lastName: Cypress.env('PASSENGER_LAST_NAME'),
            email: Cypress.env('PASSENGER_EMAIL'),
            phone: Cypress.env('PASSENGER_PHONE')
        }
        
        cy.wrap(passengerData).as('passengerData')
        return cy.get('@passengerData')
    }
}

export default PassengerDetailsPage