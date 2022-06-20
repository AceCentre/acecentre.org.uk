const VALID_PASSWORD = "averyvalidpassword";
const EXISTING_EMAIL = "ghenderson@acecentre.org.uk";

context("Register", () => {
  it(["pre-deploy"], "Shows an error when the email address is in use", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 60000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Register form" })
      .findByRole("textbox", {
        name: "Email address",
      })
      .type(EXISTING_EMAIL);

    cy.findAllByRole("form", { name: "Register form" })
      .findByLabelText("Password")
      .type(VALID_PASSWORD);

    cy.findAllByRole("form", { name: "Register form" })
      .findByRole("button", { name: "Register" })
      .click();

    cy.findByTestId("register-error").should((error) => {
      expect(error).to.contain("This email is already in use");
    });
  });
});
