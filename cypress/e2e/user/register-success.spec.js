import { deleteUser } from "../../support/delete-user";
import { validEmail } from "../../support/valid-email";

const VALID_PASSWORD = "averyvalidpassword";

context("Register", () => {
  let newEmail;

  beforeEach(() => {
    newEmail = null;
  });

  afterEach(async () => {
    cy.wrap(null, { timeout: 60000 }).then(async () => {
      await deleteUser(newEmail, "digitalocean", "register-success");
    });
  });

  it("Registers in, checks email in details, logs out", () => {
    // Store email address for later
    newEmail = validEmail("register-success");

    // Go to the register page
    cy.visit("", { timeout: 60000 });
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 60000 }).should("include", "/login");

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
    cy.url({ timeout: 60000 }).should("include", "/my-acecentre");
    cy.findAllByRole("link", { name: "My Ace Centre" }).should("exist");

    // Check email in details
    cy.findByRole("link", { name: "Manage details >" }).click();
    cy.url({ timeout: 60000 }).should("include", "/details");
    cy.findByRole("textbox", { name: "Email" }).should("have.value", newEmail);

    // Go back to my-acecentre
    cy.wait(2000); // Wait for render
    cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
    cy.url({ timeout: 60000 }).should(
      "equal",
      Cypress.config().baseUrl + "/my-acecentre"
    );

    // Log out
    cy.findByRole("button", { name: "Logout" }).click();
    cy.url({ timeout: 60000 }).should("equal", Cypress.config().baseUrl + "/");
    cy.wait(2000);
    cy.findAllByRole("link", { name: "Login" }).should("exist");

    // Make sure we are on the login page
    cy.wait(2000);
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 60000 }).should("include", "/login");
  });
});
