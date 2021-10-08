context("Moodle Login", () => {
  it(["post-deploy"], "loads the webpage without any issues", () => {
    cy.visit("/");
    cy.get("#__next").should("exist");
  });
});
