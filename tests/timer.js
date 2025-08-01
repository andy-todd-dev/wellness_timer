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

const ISO_PREFIX = "PT";
const ISO_MINUTES = "M";
const ISO_SECONDS = "S";

Given(
  /^I have a wellness timer with the timer set to (\d+) minute(?:s)?(?: and (\d+) second(?:s)?)?$/,
  (minutes, seconds) => {
    const isoTime = seconds
      ? `${ISO_PREFIX}${minutes}${ISO_MINUTES}${seconds}${ISO_SECONDS}`
      : `${ISO_PREFIX}${minutes}${ISO_MINUTES}`;
    cy.visit("/", {
      qs: {
        initialTime: isoTime,
      },
    });
  }
);

// WHENs
When("I load the wellness timer", () => {});
When("I pause the wellness timer", () => {
  cy.get("[aria-label='Pause timer']").click();
});

When("I start the wellness timer", () => {
  cy.get("[aria-label='Start timer']").click();
});

When("I resume the wellness timer", () => {
  cy.get("[aria-label='Start timer']").click();
});

When("I reset the wellness timer", () => {
  cy.get("[aria-label='Reset timer']").click();
});

When("the timer reaches zero", () => {
  cy.wait(5000); // Wait for the near complete timer to reach zero
});

When(
  /^I click the (plus|minus) (one|ten) (minute|minutes) button$/,
  (plusOrMinus, amount) => {
    // Map to ARIA label
    const action = plusOrMinus === "plus" ? "Increase" : "Decrease";
    const minutes = amount === "one" ? 1 : 10;
    const minuteLabel = minutes === 1 ? "minute" : "minutes";
    const ariaLabel = `${action} timer by ${minutes} ${minuteLabel}`;
    cy.get(`[aria-label='${ariaLabel}']`).click();
  }
);

When(
  /^I swipe (up|down) on the (minutes tens|minutes ones|seconds tens|seconds ones) digit$/,
  (direction, digitType) => {
    // Map digit types to aria-labels
    const digitAriaLabels = {
      "minutes tens": "Tens of minutes digit",
      "minutes ones": "Ones of minutes digit",
      "seconds tens": "Tens of seconds digit",
      "seconds ones": "Ones of seconds digit",
    };

    cy.get(`[aria-label='${digitAriaLabels[digitType]}']`).swipe(direction);
  }
);

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

Then("the timer should not go below one minute", () => {
  cy.get(".timer-display").should("contain", "1:00");
});

Then(
  /^the timer should display (\d+) minute(?:s)?(?:\s+and\s+(\d+) second(?:s)?)?$/,
  (minutes, seconds) => {
    const expectedMinutes = parseInt(minutes, 10);
    const formattedMinutes = expectedMinutes.toString().padStart(2, "0");

    if (seconds) {
      // Handle cases with both minutes and seconds
      const expectedSeconds = parseInt(seconds, 10);
      const formattedSeconds = expectedSeconds.toString().padStart(2, "0");
      const expected = `${formattedMinutes}:${formattedSeconds}`;
      cy.get(".timer-display").should("contain", expected);
    } else {
      // Handle cases with only minutes (assumes :00 seconds)
      const expected = `${formattedMinutes}:00`;
      cy.get(".timer-display").should("contain", expected);
    }
  }
);

Then("the timer should continue counting down from where it left off", () => {
  cy.wait(2000); // Wait for the timer to continue
  cy.get(".timer-display").should("contain", "19:55");
});
