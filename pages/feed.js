import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import HabitsFeed from "@/components/habits/feed/HabitsFeed";
import PleaseLogIn from "@/components/Other/PleaseLogIn";

const Feed = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }

  return <HabitsFeed />;
};

export default Feed;
