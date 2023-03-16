import React, { useRef, useContext, useState } from "react";
import classes from "./../../styles/LoginForm.module.scss";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

  const loginAPICall = async function (emailBody, passwordBody) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailBody, password: passwordBody }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/login`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setSubmitingForm(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        localStorage.setItem(
          "authObject",
          JSON.stringify({
            loggedIn: true,
            token: data.token,
            user: data.data.user.email,
          })
        );
        authCtx.logInFnx(true);
        authCtx.tokenFnx(data.token);
        authCtx.userFnx(data.data.user.email);
        authCtx.habitsFnx(data.data.user.habits);
        authCtx.nameFnx(data.data.user.name);
        router.push("/feed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  function formSubmitHandler(event) {
    event.preventDefault();
    const usernameEnteredValue = emailRef.current.value;
    const passwordEnteredValue = passwordRef.current.value;

    loginAPICall(usernameEnteredValue, passwordEnteredValue);
  }

  function disappearErrHandler() {
    setError(false);
  }

  return (
    <form onSubmit={formSubmitHandler} className={classes["auth-login-form"]}>
      <p>Login</p>
      <div>
        <label>Email</label>
        <input
          ref={emailRef}
          type={"email"}
          onFocus={disappearErrHandler}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          ref={passwordRef}
          type={"password"}
          minLength="8"
          onFocus={disappearErrHandler}
        ></input>
      </div>
      {submitingForm && <p>Logging in...</p>}
      {!submitingForm && error && (
        <p className={classes["err-message"]}>{`Error: ${errorMessage}`}</p>
      )}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
