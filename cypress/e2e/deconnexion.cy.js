///<reference types="cypress" />

describe('Tester la déconnexion', () => {
    it('Fonctionnalité de déconnexion', () => {
        cy.login('Ginette', '123456');
        cy.get('[data-cy="btn_Profil"]').click();
        cy.get('[data-cy="btn_deco"]').click();
    });
});