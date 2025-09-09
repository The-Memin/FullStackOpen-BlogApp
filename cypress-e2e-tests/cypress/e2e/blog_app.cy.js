const TEST_USER = {
  name: 'Test User',
  username: 'test-user',
  password: 'password123**'
}

describe('Blog app', function(){
  beforeEach(function() {
    cy.request('POST', '/api/testing/reset')
    const user = {
      name: TEST_USER.name,
      username: TEST_USER.username,
      password: TEST_USER.password
    }
    cy.request('POST', '/api/users/', user)

    cy.visit('/')
  })  
  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login').click()
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type(TEST_USER.username)
      cy.get('#password').type(TEST_USER.password)
      cy.get('button[type="submit"]').click()

      cy.contains(`${TEST_USER.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type(TEST_USER.username)
      cy.get('#password').type('wrong')
      cy.get('button[type="submit"]').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', `${TEST_USER.name} logged in`)
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: TEST_USER.username, password: TEST_USER.password })
      })

      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('cypress')
        cy.get('#url').type('www.cypress.com')
        cy.get('button[type="submit"]').click()

        cy.contains('a new blog You\'re NOT gonna need it! by cypress added')
        cy.contains('a blog created by cypress')
      })
    })
  })
})