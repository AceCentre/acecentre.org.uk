context("Newsletter Sign Up", () => {
  it("Signs up for the newsletter", () => {
    const email = "cypress@gavinhenderson.co.uk";

    cy.visit("/");

    cy.findByRole("link", { name: "Newsletter" }).click();

    cy.findByRole("textbox", { name: "First name" }).type("Cypress");
    cy.findByRole("textbox", { name: "Last name" }).type("Testing");
    cy.findByRole("textbox", { name: "Email address" }).type(email);

    cy.findByRole("button", { name: "Subscribe" }).click();

    cy.findByText("You have successfully signed up for the newsletter.");
  });
});
