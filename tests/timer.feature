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

    Scenario: Resetting the wellness timer
        Given I have a paused wellness timer
        When I reset the wellness timer
        Then the timer should return to its initial value

    Scenario: Completing the wellness timer
        Given I have a near complete wellness timer
        When the timer reaches zero
        Then the timer should stop there and show the reset button
