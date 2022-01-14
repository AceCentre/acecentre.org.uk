const validEmail = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);

  return `test-${randomNumber}@acecentre.org.uk`;
};

const VALID_PASSWORD = "securepassword";

context("Paid resources", () => {
  it(
    ["pre-deploy"],
    "Add a product to cart, login and add another item to cart then purchase items in cart",
    () => {
      // Register for a new account
      const newEmail = validEmail();
      cy.visit("");
      cy.findAllByRole("link", { name: "Login" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "login");

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
        .findByRole("button", { name: "Register" })
        .click();

      // Make sure we we end up on my-acecentre
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.findAllByRole("link", { name: "My Ace Centre" }).should("exist");

      // Log out
      cy.findByRole("button", { name: "Logout" }).click();
      cy.url({ timeout: 30000 }).should(
        "equal",
        Cypress.config().baseUrl + "/"
      );
      cy.findAllByRole("link", { name: "Login" }).should("exist");

      // Add to cart and check its added
      cy.visit("/resources/simple-charts-to-edit-in-word");
      cy.findByRole("button", { name: "Add to cart" }).click();
      cy.url({ timeout: 30000 }).should("include", "basket");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");

      // Log back in
      cy.findAllByRole("link", { name: "Login" }).first().click();

      // Type in email
      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("textbox", { name: "Username or email address" })
        .type(newEmail);

      // Type in password
      cy.findAllByRole("form", { name: "Login form" })
        .findByLabelText("Password")
        .type(VALID_PASSWORD);

      // Hit login
      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("button", { name: "Log in" })
        .click();

      // Check we are logged in
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.findAllByRole("link", { name: "My Ace Centre" }).should("exist");

      // Go to cart
      cy.findAllByRole("link", { name: "Checkout" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "basket");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");

      cy.visit("/resources/simple-charts-to-edit-in-word");
      cy.findByRole("button", { name: "Add to cart" }).click();
      cy.url({ timeout: 30000 }).should("include", "basket");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£20.00");

      // Go to checkout
      cy.findAllByRole("link", { name: "Checkout" }).last().click();
      cy.url({ timeout: 30000 }).should("include", "/checkout");

      // Fill out details
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
      cy.url({ timeout: 30000 }).should("include", "order");

      // Check order is in account
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.findByRole("link", { name: "View your orders >" }).click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre/orders");
      cy.findAllByRole("button", { name: "Details" })
        .should("have.length", 1)
        .first()
        .click();
      cy.contains("Simple charts you can point to");
    }
  );

  it(
    ["pre-deploy"],
    "Add a product to cart, login at checkout and then purchase item already in cart",
    () => {
      // Register for a new account
      const newEmail = validEmail();
      cy.visit("");
      cy.findAllByRole("link", { name: "Login" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "login");

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
        .findByRole("button", { name: "Register" })
        .click();

      // Make sure we we end up on my-acecentre
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.findAllByRole("link", { name: "My Ace Centre" }).should("exist");

      // Log out
      cy.findByRole("button", { name: "Logout" }).click();
      cy.url({ timeout: 30000 }).should(
        "equal",
        Cypress.config().baseUrl + "/"
      );
      cy.findAllByRole("link", { name: "Login" }).should("exist");

      // Add to cart and check its added
      cy.visit("/resources/simple-charts-to-edit-in-word");
      cy.findByRole("button", { name: "Add to cart" }).click();
      cy.url({ timeout: 30000 }).should("include", "basket");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");

      // Log back in
      cy.findAllByRole("link", { name: "Checkout as Existing User" })
        .first()
        .click();

      // Type in email
      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("textbox", { name: "Username or email address" })
        .type(newEmail);

      // Type in password
      cy.findAllByRole("form", { name: "Login form" })
        .findByLabelText("Password")
        .type(VALID_PASSWORD);

      // Hit login
      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("button", { name: "Log in and checkout" })
        .click();

      // Check we are at checkout
      cy.url({ timeout: 30000 }).should("include", "/checkout");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");

      // Fill out details
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
      cy.url({ timeout: 30000 }).should("include", "order");

      // Check order is in account
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.findByRole("link", { name: "View your orders >" }).click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre/orders");
      cy.findAllByRole("button", { name: "Details" })
        .should("have.length", 1)
        .first()
        .click();
      cy.contains("Simple charts you can point to");
    }
  );

  it(
    ["pre-deploy"],
    "Add a product to cart, checkout when already signed in",
    () => {
      // Register for a new account
      const newEmail = validEmail();
      cy.visit("");
      cy.findAllByRole("link", { name: "Login" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "login");

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
        .findByRole("button", { name: "Register" })
        .click();

      // Make sure we we end up on my-acecentre
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.findAllByRole("link", { name: "My Ace Centre" }).should("exist");

      // Add to cart and check its added
      cy.visit("/resources/simple-charts-to-edit-in-word");
      cy.findByRole("button", { name: "Add to cart" }).click();
      cy.url({ timeout: 30000 }).should("include", "basket");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");

      // Log back in
      cy.findAllByRole("link", { name: "Checkout" }).last().click();

      // Check we are at checkout
      cy.url({ timeout: 30000 }).should("include", "/checkout");
      cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");

      // Fill out details
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
      cy.url({ timeout: 30000 }).should("include", "order");

      // Check order is in account
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.findByRole("link", { name: "View your orders >" }).click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre/orders");
      cy.findAllByRole("button", { name: "Details" })
        .should("have.length", 1)
        .first()
        .click();
      cy.contains("Simple charts you can point to");
    }
  );
});
