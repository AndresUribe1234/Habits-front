import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";
import classes from "./../../styles/AddHabitForm.module.scss";
import { useRouter } from "next/router";

const AddHabitForm = () => {
  const authCtx = useContext(AuthContext);
  const [habitsCheckbox, setHabitsCheckbox] = useState({});
  const dateRef = useRef();
  const router = useRouter();
  const [resquestError, setResquestError] = useState(undefined);

  useEffect(() => {
    console.log("request error", resquestError);
    console.log("request error condition", resquestError === false);
    if (resquestError === false) {
      router.push("/feed");
    }
  }, [resquestError]);

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration/single-user/`,
        objectOptions
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 400) {
        throw new Error(data.err);
      }
      setResquestError(false);
      console.log(data);
    } catch (err) {
      console.log(err.message);
      setResquestError(true);
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
    <form onSubmit={submitHandler} className={classes["add-habit-form"]}>
      <div className={classes["date-section"]}>
        <label>Date</label>
        <input
          type={"date"}
          defaultValue={`${year}-${month}-${day}`}
          max={`${year}-${month}-${day}`}
          className={classes["date-input"]}
          ref={dateRef}
        ></input>
      </div>
      <div className={classes["habits-section"]}>
        <p>Habits</p>
        {habits.map((ele) => (
          <div key={ele}>
            <label className={classes["habit-placeholder"]}>{ele}</label>
            <input
              type={"checkbox"}
              value={ele}
              onChange={checkedHandler}
            ></input>
          </div>
        ))}
      </div>
      <div className={classes["btn-container"]}>
        <button type={"submit"}>Submit</button>
        <button type={"button"}>
          <Link href={"/feed"}>Cancel</Link>
        </button>
      </div>
    </form>
  );
};

export default AddHabitForm;