import { useEffect, useState } from "react";

const TTL = 3600000;
// https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
function setWithExpiry(key, value, ttl) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return "not-set";
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

export const useLoggedInStatus = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  useEffect(() => {
    const loggedInStatusFromStorage = getWithExpiry("loggedInStatus");

    if (loggedInStatusFromStorage === "not-set") {
      console.log(
        "Nothing in storage so defaulting to false",
        loggedInStatusFromStorage
      );
      setLoggedInStatus(false);
      setWithExpiry("loggedInStatus", false, TTL);
    } else if (loggedInStatusFromStorage !== null) {
      console.log(
        "Pulling logged in status from storage",
        loggedInStatusFromStorage
      );
      setLoggedInStatus(loggedInStatusFromStorage);
    } else {
      const getStatus = async () => {
        const response = await fetch("/api/auth/status");

        if (response.ok) {
          const { loggedIn } = await response.json();

          console.log("Pulling logged in status from network", loggedIn);
          setLoggedInStatus(loggedIn);
          setWithExpiry("loggedInStatus", loggedIn, TTL);
        } else {
          const loggedIn = false;
          console.log(
            "Couldn't get logged in status from network so falling back.",
            loggedIn
          );

          setLoggedInStatus(loggedIn);
          setWithExpiry("loggedInStatus", loggedIn, TTL);
        }
      };
      getStatus();
    }
  }, []);

  const refreshLoginStatus = async () => {
    console.log("Refreshing logged in status");

    localStorage.removeItem("loggedInStatus");
    const response = await fetch("/api/auth/status");

    if (response.ok) {
      const { loggedIn } = await response.json();

      console.log("Pulling logged in status from network", loggedIn);
      setLoggedInStatus(loggedIn);
      setWithExpiry("loggedInStatus", loggedIn, TTL);
    } else {
      const loggedIn = false;
      console.log(
        "Couldn't get logged in status from network so falling back.",
        loggedIn
      );

      setLoggedInStatus(loggedIn);
      setWithExpiry("loggedInStatus", loggedIn, TTL);
    }
  };

  return { loggedInStatus, refreshLoginStatus };
};
