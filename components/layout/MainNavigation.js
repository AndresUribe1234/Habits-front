import React, { useState } from "react";
import classes from "./MainNavigation.module.scss";
import Link from "next/link";

const MainNavigaton = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const loggedInUI = (
    <React.Fragment>
      <li>
        <Link href={"/feed"}>Feed</Link>
      </li>
      <li>
        <Link href={"/myprogress"}>My Progess</Link>
      </li>
      <li>
        <Link href={"/globalleaderboard"}>Global Leaderboard</Link>
      </li>
      <li>
        <Link href={"/logout"}>Log Out</Link>
      </li>
    </React.Fragment>
  );

  const notLoggedInUI = (
    <React.Fragment>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <Link href={"/login"}>Log In</Link>
      </li>
    </React.Fragment>
  );

  return (
    <header className={classes.header}>
      <div>Habitus</div>
      <nav>
        <ul>{!loggedIn ? notLoggedInUI : loggedInUI}</ul>
      </nav>
    </header>
  );
};

export default MainNavigaton;
