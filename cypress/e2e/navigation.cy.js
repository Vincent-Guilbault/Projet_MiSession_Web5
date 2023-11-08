///<reference types="cypress" />

describe('Navigation entre les pages', () => {
    it('Navigation vers la page de recherche', () => {
        cy.login('Ginette', '123456');
        cy.get('[data-cy="btn_Recherche"]').should('be.visible').click();
    });
    it('Navigation vers la page de favoris', () => {
        cy.login('Ginette', '123456');
        cy.get('[data-cy="btn_Favoris"]').click();
    });
    it('Navigation vers la page de trending', () => {
        cy.login('Ginette', '123456');
        cy.get('[data-cy="btn_Trending"]').click();
    });
    it('Navigation vers la page de profil', () => {
        cy.login('Ginette', '123456');
        cy.get('[data-cy="btn_Profil"]').click();
    });
});