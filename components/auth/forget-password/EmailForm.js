import { useRef, useState } from "react";
import classes from "./../../../styles/ParentForgotPassword.module.scss";

const EmailForm = (props) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

  const accountEmailRef = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = accountEmailRef.current.value;
    await sendPasswordResetToken(enteredEmail);
  };

  async function sendPasswordResetToken(email) {
    try {
      const object = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      };

      setError(false);
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/account/password-reset/send-token`,
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
        props.onSetEmail(email);
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
          To reset your password, please enter the email address associated with
          your account below. We will send a verification token to this email
          address that you can use to reset your password.
        </p>

        <h2>Account email</h2>
        <input ref={accountEmailRef} onFocus={disappearErrHandler}></input>
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

export default EmailForm;
