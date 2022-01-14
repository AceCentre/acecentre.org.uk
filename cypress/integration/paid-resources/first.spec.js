const validEmail = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);

  return `test-${randomNumber}@acecentre.org.uk`;
};

const VALID_PASSWORD = "securepassword";

context("Paid resources", () => {
  it(["pre-deploy"], "can navigate to a paid resource", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Resources" }).first().click();
    cy.url({ timeout: 20000 }).should("include", "resources");
    cy.findAllByRole("link", { name: "View all resources" }).first().click();
    cy.url({ timeout: 20000 }).should("include", "resources/all");
    cy.findAllByRole("combobox", { name: "Price range" }).select("Paid");
    cy.url({ timeout: 20000 }).should("include", "pricerange=paid");
    cy.findByRole("main")
      .findAllByRole("list")
      .first()
      .children()
      .first()
      .click();

    cy.findByRole("main").should("not.contain", "Free");
  });

  it(
    ["pre-deploy"],
    "can add product to cart, and checkout with a new account",
    () => {
      const newEmail = validEmail();

      cy.visit("/resources/simple-charts-to-edit-in-word");
      cy.findByRole("button", { name: "Add to cart" }).click();
      cy.url({ timeout: 20000 }).should("include", "basket");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");
      cy.findAllByRole("link", { name: "Checkout as New User" }).last().click();
      cy.url({ timeout: 20000 }).should("include", "register-checkout");

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
        .findByRole("button", { name: "Register and checkout" })
        .click();

      cy.url({ timeout: 20000 }).should("include", "/checkout");
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
      cy.findByRole("textbox", { name: "Email address" }).type(newEmail);

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
        name: "I have read and agree to the website terms and conditions",
      }).click({ force: true });

      cy.findByRole("button", { name: "Place order" }).click();
      cy.url({ timeout: 20000 }).should("include", "order");
    }
  );

  it(
    ["pre-deploy"],
    "can add product to cart, and checkout with a new account, physical product",
    () => {
      const newEmail = validEmail();
      cy.visit("/resources/developing-using-communication-book");
      cy.findByRole("button", { name: "Add to cart" }).click();
      cy.url({ timeout: 20000 }).should("include", "basket");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£50.00");
      cy.findAllByRole("link", { name: "Checkout" }).last().click();
      cy.findAllByRole("link", { name: "Checkout as New User" }).last().click();
      cy.url({ timeout: 20000 }).should("include", "register-checkout");

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
        .findByRole("button", { name: "Register and checkout" })
        .click();

      cy.url({ timeout: 20000 }).should("include", "/checkout");

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
      cy.findByRole("textbox", { name: "Email address" }).type(newEmail);

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
        name: "I have read and agree to the website terms and conditions",
      }).click({ force: true });

      cy.findByRole("button", { name: "Place order" }).click();
      cy.url({ timeout: 20000 }).should("include", "order");

      cy.findByRole("heading", { name: "An error occurred" }).should(
        "not.exist"
      );
    }
  );

  it(
    ["pre-deploy"],
    "can add product to cart, and checkout with a new account, with 3D Auth",
    () => {
      const newEmail = validEmail();
      cy.visit("/resources/simple-charts-to-edit-in-word");
      cy.findByRole("button", { name: "Add to cart" }).click();
      cy.url({ timeout: 20000 }).should("include", "basket");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");
      cy.findAllByRole("link", { name: "Checkout as New User" }).last().click();
      cy.url({ timeout: 20000 }).should("include", "register-checkout");

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
        .findByRole("button", { name: "Register and checkout" })
        .click();

      cy.url({ timeout: 20000 }).should("include", "/checkout");
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
      cy.findByRole("textbox", { name: "Email address" }).type(newEmail);

      cy.get('iframe[title="Secure card payment input frame"]')
        .its("0.contentDocument")
        .then(cy.wrap)
        .findAllByRole("textbox", { name: "Credit or debit card number" })
        .type("4000002500003155");

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
        name: "I have read and agree to the website terms and conditions",
      }).click({ force: true });

      cy.findByRole("button", { name: "Place order" }).click();

      cy.wait(20000);

      // Huge hack to get into the many iframes for 3D Auth
      // Any update to iframe names from stripe will break this
      cy.get('iframe[name*="privateStripeFrame"]')
        .its("0.contentDocument")
        .then(cy.wrap)
        .findByRole("document")
        .find("#challengeFrame")
        .its("0.contentDocument")
        .then(cy.wrap)
        .findByRole("document")
        .find('iframe[name="acsFrame"]')
        .its("0.contentDocument")
        .then(cy.wrap)
        .findByRole("button", { name: "Complete authentication" })
        .click();

      cy.url({ timeout: 20000 }).should("include", "order");
    }
  );
});
