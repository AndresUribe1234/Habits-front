import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import Habits from "@/components/habits/Habits";
import PleaseLogIn from "@/components/Other/PleaseLogIn";

const Feed = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }

  return <Habits />;
};

export default Feed;
