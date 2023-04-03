import { useRouter } from "next/router";
import classes from "./../../../styles/ParentForgotPassword.module.scss";
import { useState } from "react";
import EmailForm from "./EmailForm";

import PasswordForm from "./PasswordForm";

const ParentForgotPassword = () => {
  const [success, setSuccessMsg] = useState(false);
  const [email, setEmail] = useState("");
  const [emailFormVisible, setEmailFormVisible] = useState(true);
  const [passwordFormVisible, setPasswordFormVisible] = useState(false);

  const router = useRouter();

  const backHandler = () => {
    router.back();
  };

  const emailVisibleHandler = () => {
    setEmailFormVisible(false);
    setPasswordFormVisible(true);
  };

  const passwordVisibleHandler = () => {
    setPasswordFormVisible(false);
    setSuccessMsg(true);
  };

  const emailHandler = (email) => {
    setEmail(email);
  };

  return (
    <div className={classes["forms-container"]}>
      <h1>Forgot Password</h1>
      {emailFormVisible && (
        <EmailForm onVisible={emailVisibleHandler} onSetEmail={emailHandler} />
      )}
      {passwordFormVisible && (
        <PasswordForm onVisible={passwordVisibleHandler} email={email} />
      )}
      {success && (
        <p className={classes.success}>Success: Password was changed!</p>
      )}
      <button onClick={backHandler} className={classes["back-btn"]}>
        Back to login page
      </button>
    </div>
  );
};

export default ParentForgotPassword;
