context("Login", () => {
  it(
    ["pre-deploy"],
    "enables the login button when you enter text into each field",
    () => {
      cy.visit("");
      cy.findAllByRole("link", { name: "Login" }).first().click();
      cy.url({ timeout: 60000 }).should("include", "/login");

      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("textbox", { name: "Username or email address" })
        .type("email@email.com");

      cy.findAllByRole("form", { name: "Login form" })
        .findByLabelText("Password")
        .type("password");

      cy.findAllByRole("form", { name: "Login form" })
        .findByRole("button", { name: "Log in" })
        .should("not.be.disabled");
    }
  );
});
