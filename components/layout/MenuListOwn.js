import React, { useState, useEffect, useRef } from "react";
import classes from "./../../styles/MenuList.module.scss";
import ReactDOM from "react-dom";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuListOwn = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuCoordinates, setMenuCoordinates] = useState({
    bottom: 0,
    left: 0,
    width: 0,
  });
  const [menuItems, setMenuItems] = useState([]);

  const router = useRouter();
  const isSettings =
    router.pathname === "/profile" || router.pathname === "/myaccount"
      ? true
      : false;

  const items = props.items ? props.items : [];

  useEffect(() => {
    if (props.items) {
      setMenuItems(props.items);
    }
  }, items);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = (event) => {
    setIsOpen(!isOpen);
    const element = event.target;
    const position = element.getBoundingClientRect();
    const coordinates = {
      bottom: position.bottom,
      left: position.left,
      width: position.width,
    };

    setMenuCoordinates(coordinates);
  };

  const handleClick = (item) => {
    console.log(`You clicked ${item}`);
    setIsOpen(false);
  };

  const ulContent = (
    <ul
      className={`${classes["menu-list"]} ${isOpen ? classes.show : ""}`}
      style={{
        left: `${menuCoordinates.left}px`,
        top: `${menuCoordinates.bottom}px`,
        width: `${menuCoordinates.width}px`,
      }}
    >
      {menuItems.map((item, index) => {
        const path = item.toLowerCase().split(" ").join("");
        if (item.toLowerCase() === "logout") {
          return (
            <li key={index} onClick={props.onLogout}>
              Logout
            </li>
          );
        }
        return (
          <li key={index} onClick={() => handleClick(item)}>
            <Link href={`${path}`}>{item}</Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={`${classes["menu-container"]} ${classes["nav-menu"]}`}
      ref={menuRef}
    >
      <button onClick={toggleMenu} className={isSettings ? classes.active : ""}>
        Settings
      </button>
      {ReactDOM.createPortal(ulContent, document.getElementById("portal"))}
    </div>
  );
};

export default MenuListOwn;
