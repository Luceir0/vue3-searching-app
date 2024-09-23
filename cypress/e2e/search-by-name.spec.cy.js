describe('Searching by name', () => {
  it('should find a pokemon by name', () => {
    cy.visit('/');

    cy.get('input[placeholder="Write here a Pokemon name or ID"]').type('Pikachu');
    cy.get('button').contains('Go!').click();

    cy.url().should('include', '/pokemon/pikachu');
  });
});
