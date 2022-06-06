const VALID_PASSWORD = "averyvalidpassword";
const INVALID_EMAIL = "email@email@email.com";

context("Register", () => {
  it(["pre-deploy"], "Shows an error when you email is not valid", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 60000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Register form" })
      .findByRole("textbox", {
        name: "Email address",
      })
      .type(INVALID_EMAIL);

    cy.findAllByRole("form", { name: "Register form" })
      .findByLabelText("Password")
      .type(VALID_PASSWORD);

    cy.findByTestId("register-email-error").should((error) => {
      expect(error).to.contain("Email address is not valid");
    });
  });
});
