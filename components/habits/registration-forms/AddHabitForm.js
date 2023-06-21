import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";
import classes from "./../../../styles/AddHabitForm.module.scss";
import { useRouter } from "next/router";
import moment from "moment";
import HabitsContext from "@/store/habits-context";

const AddHabitForm = () => {
  const authCtx = useContext(AuthContext);
  const [habitsCheckbox, setHabitsCheckbox] = useState({});
  const [submitingForm, setSubmitingForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const dateRef = useRef();
  const router = useRouter();

  const today = moment().format("YYYY-MM-DD");
  const habitsCtx = useContext(HabitsContext);
  const habits = habitsCtx.habits;
  const [existingDates, setExistingDates] = useState();

  useEffect(() => {
    const habitsExistingDates = habitsCtx.registrations.map(
      (ele) => ele.registrationDateAsString
    );
    console.log(habitsExistingDates);
    setExistingDates(habitsExistingDates);
  }, []);

  console.log(habitsCtx);

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

  const selectDateHandler = (event) => {
    const date = event.target.value;
    console.log("date", date);
    setDate(date);
    if (existingDates.includes(date)) {
      console.log("checkpoint ready");
    } else {
      console.log("no date for this date");
    }
  };

  return (
    <div className={classes["add-form"]}>
      <h1 className={classes["form-title"]}>Add Registration Form</h1>
      <form onSubmit={submitHandler} className={classes["add-habit-form"]}>
        <div className={classes["date-section"]}>
          <h2>Date</h2>
          <input
            type={"date"}
            defaultValue={today}
            value={date}
            max={today}
            className={classes["date-input"]}
            ref={dateRef}
            onChange={selectDateHandler}
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
