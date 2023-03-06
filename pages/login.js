import LoginForm from "@/components/auth/LoginForm";
import React, { useContext, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import { loggedInFxn } from "@/util/helperFxn";

const Login = () => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const authObject = loggedInFxn();
    if (authObject && authObject.loggedIn) {
      authCtx.logInFnx(true);
      authCtx.tokenFnx(authObject.token);
      authCtx.userFnx(authObject.user);
    }
  }, []);
  return (
    <React.Fragment>
      {authCtx.authObject.isLogIn && <h1>Your are already logged in!</h1>}
      {!authCtx.authObject.isLogIn && <LoginForm />}
    </React.Fragment>
  );
};

export default Login;
