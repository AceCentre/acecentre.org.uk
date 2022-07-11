import { useCallback } from "react";
import { useEffect, useState } from "react";

export const AfterInteractive = ({ children }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoadEvent = useCallback(() => {
    console.log("event happened");
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHasLoaded(true);
    }, 5000);
  }, []);

  useEffect(() => {
    window.addEventListener("load", handleLoadEvent);
    return () => {
      window.removeEventListener("load", handleLoadEvent);
    };
  }, [handleLoadEvent]);

  if (!hasLoaded) return null;
  return children;
};
