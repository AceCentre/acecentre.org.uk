context("Smoke", () => {
  it("loads the webpage without any issues", () => {
    cy.visit("https://deploy-preview-2--acecentreorguk.netlify.app/");
    cy.get("#__next").should("exist");
  });
});
