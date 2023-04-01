import classes from "./../../styles/ChangeEmailForm.module.scss";
import { useState, useRef, useContext } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AuthContext from "@/store/auth-context";

const ChangeEmailForm = () => {
  const [editingForm, setEditingForm] = useState(false);
  const [formEmailVisibe, setFormEmailVisibe] = useState(false);
  const [verificationFormVisible, setVerificationFormVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState(authCtx.authObject.user);
  const [success, setSuccessMsg] = useState(false);
  const [temporaryEmail, setTemporaryEmail] = useState("");

  const newEmailRef = useRef();
  const passwordRef = useRef();
  const verificationRef = useRef();

  const isEditingFormHandler = () => {
    setEditingForm(true);
    setFormEmailVisibe(true);
  };

  const cancelEditingFormHandler = () => {
    setEditingForm(false);
    setFormEmailVisibe(false);
    setVerificationFormVisible(false);
  };

  const newEmailSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = newEmailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    await requestChangeEmail(enteredEmail, enteredPassword);
  };

  const verificationSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("submit new email form");
    const enteredVerification = verificationRef.current.value;
    await verificationTokenNewEmail(enteredVerification);
  };

  const requestChangeEmail = async function (newEmail, password) {
    try {
      const object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
        body: JSON.stringify({ newEmail: newEmail, password: password }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/account/change-email`,
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
        setFormEmailVisibe(false);
        setVerificationFormVisible(true);
        setError(false);
        setTemporaryEmail(newEmail);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const verificationTokenNewEmail = async function (token) {
    try {
      const object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },

        body: JSON.stringify({ verificationToken: token }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/account/validate-token`,
        object
      );

      const data = await response.json();
      console.log(data);

      if (response.status !== 200) {
        setSubmitingForm(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        setSubmitingForm(false);
        setVerificationFormVisible(false);
        setEmail(temporaryEmail);
        setError(false);
        setSuccessMsg(true);
        setEditingForm(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes["form-container"]}>
      {!editingForm && (
        <div className={classes["initial-container"]}>
          <h2 className={classes["field-placeholder"]}>Email</h2>
          <p className={classes["data-placeholder"]}>{email}</p>
          <button
            type="button"
            className={classes["edit-btn"]}
            onClick={isEditingFormHandler}
          >
            <DriveFileRenameOutlineIcon />
          </button>
        </div>
      )}
      {success && <p>Success: Email was changed!</p>}
      {formEmailVisibe && (
        <form onSubmit={newEmailSubmitHandler}>
          <div>
            <h2>New email</h2>
            <input type="email" ref={newEmailRef}></input>
          </div>
          <div>
            <h2>Password</h2>
            <input type="password" minLength={8} ref={passwordRef}></input>
          </div>
          {submitingForm && <p>Submiting form...</p>}
          {!submitingForm && error && (
            <p className={classes["err-message"]}>{`Error: ${errorMessage}`}</p>
          )}
          <div className={classes["btn-container"]}>
            <button type="submit">Send</button>
            <button type="button" onClick={cancelEditingFormHandler}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {verificationFormVisible && (
        <form onSubmit={verificationSubmitHandler}>
          <div>
            <h2>Verification token</h2>
            <input ref={verificationRef}></input>
          </div>
          {submitingForm && <p>Submiting form...</p>}
          {!submitingForm && error && (
            <p className={classes["err-message"]}>{`Error: ${errorMessage}`}</p>
          )}
          <div className={classes["btn-container"]}>
            <button>Send</button>
            <button type="button" onClick={cancelEditingFormHandler}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangeEmailForm;
