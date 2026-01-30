describe('Login flow', () => {

  it('allows signing in with valid credentials', () => {
    const credentials = { username: '1', password: '1' };

    cy.visit('/login');

    cy.get('input[formcontrolname="username"]').type(credentials.username);
    cy.get('input[formcontrolname="password"]').type(credentials.password);
    cy.wait(500);
    // cy.get('[data-cy="login-submit"]').click();
    cy.contains('button[type="submit"]', 'Login')
      .should('be.visible')
      .click();

    cy.contains('li', 'Home').should('exist');

    cy.get('img[alt="Profile"]').click();

  });
});
