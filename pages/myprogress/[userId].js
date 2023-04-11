import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import HabitsProfile from "../../components/habits/progress/HabitsProfile";

import PleaseLogIn from "@/components/Other/PleaseLogIn";
import OtherUserProgress from "@/components/habits/progress/OtherUserProgress";

const MyProgress = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }
  return <OtherUserProgress />;
};

export default MyProgress;
