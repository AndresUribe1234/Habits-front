import { useRouter } from "next/router";
import classes from "./../../../styles/ModifyHabitsForm.module.scss";
import { useState, useContext } from "react";
import AuthContext from "@/store/auth-context";

const ModifyHabitsForm = (props) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [submitingForm, setSubmitingForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

      setError(false);
      setSubmitingForm(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration/entry/${props.id}`,
        objectOptions
      );

      const data = await response.json();

      if (response.status === 200) {
        setSubmitingForm(false);
        router.back();
      }
      if (response.status !== 200) {
        setSubmitingForm(false);
        setError(true);
        setErrorMessage(data.err);
      }
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

    const habitsToSubmit = Object.keys(habitsCheckbox).filter(
      (ele) => habitsCheckbox[ele] % 2 !== 0
    );

    updatingHabit(habitsToSubmit);
  };

  return (
    <div className={classes["modify-form"]}>
      <h1 className={classes["form-title"]}>Edit Registration Form</h1>
      <form className={classes["add-habit-form"]} onSubmit={submitHandler}>
        <h2
          className={classes["date-placeholder"]}
        >{`Habit Activity - ${dateString}`}</h2>
        <div className={classes["habits-section"]}>
          <h2>Habits</h2>
          {habits.map((ele) => (
            <div key={ele}>
              <label className={classes["habit-placeholder"]}>{ele}</label>
              <input
                type={"checkbox"}
                defaultChecked={habitsAchieved.includes(ele) ? ele : ""}
                value={ele}
                onChange={checkedHandler}
                className={classes["checkbox-input"]}
              ></input>
            </div>
          ))}
        </div>
        {submitingForm && (
          <p className={classes.submitting}>Form submiting...</p>
        )}
        {!submitingForm && error && (
          <p className={classes["err-message"]}>{`Error: ${errorMessage}`}</p>
        )}
        <div className={classes["btn-container"]}>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => router.back()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default ModifyHabitsForm;
