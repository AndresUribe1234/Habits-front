import { useContext } from "react";
import AuthContext from "@/store/auth-context";

import Link from "next/link";
import PleaseLogIn from "@/components/Other/PleaseLogIn";

const MyProgress = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }
  return <h1>MyProgress page</h1>;
};

export default MyProgress;
