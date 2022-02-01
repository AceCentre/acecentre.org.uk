const createCoupon = async () => {
  const allCouponsResponse = await fetch(
    "https://backend.acecentre.org.uk/wp-json/wc/v3/coupons?code=cypress_testing_code",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
    }
  );

  if (!allCouponsResponse.ok) {
    throw new Error("Failed to create coupon");
  }

  const allCouponsResult = await allCouponsResponse.json();

  if (allCouponsResult.length === 1) {
    await deleteCoupon(allCouponsResult[0].id);
  }

  const response = await fetch(
    "https://backend.acecentre.org.uk/wp-json/wc/v3/coupons",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
      body: JSON.stringify({
        code: "cypress_testing_code",
        discount_type: "percent",
        amount: "100",
        usage_limit: 1,
        description: "Created automatically for Cypress tests",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create coupon");
  }

  const result = await response.json();

  const couponCode = result.code;
  const couponId = result.id;

  return { couponCode, couponId };
};

const validEmail = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);

  return `test-${randomNumber}@acecentre.org.uk`;
};

const deleteCoupon = async (couponId) => {
  const response = await fetch(
    `https://backend.acecentre.org.uk/wp-json/wc/v3/coupons/${couponId}?force=true`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete coupon");
  }
};

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
  it(
    ["post-deploy"],
    "Logs into moodle, also logs you into AceCentre, then logs out of moodle and webpage",
    () => {
      // Ignore errors from theme boost on moodle because we dont control it
      Cypress.on("uncaught:exception", (err) => {
        if (err.message.includes("theme_boost")) return false;
        return true;
      });

      // Go to login page
      cy.visit("https://learning.acecentre.org.uk");
      cy.findByRole("link", { name: "Log in" }).click();

      // Entre login credentials
      cy.get("input#username").invoke("val", Cypress.env("MOODLE_USERNAME"));
      cy.findByLabelText("Password").type(Cypress.env("MOODLE_PASSWORD"));
      cy.findByRole("button", { name: "Log in" }).click();

      // Confirm we are logged in to moodle
      cy.url({ timeout: 30000 }).should("include", "learning.acecentre.org.uk");
      cy.findByRole("button", { name: "User menu" }).click();
      cy.findByRole("menuitem", { name: "Dashboard" }).click();

      // Check we are logged in to ace centre
      cy.visit("https://acecentre.org.uk");
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "/my-acecentre");

      // Go back to learning and logout and make sure we are logged out
      cy.visit("https://learning.acecentre.org.uk");
      cy.url({ timeout: 30000 }).should("include", "learning.acecentre.org.uk");
      cy.findByRole("button", { name: "User menu" }).click();
      cy.findByRole("menuitem", { name: "Log out" }).click();
      cy.findByRole("link", { name: "Log in" }).should("exist");

      // Check we are logged out of the AceCentre site
      cy.visit("https://acecentre.org.uk");
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "/login");
    }
  );

  describe("needs coupon", () => {
    let couponCode;
    let couponId;
    let newEmail;
    let delegatedEmail;

    beforeEach(async () => {
      newEmail = null;
      couponId = null;
      newEmail = null;
      delegatedEmail = null;

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
    });

    it(
      ["post-deploy"],
      "Buy a course for a new user, check they are enrolled on the course",
      () => {
        Cypress.on("uncaught:exception", (err) => {
          if (err.message.includes("theme_boost")) return false;
          return true;
        });

        newEmail = validEmail();

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
        cy.findByLabelText("I am booking this course for myself")
          .parent()
          .click();

        cy.findByRole("checkbox", {
          name: "I have read and agree to the website terms and conditions",
        }).click({ force: true });

        cy.findByRole("button", { name: "Place order" }).click();
        cy.url({ timeout: 30000 }).should("include", "order");

        // Go to My Ace Centre and check we are enrolled
        cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
        cy.url({ timeout: 30000 }).should("include", "my-acecentre");
        cy.findByRole("link", { name: "View your courses >" }).click();
        cy.url({ timeout: 30000 }).should("include", "my-acecentre/courses");

        // Click the link to go to the course
        cy.findByRole("link", { name: /Splash/i }).click();
        cy.url({ timeout: 30000 }).should(
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

    it(["post-deploy"], "Buy a course for a new delegated user", () => {
      Cypress.on("uncaught:exception", (err) => {
        if (err.message.includes("theme_boost")) return false;
        return true;
      });

      newEmail = validEmail();
      delegatedEmail = validEmail();

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

      // Go to My Ace Centre and check we are not enrolled
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.findByRole("link", { name: "View your courses >" }).click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre/courses");
      cy.findByRole("link", { name: /Splash/i }).should("not.exist");

      // Logout
      cy.visit("https://acecentre.org.uk/my-acecentre");
      cy.findByRole("button", { name: "Logout" }).click();

      cy.log("Before");

      cy.wait(60 * 3 * 1000);

      cy.changePassword(delegatedEmail, VALID_PASSWORD);

      // Login as delegated user
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

      // Check we can access Splash
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

      // Wait for 20 seconds to allow the page to fully load
      cy.wait(20000);
    });
  });
});
