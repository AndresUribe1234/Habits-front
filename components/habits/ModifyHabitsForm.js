import { useRouter } from "next/router";
import classes from "./../../styles/ModifyHabitsForm.module.scss";
import { useState, useContext } from "react";
import AuthContext from "@/store/auth-context";

const ModifyHabitsForm = (props) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const { data } = props;
  const habitsAchieved = data.userHabitsAchievedDayRegistration;
  const [habitsCheckbox, setHabitsCheckbox] = useState(
    Object.assign({}, ...habitsAchieved.map((key) => ({ [key]: 1 })))
  );

  const dateString = data.registrationFinalDate.substring(0, 10);

  const habits = data.userHabitsGoalDayRegistration;

  const updatingHabit = async (habits) => {
    try {
      const objectOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
        body: JSON.stringify({ habits: habits }),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration/entry/${props.id}`,
        objectOptions
      );

      const data = await response.json();

      if (response.status === 400) {
        throw new Error(data.err);
      }
      router.push("/feed");
    } catch (err) {
      console.log(err.message);
    }
  };

  const checkedHandler = (event) => {
    const value = event.target.value;
    setHabitsCheckbox((prev) => {
      return {
        ...prev,
        [value]: habitsCheckbox[value] ? habitsCheckbox[value] + 1 : 1,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("hello world");

    const habitsToSubmit = Object.keys(habitsCheckbox).filter(
      (ele) => habitsCheckbox[ele] % 2 !== 0
    );
    console.log(habitsToSubmit);
    updatingHabit(habitsToSubmit);
  };

  return (
    <form className={classes["add-habit-form"]} onSubmit={submitHandler}>
      <p>{`Habit Activity - ${dateString}`}</p>
      <div className={classes["habits-section"]}>
        <p>Habits</p>
        {habits.map((ele) => (
          <div key={ele}>
            <label className={classes["habit-placeholder"]}>{ele}</label>
            <input
              type={"checkbox"}
              defaultChecked={habitsAchieved.includes(ele) ? ele : ""}
              value={ele}
              onChange={checkedHandler}
            ></input>
          </div>
        ))}
      </div>
      <div className={classes["btn-container"]}>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default ModifyHabitsForm;
