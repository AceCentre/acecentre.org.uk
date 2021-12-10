import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGlobalProps } from "../global-props/hook";

export const useRegister = (redirect = "/my-acecentre") => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mailingList, setMailingList] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [generalError, setGeneralError] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const isEmailValid = validateEmail(email);

    if (email === "") {
      setEmailError(null);
    } else if (!isEmailValid) {
      setEmailError("Email address is not valid");
    } else {
      setEmailError(null);
    }

    if (password === "") {
      setPasswordError(null);
    } else if (password.length < 8) {
      setPasswordError("Password must be 8+ characters");
    } else {
      setPasswordError(null);
    }
  }, [email, password, mailingList]);

  const onChange = (event) => {
    const id = event.target.name;
    const newValue = event.target.value;
    const checked = event.target.checked;
    setGeneralError(null);

    if (id === "email") {
      setEmail(newValue);
    } else if (id === "password") {
      setPassword(newValue);
    } else if (id === "mailingList") {
      setMailingList(checked);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const submit = async () => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ email, password, mailingList }),
        });

        const parsed = await response.json();

        if (parsed.success) {
          router.push(redirect);
          return;
        } else if (parsed.errorMessage) {
          setGeneralError(parsed.errorMessage);
          setSubmitting(false);

          return;
        }

        throw new Error("An error occurred");
      } catch (error) {
        console.warn(error);
        setGeneralError("An error occurred");
        setSubmitting(false);
      }
    };

    submit();
  };

  const errorExists = emailError || passwordError || generalError;
  const formFilled = email !== "" && password;

  const allowSubmit = !errorExists && formFilled;

  return {
    onChange,
    onSubmit,
    emailError,
    passwordError,
    generalError,
    submitDisabled: !allowSubmit || submitting,
  };
};

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const useLogin = (redirect = "/my-acecentre") => {
  const [readyForLogin, setReadyForLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { refreshLoginStatus } = useGlobalProps();

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

      await refreshLoginStatus();

      const parsed = await response.json();

      if (parsed.success === false)
        throw new Error(JSON.stringify(parsed.error, null, 2));

      router.push(redirect);
    } catch (error) {
      // If we fail to login, we show an error and allow login again
      setReadyForLogin(true);

      const message = toReadableError(error) || "Something has gone wrong";

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
      const id = event.target.name;
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
  incorrect_password: "Your email address or password is incorrect",
  invalid_username: "Your email address or password is incorrect",
  invalid_password: "Your email address or password is incorrect",
};

const toReadableError = (error) => {
  if (!error) return null;

  const errorMessage = error.message.replace(/"/g, "");
  const mappedError = ERRORS[errorMessage];

  if (!mappedError) {
    console.error("Couldn't parse the following error: ", errorMessage);
    return null;
  }

  return mappedError;
};

export const useLogout = () => {
  const [logoutAllowed, setLogoutAllowed] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { refreshLoginStatus } = useGlobalProps();

  const doLogout = async () => {
    setLogoutAllowed(false);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      await refreshLoginStatus();

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
