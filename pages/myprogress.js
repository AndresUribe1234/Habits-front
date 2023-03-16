import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import HabitsProfile from "./../components/habits/HabitsProfile";

import Link from "next/link";
import PleaseLogIn from "@/components/Other/PleaseLogIn";

const MyProgress = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }
  return <HabitsProfile />;
};

export default MyProgress;
