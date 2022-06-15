import { deleteUser } from "../support/delete-user";
import { validEmail } from "../support/valid-email";

context("Checkout", () => {
  let newEmail;

  beforeEach(() => {
    newEmail = null;
  });

  afterEach(async () => {
    await deleteUser(newEmail, "internal");
  });

  it(
    ["pre-deploy"],
    "Buys a single paid virtual product, on an existing account",
    () => {
      // Register
      newEmail = validEmail();
      const password = "password";
      cy.visit("/login");

      cy.wait(20000);

      cy.get("#email").type(newEmail);
      cy.get("#register-password").type(password);
      cy.findByRole("button", { name: "Register" }).click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.visit("/");
    }
  );
});
