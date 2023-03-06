import { createContext, useState } from "react";

const AuthContext = createContext({
  authObject: {},
  user: "",
  token: "",
  isLogIn: "",
  tokenFnx: function () {},
  logInFnx: function () {},
  userFnx: function () {},
});

export function AuthContextProvider(props) {
  const [isLogIn, setIsLogIn] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  function logInHandler(isLogIn) {
    setIsLogIn(isLogIn);
  }
  function userHandler(user) {
    setUser(user);
  }
  function tokenHandler(token) {
    setToken(token);
  }

  const context = {
    authObject: { user, token, isLogIn },
    userFnx: userHandler,
    tokenFnx: tokenHandler,
    logInFnx: logInHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
