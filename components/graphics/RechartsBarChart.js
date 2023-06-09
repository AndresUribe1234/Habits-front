import React, { useEffect, useState } from "react";
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
const momentRange = require("moment-range");
momentRange.extendMoment(moment);

const BarChartRechart = (props) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const { data } = props;

  const arrayUTCSecData = data.map((ele) =>
    new Date(ele.registrationFinalDate).getTime()
  );

  const startingDate = moment.utc().tz("America/Bogota");
  const endingDate = startingDate.clone().subtract(30, "d");
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

  return (
    <BarChart
      width={windowSize.width < 500 ? windowSize.width - 30 : 500}
      height={windowSize.height < 950 ? windowSize.height / 3 : 400}
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
  );
};

export default BarChartRechart;
