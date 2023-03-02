import React, { useRef, useState } from "react";
import classes from "./LoginForm.module.scss";

const loginRoute = "http://localhost:8000/api/users/login";
const signupRoute = "http://localhost:8000/api/users/signup";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const singupAPICall = async function (
    emailBody,
    passwordBody,
    passwordConfirmBody
  ) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailBody,
          password: passwordBody,
          passwordConfirm: passwordConfirmBody,
        }),
      };
      const response = await fetch(signupRoute, object);

      const data = await response.json();

      if (response.status !== 200) {
        console.log(data);
      }

      if (response.status === 200) {
        console.log(data);
        emailRef.current.value = "";
        passwordRef.current.value = "";
        passwordConfirmRef.current.value = "";
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginAPICall = async function (emailBody, passwordBody) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailBody, password: passwordBody }),
      };
      const response = await fetch(loginRoute, object);

      const data = await response.json();

      if (response.status !== 200) {
        console.log(data);
      }

      if (response.status === 200) {
        console.log(data);
        emailRef.current.value = "";
        passwordRef.current.value = "";
      }
    } catch (err) {
      console.log(err);
    }
  };

  function loginHandler(event) {
    event.preventDefault();

    const usernameEnteredValue = emailRef.current.value;
    const passwordEnteredValue = passwordRef.current.value;
    let passwordConfirmEnteredValue;

    if (isLogin) {
      loginAPICall(usernameEnteredValue, passwordEnteredValue);
    }

    if (!isLogin) {
      passwordConfirmEnteredValue = passwordConfirmRef.current.value;
      singupAPICall(
        usernameEnteredValue,
        passwordEnteredValue,
        passwordConfirmEnteredValue
      );
    }
  }

  function switchLoginHandler() {
    setIsLogin((prev) => !prev);
  }

  const passwordConfirmHtml = (
    <React.Fragment>
      <div>
        <label>Password Confirm</label>
        <input ref={passwordConfirmRef} type={"password"}></input>
      </div>
    </React.Fragment>
  );

  return (
    <form onSubmit={loginHandler} className={classes["auth-login-form"]}>
      <p>{isLogin ? "Login" : "Create new account"}</p>
      <div>
        <label>Username</label>
        <input ref={emailRef} type={"email"}></input>
      </div>
      <div>
        <label>Password</label>
        <input ref={passwordRef} type={"password"}></input>
      </div>
      {!isLogin && passwordConfirmHtml}
      <button>{isLogin ? "Login" : "Create new account"}</button>
      <button
        type="button"
        onClick={switchLoginHandler}
        className={classes["switch-btn-func"]}
      >
        {isLogin ? "Create new account" : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
