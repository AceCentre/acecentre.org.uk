describe("Smoke", () => {
  beforeEach(() => {
    cy.recordHar();
  });

  afterEach(() => {
    cy.saveHar({ fileName: "smoke.har" });
  });

  it(["pre-deploy"], "loads the webpage without any issues", () => {
    cy.visit("https://google.com");
    cy.get("body").should("not.exist");
  });
});
