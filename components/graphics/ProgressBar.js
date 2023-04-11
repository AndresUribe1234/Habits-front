import React, { useState, useEffect, Fragment } from "react";
import classes from "./../../styles/ProgressBar.module.scss";
import moment from "moment";
import tz from "moment-timezone";

const ProgressBar = (props) => {
  const [value, setValue] = useState(0);

  const nowDateColTz = moment.utc().tz("America/Bogota").format("YYYY-MM-DD");
  const today = new Date(nowDateColTz);

  useEffect(() => {
    if (
      today.getTime() === new Date(props.data.registrationFinalDate).getTime()
    ) {
      setValue(props.data.completionPercentage * 100);
    }
  }, [value]);

  console.log(today);

  console.log();

  console.log(props.data);

  return (
    <div className={classes["ui-container"]}>
      <p>0%</p>
      <div className={classes["progress-bar-container"]}>
        <div
          className={[
            classes["progress-bar"],
            props.data.completionPercentage * 100 === 100
              ? classes["success"]
              : classes["progress"],
          ].join(" ")}
          style={{ width: `${value}%` }}
        >
          <span
            className={[
              classes["progress-bar-label"],
              props.data.completionPercentage * 100 === 100 ||
              props.data.completionPercentage * 100 === 0
                ? classes["not-show"]
                : "",
            ].join(" ")}
          >
            {" "}
            {value}%
          </span>
        </div>
      </div>
      <p>100%</p>
    </div>
  );
};

export default ProgressBar;
