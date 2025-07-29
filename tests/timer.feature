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

    Scenario: Subtracting one minute when timer is near minimum
        Given I have a wellness timer with the timer set to 1 minute and 30 seconds
        When I click the minus one minute button
        Then the timer should not go below one minute

    Scenario: Subtracting ten minutes when timer is near minimum
        Given I have a wellness timer with the timer set to 2 minutes
        When I click the minus ten minute button
        Then the timer should not go below one minute

    Scenario: Incrementing the timer by one minute
        Given I have a wellness timer with the timer set to 5 minutes
        When I click the plus one minute button
        Then the timer should display 6 minutes

    Scenario: Incrementing the timer by ten minutes
        Given I have a wellness timer with the timer set to 5 minutes
        When I click the plus ten minute button
        Then the timer should display 15 minutes

    Scenario: Decrementing the timer by one minute
        Given I have a wellness timer with the timer set to 5 minutes
        When I click the minus one minute button
        Then the timer should display 4 minutes

    Scenario: Decrementing the timer by ten minutes
        Given I have a wellness timer with the timer set to 15 minutes
        When I click the minus ten minute button
        Then the timer should display 5 minutes

