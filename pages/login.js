import LoginForm from "@/components/auth/LoginForm";
import React, { useContext, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import { loggedInFxn } from "@/util/helperFxn";

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const authObject = loggedInFxn();
    if (authObject && authObject.loggedIn) {
      authCtx.logInFnx(true);
    }
  }, []);
  return (
    <React.Fragment>
      <LoginForm />
    </React.Fragment>
  );
};

export default Login;
