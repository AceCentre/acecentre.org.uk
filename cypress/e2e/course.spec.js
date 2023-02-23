context("Multiple Courses", () => {
  it(["pre-deploy"], "Cannot add a second course to your basket", () => {
    cy.visit("/learning/communication-partners-i");

    cy.findByRole("button", { name: "Book this course" }).click();
    cy.findAllByRole("button", { name: "Book this course" }).last().click();

    cy.url({ timeout: 40000 }).should("include", "/basket");

    cy.visit("/learning/aac-solutions-for-people-with-aphasia-d-8th-sept-21");

    cy.findByRole("button", { name: "Book this course" }).click();
    cy.findAllByRole("button", { name: "Book this course" }).last().click();

    cy.url({ timeout: 40000 }).should("not.include", "/basket");
    cy.url({ timeout: 40000 }).should(
      "include",
      "/learning/aac-solutions-for-people-with-aphasia-d-8th-sept-21"
    );

    cy.contains(
      "You can only add one course to your cart at a time. Checkout with the current course first then return to buy this course."
    );
  });
});
