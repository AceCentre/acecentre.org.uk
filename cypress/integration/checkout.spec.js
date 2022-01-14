context("Checkout", () => {
  it(
    ["pre-deploy"],
    "Buys a single paid virtual product, on an existing account",
    () => {
      // Register
      const randomNumber = Math.floor(Math.random() * 9999999);
      const email = `${randomNumber}@test.com`;
      const password = "password";
      cy.visit("/login");
      cy.get("#email").type(email);
      cy.get("#register-password").type(password);
      cy.findByRole("button", { name: "Register" }).click();
      cy.url({ timeout: 30000 }).should("include", "my-acecentre");
      cy.visit("/");
    }
  );
});
