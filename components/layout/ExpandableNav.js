import React, { useState } from "react";
import classes from "./../../styles/ExpandableNav.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuListOwn from "./MenuListOwn";

function Navigation(props) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const expression = expanded ? "expanded" : "";

  return (
    <nav className={classes["navigation"]}>
      <button
        className={classes["navigation__toggle"]}
        onClick={toggleExpansion}
      >
        <MenuIcon />
      </button>
      <ul
        className={[classes[`navigation__list`], classes[expression]].join(" ")}
      >
        <li className={classes["navigation__item"]} onClick={toggleExpansion}>
          <Link
            href={"/feed"}
            className={[
              router.pathname === "/feed" ? classes.active : "",
              classes["navigation__link"],
            ].join(" ")}
          >
            Feed
          </Link>
        </li>
        <li className={classes["navigation__item"]} onClick={toggleExpansion}>
          <Link
            href={"/myprogress"}
            className={[
              router.pathname === "/myprogress" ? classes.active : "",
              classes["navigation__link"],
            ].join(" ")}
          >
            My Progress
          </Link>
        </li>
        <li className={classes["navigation__item"]} onClick={toggleExpansion}>
          <Link
            href={"/globalleaderboard"}
            className={[
              router.pathname === "/globalleaderboard" ? classes.active : "",
              classes["navigation__link"],
            ].join(" ")}
          >
            Global Leaderboard
          </Link>
        </li>

        <MenuListOwn
          onLogout={props.onLogout}
          items={["Profile", "My account", "Logout"]}
          mobile={true}
          onCloseExpansion={toggleExpansion}
        />
      </ul>
    </nav>
  );
}

export default Navigation;
