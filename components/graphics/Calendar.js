import React, { useState } from "react";
import moment from "moment";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import classes from "./../../styles/Calendar.module.scss";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(moment());

  const firstDayOfMonthWeekDayIndex = currentDate.startOf("month").day();
  console.log(firstDayOfMonthWeekDayIndex);
  // 1)Define object where month information will live on
  const calenderObject = {
    weekOne: [],
    weekTwo: [],
    weekThree: [],
    weekFour: [],
    weekFive: [],
    weekSix: [],
  };

  // 2)Adjust first weekdays values depending on which day of the week the month starts
  for (let i = 0; i < firstDayOfMonthWeekDayIndex; i++) {
    calenderObject.weekOne.push("");
  }

  // 3)Fill calender object
  const daysInMonth = currentDate.daysInMonth();
  let weekCounter = 1;
  let currentDateCounter = currentDate.clone();
  for (let i = 1; i <= daysInMonth; i++) {
    if (weekCounter === 1) {
      calenderObject.weekOne.push(i);
    }

    if (weekCounter === 2) {
      calenderObject.weekTwo.push(i);
    }

    if (weekCounter === 3) {
      calenderObject.weekThree.push(i);
    }

    if (weekCounter === 4) {
      calenderObject.weekFour.push(i);
    }

    if (weekCounter === 5) {
      calenderObject.weekFive.push(i);
    }

    if (weekCounter === 6) {
      calenderObject.weekSix.push(i);
    }

    if (currentDateCounter.day() === 6) {
      weekCounter = weekCounter + 1;
      console.log(weekCounter);
    }
    currentDateCounter.add(1, "d");
  }

  const handlePrevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month"));
  };

  const handlePrevYear = () => {
    setCurrentDate(moment(currentDate).subtract(1, "year"));
  };

  const handleNextYear = () => {
    setCurrentDate(moment(currentDate).add(1, "year"));
  };

  return (
    <div className={classes["calendar-container"]}>
      <div className={classes["change-date-container"]}>
        <div className={classes["change-date-btn-container"]}>
          <div className={classes["change-date-btn"]} onClick={handlePrevYear}>
            <KeyboardDoubleArrowLeftIcon />
          </div>
          <div className={classes["change-date-btn"]} onClick={handlePrevMonth}>
            <KeyboardArrowLeftIcon />
          </div>
        </div>
        <h2 className={classes["current-date"]}>
          {currentDate.format("MMMM YYYY")}
        </h2>
        <div className={classes["change-date-btn-container"]}>
          <div className={classes["change-date-btn"]} onClick={handleNextMonth}>
            <KeyboardArrowRightIcon />
          </div>
          <div className={classes["change-date-btn"]} onClick={handleNextYear}>
            <KeyboardDoubleArrowRightIcon />
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tr>
          {calenderObject.weekOne.map((ele) => (
            <td>{ele}</td>
          ))}
        </tr>
        <tr>
          {calenderObject.weekTwo.map((ele) => (
            <td>{ele}</td>
          ))}
        </tr>
        <tr>
          {calenderObject.weekThree.map((ele) => (
            <td>{ele}</td>
          ))}
        </tr>
        <tr>
          {calenderObject.weekFour.map((ele) => (
            <td>{ele}</td>
          ))}
        </tr>
        <tr>
          {calenderObject.weekFive.map((ele) => (
            <td>{ele}</td>
          ))}
        </tr>
        <tr>
          {calenderObject.weekSix.map((ele) => (
            <td>{ele}</td>
          ))}
        </tr>
      </table>
    </div>
  );
}

export default Calendar;
