import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";
import classes from "./../../../styles/AddHabitForm.module.scss";
import { useRouter } from "next/router";
import moment from "moment";
import HabitsContext from "@/store/habits-context";
import LoadingData from "@/components/Other/LoadingData";

const AddHabitForm = () => {
  const authCtx = useContext(AuthContext);
  const habitsCtx = useContext(HabitsContext);
  const [habitsCheckbox, setHabitsCheckbox] = useState({});
  const [submitingForm, setSubmitingForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [habitsArray, setHabitsArray] = useState([]);
  const [existingArrayDates, setExistinArraygDates] = useState();
  const [newRegistrationCreation, setNewRegistrationCreation] = useState(true);
  const [existingRegistration, setExistingRegistration] = useState({});
  const today = moment().format("YYYY-MM-DD");
  const router = useRouter();

  useEffect(() => {
    setHabitsArray(habitsCtx.habits);
    const habitsExistingDates = habitsCtx.registrations.map(
      (ele) => ele.registrationDateAsString
    );
    setExistinArraygDates(habitsExistingDates);
    let indexOfTodayRegistration;
    if (habitsExistingDates.includes(today)) {
      setNewRegistrationCreation(false);
      // If theres a registration for today assigned as existing registration when component is initialized
      indexOfTodayRegistration = habitsExistingDates.findIndex(
        (ele) => ele === today
      );
      setExistingRegistration(
        habitsCtx.registrations[indexOfTodayRegistration]
      );
    } else {
      setNewRegistrationCreation(true);
    }

    const checkboxHabitObject = {};

    habitsCtx.habits.forEach((element) => {
      checkboxHabitObject[element] = false;
    });

    setHabitsCheckbox(checkboxHabitObject);
  }, []);

  useEffect(() => {
    const newHabitCheckbox = {};

    if (date === today) {
      setHabitsArray(habitsCtx.habits);
      habitsCtx.habits.forEach((ele) => {
        if (ele in habitsCheckbox) {
          newHabitCheckbox[ele] = habitsCheckbox[ele];
        } else {
          newHabitCheckbox[ele] = false;
        }
      });

      if (existingRegistration) {
        existingRegistration?.userHabitsAchievedDayRegistration?.forEach(
          (ele) => {
            newHabitCheckbox[ele] = true;
          }
        );
      }
    }

    if (date !== today) {
      setHabitsArray(
        existingRegistration?.userHabitsGoalDayRegistration || habitsCtx.habits
      );

      // Determines if its an old existing registration or an old date for where no registration exists
      const habitsToLoop =
        existingRegistration?.userHabitsGoalDayRegistration || habitsCtx.habits;

      habitsToLoop.forEach((ele) => {
        if (ele in habitsCheckbox) {
          newHabitCheckbox[ele] = habitsCheckbox[ele];
        } else {
          newHabitCheckbox[ele] = false;
        }
      });
    }

    // Redefine habits checkbox with habits corresponding to registration

    setHabitsCheckbox(newHabitCheckbox);
  }, [existingRegistration]);

  const addNewHabitRegistration = async (date, habits) => {
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
        await habitsCtx.fetchRegistrationsFxn();
        router.back();
        setSubmitingForm(false);
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

  const modifyExistingHabitRegistration = async (habits) => {
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
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration/entry/${existingRegistration._id}`,
        objectOptions
      );

      const data = await response.json();

      if (response.status === 200) {
        await habitsCtx.fetchRegistrationsFxn();
        router.back();
        setSubmitingForm(false);
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

    // Conditionals to change checked status to know what i need to send to back
    if (habitsCheckbox[value] === false) {
      setHabitsCheckbox((prev) => {
        return { ...prev, [value]: true };
      });
    }
    if (habitsCheckbox[value] === true) {
      setHabitsCheckbox((prev) => {
        return { ...prev, [value]: false };
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const habitsToSubmit = [];

    for (let key in habitsCheckbox) {
      if (habitsCheckbox[key]) {
        habitsToSubmit.push(key);
      }
    }

    // Function called to create a post to backend
    if (newRegistrationCreation === true) {
      addNewHabitRegistration(date, habitsToSubmit);
    }

    // Function called to create a patch to backend
    if (newRegistrationCreation === false) {
      modifyExistingHabitRegistration(habitsToSubmit);
    }
  };

  const selectDateHandler = (event) => {
    const date = event.target.value;
    // Logic to determine if in the date select a new registration should be created or an old should be updated

    setDate(date);
    const newHabitCheckboxObject = {};
    if (existingArrayDates.includes(date)) {
      setNewRegistrationCreation(false);
      // Getting registration of all possible entries
      const index = existingArrayDates.findIndex((ele) => ele === date);
      const existingElement = habitsCtx.registrations[index];
      // Changing state of the component to match the registration the user requested
      setExistingRegistration(existingElement);
      setHabitsArray(existingElement.userHabitsGoalDayRegistration);
      existingElement.userHabitsGoalDayRegistration.forEach((ele) => {
        if (existingElement.userHabitsAchievedDayRegistration.includes(ele)) {
          newHabitCheckboxObject[ele] = true;
        } else {
          newHabitCheckboxObject[ele] = false;
        }
      });
    } else {
      // What to do if theres no registration for this date
      setNewRegistrationCreation(true);
      setExistingRegistration({});
      habitsArray.forEach((ele) => {
        newHabitCheckboxObject[ele] = false;
      });
    }
    // Set checkbox object that its what determines post/patch to back and if checkbox is checked
    setHabitsCheckbox(newHabitCheckboxObject);
  };

  if (habitsArray.length === 0) {
    return <LoadingData />;
  }

  return (
    <div className={classes["add-form"]}>
      <h1 className={classes["form-title"]}>Add Registration Form</h1>
      <form onSubmit={submitHandler} className={classes["add-habit-form"]}>
        <div className={classes["date-section"]}>
          <h2>Date</h2>
          <input
            type={"date"}
            value={date}
            max={today}
            className={classes["date-input"]}
            onChange={selectDateHandler}
          ></input>
        </div>
        <div className={classes["habits-section"]}>
          <h2>Habits</h2>
          {habitsArray.map((ele) => {
            return (
              <div key={ele}>
                <label className={classes["habit-placeholder"]}>{ele}</label>
                <input
                  type={"checkbox"}
                  value={ele}
                  onChange={checkedHandler}
                  className={classes["checkbox-input"]}
                  checked={habitsCheckbox[ele]}
                ></input>
              </div>
            );
          })}
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
