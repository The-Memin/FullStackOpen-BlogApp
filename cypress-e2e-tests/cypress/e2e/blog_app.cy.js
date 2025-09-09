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

      describe('and several blogs exist', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'first blog', author: TEST_USER.username, url: 'http://first.blog' })
          cy.createBlog({ title: 'second blog', author: 'author2', url: 'http://second.blog' })
          cy.createBlog({ title: 'third blog', author: 'author3', url: 'http://third.blog' })
        })

        it('one of those can be liked', function() {
          cy.contains('second blog').contains('view').click()
          cy.contains('second blog').parent().find('button').contains('like').as('likeButton')

          cy.get('@likeButton').click()
          cy.contains('second blog').parent().should('contain', 'Likes: 1')
        })

        it('one of those can be deleted', function() {
          cy.contains('first blog').contains('view').click()
          cy.contains('first blog').parent().find('button').contains('remove').as('removeButton')

          cy.on('window:confirm', (str) => {
            expect(str).to.equal(`Remove blog You're NOT gonna need it! by ${TEST_USER.username}`)
            return true
          })

          cy.get('@removeButton').click()
          cy.contains('first blog').parents('.blog').should('not.exist')
        })

        it('delete button is only shown for blogs created by the logged in user', function() {
          cy.contains('first blog').contains('view').click()
          cy.contains('first blog').parent().find('button').contains('remove').as('removeButton1')
          cy.get('@removeButton1').should('be.visible')

          cy.contains('second blog').contains('view').click()
          cy.contains('second blog').parent().find('button').contains('remove').should('not.exist')

          cy.contains('third blog').contains('view').click()
          cy.contains('third blog').parent().find('button').contains('remove').should('not.exist')
        })

        it('blogs are ordered according to likes', function() {
          cy.contains('second blog').contains('view').click()
          cy.contains('second blog').parent().find('button').contains('like').as('likeButton2')

          cy.get('@likeButton2').click()
          cy.wait(500)
          cy.get('@likeButton2').click()
          cy.wait(500)

          cy.contains('third blog').contains('view').click()
          cy.contains('third blog').parent().find('button').contains('like').as('likeButton3')

          cy.get('@likeButton3').click()
          cy.wait(500)

          cy.get('.blog').then( blogs => {
            cy.wrap(blogs[0]).should('contain', 'second blog')
            cy.wrap(blogs[1]).should('contain', 'third blog')
            cy.wrap(blogs[2]).should('contain', 'first blog')
          })
        })    
      })

    })
  })
})