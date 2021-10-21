context("Service Finder", () => {
  it(["pre-deploy"], "Finds services based on geolocation", () => {
    cy.visit("/nhs-service-finder", {
      onBeforeLoad(win) {
        // Force manchester
        const latitude = 53.5166251;
        const longitude = -2.144714;
        cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
          (cb) => {
            return cb({ coords: { latitude, longitude } });
          }
        );
      },
    });

    cy.findByRole("button", { name: "Or use your current location" }).click();

    cy.contains("ACE Centre North").should("exist");
    cy.contains("North West AT Service").should("exist");
  });

  it(
    ["pre-deploy"],
    "Shows an error when you given an invalid postcode",
    () => {
      cy.visit("/nhs-service-finder");

      cy.findByRole("textbox", { name: "Enter your postcode" }).type("ABCDE");
      cy.findByRole("button", { name: "Find services" }).click();

      cy.contains("Postcode not found").should("exist");
    }
  );

  it(["pre-deploy"], "Finds services based on postcode", () => {
    cy.visit("/nhs-service-finder");

    cy.findByRole("textbox", { name: "Enter your postcode" }).type("OL83QL");
    cy.findByRole("button", { name: "Find services" }).click();

    cy.contains("ACE Centre North").should("exist");
    cy.contains("North West AT Service").should("exist");
  });

  it(["pre-deploy"], "Can click through to service page", () => {
    cy.visit("/nhs-service-finder");

    cy.findByRole("textbox", { name: "Enter your postcode" }).type("OL83QL");
    cy.findByRole("button", { name: "Find services" }).click();

    cy.findAllByRole("link", { name: "Find out more >" }).first().click();
    cy.contains("ACE Centre North").should("exist");
  });

  it(["pre-deploy"], "Can click through to map", () => {
    cy.visit("/nhs-service-finder");

    cy.findByRole("link", {
      name: "Click here to view Assistive Technology service coverage on a map",
    }).click();

    // Bit hacky but make sure that the map is loaded kinda
    cy.get(".leaflet-map-pane").should("exist");
  });
});
