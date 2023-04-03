import React, { useContext, useState } from "react";
import AuthContext from "@/store/auth-context";
import classes from "./../../styles/ParentForgotPassword.module.scss";
import ParentForgotPassword from "../../components/auth/forget-password/ParentForgotPassword";

const ForgotPassword = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div
      className={[
        classes["forgot-pasword-container"],
        authCtx.authObject.isLogIn ? classes["logged"] : "",
      ].join(" ")}
    >
      {authCtx.authObject.isLogIn && (
        <p className={classes["logged-in"]}>Your are already logged in!</p>
      )}
      {!authCtx.authObject.isLogIn && <ParentForgotPassword />}
    </div>
  );
};

export default ForgotPassword;
