import React, { useState, useEffect, useRef } from "react";
import classes from "./../../styles/MenuList.module.scss";

const DUMMY_ITEMS = ["hello", "bye bye", "see you later"];

const MenuListOwn = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (item) => {
    console.log(`You clicked ${item}`);
    setIsOpen(false);
  };

  const classToAdd = isOpen ? classes["show"] : "";

  return (
    <div className={classes["menu-container"]} ref={menuRef}>
      <button onClick={toggleMenu}>Settings</button>
      <ul className={[classes["menu-list"], classToAdd].join(" ")}>
        {DUMMY_ITEMS.map((item, index) => (
          <li key={index} onClick={() => handleClick(item)}>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuListOwn;
