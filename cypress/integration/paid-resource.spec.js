const validEmail = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);

  return `test-${randomNumber}@acecentre.org.uk`;
};

context("Paid resources", () => {
  it("can navigate to a paid resource", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Resources" }).first().click();
    cy.findAllByRole("link", { name: "View all resources" }).first().click();
    cy.findAllByRole("combobox", { name: "Price range" }).select("Paid");
    cy.url({ timeout: 10000 }).should("include", "pricerange=paid");
    cy.findByRole("main")
      .findAllByRole("list")
      .first()
      .children()
      .first()
      .click();

    cy.findByRole("main").should("not.contain", "Free");
  });

  it("can add product to cart, and checkout without an account", () => {
    cy.visit("/resources/simple-charts-to-edit-in-word");
    cy.findByRole("button", { name: "Add to cart" }).click();
    cy.url({ timeout: 10000 }).should("include", "basket");
    cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");
    cy.findAllByRole("link", { name: "Checkout" }).last().click();
    cy.url({ timeout: 10000 }).should("include", "checkout");

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
    cy.findByRole("textbox", { name: "Email address" }).type(validEmail());

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
  });

  it("can add product to cart, and checkout without an account, with 3D Auth", () => {
    cy.visit("/resources/simple-charts-to-edit-in-word");
    cy.findByRole("button", { name: "Add to cart" }).click();
    cy.url({ timeout: 10000 }).should("include", "basket");
    cy.findAllByRole("row", { name: /Total/g }).should("contain", "£10.00");
    cy.findAllByRole("link", { name: "Checkout" }).last().click();
    cy.url({ timeout: 10000 }).should("include", "checkout");

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
    cy.findByRole("textbox", { name: "Email address" }).type(validEmail());

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

    cy.wait(15000);

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
  });
});
