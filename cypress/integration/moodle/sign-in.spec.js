context("Moodle", () => {
  it(
    ["post-deploy"],
    "Logs into moodle, also logs you into AceCentre, then logs out of moodle and webpage",
    () => {
      // Ignore errors from theme boost on moodle because we dont control it
      Cypress.on("uncaught:exception", (err) => {
        if (err.message.includes("theme_boost")) return false;
        if (err.message.includes("Course or activity not accessible."))
          return false;
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
      cy.url({ timeout: 40000 }).should("include", "learning.acecentre.org.uk");
      cy.findByRole("button", { name: "User menu" }).click();
      cy.findByRole("menuitem", { name: "Dashboard" }).click();

      // Check we are logged in to ace centre
      cy.visit("https://acecentre.org.uk");
      cy.wait(2000); // Wait for render
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 40000 }).should("include", "/my-acecentre");

      // Go back to learning and logout and make sure we are logged out
      cy.visit("https://learning.acecentre.org.uk");
      cy.url({ timeout: 40000 }).should("include", "learning.acecentre.org.uk");
      cy.findByRole("button", { name: "User menu" }).click();
      cy.findByRole("menuitem", { name: "Log out" }).click();
      cy.findByRole("link", { name: "Log in" }).should("exist");

      // Check we are logged out of the AceCentre site
      cy.visit("https://acecentre.org.uk");
      cy.wait(2000); // Wait for render
      cy.findAllByRole("link", { name: "My Ace Centre" }).first().click();
      cy.url({ timeout: 40000 }).should("include", "/login");
    }
  );
});
