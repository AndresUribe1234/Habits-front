import { useContext, Fragment, useEffect, useState } from "react";
import AuthContext from "@/store/auth-context";
import ProfileForm from "@/components/profile/ProfileForm";
import PleaseLogIn from "@/components/Other/PleaseLogIn";
import { useRouter } from "next/router";
import ModalMuiInitalMessage from "./../components/auth/ModalMuiInitialMessage";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  console.log(router);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }

  return (
    <Fragment>
      <ProfileForm />
      {router.query.from === "createAccount" ? <ModalMuiInitalMessage /> : ""}
    </Fragment>
  );
};

export default Profile;
