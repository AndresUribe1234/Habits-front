import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  authObject: {},
  windowSize: {},
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
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

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
    windowSize: windowSize,
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
