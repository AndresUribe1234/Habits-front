import { useContext, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import { loggedInFxn } from "@/util/helperFxn";
import Link from "next/link";

const MyAccount = () => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const authObject = loggedInFxn();
    if (authObject && authObject.loggedIn) {
      authCtx.logInFnx(true);
      authCtx.tokenFnx(authObject.token);
      authCtx.userFnx(authObject.user);
    }
  }, []);
  if (!authCtx.authObject.isLogIn) {
    return (
      <h1>
        Please <Link href={"/login"}>Log in</Link> in order to have acces to the
        app content
      </h1>
    );
  }
  return <h1>My account page</h1>;
};

export default MyAccount;
