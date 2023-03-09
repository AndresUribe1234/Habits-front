import LoginForm from "@/components/auth/LoginForm";
import React, { useContext } from "react";
import AuthContext from "@/store/auth-context";

const Login = () => {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      {authCtx.authObject.isLogIn && <h1>Your are already logged in!</h1>}
      {!authCtx.authObject.isLogIn && <LoginForm />}
    </React.Fragment>
  );
};

export default Login;
