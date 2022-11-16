describe("Smoke", () => {
  let harName = "unknown.har";

  beforeEach(() => {
    cy.recordHar();
  });

  afterEach(() => {
    console.log("AFTER", harName);

    cy.saveHar({ fileName: `${harName}.har` });
  });

  it(["pre-deploy"], "loads the webpage without any issues", () => {
    harName = "home";
    cy.visit("/");
    cy.get("#__next").should("exist");
  });
});
