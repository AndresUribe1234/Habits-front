import React, { useState, useEffect, useRef } from "react";
import classes from "./../../styles/MenuList.module.scss";
import ReactDOM from "react-dom";

const DUMMY_ITEMS = ["hello", "bye bye", "see you later"];

const MenuListOwn = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuCoordinates, setMenuCoordinates] = useState({
    bottom: 0,
    left: 0,
    width: 0,
  });

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
      {DUMMY_ITEMS.map((item, index) => (
        <li key={index} onClick={() => handleClick(item)}>
          <p>{item}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={classes["menu-container"]} ref={menuRef}>
      <button onClick={toggleMenu}>Settings</button>
      {ReactDOM.createPortal(ulContent, document.getElementById("portal"))}
    </div>
  );
};

export default MenuListOwn;
