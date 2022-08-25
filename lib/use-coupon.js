import { useRouter } from "next/router";
import { useState } from "react";

export const useCoupon = () => {
  const [currentCoupon, setCurrentCoupon] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onCouponChange = (event) => {
    const value = event.target.value;
    setCurrentCoupon(value);
  };

  const applyCoupon = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const submit = async () => {
      try {
        const response = await fetch("/api/cart/add-coupon", {
          method: "POST",
          body: JSON.stringify({ currentCoupon }),
        });

        const parsed = await response.json();

        if (parsed.success) {
          router.reload(window.location.pathname);
          return;
        }

        if (parsed.error) {
          setError(parsed.error);
          setSubmitting(false);
        }
      } catch (error) {
        console.warn(error);
        setError("An error occurred");
        setSubmitting(false);
      }
    };

    submit();
  };

  return {
    applyCoupon,
    onCouponChange,
    isApplyVoucherDisabled: submitting || currentCoupon === "",
    error,
  };
};
