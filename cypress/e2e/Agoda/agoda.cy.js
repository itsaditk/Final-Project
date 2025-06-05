import dayjs from 'dayjs'

describe('E2E - Agoda', () => {
    const baseUrl = 'https://www.agoda.com';
    
    it('Jakarta to Singapura', () => {
        // Generate tanggal besok
        const tomorrow = dayjs().add(1, 'day');
        const tomorrowFormatted = tomorrow.format('YYYY-MM-DD'); // untuk validasi URL
        const tomorrowAriaLabel = tomorrow.format('ddd MMM DD YYYY'); // untuk aria-label
        
        cy.visit(baseUrl);
        
        //Ke Halaman Penerbangan
        cy.contains("Flights").click();

        //Input asal dan tujuan
        cy.get('#flight-origin-search-input').type('Jakarta');
        cy.get(".AutocompleteList, .AutocompleteSearch__AutocompleteList")
            .contains('Jakarta')
            .click();
        cy.get('#flight-destination-search-input').type('Singapore');
        cy.get(".AutocompleteList, .AutocompleteSearch__AutocompleteList")
            .contains('Singapore')
            .click();

        //Input tanggal keberangkatan (dinamis - besok)
        cy.get(`[aria-label="${tomorrowAriaLabel} "]`).click();
        
        //Search penerbangan
        cy.get('[data-selenium="searchButton"]').click();
        
        //Validasi URL
        cy.url({ timeout: 10000 }).should('include', '/flights/results');
        cy.url().then((url) => {
            const params = new URL(url).searchParams;
            expect(params.get('departureFrom')).to.eq('JKT');
            expect(params.get('arrivalTo')).to.include('SIN');
            expect(params.get('departDate')).to.eq(tomorrowFormatted); 
            cy.wait(1000);

            //Sorting berdasarkan keberangkatan lebih dulu
            cy.get('[data-testid="show-sort-btn"]').click();
            cy.contains('Departure time').click();
            cy.wait(1000);

            //Filter Penerbangan
            cy.get('[data-testid="show-filter-btn"]').click().should('be.exist');
            cy.contains(/^Show all \d+ airlines$/).click();
            cy.get('label[data-element-value="Malaysia Airlines"]').click();
            cy.get('label[data-element-value="Malaysia Airlines"] input[type="checkbox"]') 
                .should('be.checked');
            cy.contains('button', 'Apply').click();
            cy.wait(1000);

             //Pilih penerbangan Malaysia Airlines yang paling awal (pertama dalam list)
            cy.get('[data-testid="web-refresh-flights-card"]')
                .should('have.length.greaterThan', 0) // pastikan ada hasil penerbangan
                .first() // ambil penerbangan pertama (paling awal)
                .within(() => {
                    // Klik area flight detail untuk memilih penerbangan
                    cy.get('[data-testid="flightCard-flight-detail"]').click();
                });
            //Isi data Kontak
            cy.contains('button', 'Book').click();
            cy.get('[data-testid="contact.contactFirstName"]').type('Adit');
            cy.get('[data-testid="contact.contactLastName"]').type('Kurniawan');
            cy.get('[data-testid="contact.contactEmail"]').type('aditKurniawan@example.com');
            cy.get('[data-testid="contact.contactPhoneNumber-PhoneNumberDataTestId"]').type('81234567890');

            //Isi data penerbangan
            cy.get('[data-testid="0"]').click();
            cy.get('[data-testid="flight.forms.i0.units.i0.passengerFirstName"]').type('Adit');
            cy.get('[data-testid="flight.forms.i0.units.i0.passengerLastName"]').type('Kurniawan')
            cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]').type('28');
            cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]').click();
            cy.get("li").contains('August').click();
            cy.get('[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]').type('1999');
            cy.get('[data-testid="flight.forms.i0.units.i0.passengerNationality"]').click();
            cy.get("li").contains('Indonesia').click();
            cy.get('[data-testid="flight.forms.i0.units.i0.passportNumber"]').type('09876543');
            cy.get('[data-testid="flight.forms.i0.units.i0.passportCountryOfIssue"]').click();
            cy.get("li").contains('Indonesia').click();
            cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]').type('28');
            cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]').click();
            cy.get("li").contains('December').click();
            cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]').type('2030');
            cy.xpath(`//button[@data-component="flight-continue-to-addOns-button"]`).click({force:true});
            cy.get('[data-testid="continue-to-payment-button"]').scrollIntoView().click();
        });
    });
});