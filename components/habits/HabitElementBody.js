import classes from "./../../styles/HabitElementBody.module.scss";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";

const HabitElementBody = (props) => {
  const authCtx = useContext(AuthContext);
  const { information } = props;
  const completionRender =
    String(information.completionPercentage * 100).substring(0, 5) + "%";
  const numAllHabits = information.habitsGoal.length;
  const numHabitsDone = information.habitsAchieved.length;
  let habitsMissing = [];
  information.habitsGoal.forEach((ele) => {
    if (!information.habitsAchieved.includes(ele)) {
      habitsMissing.push(ele);
    }
  });
  return (
    <div className={classes["information-container"]}>
      <div className={classes["info-section"]}>
        <p className={classes["left-section"]}>Completion percentage</p>
        <p className={classes["right-section"]}>{completionRender}</p>
      </div>
      <div className={classes["info-section"]}>
        <p className={classes["left-section"]}>Habits</p>
        <p
          className={classes["right-section"]}
        >{`${numHabitsDone}/${numAllHabits}`}</p>
      </div>
      <div className={classes["info-section"]}>
        <ul className={classes["habit-section"]}>
          <p className={classes["left-section"]}>Habits done</p>
          <div className={classes["right-section"]}>
            {information.habitsAchieved.length < 1 ? (
              <p>None</p>
            ) : (
              information.habitsAchieved.map((ele, index) => (
                <li className={classes.habit} key={index}>
                  {ele}
                </li>
              ))
            )}
          </div>
        </ul>
      </div>
      <div className={classes["info-section"]}>
        <ul className={classes["habit-section"]}>
          <p className={classes["left-section"]}>Habits missing</p>
          <div className={classes["right-section"]}>
            {habitsMissing.length < 1 ? (
              <p>None</p>
            ) : (
              habitsMissing.map((ele, index) => (
                <li className={classes.habit} key={index}>
                  {ele}
                </li>
              ))
            )}
          </div>
        </ul>
      </div>
      <div className={classes["info-section"]}>
        <p className={classes["left-section"]}>Current streak</p>
        <p className={classes["right-section"]}>{information.currentStreak}</p>
      </div>
      {authCtx.authObject.user === information.email && (
        <div className={classes["edit-container"]}>
          <Link href={`/registration-habit/${information.id}`}>Edit</Link>
        </div>
      )}
    </div>
  );
};

export default HabitElementBody;
