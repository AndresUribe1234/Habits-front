import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import HabitsProfile from "../../components/habits/progress/HabitsProfile";

import PleaseLogIn from "@/components/Other/PleaseLogIn";

const MyProgress = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }
  return <HabitsProfile />;
};

export default MyProgress;
