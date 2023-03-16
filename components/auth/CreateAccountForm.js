import { useRef, useContext, useState } from "react";
import AuthContext from "@/store/auth-context";
import classes from "./../../styles/LoginForm.module.scss";
import { useRouter } from "next/router";

const CreateAccountForm = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

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

      setError(false);
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/signup`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setSubmitingForm(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        passwordConfirmRef.current.value = "";
        localStorage.setItem(
          "authObject",
          JSON.stringify({
            loggedIn: true,
            token: data.token,
            user: data.data.user.email,
          })
        );
        authCtx.logInFnx(true);
        authCtx.tokenFnx(data.token);
        authCtx.userFnx(data.data.user.email);
        router.push("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const usernameEnteredValue = emailRef.current.value;
    const passwordEnteredValue = passwordRef.current.value;
    const passwordConfirmEnteredValue = passwordConfirmRef.current.value;

    if (passwordEnteredValue !== passwordConfirmEnteredValue) {
      setError(true);
      setErrorMessage("Passwords entered do not match!");
      return;
    }

    singupAPICall(
      usernameEnteredValue,
      passwordEnteredValue,
      passwordConfirmEnteredValue
    );
  };

  function disappearErrHandler() {
    setError(false);
  }

  return (
    <form onSubmit={formSubmitHandler} className={classes["auth-login-form"]}>
      <p>Create new account</p>
      <div>
        <label>Email</label>
        <input
          ref={emailRef}
          type={"email"}
          onFocus={disappearErrHandler}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          ref={passwordRef}
          type={"password"}
          minLength="8"
          onFocus={disappearErrHandler}
        ></input>
      </div>
      <div>
        <label>Password Confirm</label>
        <input
          ref={passwordConfirmRef}
          type={"password"}
          minLength="8"
          onFocus={disappearErrHandler}
        ></input>
      </div>
      {submitingForm && <p>Creating account...</p>}
      {!submitingForm && error && (
        <p className={classes["err-message"]}>{`Error: ${errorMessage}`}</p>
      )}
      <button type="submit">Create new account</button>
    </form>
  );
};

export default CreateAccountForm;
