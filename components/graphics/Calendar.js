import React, { useState } from "react";
import moment from "moment";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ModalMuiHabitInformation from "./../habits/ModalMuiHabitInformation";
import classes from "./../../styles/Calendar.module.scss";

function Calendar(props) {
  const [currentDate, setCurrentDate] = useState(moment());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const { data } = props;

  const dateAsNumSecUTCFromData = data.map((ele) =>
    new Date(ele.registrationFinalDate).getTime()
  );

  const firstDayOfMonthWeekDayIndex = currentDate.startOf("month").day();

  // 1)Define object where month information will live on
  const calenderObject = {
    weekOne: { dateValueSecUTCForCalendar: [], valueForCalendar: [] },
    weekTwo: { dateValueSecUTCForCalendar: [], valueForCalendar: [] },
    weekThree: { dateValueSecUTCForCalendar: [], valueForCalendar: [] },
    weekFour: { dateValueSecUTCForCalendar: [], valueForCalendar: [] },
    weekFive: { dateValueSecUTCForCalendar: [], valueForCalendar: [] },
    weekSix: { dateValueSecUTCForCalendar: [], valueForCalendar: [] },
  };

  const keysOfCalenderObject = [
    "weekOne",
    "weekTwo",
    "weekThree",
    "weekFour",
    "weekFive",
    "weekSix",
  ];

  // 2)Adjust first weekdays values depending on which day of the week the month starts
  for (let i = 0; i < firstDayOfMonthWeekDayIndex; i++) {
    calenderObject.weekOne.valueForCalendar.push("");
    calenderObject.weekOne.dateValueSecUTCForCalendar.push("");
  }

  // 3)Fill calender object
  const daysInMonth = currentDate.daysInMonth();
  let weekCounter = 1;
  let currentDateCounter = currentDate.clone();

  for (let i = 1; i <= daysInMonth; i++) {
    // Assign to specific key in calender object depending of week counter
    calenderObject[
      `${keysOfCalenderObject[weekCounter - 1]}`
    ].valueForCalendar.push(i);

    calenderObject[
      `${keysOfCalenderObject[weekCounter - 1]}`
    ].dateValueSecUTCForCalendar.push(
      new Date(currentDateCounter.format("YYYY-MM-DD")).getTime()
    );

    // When current day index is 6 which mean last day of week change week by adding one
    if (currentDateCounter.day() === 6) {
      weekCounter = weekCounter + 1;
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

  const modalHandlerOpenStatus = (event) => {
    const registrationId = event.target.dataset.id;
    const registrationIndex = data
      .map((ele) => ele._id)
      .indexOf(registrationId);

    setModalData(data[registrationIndex]);
    setModalVisible(true);
  };

  const modalHandlerCloseStatus = (event) => {
    setModalVisible(false);
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
        <tbody>
          {keysOfCalenderObject.map((ele, index) => {
            // 1)Declare empty body of tr tag
            const rowsBody = [];
            // 2)Loop through all data of correspodning week. "In" returns index in for loop.
            for (let value in calenderObject[`${ele}`].valueForCalendar) {
              // 3)Get date in n position of dateValue array
              const dateValue =
                calenderObject[`${ele}`].dateValueSecUTCForCalendar[value];
              // 4)If date exists in registrations assign information to tag

              if (dateAsNumSecUTCFromData.includes(dateValue)) {
                const indexInDataArray =
                  dateAsNumSecUTCFromData.indexOf(dateValue);
                const id = data[indexInDataArray]._id;
                const completionStatus = data[indexInDataArray].completionStatus
                  .toLowerCase()
                  .split(" ")
                  .join("");

                rowsBody.push(
                  <td key={value}>
                    <div
                      className={[
                        classes[`${completionStatus}`],
                        classes["data-logged"],
                      ].join(" ")}
                      onClick={modalHandlerOpenStatus}
                      data-id={id}
                    >
                      {calenderObject[`${ele}`].valueForCalendar[value]}
                    </div>
                  </td>
                );
              }
              // 5)If date does not exist simply apply date
              if (!dateAsNumSecUTCFromData.includes(dateValue)) {
                rowsBody.push(
                  <td key={value}>
                    {calenderObject[`${ele}`].valueForCalendar[value]}
                  </td>
                );
              }
            }

            return (
              <tr data-week={index + 1} key={index}>
                {rowsBody}
              </tr>
            );
          })}
        </tbody>
      </table>
      {modalVisible && (
        <ModalMuiHabitInformation
          status={modalVisible}
          onClose={modalHandlerCloseStatus}
          data={modalData}
        />
      )}
    </div>
  );
}

export default Calendar;
