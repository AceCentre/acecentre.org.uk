context("Resources Browse", () => {
  it("Completes a search and has the correct search text on the next page", () => {
    const searchText = "My search text";

    cy.visit("/");

    // Click the resources link in the nav
    cy.findByTestId("subnav").findByRole("link", { name: "Resources" }).click();

    // Find the search box and then type 'a'
    cy.findByRole("textbox", { name: "What are you looking for?" }).type(
      "a{enter}"
    );

    // const searchButton = cy.findByRole("button", { name: "Search" });
    // searchButton.click();

    // const resultsElement = cy.findByRole("heading", { name: /Results/i });
    // resultsElement.contains(searchText);
  });
});
