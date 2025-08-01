/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      // Custom command for react-swipeable compatible swipes
      swipe(direction: "up" | "down", distance?: number): Chainable;
    }
  }
}

// Helper function to simulate swipe gestures compatible with react-swipeable
const simulateSwipe = (
  element: any,
  direction: "up" | "down",
  distance = 100
) => {
  return cy.wrap(element).then(($element: any) => {
    const el = $element[0];
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate start and end positions for swipe
    const startY =
      direction === "up" ? centerY + distance / 2 : centerY - distance / 2;
    const endY =
      direction === "up" ? centerY - distance / 2 : centerY + distance / 2;

    // Simulate touch sequence that react-swipeable expects
    return cy
      .wrap($element)
      .trigger("touchstart", {
        touches: [{ clientX: centerX, clientY: startY }],
        targetTouches: [{ clientX: centerX, clientY: startY }],
        changedTouches: [{ clientX: centerX, clientY: startY }],
      })
      .trigger("touchmove", {
        touches: [{ clientX: centerX, clientY: endY }],
        targetTouches: [{ clientX: centerX, clientY: endY }],
        changedTouches: [{ clientX: centerX, clientY: endY }],
      })
      .trigger("touchend", {
        touches: [],
        targetTouches: [],
        changedTouches: [{ clientX: centerX, clientY: endY }],
      });
  });
};

// Add custom Cypress command for easier usage
Cypress.Commands.add(
  "swipe",
  { prevSubject: "element" },
  (subject: any, direction: "up" | "down", distance?: number) => {
    return simulateSwipe(subject, direction, distance);
  }
);

// Export an empty object to make this file a module
export {};
