import LoginForm from "@/components/auth/LoginForm";
import CreateAccountForm from "@/components/auth/CreateAccountForm";
import React, { useContext, useState } from "react";
import AuthContext from "@/store/auth-context";
import classes from "./../../styles/login.module.scss";
import Link from "next/link";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState(true);

  function switchLoginHandler() {
    setLoginForm((prev) => !prev);
  }

  return (
    <div
      className={[
        classes["form-container"],
        authCtx.authObject.isLogIn ? classes["logged"] : "",
      ].join(" ")}
    >
      {authCtx.authObject.isLogIn && (
        <p className={classes["logged-in"]}>Your are already logged in!</p>
      )}
      {!authCtx.authObject.isLogIn && loginForm && <LoginForm />}
      {!authCtx.authObject.isLogIn && !loginForm && <CreateAccountForm />}
      {!authCtx.authObject.isLogIn && (
        <button
          type="button"
          onClick={switchLoginHandler}
          className={classes["switch-btn-func"]}
        >
          {loginForm ? "Create new account" : "Login"}
        </button>
      )}
      <Link href={"/login/forgotpassword"}>Forgot password</Link>
    </div>
  );
};

export default Login;
