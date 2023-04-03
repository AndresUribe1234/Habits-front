import { useRef, useState } from "react";
import classes from "./../../../styles/ParentForgotPassword.module.scss";

const PasswordForm = (props) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const verificationRef = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const verificationTokenEntered = verificationRef.current.value;
    const newPasswordEntered = newPasswordRef.current.value;
    const confirmNewPasswordEntered = confirmNewPasswordRef.current.value;

    if (newPasswordEntered !== confirmNewPasswordEntered) {
      setError(true);
      setErrorMessage("Passwords entered do not match!");
      return;
    }

    if (
      verificationTokenEntered.trim() === "" ||
      newPasswordEntered.trim() === "" ||
      confirmNewPasswordEntered.trim() == ""
    ) {
      setError(true);
      setErrorMessage("You cannot submit form without the proper information!");
      return;
    }

    await sendRequestNewPassword(
      props.email,
      verificationTokenEntered,
      newPasswordEntered,
      confirmNewPasswordEntered
    );
  };

  async function sendRequestNewPassword(
    email,
    verificationToken,
    newPassword,
    confirmNewPassword
  ) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          verificationToken,
          newPassword,
          confirmNewPassword,
        }),
      };

      setError(false);
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/account/password-reset/new-password`,
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
        props.onVisible();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function disappearErrHandler() {
    setError(false);
  }

  return (
    <form onSubmit={submitFormHandler}>
      <div>
        <p>
          We've sent a verification code to your email address. Please check
          your inbox, as well as your spam or junk folders, as the email may
          have been filtered there.
        </p>
        <p>
          If you don't receive the email within a few minutes, please contact
          our support team at habittusdev@gmail.com.
        </p>
        <h2>Verification token</h2>
        <input ref={verificationRef} onFocus={disappearErrHandler}></input>
      </div>
      <div>
        <h2>New password</h2>
        <input
          ref={newPasswordRef}
          type="password"
          minLength={8}
          onFocus={disappearErrHandler}
        ></input>
      </div>
      <div>
        <h2>Confirm new password</h2>
        <input
          ref={confirmNewPasswordRef}
          type="password"
          minLength={8}
          onFocus={disappearErrHandler}
        ></input>
      </div>
      {submitingForm && <p>Submiting form...</p>}
      {!submitingForm && error && (
        <p className={classes["err-message"]}>{`Error: ${errorMessage}`}</p>
      )}
      <div className={classes["btn-container"]}>
        <button>Send</button>
      </div>
    </form>
  );
};

export default PasswordForm;
