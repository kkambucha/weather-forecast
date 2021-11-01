/// <reference types="cypress" />
describe('basic integration test', () => {
  it('renders logo block', () => {
    cy.visit('/')
    cy.get('.Logo_image').should('exist')
  })

  it('renders search input', () => {
    cy.visit('/')
    cy.get('.Search_input').should('exist')
  })

  it('renders cities container', () => {
    cy.visit('/')
    cy.get('.Cities').should('exist')
  })
})
