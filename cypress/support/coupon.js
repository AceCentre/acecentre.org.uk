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
