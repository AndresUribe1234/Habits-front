import { useContext, Fragment } from "react";
import AuthContext from "@/store/auth-context";
import ProfileForm from "@/components/profile/ProfileForm";
import PleaseLogIn from "@/components/layout/PleaseLogIn";

const Profile = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }

  return (
    <Fragment>
      <ProfileForm />
    </Fragment>
  );
};

export default Profile;
