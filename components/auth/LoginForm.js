import { CLIENT_PUBLIC_FILES_PATH } from "next/dist/shared/lib/constants";
import { useRef, useState } from "react";
import classes from "./LoginForm.module.scss";

const loginRoute = "http://localhost:8000/api/users/login";
const signupRoute = "http://localhost:8000/api/users/signup";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const singupAPICall = async function (emailBody, passwordBody) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailBody, password: passwordBody }),
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

    console.log(usernameEnteredValue, passwordEnteredValue);

    if (isLogin) {
      loginAPICall(usernameEnteredValue, passwordEnteredValue);
    }

    if (!isLogin) {
      singupAPICall(usernameEnteredValue, passwordEnteredValue);
    }
  }

  function switchLoginHandler() {
    setIsLogin((prev) => !prev);
  }

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
