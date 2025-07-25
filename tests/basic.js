import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I have a wellness timer", () => {});

When("I load the wellness timer", () => {
  cy.visit("http://localhost:3000");
});

Then("I should see the wellness timer loaded", () => {
  cy.get("[aria-label='Start timer']").should("be.visible");
});
