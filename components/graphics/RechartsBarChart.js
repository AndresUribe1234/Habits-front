import React, { useEffect, useState, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import classes from "./../../styles/RechartsBarChart.module.scss";
import moment from "moment";
import tz from "moment-timezone";
import AuthContext from "@/store/auth-context";
const momentRange = require("moment-range");
momentRange.extendMoment(moment);

const BarChartRechart = (props) => {
  const [startingDate, setStartingDate] = useState(
    moment.utc().tz("America/Bogota")
  );
  const [endingDate, setEndingDate] = useState(
    moment.utc().subtract(30, "d").tz("America/Bogota")
  );
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(
    "Last 30 days completion percentage progress"
  );
  const authCtx = useContext(AuthContext);
  const { data } = props;
  const todayDateString = moment
    .utc()
    .tz("America/Bogota")
    .format("YYYY-MM-DD");

  const intialDateString = moment
    .utc()
    .tz("America/Bogota")
    .subtract(30, "d")
    .format("YYYY-MM-DD");

  const arrayUTCSecData = data.map((ele) =>
    new Date(ele.registrationFinalDate).getTime()
  );

  const todayUtcSec = new Date(
    moment.utc().tz("America/Bogota").format("YYYY-MM-DD")
  ).getTime();

  const range = moment.range(endingDate, startingDate);

  const arrayOfDatesStr = Array.from(range.by("day")).map((m) =>
    m.format("MMM-DD")
  );

  const arrayOfDatesUTC = Array.from(range.by("day")).map((m) =>
    new Date(m.format("YYYY-MM-DD")).getTime()
  );

  const dataArrayObject = arrayOfDatesStr.map((ele, index) => {
    const exist = arrayUTCSecData.includes(arrayOfDatesUTC[index]);

    let completion = 0;
    let color = "#F16060  ";
    let habitsAchieved = "";
    let habitsMissing = "";

    if (exist) {
      const indexInRegistration = arrayUTCSecData.indexOf(
        arrayOfDatesUTC[index]
      );
      completion = data[indexInRegistration].completionPercentage * 100;
      if (completion === 100) {
        color = "#6ABD6F   ";
      }

      if (completion !== 100 && todayUtcSec === arrayOfDatesUTC[index]) {
        color = "#F5E050   ";
      }

      habitsAchieved =
        data[indexInRegistration].userHabitsAchievedDayRegistration;

      habitsMissing = data[
        indexInRegistration
      ].userHabitsGoalDayRegistration.filter(
        (ele) =>
          !data[indexInRegistration].userHabitsAchievedDayRegistration.includes(
            ele
          )
      );
    }

    return {
      xAxis: ele,
      theresRegistration: exist,
      yAxis: completion,
      color: color,
      date: "hello world",
      habitsAchieved: habitsAchieved,
      habitsMissing: habitsMissing,
    };
  });

  const dateSelectionHandler = (setValue, type, event) => {
    setError(false);

    if (type === "startDate") {
      const dateEntered = moment(event.target.value);
      const endDateMoment = moment(startingDate);
      const dateEnteredSmaller = dateEntered.isSameOrBefore(endDateMoment);

      if (dateEnteredSmaller) {
        setValue(event.target.value);
        const duration = endDateMoment.diff(
          dateEntered.subtract(1, "days"),
          "days"
        );

        const newTitle = `Last ${duration} days completion percentage progress`;
        setTitle(newTitle);
      }
      if (!dateEnteredSmaller) {
        setError(true);
      }
    }

    if (type === "endDate") {
      const dateEntered = moment(event.target.value);
      const startDateMoment = moment(endingDate);
      const dateEnteredSmaller = dateEntered.isSameOrAfter(startDateMoment);

      if (dateEnteredSmaller) {
        setValue(event.target.value);
        const duration = dateEntered
          .add(1, "days")
          .diff(startDateMoment, "days");

        const newTitle = `Last ${duration} days completion percentage progress`;
        setTitle(newTitle);
      }
      if (!dateEnteredSmaller) {
        setError(true);
      }
    }
  };
  console.log(authCtx.windowSize);
  return (
    <div className={classes.bar_container}>
      <h1>{title}</h1>
      <BarChart
        width={
          authCtx.windowSize.width < 500 ? authCtx.windowSize.width - 100 : 500
        }
        height={authCtx.windowSize.height < 800 ? 275 : 400}
        data={dataArrayObject}
        margin={{ bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="xAxis" angle={-90} textAnchor="end" />
        <YAxis
          label={{ value: "Completion percentage %", angle: -90, dx: -20 }}
        />
        {/* <Tooltip /> */}
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload) {
              return (
                <div className={classes["custom-tooltip"]}>
                  <p>{label}</p>
                  <p>{`Completion percentage: ${payload[0].value.toFixed(
                    2
                  )}%`}</p>
                  {payload[0].value !== 0 && (
                    <>
                      <p>{`Habits achieved: ${payload[0].payload.habitsAchieved.join(
                        ", "
                      )}`}</p>
                      <p>{`Habits missed: ${
                        payload[0].payload.habitsMissing.length >= 1
                          ? payload[0].payload.habitsMissing.join(", ")
                          : "None"
                      }`}</p>
                    </>
                  )}
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="yAxis"
          name="Completion Percentage"
          fill={(d) => barColor(d.yAxis)}
        >
          {dataArrayObject.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
      <div className={classes.date_selector}>
        <div className={classes.date_input_container}>
          <p>Start Date</p>
          <input
            type="date"
            onChange={dateSelectionHandler.bind(
              this,
              setEndingDate,
              "startDate"
            )}
            defaultValue={intialDateString}
            max={todayDateString}
          />
        </div>
        <div className={classes.date_input_container}>
          <p>End Date</p>
          <input
            type="date"
            onChange={dateSelectionHandler.bind(
              this,
              setStartingDate,
              "endDate"
            )}
            defaultValue={todayDateString}
            max={todayDateString}
          />
        </div>
      </div>
      {error && (
        <p>
          Please ensure that the start date is earlier than the end date, or
          vice versa. The selected date range is invalid. Please choose valid
          dates.
        </p>
      )}
    </div>
  );
};

export default BarChartRechart;
