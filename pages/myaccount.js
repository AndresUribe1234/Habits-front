import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import PleaseLogIn from "@/components/Other/PleaseLogIn";
import ChangeEmailForm from "@/components/auth/ChangeEmailForm";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import classes from "./../styles/MyAccount.module.scss";

const MyAccount = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }
  return (
    <div className={classes["myaccount-container"]}>
      <h1 className={classes["page-name"]}>My Account</h1>
      <ChangeEmailForm />
      <ChangePasswordForm />
    </div>
  );
};

export default MyAccount;
