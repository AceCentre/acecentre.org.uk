import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./mutations";

export const useLogin = () => {
  const [readyForLogin, setReadyForLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [login] = useMutation(LOGIN);

  // Cant login until we are client side
  useEffect(() => {
    setReadyForLogin(true);
  }, []);

  const doLogin = async (username, password) => {
    try {
      const response = await login({ variables: { username, password } });

      console.log(response);
    } catch (error) {
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
