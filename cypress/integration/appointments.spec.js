describe("Appointments", () => {

  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
    cy.contains('Monday');
  })

  it("should visit root", () => {
    cy.visit("/");
  });


  it('should book an interview', () => {
    cy.visit('/')
    cy.contains('Monday').click()
    cy.get('[alt=Add]')
    .first()
    .click()
    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones')
    cy.get("[alt='Sylvia Palmer']").click()
    cy.contains('Save').click()
    cy.request("GET", "/api/debug/reset")
    cy.contains(".appointment__card--show", 'Lydia Miller-Jones')
    cy.contains(".appointment__card--show", 'Sylvia Palmer')
  });

  it('should edit an interview', () => {
    cy.visit('/');
    cy.contains('Monday').click()
    cy.get('[alt=Edit]').click({force: true})
    cy.get('[data-testid=student-name-input]').clear().type('Tori Malcolm')
    cy.contains('Save').click()
    cy.request("GET", "/api/debug/reset")
    cy.contains(".appointment__card--show", 'Tori Malcolm')
    cy.contains(".appointment__card--show", 'Sylvia Palmer')

  })

  it('should cancel an interview', () => {
   cy.contains('Monday').click()
   cy.get('[alt=Delete]')
   .click({force: true});
    cy.contains('Confirm').click()
    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');

    cy.contains('.appointment__card--show', 'Archie Cohen')
    .should('not.exist');

  })


});