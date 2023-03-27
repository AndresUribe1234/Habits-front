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
    if (weekCounter === 1) {
      calenderObject.weekOne.valueForCalendar.push(i);
      calenderObject.weekOne.dateValueSecUTCForCalendar.push(
        new Date(currentDateCounter.format("YYYY-MM-DD")).getTime()
      );
    }

    if (weekCounter === 2) {
      calenderObject.weekTwo.valueForCalendar.push(i);
      calenderObject.weekTwo.dateValueSecUTCForCalendar.push(
        new Date(currentDateCounter.format("YYYY-MM-DD")).getTime()
      );
    }

    if (weekCounter === 3) {
      calenderObject.weekThree.valueForCalendar.push(i);
      calenderObject.weekThree.dateValueSecUTCForCalendar.push(
        new Date(currentDateCounter.format("YYYY-MM-DD")).getTime()
      );
    }

    if (weekCounter === 4) {
      calenderObject.weekFour.valueForCalendar.push(i);
      calenderObject.weekFour.dateValueSecUTCForCalendar.push(
        new Date(currentDateCounter.format("YYYY-MM-DD")).getTime()
      );
    }

    if (weekCounter === 5) {
      calenderObject.weekFive.valueForCalendar.push(i);
      calenderObject.weekFive.dateValueSecUTCForCalendar.push(
        new Date(currentDateCounter.format("YYYY-MM-DD")).getTime()
      );
    }

    if (weekCounter === 6) {
      calenderObject.weekSix.valueForCalendar.push(i);
      calenderObject.weekSix.dateValueSecUTCForCalendar.push(
        new Date(currentDateCounter.format("YYYY-MM-DD")).getTime()
      );
    }

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
    console.log(registrationId);
    console.log(registrationIndex);
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
        <tr data-week={"1"}>
          {calenderObject.weekOne.valueForCalendar.map((ele, index) => {
            const dateValue =
              calenderObject.weekOne.dateValueSecUTCForCalendar[index];

            if (dateAsNumSecUTCFromData.includes(dateValue)) {
              const indexInDataArray =
                dateAsNumSecUTCFromData.indexOf(dateValue);
              const id = data[indexInDataArray]._id;
              const completionStatus = data[indexInDataArray].completionStatus
                .toLowerCase()
                .split(" ")
                .join("");

              return (
                <td>
                  <div
                    className={[
                      classes[`${completionStatus}`],
                      classes["data-logged"],
                    ].join(" ")}
                    onClick={modalHandlerOpenStatus}
                    data-id={id}
                  >
                    {ele}
                  </div>
                </td>
              );
            }
            return <td>{ele}</td>;
          })}
        </tr>
        <tr data-week={"2"}>
          {calenderObject.weekTwo.valueForCalendar.map((ele, index) => {
            const dateValue =
              calenderObject.weekTwo.dateValueSecUTCForCalendar[index];

            if (dateAsNumSecUTCFromData.includes(dateValue)) {
              const indexInDataArray =
                dateAsNumSecUTCFromData.indexOf(dateValue);
              const id = data[indexInDataArray]._id;
              const completionStatus = data[indexInDataArray].completionStatus
                .toLowerCase()
                .split(" ")
                .join("");

              return (
                <td>
                  <div
                    className={[
                      classes[`${completionStatus}`],
                      classes["data-logged"],
                    ].join(" ")}
                    onClick={modalHandlerOpenStatus}
                    data-id={id}
                  >
                    {ele}
                  </div>
                </td>
              );
            }
            return <td>{ele}</td>;
          })}
        </tr>
        <tr data-week={"3"}>
          {calenderObject.weekThree.valueForCalendar.map((ele, index) => {
            const dateValue =
              calenderObject.weekThree.dateValueSecUTCForCalendar[index];

            if (dateAsNumSecUTCFromData.includes(dateValue)) {
              const indexInDataArray =
                dateAsNumSecUTCFromData.indexOf(dateValue);
              const id = data[indexInDataArray]._id;
              const completionStatus = data[indexInDataArray].completionStatus
                .toLowerCase()
                .split(" ")
                .join("");

              return (
                <td>
                  <div
                    className={[
                      classes[`${completionStatus}`],
                      classes["data-logged"],
                    ].join(" ")}
                    onClick={modalHandlerOpenStatus}
                    data-id={id}
                  >
                    {ele}
                  </div>
                </td>
              );
            }
            return <td>{ele}</td>;
          })}
        </tr>
        <tr data-week={"4"}>
          {calenderObject.weekFour.valueForCalendar.map((ele, index) => {
            const dateValue =
              calenderObject.weekFour.dateValueSecUTCForCalendar[index];

            if (dateAsNumSecUTCFromData.includes(dateValue)) {
              const indexInDataArray =
                dateAsNumSecUTCFromData.indexOf(dateValue);
              const id = data[indexInDataArray]._id;
              const completionStatus = data[indexInDataArray].completionStatus
                .toLowerCase()
                .split(" ")
                .join("");

              return (
                <td>
                  <div
                    className={[
                      classes[`${completionStatus}`],
                      classes["data-logged"],
                    ].join(" ")}
                    onClick={modalHandlerOpenStatus}
                    data-id={id}
                  >
                    {ele}
                  </div>
                </td>
              );
            }
            return <td>{ele}</td>;
          })}
        </tr>
        <tr data-week={"5"}>
          {calenderObject.weekFive.valueForCalendar.map((ele, index) => {
            const dateValue =
              calenderObject.weekFive.dateValueSecUTCForCalendar[index];

            if (dateAsNumSecUTCFromData.includes(dateValue)) {
              const indexInDataArray =
                dateAsNumSecUTCFromData.indexOf(dateValue);
              const id = data[indexInDataArray]._id;
              const completionStatus = data[indexInDataArray].completionStatus
                .toLowerCase()
                .split(" ")
                .join("");

              return (
                <td>
                  <div
                    className={[
                      classes[`${completionStatus}`],
                      classes["data-logged"],
                    ].join(" ")}
                    onClick={modalHandlerOpenStatus}
                    data-id={id}
                  >
                    {ele}
                  </div>
                </td>
              );
            }
            return <td>{ele}</td>;
          })}
        </tr>
        <tr data-week={"6"}>
          {calenderObject.weekSix.valueForCalendar.map((ele, index) => {
            const dateValue =
              calenderObject.weekSix.dateValueSecUTCForCalendar[index];

            if (dateAsNumSecUTCFromData.includes(dateValue)) {
              const indexInDataArray =
                dateAsNumSecUTCFromData.indexOf(dateValue);
              const id = data[indexInDataArray]._id;
              const completionStatus = data[indexInDataArray].completionStatus
                .toLowerCase()
                .split(" ")
                .join("");

              return (
                <td>
                  <div
                    className={[
                      classes[`${completionStatus}`],
                      classes["data-logged"],
                    ].join(" ")}
                    onClick={modalHandlerOpenStatus}
                    data-id={id}
                  >
                    {ele}
                  </div>
                </td>
              );
            }
            return <td>{ele}</td>;
          })}
        </tr>
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
