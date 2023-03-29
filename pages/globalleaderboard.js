import { useContext, Fragment } from "react";
import AuthContext from "@/store/auth-context";
import PleaseLogIn from "@/components/Other/PleaseLogIn";
import Leaderboard from "@/components/stats/Leadeboard";

const GlobalLeaderboard = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }

  return (
    <Fragment>
      <Leaderboard />
    </Fragment>
  );
};

export default GlobalLeaderboard;
