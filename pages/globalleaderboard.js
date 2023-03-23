import { useContext, Fragment } from "react";
import AuthContext from "@/store/auth-context";
import PleaseLogIn from "@/components/Other/PleaseLogIn";

const GlobalLeaderboard = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }
  return (
    <Fragment>
      <h1>GlobalLeaderboard page</h1>
    </Fragment>
  );
};

export default GlobalLeaderboard;
