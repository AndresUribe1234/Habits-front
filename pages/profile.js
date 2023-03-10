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
      <button
        onClick={() => {
          console.log(authCtx.authObject);
        }}
      >
        show context
      </button>
    </Fragment>
  );
};

export default Profile;
