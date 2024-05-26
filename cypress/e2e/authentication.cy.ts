describe('Authentication', () => {
  it('should login with test account', () => {
    beforeEach(() => {
      // Ensure that the user is logged out before each test
      cy.visit('http://127.0.0.1:4200/logout'); // Replace with the URL to log out the user
    });
    // Visit the login page
    cy.visit('http://127.0.0.1:4200/login');

    // Fill in the email and password fields
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('test123');

    // Submit the form
    cy.get('form').submit();

    // Check if login was successful by verifying redirection or presence of elements on the next page
    cy.url().should('eq', 'http://127.0.0.1:4200/');
  });
});