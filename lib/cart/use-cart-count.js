import { useEffect, useState } from "react";

// Only fetch cart count on the client side
// We don't want this query to block the user
// getting the page
export const useCartCount = () => {
  // We default the count to 0 because while it is
  // loading we can just not show any cart count
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("calling cart count");

    const updateCount = async () => {
      const response = await fetch("/api/cart/get");
      const result = await response.json();

      // Bail early if there are no products
      if (!result) return setCount(0);
      if (!result.cart) return setCount(0);
      if (!result.cart.products) return setCount(0);

      setCount(result.cart.products.length);
    };

    updateCount();
  });

  useEffect(() => {
    console.log("new cart count");
  }, []);

  return count;
};
