import classes from "./../../styles/ChangePasswordForm.module.scss";
import { useState, useContext, useRef } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AuthContext from "@/store/auth-context";

const ChangePasswordForm = () => {
  const [editingForm, setEditingForm] = useState(false);
  const [formEmailVisibe, setFormEmailVisibe] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);
  const authCtx = useContext(AuthContext);
  const [success, setSuccessMsg] = useState(false);

  const newPasswordRef = useRef();
  const currentPasswordRef = useRef();
  const confirmCurrentPaswordRef = useRef();

  const isEditingFormHandler = () => {
    setEditingForm(true);
    setFormEmailVisibe(true);
    setSuccessMsg(false);
  };

  const cancelEditingFormHandler = () => {
    setEditingForm(false);
    setFormEmailVisibe(false);
  };

  const newPasswordSubmitHandler = async (event) => {
    event.preventDefault();
    const enterednewPassword = newPasswordRef.current.value.trim();
    const enteredCurrentPassword = currentPasswordRef.current.value.trim();
    const enteredConfirmCurrentPassword =
      confirmCurrentPaswordRef.current.value.trim();

    if (enteredCurrentPassword !== enteredConfirmCurrentPassword) {
      setError(true);
      setErrorMessage(
        "Current password and confirm current password do not match!"
      );
      return;
    }

    if (
      enterednewPassword === "" ||
      enteredCurrentPassword === "" ||
      enteredConfirmCurrentPassword === ""
    ) {
      setError(true);
      setErrorMessage("You cannot submit form without the proper information!");
    }

    await requestPasswordChange(
      enterednewPassword,
      enteredCurrentPassword,
      enteredConfirmCurrentPassword
    );
  };

  function disappearErrHandler() {
    setError(false);
  }

  const requestPasswordChange = async function (
    newPassword,
    currentPassword,
    confirmCurrentPassword
  ) {
    try {
      const object = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
        body: JSON.stringify({
          newPassword: newPassword,
          currentPassword: currentPassword,
          confirmCurrentPassword: confirmCurrentPassword,
        }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/account/change-password`,
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
        setError(false);
        setEditingForm(false);
        setSuccessMsg(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes["form-container"]}>
      {!editingForm && (
        <div className={classes["initial-container"]}>
          <h2 className={classes["field-placeholder"]}>Password</h2>
          <input
            value={"12345678"}
            type="password"
            readOnly
            className={classes["data-placeholder"]}
          ></input>
          <button
            type="button"
            className={classes["edit-btn"]}
            onClick={isEditingFormHandler}
          >
            <DriveFileRenameOutlineIcon />
          </button>
        </div>
      )}
      {success && (
        <p className={classes.success}>Success: Password was changed!</p>
      )}
      {formEmailVisibe && (
        <form onSubmit={newPasswordSubmitHandler}>
          <div>
            <h2>New password</h2>
            <input
              type="password"
              minLength={8}
              ref={newPasswordRef}
              onFocus={disappearErrHandler}
            ></input>
          </div>
          <div>
            <h2>Current Password</h2>
            <input
              type="password"
              minLength={8}
              ref={currentPasswordRef}
              onFocus={disappearErrHandler}
            ></input>
          </div>
          <div>
            <h2>Confirm Current Password</h2>
            <input
              type="password"
              minLength={8}
              ref={confirmCurrentPaswordRef}
              onFocus={disappearErrHandler}
            ></input>
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
    </div>
  );
};

export default ChangePasswordForm;
