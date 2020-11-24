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
  it('checks if details page is rendered when choosing a card', () => {
    cy.contains(/arcanine/i).click();
    cy.contains(/pokedex/).should('not.exist');
    cy.contains(/resistances/);
    cy.contains(/none/i);
    cy.contains(/weaknesses/);
  });
  it('checks if modal can be shown when selecting an attack', () => {
    cy.contains(/mana/).should('not.exist');
    cy.get('[data-testid=attack]').click();
    cy.contains(/mana/i);
    cy.get('[data-testid=exit]').click();
    cy.contains(/mana/).should('not.exist');
  });
  it('checks if can go to main page from details screen', () => {
    cy.get('[data-testid=go-back]').click();
    cy.contains(/pokedex/i);
    cy.contains(/resistances/).should('not.exist');
  });
  it('checks language selection', () => {
    cy.contains(/arcanine/i).click();
    cy.contains(/resistances/);
    cy.get('[data-testid=go-back]').click();
    cy.get('[data-testid=pt-language]').click().should('have.css', 'border').and('match', /4px solid/);
    cy.contains(/arcanine/i).click();
    cy.contains(/resistencias/i);
  });
  it('checks if the not found page is rendered when accessing a wrong route', () => {
    cy.visit('/randompage');
    cy.contains(/not found/i);
    cy.contains(/main page/i).click();
    cy.contains(/pokedex/i);
  });
});
