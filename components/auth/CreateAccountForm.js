import { useRef, useContext, useState } from "react";
import AuthContext from "@/store/auth-context";
import classes from "./../../styles/CreateAccountForm.module.scss";
import { useRouter } from "next/router";
import ModalTermsOfServices from "./ModalMuiTermsOfService";

const CreateAccountForm = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const authCtx = useContext(AuthContext);
  const verificationRef = useRef();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formSubmitObject, setFormSubmitObject] = useState({});
  const [verifcationCodeVisible, setVerifcationCodeVisible] = useState(false);
  const [createAccountForm, setCreateAccountForm] = useState(true);
  const [email, setEmail] = useState("");

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
        setSubmitingForm(false);
        setVerifcationCodeVisible(true);
        setCreateAccountForm(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const usernameEnteredValue = emailRef.current.value;
    setEmail(usernameEnteredValue);
    const passwordEnteredValue = passwordRef.current.value;
    const passwordConfirmEnteredValue = passwordConfirmRef.current.value;

    if (passwordEnteredValue !== passwordConfirmEnteredValue) {
      setError(true);
      setErrorMessage("Passwords entered do not match!");
      return;
    }

    setFormSubmitObject({
      usernameEnteredValue,
      passwordEnteredValue,
      passwordConfirmEnteredValue,
    });

    if (
      usernameEnteredValue.trim() !== "" &&
      passwordEnteredValue.trim() !== "" &&
      passwordConfirmEnteredValue.trim() !== ""
    ) {
      setModalVisible((prev) => !prev);
    }

    if (
      usernameEnteredValue.trim() === "" ||
      passwordEnteredValue.trim() === "" ||
      passwordConfirmEnteredValue.trim() == ""
    ) {
      setError(true);
      setErrorMessage("You cannot submit form without the proper information!");
    }
  };

  function disappearErrHandler() {
    setError(false);
  }

  const visibilityHandler = () => {
    setModalVisible(false);
  };

  const acceptTermsOfServiceHandler = async () => {
    await singupAPICall(
      formSubmitObject.usernameEnteredValue,
      formSubmitObject.passwordEnteredValue,
      formSubmitObject.passwordConfirmEnteredValue
    );
  };

  const verificationSubmitHandler = async (event) => {
    event.preventDefault();
    const token = verificationRef.current.value;
    await verificationTokenNewEmail(token, email);
  };

  const verificationTokenNewEmail = async function (token, email) {
    try {
      console.log(token, email);
      const object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, verificationToken: token }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/signup/post-token`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setSubmitingForm(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        setSubmitingForm(false);
        setError(false);
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
        router.push("/profile?from=createAccount");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes["create-account-container"]}>
      {createAccountForm && (
        <form
          onSubmit={formSubmitHandler}
          className={classes["auth-login-form"]}
        >
          <h1>Create new account</h1>
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
          <ModalTermsOfServices
            modalVisibility={modalVisible}
            onVisibility={visibilityHandler}
            onAcceptTerms={acceptTermsOfServiceHandler}
          />
        </form>
      )}
      {verifcationCodeVisible && (
        <form
          onSubmit={verificationSubmitHandler}
          className={classes["verification-form"]}
        >
          <div>
            <p>
              We've sent a verification code to your email address. Please check
              your inbox, as well as your spam or junk folders, as the email may
              have been filtered there.
            </p>
            <p>
              If you don't receive the email within a few minutes, please
              contact our support team at habittusdev@gmail.com.
            </p>
            <h2>Verification token</h2>
            <input ref={verificationRef}></input>
          </div>
          {submitingForm && <p>Submiting form...</p>}
          {!submitingForm && error && (
            <p className={classes["err-message"]}>{`Error: ${errorMessage}`}</p>
          )}
          <div className={classes["btn-container"]}>
            <button>Send</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateAccountForm;
