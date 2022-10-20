context("Smoke", () => {
  before(() => {
    console.log("======== RECORDING ===========");
    console.log(Cypress.env("HARS_FOLDERS"));
    cy.recordHar();
    console.log("======== RECORDING STARTED ===========");
  });

  after(() => {
    console.log("======== SAVING ===========");
    cy.saveHar();
    console.log("======== SAVED ===========");
  });

  it(["pre-deploy"], "loads the webpage without any issues", () => {
    cy.visit("/");
    cy.get("#__next").should("exist");
  });
});
