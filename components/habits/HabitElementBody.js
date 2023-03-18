import classes from "./../../styles/HabitElementBody.module.scss";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";

const HabitElementBody = (props) => {
  const authCtx = useContext(AuthContext);
  const { completion, allHabits, habitsDone } = props.habitInformation;
  const completionRender = String(completion * 100).substring(0, 5) + "%";
  const numAllHabits = allHabits.length;
  const numHabitsDone = habitsDone.length;
  let habitsMissing = [];
  allHabits.forEach((ele) => {
    if (!habitsDone.includes(ele)) {
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
        <ul className={classes["left-section"]}>
          <span className={classes["habit-tag"]}>Habits done</span>
          {habitsDone.map((ele) => (
            <li className={classes.habit} key={Math.random()}>
              {ele}
            </li>
          ))}
        </ul>
        <ul className={classes["right-section"]}>
          <span className={classes["habit-tag"]}>Habits missing</span>
          {habitsMissing.map((ele) => (
            <li className={classes.habit} key={Math.random()}>
              {ele}
            </li>
          ))}
        </ul>
      </div>
      <div className={classes["info-section"]}>
        <p className={classes["left-section"]}>Current streak</p>
        <p className={classes["right-section"]}>{props.streak}</p>
      </div>
      {authCtx.authObject.user === props.email && (
        <div>
          <Link href={`/registration-habit/${props.id}`}>Edit</Link>
        </div>
      )}
    </div>
  );
};

export default HabitElementBody;
