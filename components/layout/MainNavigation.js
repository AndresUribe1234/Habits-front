import React, { useContext, useState, useEffect } from "react";
import classes from "./../../styles/MainNavigation.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthContext from "@/store/auth-context";
import BasicMenuMui from "./BasicMenuMui";
import ExpandableNav from "./ExpandableNav";
import MenuListOwn from "./MenuListOwn";

const MainNavigaton = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const isLogIn = authCtx.authObject.isLogIn;
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const logOutHandler = () => {
    authCtx.logInFnx(false);
    authCtx.habitsFnx([]);
    authCtx.nameFnx("");
    authCtx.tokenFnx("");
    authCtx.userFnx("");
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
      <BasicMenuMui onLogout={logOutHandler} />
      <MenuListOwn />
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
      <div>Habittus</div>
      <nav>
        <ul>
          {!isLogIn && notLoggedInUI}
          {isLogIn && windowSize.width > 500 && loggedInUI}
          {isLogIn && windowSize.width <= 500 && (
            <ExpandableNav onLogout={logOutHandler} />
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigaton;
