const SHORT_PASSWORD = "short";

const validEmail = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);

  return `test-${randomNumber}@acecentre.org.uk`;
};

context("Register", () => {
  it(["pre-deploy"], "Shows an error when you password is to short", () => {
    cy.visit("");
    cy.findAllByRole("link", { name: "Login" }).first().click();
    cy.url({ timeout: 60000 }).should("include", "/login");

    cy.findAllByRole("form", { name: "Register form" })
      .findByRole("textbox", {
        name: "Email address",
      })
      .type(validEmail());

    cy.findAllByRole("form", { name: "Register form" })
      .findByLabelText("Password")
      .type(SHORT_PASSWORD);

    cy.findByTestId("register-password-error").should((error) => {
      expect(error).to.contain("Password must be 8+ characters");
    });
  });
});
