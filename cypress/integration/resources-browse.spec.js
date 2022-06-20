context("Resources Browse", () => {
  it(
    ["pre-deploy"],
    "Completes a search and has the correct search text on the next page",
    () => {
      const searchText = "test";

      cy.visit("/");

      // Click the resources link in the nav
      cy.findByTestId("subnav")
        .findByRole("link", { name: "Resources" })
        .click();

      // Find the search box and then type 'a'
      cy.findByRole("textbox", { name: "Search resources" }).type(
        `${searchText}{enter}`
      );

      cy.contains("You searched for").contains(searchText);
    }
  );

  it(["pre-deploy"], "Make a search from the resources page", () => {
    const searchText = "test";

    cy.visit("/resources/all");

    // Find the search box and then type 'a'
    cy.findByRole("textbox", { name: "Search resources" }).type(
      `${searchText}{enter}`
    );

    cy.contains("You searched for").contains(searchText);
  });
});
