const NO_ACC_EMAIL = "thisisnotanaccount@gavin.com";
const ACCOUNT_EXISTS = "ghenderson@acecentre.org.uk";

context("Login", () => {
  it("disables the login button by default", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("button", { name: "Log in" })
      .should("be.disabled");
  });

  it("enables the login button when you enter text into each field", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("textbox", { name: "Username or email address" })
      .type("email@email.com");

    cy.findAllByRole("form", { name: "Login form" })
      .findByLabelText("Password")
      .type("password");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("button", { name: "Log in" })
      .should("not.be.disabled");
  });

  it("shows an error when no account exists", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("textbox", { name: "Username or email address" })
      .type(NO_ACC_EMAIL);

    cy.findAllByRole("form", { name: "Login form" })
      .findByLabelText("Password")
      .type("password");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("button", { name: "Log in" })
      .click();

    cy.findByTestId("login-error", { timeout: 10000 }).should((error) => {
      expect(error).to.contain("Your email address or password is incorrect");
    });
  });

  it("shows an error when password is wrong", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("textbox", { name: "Username or email address" })
      .type(ACCOUNT_EXISTS);

    cy.findAllByRole("form", { name: "Login form" })
      .findByLabelText("Password")
      .type("password");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("button", { name: "Log in" })
      .click();

    cy.findByTestId("login-error", { timeout: 10000 }).should((error) => {
      expect(error).to.contain("Your email address or password is incorrect");
    });
  });
});
