const TEST_ACC = "cypress@test.com";
const TEST_PASS = "cypresstestpassword";

context("Login", () => {
  it(["pre-deploy"], "successfully logs in to a valid account", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 60000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("textbox", { name: "Username or email address" })
      .type(TEST_ACC);

    cy.findAllByRole("form", { name: "Login form" })
      .findByLabelText("Password")
      .type(TEST_PASS);

    cy.findAllByRole("form", { name: "Login form" })
      .findByRole("button", { name: "Log in" })
      .click();

    cy.url({ timeout: 60000 }).should("include", "/my-acecentre");

    cy.findByRole("link", { name: "Manage details >" }).click();
    cy.url({ timeout: 60000 }).should("include", "/details");
    cy.findByRole("textbox", { name: "Email" }).should("have.value", TEST_ACC);
    cy.findAllByRole("link", { name: "My Ace Centre" }).should("exist");
  });
});
