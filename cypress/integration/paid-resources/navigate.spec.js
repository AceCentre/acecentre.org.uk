context("Paid resources", () => {
  it(["pre-deploy"], "can navigate to a paid resource", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Resources" }).first().click();
    cy.url({ timeout: 60000 }).should("include", "resources");
    cy.findAllByRole("link", { name: "View all resources" }).first().click();
    cy.url({ timeout: 60000 }).should("include", "resources/all");
    cy.findAllByRole("combobox", { name: "Price range" }).select("Paid");
    cy.wait(1000);
    cy.url({ timeout: 60000 }).should("include", "pricerange=paid");
    cy.findByRole("main")
      .findAllByRole("list")
      .first()
      .children()
      .first()
      .click();

    cy.findByRole("main").should("not.contain", "Free");
  });
});
