import { deleteUser } from "../../support/delete-user";
import { validEmail } from "../../support/valid-email";

const VALID_PASSWORD = "securepassword";

context("Paid resources", () => {
  let newEmail;
  let harName = "unknown.har";

  beforeEach(() => {
    newEmail = null;
    cy.recordHar();
  });

  afterEach(async () => {
    cy.saveHar({ fileName: `${harName}.har` });

    await deleteUser(newEmail, "internal", "checkout-new-account");
  });

  it(
    ["pre-deploy"],
    "can add product to cart, and checkout with a new account",
    () => {
      harName = "checkout-new-account";
      newEmail = validEmail("checkout-new-account");

      cy.visit("/resources/simple-charts-to-edit-in-word");
      cy.findByRole("button", { name: "Add to cart" }).click();
      cy.url({ timeout: 60000 }).should("include", "basket");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");
      cy.findAllByRole("link", { name: "Checkout as New User" }).last().click();
      cy.url({ timeout: 60000 }).should("include", "register-checkout");

      // Fill in email field
      cy.findAllByRole("form", { name: "Register form" })
        .findByRole("textbox", {
          name: "Enter your email address",
        })
        .type(newEmail);

      // Fill in password field
      cy.findAllByRole("form", { name: "Register form" })
        .findByLabelText("Password")
        .type(VALID_PASSWORD);

      // Click register
      cy.findAllByRole("form", { name: "Register form" })
        .findByRole("button", { name: "Register and checkout" })
        .click();

      cy.url({ timeout: 60000 }).should("include", "/checkout");
      cy.findByRole("textbox", { name: "First name" }).type("John");
      cy.findByRole("textbox", { name: "Last name" }).type("Smith");
      cy.findByRole("combobox", { name: "Country" }).select(
        "United Kingdom (UK)"
      );
      cy.findByRole("textbox", { name: "Address Line 1" }).type(
        "80 Fake Address"
      );
      cy.findByRole("textbox", { name: "Town / City" }).type("Manchester");
      cy.findByRole("textbox", { name: "Postcode" }).type("OL8 3QL");
      cy.findByRole("textbox", { name: "Phone number" }).type("07545783496");
      cy.findByRole("textbox", { name: "Email address" }).should(
        "have.value",
        newEmail
      );
      cy.findByRole("textbox", { name: "Email address" }).should("be.disabled");

      cy.get('iframe[title="Secure card payment input frame"]')
        .its("0.contentDocument")
        .then(cy.wrap)
        .findAllByRole("textbox", { name: "Credit or debit card number" })
        .type("4242424242424242");

      cy.get('iframe[title="Secure card payment input frame"]')
        .its("0.contentDocument")
        .then(cy.wrap)
        .findAllByRole("textbox", {
          name: "Credit or debit card expiration date",
        })
        .type("1224");

      cy.get('iframe[title="Secure card payment input frame"]')
        .its("0.contentDocument")
        .then(cy.wrap)
        .findAllByRole("textbox", { name: "Credit or debit card CVC/CVV" })
        .type("123");

      cy.findByRole("checkbox", {
        name: "I have read and agree to the website terms and conditions and privacy policy",
      }).click({ force: true });

      cy.findByRole("button", { name: "Place order" }).click();
      cy.wait(1000);
      cy.url({ timeout: 60000 }).should("include", "order");
    }
  );
});
