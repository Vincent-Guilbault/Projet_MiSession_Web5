///<reference types="cypress" />

describe('Teste la route principal', () => {
  it('Devrait rediriger à la page de login', () => {
    cy.visit('http://127.0.0.1:5173');
    cy.url().should('include', '/login');
  });
});