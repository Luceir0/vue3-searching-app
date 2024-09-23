describe('Pokemon Details', () => {
  it('should display pokemon details', () => {
    cy.visit('/pokemon/pikachu');

    cy.get('[data-test-id="info-name"]', { timeout: 10000 })
    .should('be.visible')
    .then(($el) => expect($el.text()).to.contain('pikachu'));

    cy.get('[data-test-id="type-card"]', { timeout: 10000 })
    .find('img')
    .should('exist');
});

});
