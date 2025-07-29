import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

// ISO 8601 format
const DEFAULT_TIMER = "PT20M";
const NEAR_COMPLETE_TIMER = "PT2S";

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

Given("I have a paused wellness timer", () => {
  cy.visit("/", {
    qs: {
      initialTime: DEFAULT_TIMER,
      running: true,
    },
  });
  cy.wait(2000); // Wait for the timer to start
  cy.get("[aria-label='Pause timer']").click();
});

Given("I have a near complete wellness timer", () => {
  cy.visit("/", {
    qs: {
      initialTime: NEAR_COMPLETE_TIMER,
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

When("I reset the wellness timer", () => {
  cy.get("[aria-label='Reset timer']").click();
});

When("the timer reaches zero", () => {
  cy.wait(5000); // Wait for the near complete timer to reach zero
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

Then("the timer should return to its initial value", () => {
  cy.get(".timer-display").should("contain", "20:00");
});

Then("the timer should stop there and show the reset button", () => {
  cy.get(".timer-display").should("contain", "00:00");
  cy.get("[aria-label='Reset timer']").should("be.visible");
});
