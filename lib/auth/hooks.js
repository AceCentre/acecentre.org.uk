import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const [readyForLogin, setReadyForLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Cant login until we are client side
  useEffect(() => {
    setReadyForLogin(true);
  }, []);

  const doLogin = async (username, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      const parsed = await response.json();

      if (parsed.success === false)
        throw new Error(JSON.stringify(parsed.error, null, 2));

      router.push("/my-acecentre");
    } catch (error) {
      // If we fail to login, we show an error and allow login again
      setReadyForLogin(true);

      const message =
        toReadableError(error.message) || "Something has gone wrong";

      setLoginError(message);
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

  const submitDisabled =
    username.length === 0 || password.length === 0 || !readyForLogin;

  return {
    onSubmit: loginFormSubmit,
    error: loginError,
    // Disable submit when nothing is entered
    submitDisabled,
    onChange: (event) => {
      const id = event.target.id;
      const newValue = event.target.value;

      if (id === "username") {
        setUsername(newValue);
      } else if (id === "password") {
        setPassword(newValue);
      }
    },
  };
};

const ERRORS = {
  incorrect_password: "Your email address and password are incorrect",
  invalid_username: "Your email address and password are incorrect",
  invalid_password: "Your email address and password are incorrect",
};

const toReadableError = (error) => {
  if (!error) return null;

  const mappedError = ERRORS[error];

  console.error(
    "Couldn't parse the following error: ",
    JSON.stringify(error, null, 2)
  );

  if (!mappedError) return null;

  return mappedError;
};

export const useLogout = () => {
  const [logoutAllowed, setLogoutAllowed] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const doLogout = async () => {
    setLogoutAllowed(false);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const parsed = await response.json();

      if (parsed.success === false) throw new Error(parsed.error);

      router.push("/");
    } catch (error) {
      setLogoutAllowed(true);
      console.error(error);
      setError("Something went wrong during logout");
    }
  };

  return {
    doLogout,
    logoutAllowed,
    error,
  };
};
