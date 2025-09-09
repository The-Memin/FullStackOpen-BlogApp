
describe('Blog app', function(){
  beforeEach(function() {
    cy.visit('/')
  })  
  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login').click()
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })
})