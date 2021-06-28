context("Blog Search", () => {
  it("Completes a search and has the correct search text on the next page", () => {
    const searchText = "My search text";

    cy.visit("/blog");

    cy.findByRole("textbox", { name: "Search blog posts" }).type(
      `${searchText}{enter}`
    );

    cy.findByRole("heading", { name: /Results/i }).contains(searchText);
  });
});
