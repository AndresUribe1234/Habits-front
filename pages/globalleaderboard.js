import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";
import PleaseLogIn from "@/components/Other/PleaseLogIn";
import ExpandableNav from "@/components/layout/ExpandableNav";

const GlobalLeaderboard = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }
  return (
    <>
      <h1>GlobalLeaderboard page</h1>
      <ExpandableNav />
    </>
  );
};

export default GlobalLeaderboard;
