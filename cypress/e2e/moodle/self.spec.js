import { changePassword } from "../../support/change-password";
import { createCoupon, deleteCoupon } from "../../support/coupon";
import { deleteUser } from "../../support/delete-user";
import { validEmail } from "../../support/valid-email";

const VALID_PASSWORD = "securepassword";

Cypress.Commands.add("changePassword", async (username, password) => {
  await changePassword(username, password);
});

context("Moodle", () => {
  describe("needs coupon", () => {
    let couponCode;
    let couponId;
    let newEmail;
    let delegatedEmail;
    let bulkEmailOne;
    let bulkEmailTwo;

    beforeEach(async () => {
      newEmail = null;
      couponId = null;
      newEmail = null;
      delegatedEmail = null;
      bulkEmailOne = null;
      bulkEmailTwo = null;

      const result = await createCoupon();
      couponCode = result.couponCode;
      couponId = result.couponId;
    });

    afterEach(() => {
      cy.wrap(null, { timeout: 60000 }).then(async () => {
        await deleteCoupon(couponId);
      });

      cy.wrap(null, { timeout: 60000 }).then(async () => {
        if (newEmail) {
          await deleteUser(newEmail, "backend", "bulk-new");
        }
      });

      cy.wrap(null, { timeout: 60000 }).then(async () => {
        if (delegatedEmail) {
          await deleteUser(delegatedEmail, "backend", "bulk-delegated");
        }
      });

      cy.wrap(null, { timeout: 60000 }).then(async () => {
        if (bulkEmailOne) {
          await deleteUser(bulkEmailOne, "backend", "bulk-bulk-one");
        }
      });

      cy.wrap(null, { timeout: 60000 }).then(async () => {
        if (bulkEmailTwo) {
          await deleteUser(bulkEmailTwo, "backend", "bulk-bulk-two");
        }
      });
    });

    it(
      ["post-deploy"],
      "Buy a course for a new user, check they are enrolled on the course",
      () => {
        Cypress.on("uncaught:exception", (err) => {
          if (err.message.includes("theme_boost")) return false;
          if (err.message.includes("Course or activity not accessible."))
            return false;
          return true;
        });

        newEmail = validEmail("self");

        // Visit splash
        cy.visit("https://acecentre.org.uk/learning/splash-training-i");

        // Add to basket
        cy.findByRole("button", { name: "Book this course" }).click();
        cy.findAllByRole("button", { name: "Book this course" }).last().click();

        // Check we are on the basket page
        cy.url({ timeout: 10000 }).should("include", "/basket");

        // Apply voucher
        cy.findByRole("textbox", { name: "Voucher" }).type(couponCode);
        cy.findByRole("button", { name: "Apply Voucher" }).click();

        // Make sure the discount is applied
        cy.wait(5000);
        cy.findAllByRole("table")
          .last()
          .within(() => {
            cy.get("tr:last-child > td:last-child").contains("£0.00");
          });

        // Check we are on the basket page
        cy.url({ timeout: 10000 }).should("include", "/basket");

        // Checkout as a new user
        cy.findAllByRole("link", { name: "Checkout as New User" })
          .last()
          .click();
        cy.url({ timeout: 40000 }).should("include", "register-checkout");

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

        // Complete checkout
        cy.url({ timeout: 40000 }).should("include", "/checkout");
        cy.findByRole("textbox", { name: "First name" }).type("John");
        cy.findByRole("textbox", { name: "Last name" }).type("Smith");
        cy.findByRole("textbox", { name: "Phone number" }).type("07545783496");
        cy.findByRole("textbox", { name: "Email address" }).should(
          "have.value",
          newEmail
        );
        cy.findByLabelText("I am booking this course for myself")
          .parent()
          .click();

        cy.findByRole("checkbox", {
          name: "I have read and agree to the website terms and conditions",
        }).click({ force: true });

        cy.findByRole("button", { name: "Place order" }).click();
        cy.url({ timeout: 40000 }).should("include", "order");

        // Go to My Ace Centre and check we are enrolled
        cy.wait(2000); // Wait for a react render
        cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
        cy.url({ timeout: 40000 }).should("include", "my-acecentre");
        cy.findByRole("link", { name: "View your courses >" }).click();
        cy.url({ timeout: 40000 }).should("include", "my-acecentre/courses");

        // Click the link to go to the course
        cy.findByRole("link", { name: /Splash/i }).click();
        cy.url({ timeout: 40000 }).should(
          "include",
          "learning.acecentre.org.uk/course/view"
        );

        // Check we are on the course and logged in
        cy.findAllByRole("heading", { name: /Splash/i })
          .first()
          .should("exist");
        cy.findByText("John Smith").should("exist");

        // Wait for 20 seconds to allow the page to fully load
        cy.wait(20000);
      }
    );
  });
});
