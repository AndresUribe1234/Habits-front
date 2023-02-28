import { useState } from "react";
import classes from "./MainNavigation.module.scss";
import Link from "next/link";

const MainNavigaton = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const navLoggedIn = ["Feed", "My progess", "Global leaderboard", "Sign Out"];
  const navNotLoggedIn = ["Home", "Log In"];

  const loggedInUI = navLoggedIn.map((ele) => (
    <li>
      <Link href={`/${ele}`}>{ele}</Link>
    </li>
  ));

  const notLoggedInUI = navNotLoggedIn.map((ele) => (
    <li>
      <Link href={`/${ele}`}>{ele}</Link>
    </li>
  ));

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
