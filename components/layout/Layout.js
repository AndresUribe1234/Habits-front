import { useEffect, useContext } from "react";
import AuthContext from "@/store/auth-context";
import MainNavigation from "./MainNavigation";
import { loggedInFxn } from "@/util/helperFxn";

function Layout(props) {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const authObject = loggedInFxn();
    if (authObject && authObject.loggedIn) {
      authCtx.logInFnx(true);
      authCtx.tokenFnx(authObject.token);
      authCtx.userFnx(authObject.user);
    }
  }, []);

  return (
    <div>
      <MainNavigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
