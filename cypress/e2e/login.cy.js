///<reference types="cypress" />

describe('login', () => {
    it('Authentification', () => {
        cy.login('Ginette', '123456');
    });
});