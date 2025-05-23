context("Free resources", () => {
  it("can navigate to a free resource", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Resources" }).first().click();
    cy.findAllByRole("link", { name: "View all resources" }).first().click();
    cy.findAllByRole("combobox", { name: "Price range" }).select("Free");
    cy.wait(5000);
    cy.findAllByRole("combobox", { name: "Sort by" }).select("Oldest");

    cy.url({ timeout: 40000 }).should("include", "pricerange=free");
    cy.wait(5000);
    cy.findByRole("main")
      .findAllByRole("list")
      .first()
      .children()
      .first()
      .click();

    cy.findByRole("main").should("contain", "Free");
  });

  it("can download a simple resource", () => {
    cy.visit(
      "/resources/high-contrast-listener-mediated-scan-charts-abc-frequency"
    );

    // Cant test download due to https://github.com/cypress-io/cypress/issues/14857
    // So I just prevent default on clicks, its a hack but does the job

    cy.window()
      .document()
      .then(function (doc) {
        doc.addEventListener("click", (event) => {
          event.preventDefault();
        });

        cy.findByRole("button", { name: "Free download" }).click();
        cy.findByRole("heading", { name: "Free download complete" }).should(
          "exist"
        );
        cy.findAllByRole("textbox", {
          name: "Email address",
        }).should("exist");
      });
  });
});
