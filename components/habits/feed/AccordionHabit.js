import React, { useState } from "react";
import classes from "./../../../styles/AccordionHabit.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function AccordionHabit(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={[
        classes["accordion-container"],
        isOpen ? classes["accordion-opened"] : "",
        classes[`${props.header.statusClass}`],
      ].join(" ")}
    >
      <div
        className={classes["accordion-header-container"]}
        onClick={toggleAccordion}
      >
        <div className={classes["accordion-header-title"]}>
          <p>{`${props.header.title} - ${props.header.date}`}</p>
          <span>{!isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}</span>
        </div>
        <div className={classes["accordion-header-lable"]}>
          <p>{props.header.status}</p>
        </div>
      </div>
      <div
        className={[
          classes["accordion-body-container"],
          isOpen ? classes.show : "",
        ].join(" ")}
      >
        {props.children}
      </div>
    </div>
  );
}

export default AccordionHabit;
