context("Free resources", () => {
  it("can navigate to a free resource", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Resources" }).first().click();
    cy.findAllByRole("link", { name: "View all resources" }).first().click();
    cy.findAllByRole("combobox", { name: "Price range" });
  });
});
