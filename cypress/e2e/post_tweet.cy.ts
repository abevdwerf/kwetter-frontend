describe('Posting a Tweet', () => {
  beforeEach(() => {
    // Ensure that the user is authenticated before each test
    cy.visit('http://localhost:4200/login'); // Visit the login page
    // Log in with test account (use your test account credentials)
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('test123');
    cy.get('form').submit();
    // Check if login was successful by verifying redirection to home page
    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('should post a tweet and verify its presence on profile page', () => {
    // Submit a tweet
    const tweetContent = 'This is a test tweet';
    cy.get('textarea').type(tweetContent); // Type the tweet content
    cy.get('form').submit(); // Click the Post button

    // Check if the alert confirming successful tweet submission is displayed
    cy.on('window:alert', (message) => {
      expect(message).to.equal('Tweet successfully posted');
    });

    // Navigate to the profile page
    cy.get('a').contains('Profile').click(); // Click on the Profile tab in the navbar

    // Check if the posted tweet is displayed on the profile page
    cy.contains('.max-w-md', tweetContent); // Verify that the tweet content is present on the profile page
  });
});