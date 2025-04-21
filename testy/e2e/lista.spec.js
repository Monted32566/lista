describe('Lista UI Tests', () => {
    it('should render the Lista component', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Lista Zadań').should('be.visible');
    });
  
    it('should allow adding a new task', () => {
      cy.visit('http://localhost:3000');
      cy.get('#new-task-input').type('Nowe zadanie');
      cy.get('button[aria-label="Dodaj zadanie"]').click();
      cy.contains('Nowe zadanie').should('be.visible');
    });
  });