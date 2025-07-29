import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

const DEFAULT_TIMER = "PT20M"; // Default timer duration in ISO 8601 format

// GIVENs
Given("I have a wellness timer", () => {
  cy.visit("/", {
    qs: {
      initialTime: DEFAULT_TIMER,
    },
  });
});

Given("I have a running wellness timer", () => {
  cy.visit("/", {
    qs: {
      initialTime: DEFAULT_TIMER,
      running: true,
    },
  });
});

// WHENs
When("I load the wellness timer", () => {});
When("I pause the wellness timer", () => {
  cy.get("[aria-label='Pause timer']").click();
});

When("I start the wellness timer", () => {
  cy.get("[aria-label='Start timer']").click();
});

// THENs
Then("the timer should display the initial time", () => {
  cy.get(".timer-display").should("contain", "20:00");
});

Then("the timer should begin counting down", () => {
  cy.get(".timer-display").should("contain", "19:");
});

Then("the timer should stop counting down", () => {
  cy.get(".timer-display")
    .invoke("text")
    .then((currentTime) => {
      cy.wait(2000); // Wait for 2 seconds
      cy.get(".timer-display").should("contain", currentTime);
    });
});
