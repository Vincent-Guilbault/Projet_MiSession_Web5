///<reference types="cypress" />

describe('Faire une recherche', () => {
    it('Recherche', () => {
        cy.login('Ginette', '123456');
        cy.get('[data-cy="btn_Recherche"]').should('be.visible').click();
        cy.get('[data-cy="fld_Rechercher"]').type('on');
        cy.get('[data-cy="btn_Rechercher"]').click();
    });
});