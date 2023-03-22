import { useContext, Fragment } from "react";
import AuthContext from "@/store/auth-context";
import PleaseLogIn from "@/components/Other/PleaseLogIn";
import MenuListOwn from "@/components/layout/MenuListOwn";

const GlobalLeaderboard = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }
  return (
    <Fragment>
      <h1>GlobalLeaderboard page</h1>
      <MenuListOwn />
      <p>Hello world</p>
    </Fragment>
  );
};

export default GlobalLeaderboard;
