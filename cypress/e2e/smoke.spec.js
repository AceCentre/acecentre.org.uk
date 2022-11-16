describe("Smoke", () => {
  let harName = "unknown.har";

  beforeEach(() => {
    cy.recordHar();
  });

  afterEach(() => {
    cy.saveHar({ fileName: `${harName}.har` });
  });

  it(["pre-deploy"], "loads the webpage without any issues", () => {
    harName = "home";
    cy.visit("/");
    cy.get("#__next").should("exist");
  });
});
