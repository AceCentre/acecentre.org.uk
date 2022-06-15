import { createCoupon, deleteCoupon } from "../../support/coupon";
import { validEmail } from "../../support/valid-email";

const VALID_PASSWORD = "securepassword";

const deleteUser = async (email) => {
  const getUserResponse = await fetch(
    "https://backend.acecentre.org.uk/index.php?graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
      body: JSON.stringify({
        query: "query($email:ID!) {user(id: $email,idType:EMAIL) {id}}",
        variables: { email },
      }),
    }
  );

  if (!getUserResponse.ok) {
    throw new Error("Failed to get user");
  }

  const getUserResult = await getUserResponse.json();

  if (
    !getUserResult ||
    !getUserResult.data ||
    !getUserResult.data.user ||
    !getUserResult.data.user.id
  ) {
    return;
  }

  const userId = getUserResult.data.user.id;

  const deleteUserResponse = await fetch(
    "https://backend.acecentre.org.uk/index.php?graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
      body: JSON.stringify({
        query:
          "mutation($userId:ID!) {deleteUser(input: {id: $userId}) {user {id}}}",
        variables: { userId },
      }),
    }
  );

  if (!deleteUserResponse.ok) {
    throw new Error("Failed to get user");
  }
};

const changePassword = async (email, password) => {
  const getUserResponse = await fetch(
    "https://backend.acecentre.org.uk/index.php?graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
      body: JSON.stringify({
        query: "query($email:ID!) {user(id: $email,idType:EMAIL) {id}}",
        variables: { email },
      }),
    }
  );

  if (!getUserResponse.ok) {
    throw new Error("Failed to get user");
  }

  const getUserResult = await getUserResponse.json();

  if (
    !getUserResult ||
    !getUserResult.data ||
    !getUserResult.data.user ||
    !getUserResult.data.user.id
  ) {
    throw new Error("Failed to get user");
  }

  const id = getUserResult.data.user.id;

  const getChangePasswordResponse = await fetch(
    "https://backend.acecentre.org.uk/index.php?graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
      body: JSON.stringify({
        query:
          "mutation changePassword($id: ID!, $password: String) { updateUser(input: {id: $id, password: $password}) { user { id } } }",
        variables: { id, password },
      }),
    }
  );

  if (!getChangePasswordResponse.ok) {
    throw new Error("Failed to change password");
  }

  const changePasswordResult = await getChangePasswordResponse.json();

  if (
    !changePasswordResult ||
    !changePasswordResult.data ||
    !changePasswordResult.data.updateUser ||
    !changePasswordResult.data.updateUser.user ||
    !changePasswordResult.data.updateUser.user.id
  ) {
    throw new Error("Failed to change password");
  }

  return null;
};

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
        await deleteUser(newEmail);
      }

      if (delegatedEmail) {
        await deleteUser(delegatedEmail);
      }

      if (bulkEmailOne) {
        await deleteUser(bulkEmailOne);
      }
      if (bulkEmailTwo) {
        await deleteUser(bulkEmailTwo);
      }
    });

    it(["post-deploy"], "Buy a course for a bulk group", () => {
      Cypress.on("uncaught:exception", (err) => {
        if (err.message.includes("theme_boost")) return false;
        return true;
      });

      newEmail = validEmail();
      bulkEmailOne = validEmail();
      bulkEmailTwo = validEmail();

      // Visit splash
      cy.visit("https://acecentre.org.uk/learning/splash-training-i");

      // Add to basket
      cy.findByRole("button", { name: "Book this course" }).click();
      cy.findByRole("spinbutton", { name: /Quantity/i }).type("{backspace}2");
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

      cy.findByRole("textbox", { name: "Student email 1" }).type(bulkEmailOne);
      cy.findByRole("textbox", { name: "Student email 2" }).type(bulkEmailTwo);

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
      cy.findByRole("link", { name: /Splash/i }).should("not.exist");

      // Logout
      cy.visit("https://acecentre.org.uk/my-acecentre");
      cy.findByRole("button", { name: "Logout" }).click();

      cy.wait(60 * 3 * 1000);

      // Change passwords
      cy.changePassword(bulkEmailOne, VALID_PASSWORD);
      cy.changePassword(bulkEmailTwo, VALID_PASSWORD);

      // Check first user can access splash
      cy.findAllByRole("link", { name: "Login" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "/login");

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

      // Login as second user
      cy.visit("https://acecentre.org.uk/my-acecentre");
      cy.url({ timeout: 30000 }).should("include", "/login");

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
    });
  });
});
