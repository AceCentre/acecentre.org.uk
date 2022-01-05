let couponCode = null;
let couponId = null;

before(async () => {
  const response = await fetch(
    "https://backend.acecentre.org.uk/wp-json/wc/v3/coupons",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic ",
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

  couponCode = result.code;
  couponId = result.id;
});

after(async () => {
  const response = await fetch(
    `https://backend.acecentre.org.uk/wp-json/wc/v3/coupons/${couponId}?force=true`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic ",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete coupon");
  }
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
      cy.url({ timeout: 10000 }).should("include", "learning.acecentre.org.uk");
      cy.findByRole("button", { name: "User menu" }).click();
      cy.findByRole("menuitem", { name: "Dashboard" }).click();

      // Check we are logged in to ace centre
      cy.visit("https://acecentre.org.uk");
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 10000 }).should("include", "/my-acecentre");

      // Go back to learning and logout and make sure we are logged out
      cy.visit("https://learning.acecentre.org.uk");
      cy.url({ timeout: 10000 }).should("include", "learning.acecentre.org.uk");
      cy.findByRole("button", { name: "User menu" }).click();
      cy.findByRole("menuitem", { name: "Log out" }).click();
      cy.findByRole("link", { name: "Log in" }).should("exist");

      // Check we are logged out of the AceCentre site
      cy.visit("https://acecentre.org.uk");
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 10000 }).should("include", "/login");
    }
  );

  it.only(
    ["post-deploy"],
    "Buy a course for a new user, check they are enrolled on the course",
    () => {
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

      // Check we are on the basket page
      cy.url({ timeout: 10000 }).should("include", "/basket");
    }
  );
});
