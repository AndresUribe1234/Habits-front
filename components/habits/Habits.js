import { useContext, useEffect, useState } from "react";
import AuthContext from "@/store/auth-context";
import classes from "./../../styles/Habits.module.scss";
import AccordionMuiHabitElemnet from "./AccordionMuiHabitElement";
import Link from "next/link";
import LoadingData from "../Other/LoadingData";
import ErrorMessage from "../Other/ErrorMessage";

const Habits = () => {
  const authCtx = useContext(AuthContext);
  const [registrationArray, setRegistrationArray] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAllRegistration = async function () {
    try {
      const objectOptions = {
        headers: {
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration`,
        objectOptions
      );

      const data = await response.json();

      if (response.status === 200) {
        setFetchingData(false);
      }

      if (response.status !== 200) {
        setErrorMessage(data.err);
        setError(true);
        setFetchingData(false);
      }

      setRegistrationArray(data.data.entries);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllRegistration();
  }, []);

  return (
    <div className={classes["feed-container"]}>
      <button>
        <Link href={"/registration-habit"} className={classes["btn-link"]}>
          Add habits activity
        </Link>
      </button>
      {fetchingData && <LoadingData />}
      {error && <ErrorMessage error={errorMessage} />}
      {!fetchingData && !error && (
        <ul>
          {registrationArray.map((ele) => (
            <AccordionMuiHabitElemnet
              habit={ele.user.name}
              date={ele.registrationFinalDate}
              status={ele.completionStatus}
              key={Math.random()}
              habitInformation={{
                completion: ele.completionPercentage,
                allHabits: ele.userHabitsGoalDayRegistration,
                habitsDone: ele.userHabitsAchievedDayRegistration,
              }}
              id={ele._id}
              email={ele.user.email}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Habits;
