import { deleteUser } from "../support/delete-user";
import { validEmail } from "../support/valid-email";

context("Checkout", () => {
  let newEmail;
  let harName = "unknown.har";

  beforeEach(() => {
    newEmail = null;
    cy.recordHar();
  });

  afterEach(async () => {
    cy.saveHar({ fileName: `${harName}.har` });

    await deleteUser(newEmail, "internal", "basic-checkout");
  });

  it(
    ["pre-deploy"],
    "Buys a single paid virtual product, on an existing account",
    () => {
      harName = "checkout.har";
      // Register
      newEmail = validEmail();
      const password = "password";
      cy.visit("/login");

      cy.wait(20000);

      cy.get("#email").type(newEmail);
      cy.get("#register-password").type(password);
      cy.findByRole("button", { name: "Register" }).click();
      cy.url({ timeout: 40000 }).should("include", "my-acecentre");
      cy.visit("/");
    }
  );
});
