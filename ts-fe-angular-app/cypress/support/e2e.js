// Import commands.ts using ES2015 syntax if custom commands are added in the future.
// Currently relying on Cypress' built-in commands only.

beforeEach(() => {
  // Ensure each spec starts with a clean auth token state.
  cy.window({ log: false }).then(win => win.localStorage.clear());
});

afterEach(function () {
  // Persist a screenshot for every test run so we capture success states too.
  const testName = this.currentTest && typeof this.currentTest.fullTitle === 'function'
    ? this.currentTest.fullTitle()
    : 'final-state';
  const sanitized = testName.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
  cy.screenshot(sanitized, { overwrite: true, capture: 'runner' });
});
