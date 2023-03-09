import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";

const GlobalLeaderboard = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return (
      <h1>
        Please <Link href={"/login"}>Log in</Link> in order to have acces to the
        app content
      </h1>
    );
  }
  return <h1>GlobalLeaderboard page</h1>;
};

export default GlobalLeaderboard;
