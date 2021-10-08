const NO_ACC_EMAIL = "thisisnotanaccount@gavin.com";
const ACCOUNT_EXISTS = "ghenderson@acecentre.org.uk";
const TEST_ACC = "cypress@test.com";
const TEST_PASS = "testpassword";

context("Login", () => {
  it(["pre-deploy"], "disables the login button by default", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("button", { name: "Log in" })
      .should("be.disabled");
  });

  it(
    ["pre-deploy"],
    "enables the login button when you enter text into each field",
    () => {
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
    }
  );

  it(["pre-deploy"], "shows an error when no account exists", () => {
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

  it(["pre-deploy"], "shows an error when password is wrong", () => {
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

  it(["pre-deploy"], "successfully logs in to a valid account", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("textbox", { name: "Username or email address" })
      .type(TEST_ACC);

    cy.findAllByRole("form", { name: "Login form" })
      .findByLabelText("Password")
      .type(TEST_PASS);

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("button", { name: "Log in" })
      .click();

    cy.url({ timeout: 10000 }).should("include", "/my-acecentre");

    cy.findByRole("link", { name: "Manage details >" }).click();
    cy.url({ timeout: 10000 }).should("include", "/details");
    cy.findByRole("textbox", { name: "Email" }).should("have.value", TEST_ACC);
  });
});
