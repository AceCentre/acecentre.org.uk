context("Smoke", () => {
  before(() => {
    cy.recordHar();
  });

  after(() => {
    cy.saveHar();
  });

  it(["pre-deploy"], "loads the webpage without any issues", () => {
    cy.visit("/");
    cy.get("#__next").should("exist");
  });
});
