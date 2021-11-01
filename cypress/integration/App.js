/// <reference types="cypress" />
// @ts-check
describe('basic integration test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders logo block', () => {
    cy.get('.Logo_image').should('exist')
  })

  it('renders search input', () => {
    cy.get('.Search_input').should('exist')
  })

  it('renders cities container', () => {
    cy.get('.Cities').should('exist')
  })
})

describe('basic search, add and delete city', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('find London by search input, add it and delete', () => {
    cy.get('.Search_input').clear()
    cy.get('.Search_input').type('london{enter}')
    cy.get('.Search_button').click()
    cy.get('.SearchResult_list').should('exist')
    cy.get(
      ':nth-child(1) > .SearchResultItem_button > .SearchResultItem_buttonContent'
    ).click()
    cy.get('.Cities').contains('.City', 'London')
    cy.get('.City_button').click()
    cy.get('.Cities .Cities_empty').should('exist')
    cy.get('.Cities').should('not.contain', 'London')
  })
})
