import { useContext, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import { loggedInFxn } from "@/util/helperFxn";
import Link from "next/link";

const MyProgress = () => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const authObject = loggedInFxn();
    if (authObject && authObject.loggedIn) {
      authCtx.logInFnx(true);
    }
  }, []);
  if (!authCtx.authObject.isLogin) {
    return (
      <h1>
        Please <Link href={"/login"}>Log in</Link> in order to have acces to the
        app content
      </h1>
    );
  }
  return <h1>MyProgress page</h1>;
};

export default MyProgress;
