import { useState, useEffect } from "react";
import moment from "moment";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ModalMuiHabitInformation from "./../habits/ModalMuiHabitInformation";
import classes from "./../../styles/Calendar.module.scss";

function Calendar(props) {
  const [currentDate, setCurrentDate] = useState(moment());
  const [calendar, setCalendar] = useState([]);
  const [data, setData] = useState([]);
  const [dataDateValue, setDataDateValue] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    // Set data from props
    setData(props.data);

    // Get array of dates from data for when rendering a date knowing if theres an event
    const timeSinceUTC = props.data.map((ele) => {
      const date = moment.utc(ele.registrationFinalDate).format("YYYY-MM-DD");
      return new Date(date).getTime();
    });
    setDataDateValue(timeSinceUTC);
  }, [props.data]);

  useEffect(() => {
    const calculateCalendar = () => {
      // Day index a month starts with. Example:Sunday=0,monday=1, tuesday=2,etc.
      const beginningOfMonthDayIndex = currentDate.startOf("month").day();

      // Calendar array consisting of 6 possible weeks a month can have
      let calendar = Array.from({ length: 6 }, () => ({
        valueHtmlCalendar: [],
        dateValueSecondsFromUTC: [],
        dateValueString: [],
      }));

      // Populate first week with empty spaces until first day of month (a month can start on a Tuesday).
      for (let i = 0; i < beginningOfMonthDayIndex; i++) {
        calendar[0].valueHtmlCalendar.push("");
        calendar[0].dateValueSecondsFromUTC.push("");
        calendar[0].dateValueString.push("");
      }

      // Get number of days in a month in order to populate array with corresponding data
      const daysInMonth = currentDate.daysInMonth();
      let weekCounter = 0;
      // Make a copy of current date in order to avoid changing unintentionally
      let currentDateCounter = currentDate.clone();

      // Iterate over all days of month in order to populate calendar array with information needed
      for (let i = 1; i <= daysInMonth; i++) {
        calendar[weekCounter].valueHtmlCalendar.push(i);
        calendar[weekCounter].dateValueSecondsFromUTC.push(
          new Date(currentDateCounter.format("YYYY-MM-DD")).getTime()
        );
        calendar[weekCounter].dateValueString.push(
          String(currentDateCounter.format("YYYY-MM-DD"))
        );

        // Once day index reaches end of week jump to next week
        if (currentDateCounter.day() === 6) {
          weekCounter = weekCounter + 1;
        }
        // Add day to calendar day counter
        currentDateCounter.add(1, "d");
      }
      // Return calendar object as value
      return calendar;
    };

    setCalendar(calculateCalendar());
  }, [currentDate]);

  const calendarHandler = (typeOfOperation, unit) => {
    setCurrentDate(
      typeOfOperation === "add"
        ? moment(currentDate).add(1, unit)
        : moment(currentDate).subtract(1, unit)
    );
  };

  const interactCalendarHandler = (data) => {
    setModalData(data);
    setModalView(true);
  };

  const modalHandlerOpenStatus = (id) => {
    const registrationId = id;
    const registrationIndex = data
      .map((ele) => ele._id)
      .indexOf(registrationId);

    setModalData(data[registrationIndex]);
    setModalVisible(true);
  };

  const modalHandlerCloseStatus = (event) => {
    setModalVisible(false);
  };

  const tableDateFunctionalityHTML = (
    <div className={classes["change_date_container"]}>
      <div className={classes["change_date_btn_container"]}>
        <div
          className={classes["change_date_btn"]}
          onClick={calendarHandler.bind(this, "subtract", "year")}
        >
          <KeyboardDoubleArrowLeftIcon />
        </div>
        <div
          className={classes["change_date_btn"]}
          onClick={calendarHandler.bind(this, "subtract", "month")}
        >
          <KeyboardArrowLeftIcon />
        </div>
      </div>
      <h2 className={classes["current_date"]}>
        {currentDate.locale("es").format("MMMM YYYY")}
      </h2>
      <div className={classes["change_date_btn_container"]}>
        <div
          className={classes["change_date_btn"]}
          onClick={calendarHandler.bind(this, "add", "month")}
        >
          <KeyboardArrowRightIcon />
        </div>
        <div
          className={classes["change_date_btn"]}
          onClick={calendarHandler.bind(this, "add", "year")}
        >
          <KeyboardDoubleArrowRightIcon />
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.calendar_container}>
      <h1>Habits Calendar</h1>
      {tableDateFunctionalityHTML}
      <div className={classes.calendar_table_container}>
        <div className={classes.row_container}>
          <div className={classes.row_cell}>Dom</div>
          <div className={classes.row_cell}>Lun</div>
          <div className={classes.row_cell}>Mar</div>
          <div className={classes.row_cell}>Mie</div>
          <div className={classes.row_cell}>Jue</div>
          <div className={classes.row_cell}>Vie</div>
          <div className={classes.row_cell}>Sab</div>
        </div>
        <div className={classes.calendar_body}>
          {calendar.map((ele, weekIndex) => {
            //Declare empty body of tr tag
            const rowsBody = [];
            //Loop through all data of corresponding week. "In" returns index in for loop. "Of" returns value in for loop.
            for (let index in ele.valueHtmlCalendar) {
              const day = ele.valueHtmlCalendar[index];
              //   Add html value for each day in order to construct array of <div/> tags that will build <tr/> tag

              //  Html passed if date appear in data

              if (dataDateValue.includes(ele.dateValueSecondsFromUTC[index])) {
                const indexInDataArray = dataDateValue.indexOf(
                  ele.dateValueSecondsFromUTC[index]
                );

                const id = data[indexInDataArray]._id;
                const completionStatus = data[indexInDataArray].completionStatus
                  .toLowerCase()
                  .split(" ")
                  .join("");

                rowsBody.push(
                  <div
                    key={Math.random()}
                    data-week={index + 1}
                    data-day={day}
                    className={classes.row_cell}
                  >
                    <div
                      className={[
                        classes[`${completionStatus}`],
                        classes["data_logged"],
                      ].join(" ")}
                      onClick={modalHandlerOpenStatus.bind(this, id)}
                      data-id={id}
                    >
                      <div>{day}</div>
                    </div>
                  </div>
                );
              }

              // Html if theres nof information for this date
              if (!dataDateValue.includes(ele.dateValueSecondsFromUTC[index])) {
                rowsBody.push(
                  <div
                    key={Math.random()}
                    data-week={index + 1}
                    data-day={day}
                    className={classes.row_cell}
                  >
                    <div>{day}</div>
                  </div>
                );
              }
            }
            // Return one table row for each week of the calendar array
            return (
              <div
                data-week={weekIndex + 1}
                key={Math.random()}
                className={classes.row_container}
              >
                {rowsBody}
              </div>
            );
          })}
        </div>
      </div>
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
