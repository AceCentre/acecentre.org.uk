import { changePassword } from "../../support/change-password";
import { deleteCoupon } from "../../support/coupon";
import { deleteCohorts } from "../../support/delete-moodle-user";
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

    beforeEach(() => {
      newEmail = null;
      couponId = null;
      newEmail = null;
      delegatedEmail = null;
      bulkEmailOne = null;
      bulkEmailTwo = null;

      cy.createCoupon().then((result) => {
        couponCode = result.couponCode;
        couponId = result.couponId;
      });
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

      cy.wrap(null, { timeout: 60000 }).then(async () => {
        await deleteCohorts();
      });
    });

    it(["post-deploy"], "Buy a course for a bulk group", () => {
      Cypress.on("uncaught:exception", (err) => {
        if (err.message.includes("theme_boost")) return false;
        if (err.message.includes("Course or activity not accessible."))
          return false;
        if (err.message.includes("Cannot read property 'length' of undefined"))
          return false;
        return true;
      });

      newEmail = validEmail("bulk-1");
      bulkEmailOne = validEmail("bulk-2");
      bulkEmailTwo = validEmail("bulk-3");

      // Visit splash
      cy.visit("/learning/splash-training-i");

      // Add to basket
      cy.findByRole("button", { name: "Book this course" }).click();
      cy.findByRole("spinbutton", { name: /Quantity/i }).type("{backspace}2");
      cy.findAllByRole("button", { name: "Book this course" }).last().click();

      // Check we are on the basket page
      cy.url({ timeout: 40000 }).should("include", "/basket");

      // Apply voucher
      cy.findByRole("textbox", { name: "Voucher" }).type(couponCode);
      cy.findByRole("button", { name: "Apply Voucher" }).click();

      // Make sure the discount is applied
      cy.wait(20000);
      cy.findAllByRole("table")
        .last()
        .within(() => {
          cy.get("tr:last-child > td:last-child").contains("£0.00");
        });

      // Check we are on the basket page
      cy.url({ timeout: 40000 }).should("include", "/basket");

      // Checkout as a new user
      cy.findAllByRole("link", { name: "Checkout as New User" }).last().click();
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

      cy.findByRole("textbox", { name: "Student email 1" }).type(bulkEmailOne);
      cy.findByRole("textbox", { name: "Student email 2" }).type(bulkEmailTwo);

      cy.findByRole("checkbox", {
        name: "I have read and agree to the website terms and conditions and privacy policy",
      }).click({ force: true });

      cy.findByRole("button", { name: "Place order" }).click();
      // This is quite high because its doing a lot of work behind the scenes
      cy.url({ timeout: 60000 }).should("include", "order");

      // Check user is not on the course
      cy.wait(2000); // Wait for react render
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 40000 }).should("include", "my-acecentre");
      cy.findByRole("link", { name: "View your courses >" }).click();
      cy.url({ timeout: 40000 }).should("include", "my-acecentre/courses");
      cy.findByRole("link", { name: /Splash/i }).should("not.exist");

      // Logout
      cy.visit("/my-acecentre");
      cy.findByRole("button", { name: "Logout" }).click();

      cy.wait(60 * 3 * 1000);

      // Change passwords
      cy.changePassword(bulkEmailOne, VALID_PASSWORD);
      cy.changePassword(bulkEmailTwo, VALID_PASSWORD);

      // Check first user can access splash
      cy.findAllByRole("link", { name: "Login" }).first().click();
      cy.url({ timeout: 40000 }).should("include", "/login");

      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("textbox", { name: "Username or email address" })
        .type(bulkEmailOne);

      cy.findAllByRole("form", { name: "Login form" })
        .findByLabelText("Password")
        .type(VALID_PASSWORD);

      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("button", { name: "Log in" })
        .click();

      // Check they can access Splash
      cy.url({ timeout: 40000 }).should("include", "/my-acecentre");
      cy.findByRole("link", { name: "View your courses >" }).click();
      cy.url({ timeout: 40000 }).should("include", "my-acecentre/courses");
      cy.findByRole("link", { name: /Splash/i }).should("exist");
      cy.findByRole("link", { name: /Splash/i }).click();
      cy.url({ timeout: 40000 }).should(
        "include",
        "learning.acecentre.org.uk/course/view"
      );
      cy.findAllByRole("heading", { name: /Splash/i })
        .first()
        .should("exist");

      cy.visit("https://learning.acecentre.org.uk/login/logout.php");
      cy.findByRole("button", { name: "Continue" }).click();
      cy.wait(10000);

      // Login as second user

      cy.visit("/my-acecentre");
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.wait(5000);
      cy.visit("/my-acecentre");

      cy.url({ timeout: 40000 }).should("include", "/login");

      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("textbox", { name: "Username or email address" })
        .type(bulkEmailTwo);

      cy.findAllByRole("form", { name: "Login form" })
        .findByLabelText("Password")
        .type(VALID_PASSWORD);

      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("button", { name: "Log in" })
        .click();

      // Check they can access Splash
      cy.url({ timeout: 40000 }).should("include", "/my-acecentre");
      cy.findByRole("link", { name: "View your courses >" }).click();
      cy.url({ timeout: 40000 }).should("include", "my-acecentre/courses");
      cy.findByRole("link", { name: /Splash/i }).should("exist");
      cy.findByRole("link", { name: /Splash/i }).click();
      cy.url({ timeout: 40000 }).should(
        "include",
        "learning.acecentre.org.uk/course/view"
      );
      cy.findAllByRole("heading", { name: /Splash/i })
        .first()
        .should("exist");

      // Wait for 20 seconds to allow the page to fully load
      cy.wait(20000);
    });
  });
});
