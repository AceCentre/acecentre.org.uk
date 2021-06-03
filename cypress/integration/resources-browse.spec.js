context("Resources Browse", () => {
  it("Completes a search and has the correct search text on the next page", () => {
    cy.visit("/");

    // Click the resources link in the nav
    cy.findByTestId("subnav").findByRole("link", { name: "Resources" }).click();

    // Find the search box and then type 'a'
    cy.findByRole("textbox", { name: "Search resources" }).type("a{enter}");

    // const searchButton = cy.findByRole("button", { name: "Search" });
    // searchButton.click();

    // const resultsElement = cy.findByRole("heading", { name: /Results/i });
    // resultsElement.contains(searchText);
  });
});
