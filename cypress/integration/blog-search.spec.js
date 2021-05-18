context("Blog Search", () => {
  it("Completes a search and has the correct search text on the next page", () => {
    const searchText = "My search text";

    cy.visit("/blog");

    const searchInput = cy.findByRole("textbox", { name: "Search blog posts" });
    searchInput.type(searchText);

    const searchButton = cy.findByRole("button", { name: "Search" });
    searchButton.click();

    const resultsElement = cy.findByRole("heading", { name: /Results/i });
    resultsElement.contains(searchText);
  });
});
