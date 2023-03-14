import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import HabitElementBody from "./HabitElementBody";

export default function SimpleAccordion(props) {
  const style = {
    m: "5px",
    bordeRadius: "12px",
    boxShadow: "0 1px 8px rgba(0, 0, 0, 0.25)",
  };

  return (
    <li>
      <Accordion sx={style}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div>
            <Typography>{`${props.habit} - ${props.date.substring(
              0,
              10
            )}`}</Typography>
            <span>{props.status}</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <HabitElementBody
            habitInformation={props.habitInformation}
            id={props.id}
            email={props.email}
          />
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
