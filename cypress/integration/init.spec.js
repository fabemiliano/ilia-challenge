describe('testing main page', () => {
  it('checks if the page renders', () => {
    cy.visit('/');
    cy.contains(/ loading/i);
    cy.contains(/ pokedex/i);
  });
  it('checks if the cards are rendered', () => {
    cy.contains(/aegislash/i);
    cy.contains(/arcanine/i);
  });
  it('checks if a pokemon can be searched', () => {
    cy.get('[data-testid=search]').type('arcanine', { force: true });
    cy.contains(/arcanine/i);
    cy.contains(/aegislash/i).should('not.exist');
  });
  it('checks if details page is rendered', () => {
    cy.contains(/arcanine/i).click();
    cy.contains(/pokedex/).should('not.exist');
    cy.contains(/resistances/);
    cy.contains(/none/i);
    cy.contains(/weaknesses/);
  });
  it('checks if modal can be shown', () => {
    cy.contains(/mana/).should('not.exist');
    cy.get('[data-testid=attack]').click();
    cy.contains(/mana/i);
    cy.get('[data-testid=exit]').click();
    cy.contains(/mana/).should('not.exist');
  });
  it('checks if can go to main page', () => {
    cy.get('[data-testid=go-back]').click();
    cy.contains(/pokedex/i);
    cy.contains(/resistances/).should('not.exist');
  });
  it('checks language selected', () => {
    cy.contains(/arcanine/i).click();
    cy.contains(/resistances/);
    cy.get('[data-testid=go-back]').click();
    cy.get('[data-testid=pt-language]').click().should('have.css', 'border').and('match', /4px solid/);
    cy.contains(/arcanine/i).click();
    cy.contains(/resistencias/i);
  });
});
