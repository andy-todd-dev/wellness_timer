Feature: Wellness timer

    Scenario: Loading the wellness timer
        Given I have a wellness timer
        When I load the wellness timer
        Then the timer should display the initial time

    Scenario: Starting the wellness timer
        Given I have a wellness timer
        When I start the wellness timer
        Then the timer should begin counting down

    Scenario: Pausing the wellness timer
        Given I have a running wellness timer
        When I pause the wellness timer
        Then the timer should stop counting down

    Scenario: Resuming the wellness timer
        Given I have a paused wellness timer
        When I resume the wellness timer
        Then the timer should continue counting down from where it left off

    Scenario: Resetting the wellness timer
        Given I have a paused wellness timer
        When I reset the wellness timer
        Then the timer should return to its initial value

    Scenario: Completing the wellness timer
        Given I have a near complete wellness timer
        When the timer reaches zero
        Then the timer should stop there and show the reset button

    Scenario: Clicking up arrow on minutes tens digit
        Given I have a wellness timer with the timer set to 5 minutes and 30 seconds
        When I click the up arrow on the minutes tens digit
        Then the timer should display 15 minutes and 30 seconds

    Scenario: Clicking down arrow on minutes tens digit
        Given I have a wellness timer with the timer set to 14 minutes and 20 seconds
        When I click the down arrow on the minutes tens digit
        Then the timer should display 4 minutes and 20 seconds

    Scenario: Clicking up arrow on minutes tens digit with rollover
        Given I have a wellness timer with the timer set to 95 minutes and 30 seconds
        When I click the up arrow on the minutes tens digit
        Then the timer should display 5 minutes and 30 seconds

    Scenario: Clicking down arrow on minutes tens digit with rollover
        Given I have a wellness timer with the timer set to 5 minutes and 30 seconds
        When I click the down arrow on the minutes tens digit
        Then the timer should display 95 minutes and 30 seconds

    Scenario: Clicking up arrow on minutes ones digit
        Given I have a wellness timer with the timer set to 15 minutes and 30 seconds
        When I click the up arrow on the minutes ones digit
        Then the timer should display 16 minutes and 30 seconds

    Scenario: Clicking down arrow on minutes ones digit
        Given I have a wellness timer with the timer set to 16 minutes and 30 seconds
        When I click the down arrow on the minutes ones digit
        Then the timer should display 15 minutes and 30 seconds

    Scenario: Clicking up arrow on minutes ones digit with rollover
        Given I have a wellness timer with the timer set to 19 minutes and 30 seconds
        When I click the up arrow on the minutes ones digit
        Then the timer should display 10 minutes and 30 seconds

    Scenario: Clicking down arrow on minutes ones digit with rollover
        Given I have a wellness timer with the timer set to 10 minutes and 30 seconds
        When I click the down arrow on the minutes ones digit
        Then the timer should display 19 minutes and 30 seconds

    Scenario: Clicking up arrow on seconds tens digit
        Given I have a wellness timer with the timer set to 5 minutes and 20 seconds
        When I click the up arrow on the seconds tens digit
        Then the timer should display 5 minutes and 30 seconds

    Scenario: Clicking down arrow on seconds tens digit
        Given I have a wellness timer with the timer set to 5 minutes and 30 seconds
        When I click the down arrow on the seconds tens digit
        Then the timer should display 5 minutes and 20 seconds

    Scenario: Clicking up arrow on seconds tens digit with rollover
        Given I have a wellness timer with the timer set to 5 minutes and 50 seconds
        When I click the up arrow on the seconds tens digit
        Then the timer should display 5 minutes and 0 seconds

    Scenario: Clicking down arrow on seconds tens digit with rollover
        Given I have a wellness timer with the timer set to 5 minutes and 0 seconds
        When I click the down arrow on the seconds tens digit
        Then the timer should display 5 minutes and 50 seconds

    Scenario: Clicking up arrow on seconds ones digit
        Given I have a wellness timer with the timer set to 5 minutes and 25 seconds
        When I click the up arrow on the seconds ones digit
        Then the timer should display 5 minutes and 26 seconds

    Scenario: Clicking down arrow on seconds ones digit
        Given I have a wellness timer with the timer set to 5 minutes and 26 seconds
        When I click the down arrow on the seconds ones digit
        Then the timer should display 5 minutes and 25 seconds

    Scenario: Clicking up arrow on seconds ones digit with rollover
        Given I have a wellness timer with the timer set to 5 minutes and 29 seconds
        When I click the up arrow on the seconds ones digit
        Then the timer should display 5 minutes and 20 seconds

    Scenario: Clicking down arrow on seconds ones digit with rollover
        Given I have a wellness timer with the timer set to 5 minutes and 20 seconds
        When I click the down arrow on the seconds ones digit
        Then the timer should display 5 minutes and 29 seconds

    Scenario: Swiping up on minutes tens digit
        Given I have a wellness timer with the timer set to 5 minutes and 30 seconds
        When I swipe up on the minutes tens digit
        Then the timer should display 15 minutes and 30 seconds

    Scenario: Swiping down on minutes tens digit
        Given I have a wellness timer with the timer set to 14 minutes and 20 seconds
        When I swipe down on the minutes tens digit
        Then the timer should display 4 minutes and 20 seconds

    Scenario: Swiping up on minutes tens digit with rollover
        Given I have a wellness timer with the timer set to 95 minutes and 30 seconds
        When I swipe up on the minutes tens digit
        Then the timer should display 5 minutes and 30 seconds

    Scenario: Swiping down on minutes tens digit with rollover
        Given I have a wellness timer with the timer set to 5 minutes and 30 seconds
        When I swipe down on the minutes tens digit
        Then the timer should display 95 minutes and 30 seconds

    Scenario: Swiping up on minutes ones digit
        Given I have a wellness timer with the timer set to 15 minutes and 30 seconds
        When I swipe up on the minutes ones digit
        Then the timer should display 16 minutes and 30 seconds

    Scenario: Swiping down on minutes ones digit
        Given I have a wellness timer with the timer set to 16 minutes and 30 seconds
        When I swipe down on the minutes ones digit
        Then the timer should display 15 minutes and 30 seconds

    Scenario: Swiping up on minutes ones digit with rollover
        Given I have a wellness timer with the timer set to 19 minutes and 30 seconds
        When I swipe up on the minutes ones digit
        Then the timer should display 10 minutes and 30 seconds

    Scenario: Swiping down on minutes ones digit with rollover
        Given I have a wellness timer with the timer set to 10 minutes and 30 seconds
        When I swipe down on the minutes ones digit
        Then the timer should display 19 minutes and 30 seconds

    Scenario: Swiping up on seconds tens digit
        Given I have a wellness timer with the timer set to 5 minutes and 20 seconds
        When I swipe up on the seconds tens digit
        Then the timer should display 5 minutes and 30 seconds

    Scenario: Swiping down on seconds tens digit
        Given I have a wellness timer with the timer set to 5 minutes and 30 seconds
        When I swipe down on the seconds tens digit
        Then the timer should display 5 minutes and 20 seconds

    Scenario: Swiping up on seconds tens digit with rollover
        Given I have a wellness timer with the timer set to 5 minutes and 50 seconds
        When I swipe up on the seconds tens digit
        Then the timer should display 5 minutes and 0 seconds

    Scenario: Swiping down on seconds tens digit with rollover
        Given I have a wellness timer with the timer set to 5 minutes and 0 seconds
        When I swipe down on the seconds tens digit
        Then the timer should display 5 minutes and 50 seconds

    Scenario: Swiping up on seconds ones digit
        Given I have a wellness timer with the timer set to 5 minutes and 25 seconds
        When I swipe up on the seconds ones digit
        Then the timer should display 5 minutes and 26 seconds

    Scenario: Swiping down on seconds ones digit
        Given I have a wellness timer with the timer set to 5 minutes and 26 seconds
        When I swipe down on the seconds ones digit
        Then the timer should display 5 minutes and 25 seconds

    Scenario: Swiping up on seconds ones digit with rollover
        Given I have a wellness timer with the timer set to 5 minutes and 29 seconds
        When I swipe up on the seconds ones digit
        Then the timer should display 5 minutes and 20 seconds

    Scenario: Swiping down on seconds ones digit with rollover
        Given I have a wellness timer with the timer set to 5 minutes and 20 seconds
        When I swipe down on the seconds ones digit
        Then the timer should display 5 minutes and 29 seconds

