describe('Direct Access', () => {
  it('should access a pokemon by URL', () => {
    cy.visit('/pokemon/25');
  
    cy.get('[data-test-id="info-name"]', { timeout: 10000 })
      .should('be.visible')
      .then(($el) => expect($el.text()).to.contain('pikachu'));
  });
});
