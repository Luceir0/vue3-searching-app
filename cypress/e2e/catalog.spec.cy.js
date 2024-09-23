describe('Catalog', () => {
  it('displays a list of pokemons', () => {
    cy.visit('/');

    cy.get('[data-test-id="pokemon-card-link"]').should('have.length.greaterThan', 0);
  });
});
