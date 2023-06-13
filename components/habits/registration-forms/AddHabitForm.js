import { useContext, useState, useRef } from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";
import classes from "./../../../styles/AddHabitForm.module.scss";
import { useRouter } from "next/router";

const AddHabitForm = () => {
  const authCtx = useContext(AuthContext);
  const [habitsCheckbox, setHabitsCheckbox] = useState({});
  const [submitingForm, setSubmitingForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dateRef = useRef();
  const router = useRouter();

  let date = new Date(Date.now());
  date = date.toLocaleString("en-GB");
  const year = date.substring(6, 10);
  const month = date.substring(3, 5);
  const day = date.substring(0, 2);

  const habits = authCtx.authObject.habits;

  const registerHabit = async (date, habits) => {
    try {
      const objectOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
        body: JSON.stringify({ habits: habits, registrationFinalDate: date }),
      };
      setError(false);
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration/single-user/`,
        objectOptions
      );
      const data = await response.json();

      if (response.status === 200) {
        setSubmitingForm(false);
        router.push(`/${router.query.from}`);
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
    const enteredDate = dateRef.current.value;
    const habitsToSubmit = Object.keys(habitsCheckbox).filter(
      (ele) => habitsCheckbox[ele] % 2 !== 0
    );
    registerHabit(enteredDate, habitsToSubmit);
  };

  return (
    <div className={classes["add-form"]}>
      <h1 className={classes["form-title"]}>Add Registration Form</h1>
      <form onSubmit={submitHandler} className={classes["add-habit-form"]}>
        <div className={classes["date-section"]}>
          <h2>Date</h2>
          <input
            type={"date"}
            defaultValue={`${year}-${month}-${day}`}
            max={`${year}-${month}-${day}`}
            className={classes["date-input"]}
            ref={dateRef}
          ></input>
        </div>
        <div className={classes["habits-section"]}>
          <h2>Habits</h2>
          {habits.map((ele) => (
            <div key={ele}>
              <label className={classes["habit-placeholder"]}>{ele}</label>
              <input
                type={"checkbox"}
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
          <button type={"submit"}>Submit</button>
          <button type={"button"}>
            <Link href={`/${router.query.from}`}>Cancel</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabitForm;
