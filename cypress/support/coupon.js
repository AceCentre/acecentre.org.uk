export const deleteCoupon = async (couponId) => {
  const response = await fetch(
    `https://backend.acecentre.org.uk/wp-json/wc/v3/coupons/${couponId}?force=true`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete coupon");
  }
};

export const createCoupon = async () => {
  const uniqueCode = `cypress_testing_code_${Date.now()}`;

  const allCouponsResponse = await fetch(
    `https://backend.acecentre.org.uk/wp-json/wc/v3/coupons?code=${uniqueCode}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Cypress.env("WORDPRESS_AUTH")}`,
      },
    }
  );

  if (!allCouponsResponse.ok) {
    throw new Error("Failed to create coupon");
  }

  const allCouponsResult = await allCouponsResponse.json();

  if (allCouponsResult.length === 1) {
    await deleteCoupon(allCouponsResult[0].id);
  }

  const response = await fetch(
    "https://backend.acecentre.org.uk/wp-json/wc/v3/coupons",
    {
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
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create coupon");
  }

  const result = await response.json();

  const couponCode = result.code;
  const couponId = result.id;

  return { couponCode, couponId };
};
