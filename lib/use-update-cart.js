import { useRouter } from "next/router";
import { useState } from "react";

export const useUpdateCart = (lines) => {
  let initialCart = {};

  lines.forEach((line) => {
    initialCart[line.key] = line.quantity;
  });

  const [cart, setCart] = useState(initialCart);
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onQuantityChange = (line) => (event) => {
    const newQuantity = event.target.value === "" ? 0 : event.target.value;

    setCart({ ...cart, [line.key]: parseInt(newQuantity) });
  };

  const sendUpdate = () => {
    setUpdateButtonDisabled(true);

    const submit = async () => {
      try {
        // Convert cart object to items array with productId and variationId
        const items = lines.map((line) => ({
          key: line.key,
          quantity: cart[line.key] || 0,
          productId: line.productId,
          variationId: line.variationId,
        }));

        const response = await fetch("/api/cart/update", {
          method: "POST",
          body: JSON.stringify({ items }),
        });

        const parsed = await response.json();

        if (parsed.success) {
          router.reload(window.location.pathname);
          return;
        }

        throw new Error("An error occurred");
      } catch (error) {
        console.warn(error);
        setError("An error occurred");
      }
    };

    submit();
  };

  const changedMade = JSON.stringify(cart) !== JSON.stringify(initialCart);

  return {
    onQuantityChange,
    sendUpdate,
    updateButtonDisabled: updateButtonDisabled || !changedMade,
    error,
  };
};
