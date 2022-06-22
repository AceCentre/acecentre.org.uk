import { changePassword } from "../support/change-password";
import { createCoupon, deleteCoupon } from "../support/coupon";
import { deleteUser } from "../support/delete-user";
import { validEmail } from "../support/valid-email";

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

    afterEach(async () => {
      await deleteCoupon(couponId);

      if (newEmail) {
        await deleteUser(newEmail, "backend", "bundle-new");
      }

      if (delegatedEmail) {
        await deleteUser(delegatedEmail, "backend", "bundle-delegated");
      }

      if (bulkEmailOne) {
        await deleteUser(bulkEmailOne, "backend", "bundle-bulk-one");
      }
      if (bulkEmailTwo) {
        await deleteUser(bulkEmailTwo, "backend", "bundle-bulk-two");
      }
    });

    it(["post-deploy"], "Buy a course bundle", () => {
      Cypress.on("uncaught:exception", (err) => {
        if (err.message.includes("theme_boost")) return false;
        if (err.message.includes("Course or activity not accessible."))
          return false;

        return true;
      });
      newEmail = validEmail("bundle-courses-1");
      delegatedEmail = validEmail("bundle-courses-2");

      // Visit bundle
      cy.visit("https://acecentre.org.uk/learning/on-demand-test-bundle");

      // Add to basket
      cy.findByRole("button", { name: "Buy this bundle" }).click();
      cy.findAllByRole("button", { name: "Add bundle to basket" })
        .last()
        .click();

      // Check we are on the basket page
      cy.url({ timeout: 20000 }).should("include", "/basket");
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
      cy.findAllByRole("link", { name: "Checkout as New User" }).last().click();
      cy.url({ timeout: 30000 }).should("include", "register-checkout");
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
      cy.url({ timeout: 30000 }).should("include", "/checkout");
      cy.findByRole("textbox", { name: "First name" }).type("John");
      cy.findByRole("textbox", { name: "Last name" }).type("Smith");
      cy.findByRole("textbox", { name: "Phone number" }).type("07545783496");
      cy.findByRole("textbox", { name: "Email address" }).should(
        "have.value",
        newEmail
      );

      cy.findByLabelText("I am booking this course for someone else")
        .parent()
        .click();

      cy.findByRole("textbox", { name: "Participant's email address" }).type(
        delegatedEmail
      );

      cy.findByRole("checkbox", {
        name: "I have read and agree to the website terms and conditions",
      }).click({ force: true });
      cy.findByRole("button", { name: "Place order" }).click();
      cy.url({ timeout: 30000 }).should("include", "order");
      // Check user is not on the course
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.findByRole("link", { name: "View your courses >" }).click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre/courses");
      cy.findByRole("link", { name: /Communication Partner/i }).should("exist");
      cy.findByRole("link", { name: /Splash/i }).should("not.exist");
      // Logout
      cy.visit("https://acecentre.org.uk/my-acecentre");
      cy.findByRole("button", { name: "Logout" }).click();
      cy.wait(60 * 3 * 1000);
      //   // Change passwords
      cy.changePassword(delegatedEmail, VALID_PASSWORD);
      // Check first user can access splash
      cy.findAllByRole("link", { name: "Login" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "/login");
      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("textbox", { name: "Username or email address" })
        .type(delegatedEmail);
      cy.findAllByRole("form", { name: "Login form" })
        .findByLabelText("Password")
        .type(VALID_PASSWORD);
      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("button", { name: "Log in" })
        .click();
      // Check they can access Splash
      cy.url({ timeout: 30000 }).should("include", "/my-acecentre");
      cy.findByRole("link", { name: "View your courses >" }).click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre/courses");
      cy.findByRole("link", { name: /Splash/i }).should("exist");
      cy.findByRole("link", { name: /Splash/i }).click();
      cy.url({ timeout: 30000 }).should(
        "include",
        "learning.acecentre.org.uk/course/view"
      );
      cy.findAllByRole("heading", { name: /Splash/i })
        .first()
        .should("exist");
      cy.visit("https://learning.acecentre.org.uk/login/logout.php");
      cy.findByRole("button", { name: "Continue" }).click();
      cy.url({ timeout: 30000 }).should("include", "wdmaction=logout");
    });
  });
});
