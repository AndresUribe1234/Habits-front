import React, { useContext } from "react";
import classes from "./MainNavigation.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthContext from "@/store/auth-context";

const MainNavigaton = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const isLogIn = authCtx.authObject.isLogIn;

  const logOutHandler = () => {
    authCtx.logInFnx(false);
    localStorage.removeItem("authObject");
    router.push("/");
  };

  const loggedInUI = (
    <React.Fragment>
      <li>
        <Link
          href={"/feed"}
          className={router.pathname === "/feed" ? classes.active : ""}
        >
          Feed
        </Link>
      </li>
      <li>
        <Link
          href={"/myprogress"}
          className={router.pathname === "/myprogress" ? classes.active : ""}
        >
          My Progess
        </Link>
      </li>
      <li>
        <Link
          href={"/globalleaderboard"}
          className={
            router.pathname === "/globalleaderboard" ? classes.active : ""
          }
        >
          Global Leaderboard
        </Link>
      </li>
      <li onClick={logOutHandler}>Log Out</li>
    </React.Fragment>
  );

  const notLoggedInUI = (
    <React.Fragment>
      <li>
        <Link
          href={"/"}
          className={router.pathname === "/" ? classes.active : ""}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href={"/login"}
          className={router.pathname === "/login" ? classes.active : ""}
        >
          Log In
        </Link>
      </li>
    </React.Fragment>
  );

  return (
    <header className={classes.header}>
      <div>Habitus</div>
      <nav>
        <ul>{!isLogIn ? notLoggedInUI : loggedInUI}</ul>
      </nav>
    </header>
  );
};

export default MainNavigaton;
