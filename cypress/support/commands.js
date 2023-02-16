import "@testing-library/cypress/add-commands";

Cypress.Commands.add("createCoupon", () => {
  const uniqueCode = `cypress_testing_code_${Date.now()}`;

  return cy
    .request({
      url: `https://backend.acecentre.org.uk/wp-json/wc/v3/coupons?code=${uniqueCode}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
    })
    .then((allCouponsResponse) => {
      if (!allCouponsResponse.isOkStatusCode) {
        throw new Error("Failed to create coupon");
      }

      const allCouponsResult = allCouponsResponse.body;
      if (allCouponsResult.length === 1) {
        throw new Error("Tried to create an existing coupon");
      }

      cy.request({
        url: "https://backend.acecentre.org.uk/wp-json/wc/v3/coupons",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
        },
        body: JSON.stringify({
          code: uniqueCode,
          discount_type: "percent",
          amount: "100",
          usage_limit: 1,
          description: "Created automatically for Cypress tests",
        }),
      }).then((response) => {
        if (!response.isOkStatusCode) {
          throw new Error("Failed to create coupon");
        }

        const result = response.body;

        const couponCode = result.code;
        const couponId = result.id;

        return { couponCode, couponId };
      });
    });
});
