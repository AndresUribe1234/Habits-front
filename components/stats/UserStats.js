import classes from "./../../styles/UserStats.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import moment from "moment";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const UserStats = (props) => {
  const [currentDatesVisibility, setCurrentDatesVisibility] = useState(false);
  const [longestDatesVisibility, setLongestDatesVisibility] = useState(false);
  const data = props.data;

  const showCurrentHandler = () => {
    setCurrentDatesVisibility((prev) => !prev);
  };

  const showLongestHandler = () => {
    setLongestDatesVisibility((prev) => !prev);
  };

  return (
    <div className={classes["user-stats-container"]}>
      <div className={classes["user-profile-icon"]}>
        <AccountCircleIcon />
      </div>
      <div className={classes["stats-container"]}>
        <div className={classes["streak-container"]}>
          <p>Current streak</p>
          <div className={classes["data-placeholder-container"]}>
            <div
              className={classes["accordion-header"]}
              onClick={showCurrentHandler}
            >
              <p>{data.currentStreak} days</p>
              {currentDatesVisibility ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <div
              className={[
                classes["hidden-content"],
                currentDatesVisibility ? classes["show"] : "",
              ].join(" ")}
            >
              <p>
                {`Began: ${moment
                  .utc(data.dateBeginningCurrentStreak)
                  .format("MMM DD, YYYY")}`}
              </p>
              <p>
                {`Ended: ${moment
                  .utc(data.dateEndCurrentStreak)
                  .format("MMM DD, YYYY")}`}
              </p>
            </div>
          </div>
        </div>
        {data.longestStreak ? (
          <div className={classes["streak-container"]}>
            <p>Longest streak</p>
            <div className={classes["data-placeholder-container"]}>
              <div
                className={classes["accordion-header"]}
                onClick={showLongestHandler}
              >
                <p>{data.longestStreak} days</p>
                {longestDatesVisibility ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </div>
              <div
                className={[
                  classes["hidden-content"],
                  longestDatesVisibility ? classes["show"] : "",
                ].join(" ")}
              >
                <p>
                  {`Began: ${moment
                    .utc(data.dateBeginningLongestStreak)
                    .format("MMM DD, YYYY")}`}
                </p>
                <p>
                  {`Ended: ${moment
                    .utc(data.dateEndLongestStreak)
                    .format("MMM DD, YYYY")}`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserStats;
