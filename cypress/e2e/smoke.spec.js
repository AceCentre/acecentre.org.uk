context("Smoke", () => {
  it(["pre-deploy"], "loads the webpage without any issues", () => {
    cy.recordHar();

    cy.visit("/");
    cy.get("#__next").should("exist");

    cy.saveHar({ fileName: "smoke-1.har" });
  });

  it(["pre-deploy"], "also loads without issue, to test multiple hars", () => {
    cy.recordHar();

    cy.visit("/");
    cy.get("#__next").should("exist");

    cy.saveHar({ fileName: "smoke-2.har" });
  });
});
