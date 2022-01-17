const VALID_PASSWORD = "averyvalidpassword";
const EXISTING_EMAIL = "ghenderson@acecentre.org.uk";
const SHORT_PASSWORD = "short";
const INVALID_EMAIL = "email@email@email.com";

const validEmail = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);

  return `test-${randomNumber}@acecentre.org.uk`;
};

context("Register", () => {
  it(["pre-deploy"], "Shows an error when the email address is in use", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 30000 }).should("include", "/login");

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

  it(["pre-deploy"], "Shows an error when you password is to short", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 30000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Register form" })
      .findByRole("textbox", {
        name: "Email address",
      })
      .type(validEmail());

    cy.findAllByRole("form", { name: "Register form" })
      .findByLabelText("Password")
      .type(SHORT_PASSWORD);

    cy.findByTestId("register-password-error").should((error) => {
      expect(error).to.contain("Password must be 8+ characters");
    });
  });

  it(["pre-deploy"], "Shows an error when you email is not valid", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 30000 }).should("include", "/login");

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

  it(["pre-deploy"], "Registers in, checks email in details, logs out", () => {
    // Store email address for later
    const newEmail = validEmail();

    // Go to the register page
    cy.visit("");
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 30000 }).should("include", "/login");

    // Fill in email field
    cy.findAllByRole("form", { name: "Register form" })
      .findByRole("textbox", {
        name: "Email address",
      })
      .type(newEmail);

    // Fill in password field
    cy.findAllByRole("form", { name: "Register form" })
      .findByLabelText("Password")
      .type(VALID_PASSWORD);

    // Click register
    cy.findAllByRole("form", { name: "Register form" })
      .findByRole("button", { name: "Register" })
      .click();

    // Make sure we we end up on my-acecentre
    cy.url({ timeout: 30000 }).should("include", "/my-acecentre");
    cy.findAllByRole("link", { name: "My Ace Centre" }).should("exist");

    // Check email in details
    cy.findByRole("link", { name: "Manage details >" }).click();
    cy.url({ timeout: 30000 }).should("include", "/details");
    cy.findByRole("textbox", { name: "Email" }).should("have.value", newEmail);

    // Go back to my-acecentre
    cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
    cy.url({ timeout: 30000 }).should(
      "equal",
      Cypress.config().baseUrl + "/my-acecentre"
    );

    // Log out
    cy.findByRole("button", { name: "Logout" }).click();
    cy.url({ timeout: 30000 }).should("equal", Cypress.config().baseUrl + "/");
    cy.findAllByRole("link", { name: "Login" }).should("exist");

    // Make sure we are on the login page
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 30000 }).should("include", "/login");
  });
});
