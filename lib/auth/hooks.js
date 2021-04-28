import { useEffect, useState } from "react";

export const useLogin = () => {
  const [readyForLogin, setReadyForLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Cant login until we are client side
  useEffect(() => {
    setReadyForLogin(true);
  }, []);

  const doLogin = async (username, password) => {
    try {
      const user = { username, password };

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ user }),
      });

      const parsed = await response.json();

      console.log("success", parsed);
    } catch (error) {
      console.log("error", error);

      // If we fail to login, we show an error and allow login again
      setReadyForLogin(true);
      setLoginError(error.message);
    }
  };

  const loginFormSubmit = (event) => {
    event.preventDefault();

    // Once we received the login submission we can no longer login
    setReadyForLogin(false);

    const username = event.target.username.value;
    const password = event.target.password.value;

    doLogin(username, password);
  };

  return {
    loginFormSubmit,
    readyForLogin,
    loginError,
  };
};
