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

    fillContactInformation(data) {
        this.contactFirstName().type(data.defaultPassenger.firstName);
        this.contactLastName().type(data.defaultPassenger.lastName);
        this.contactEmail().type(data.defaultPassenger.email);
        this.contactPhone().type(data.defaultPassenger.phone);
    }

    fillPassengerInformation(data) {
        this.passengerSection().click();

        this.passengerFirstName().type(data.defaultPassenger.firstName);
        this.passengerLastName().type(data.defaultPassenger.lastName);

        this.passengerDOBDate().type(data.defaultPassenger.dateOfBirth.date);
        this.passengerDOBMonth().click();
        cy.get("li").contains(data.defaultPassenger.dateOfBirth.month).click();
        this.passengerDOBYear().type(data.defaultPassenger.dateOfBirth.year);

        this.passengerNationality().click();
        cy.get("li").contains(data.defaultPassenger.nationality).click();

        // this.passportNumber().type(data.defaultPassenger.passport.number);
        // this.passportCountry().click();
        // cy.get("li").contains(data.defaultPassenger.passport.country).click();

        // this.passportExpiryDate().type(data.defaultPassenger.passport.expiryDate.date);
        // this.passengerExpiryMonth().click();
        // cy.get("li").contains(data.defaultPassenger.passport.expiryDate.month).click();
        // this.passportExpiryYear().type(data.defaultPassenger.passport.expiryDate.year);
    }

    continueToAddOns() {
        this.continueToAddOnsButton().click({ force: true })
        
    }

    continueToPayment() {
        this.continueToPaymentButton().scrollIntoView().click()
    }

    getPassengerData() {
    return cy.fixture('agoda/PassengerData').then((data) => {
        const passengerData = {
            firstName: data.defaultPassenger.firstName,
            lastName: data.defaultPassenger.lastName,
            email: data.defaultPassenger.email,
            phone: data.defaultPassenger.phone
        }
        
        cy.wrap(passengerData).as('passengerData')
        return cy.wrap(passengerData)
    })
}
}

export default PassengerDetailsPage