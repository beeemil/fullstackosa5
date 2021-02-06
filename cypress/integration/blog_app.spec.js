describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'testaaja',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('Tester logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })
  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testaaja', password: 'secret' })
      it('A blog can be created', function() {
        cy.get('#new-blog-button').click()
        cy.get('#title').type('newtestblog')
        cy.get('#author').type('TesterMan')
        cy.get('#url').type('test.com')
        cy.get('#save').click()
        cy.contains('a new blog newtestblog')
      })
    })
  })
  describe.only('When logged in and created a blog', function() {
    beforeEach(function() {
      cy.login({ username: 'testaaja', password: 'secret' })
      cy.createBlog({ title: 'TestBlog', author: 'TesterMan', url:'test.com' })
    })
    it('A blog can be liked', function() {
      cy.get('#vis').click()
      cy.get('#like').click()
      cy.contains('1')
    })
    it('A blog can be removed', function() {
      cy.get('#vis').click()
      cy.get('#remove').click()
      cy.on('window:confirm', () => true)
    })
  })
  describe.only('When logged in and created two blogs', function() {
    beforeEach(function() {
      cy.login({ username: 'testaaja', password: 'secret' })
      cy.createBlog({ title: 'TestBlog', author: 'TesterMan', url:'test.com' })
      cy.createBlog({ title: 'TestBlog2', author: 'Tester2Man', url:'test2.com' })
      cy.contains('TestBlog').parent().find('#vis').click()
      cy.contains('TestBlog2').parent().find('#vis').click()
    //   cy.contains('TestBlog2').get('#vis').click()
    })
    it('Blogs are sorted by likes', function() {
      cy.contains('TestBlog').parent().find('#like').as('like1')
      cy.contains('TestBlog2').parent().find('#like').as('like2')
      cy.get('@like2').click()
      cy.get('@like1').click()
      cy.get('@like2').click()
      cy.get('#blog-main').then($els => {
        var likes = $els.map($el => $el.likes)
        cy.wrap(likes).should('equal', likes.sort())
      })
    })
  })
})