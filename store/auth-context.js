import { createContext, useState } from "react";

const AuthContext = createContext({
  authObject: {},
  user: "",
  token: "",
  isLogIn: "",
  tokenFnx: function () {},
  logInFnx: function () {},
  userFnx: function () {},
  nameFnx: function () {},
  habitsFnx: function () {},
});

export function AuthContextProvider(props) {
  const [isLogIn, setIsLogIn] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [habits, setHabits] = useState([]);

  function logInHandler(isLogIn) {
    setIsLogIn(isLogIn);
  }
  function userHandler(user) {
    setUser(user);
  }
  function tokenHandler(token) {
    setToken(token);
  }
  function nameHandler(name) {
    setName(name);
  }
  function habitsHandler(habits) {
    setHabits([...habits]);
  }

  const context = {
    authObject: { user, token, isLogIn, name, habits },
    userFnx: userHandler,
    tokenFnx: tokenHandler,
    logInFnx: logInHandler,
    nameFnx: nameHandler,
    habitsFnx: habitsHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
