import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
const url = 'https://www.sonepar.com/fr.html'

  Given(/^I'm at sonepar$/, () => {
    soneparSearchPage.visit();
  });
  When(/^I go to the search bar$/, () => {
    soneparSearchPage.goToSearchBar();
  });
    
  And(/^I type search word \'Schneider Electric\'$/, () => {
    soneparSearchPage.type('Schneider Electric');
  });
    
  Then(/^I have some results$/, () => {
    soneparSearchPage.toHaveResults();
  });

  And(/^The first result contains search word \'Schneider Electric\'$/, () => {
    soneparSearchPage.containsSearchWord('Schneider Electric');
  })

  class soneparSearchPage {
    static visit() {
      cy.server()
      cy.visit('https://www.sonepar.com/fr.html');
      cy.route('POST', '/api/v2/client/sites/1146097/visit-data*').as('load')
      cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelectionWrapper').find('a').eq(2).click()
      cy.wait('@load', { timeout: 60000 })
      
    }
    static goToSearchBar() {
      cy.get('.search-toggle').find('.icon-search').click()
    }
    static type(query) {
      cy.route('POST', '/api/v2/client/sites/1146097/visit-data*').as('load')
      cy.get('#in01').type(query+'{enter}');
        cy.wait('@load', { timeout: 60000 })
        
    }

    static toHaveResults() {
        cy.url().should('contain','recherche.html')
        cy.get('.article-widget').find('p').should('be.visible')
     }

    static containsSearchWord(query) {
        cy.get('.article-widget').find('p').eq(0).should('contain', query)
     }
  }
