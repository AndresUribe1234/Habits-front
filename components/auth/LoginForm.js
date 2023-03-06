import React, { useRef, useState, useContext } from "react";
import classes from "./LoginForm.module.scss";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const authCtx = useContext(AuthContext);

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/signup`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        console.log(data);
      }

      if (response.status === 200) {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        passwordConfirmRef.current.value = "";
        localStorage.setItem(
          "authObject",
          JSON.stringify({
            loggedIn: true,
            toke: data.token,
            user: data.data.user.email,
          })
        );
        setIsLogin(true);
        authCtx.logInFnx(true);
        router.push("/feed");
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/login`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        console.log(data);
      }

      if (response.status === 200) {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        authCtx.logInFnx(true);
        localStorage.setItem(
          "authObject",
          JSON.stringify({
            loggedIn: true,
            toke: data.token,
            user: data.data.user.email,
          })
        );
        router.push("/feed");
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
