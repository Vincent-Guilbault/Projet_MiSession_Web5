///<reference types="cypress" />

describe('Mettre une série en favoris', () => {
    it('Favoris', () => {
        cy.login('Ginette', '123456');
        cy.get('[data-cy="btn_Trending"]').click();
        cy.get('[data-cy="favoris_btn"]:first').should('be.visible').click(); 
        cy.get('[data-cy="favoris_btn"]:eq(2)').should('be.visible').click(); 
        cy.get('[data-cy="btn_Favoris"]').should('be.visible').click();
    });
});