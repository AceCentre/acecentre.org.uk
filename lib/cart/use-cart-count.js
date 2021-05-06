import { useEffect, useState } from "react";

// Only fetch cart count on the client side
// We don't want this query to block the user
// getting the page
export const useCartCount = () => {
  // We default the count to 0 because while it is
  // loading we can just not show any cart count
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = async () => {
      const response = await fetch("/api/cart/get");
      const result = await response.json();
      setCount(result.cart.products.length);
    };

    updateCount();
  });

  return count;
};
