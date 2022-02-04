context("Login", () => {
  it(["pre-deploy"], "disables the login button by default", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 60000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("button", { name: "Log in" })
      .should("be.disabled");
  });
});
