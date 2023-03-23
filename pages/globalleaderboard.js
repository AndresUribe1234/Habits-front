import { useContext, Fragment } from "react";
import AuthContext from "@/store/auth-context";
import PleaseLogIn from "@/components/Other/PleaseLogIn";
import AccordionHabit from "@/components/habits/AccordionHabit";

const GlobalLeaderboard = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }

  return (
    <Fragment>
      <h1>GlobalLeaderboard page</h1>
      <AccordionHabit
        header={{ title: "I am the king", date: "2023-23-03" }}
        status={"halfway"}
      >
        <p>Hello world</p>
        <p>Hello world</p>
        <p>Hello wordddddddddddddddddddddddld</p>
        <p>Hello world</p>
        <p>Hello world</p>
        <p>Hello world</p>
        <p>Hello world</p>
        <p>Hello world</p>
      </AccordionHabit>
    </Fragment>
  );
};

export default GlobalLeaderboard;
