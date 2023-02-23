const NO_ACC_EMAIL = "thisisnotanaccount@gavin.com";

context("Login", () => {
  it(["pre-deploy"], "shows an error when no account exists", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 60000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("textbox", { name: "Username or email address" })
      .type(NO_ACC_EMAIL);

    cy.findAllByRole("form", { name: "Login form" })
      .findByLabelText("Password")
      .type("password");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("button", { name: "Log in" })
      .click();

    cy.findByTestId("login-error", { timeout: 60000 }).should((error) => {
      expect(error).to.contain("Your email address or password is incorrect");
    });
  });
});
