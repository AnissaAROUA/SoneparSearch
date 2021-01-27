Feature: Search Sonepar
  @e2e-test
  Scenario: Product search
    Given I'm at sonepar
    When I go to the search bar
    And I type search word 'Schneider Electric'
    Then I have some results
    And The first result contains search word 'Schneider Electric'