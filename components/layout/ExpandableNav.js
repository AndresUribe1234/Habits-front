import React, { useState, useRef } from "react";
import classes from "./../../styles/ExpandableNav.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import BasicMenuMui from "./BasicMenuMui";
import MenuListOwn from "./MenuListOwn";

function Navigation(props) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleChildCoordinates = (coordinates) => {
    setChildCoordinates(coordinates);
  };

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
        <li className={classes["navigation__item"]}>
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
        <li className={classes["navigation__item"]}>
          <Link
            href={"/myprogress"}
            className={[
              router.pathname === "/myprogress" ? classes.active : "",
              classes["navigation__link"],
            ].join(" ")}
          >
            My Progess
          </Link>
        </li>
        <MenuListOwn onLogout={props.onLogout} />
        <li className={classes["navigation__item"]}>
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
        <BasicMenuMui onLogout={props.onLogout} />
      </ul>
    </nav>
  );
}

export default Navigation;
