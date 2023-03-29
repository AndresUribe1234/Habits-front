import { useContext, useEffect, useState } from "react";
import AuthContext from "@/store/auth-context";
import classes from "./../../styles/HabitsFeed.module.scss";
import Link from "next/link";
import LoadingData from "../Other/LoadingData";
import ErrorMessage from "../Other/ErrorMessage";
import AccordionHabit from "./AccordionHabit";
import HabitElementBody from "./HabitElementBody";
import moment from "moment";
import tz from "moment-timezone";

const HabitsFeed = () => {
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
      {!fetchingData && !error && (
        <h1 style={{ marginTop: "20px" }}>Add a registration</h1>
      )}
      {!fetchingData && !error && (
        <button>
          <Link
            href={"/registration-habit?from=feed"}
            className={classes["btn-link"]}
          >
            Add habits activity
          </Link>
        </button>
      )}
      {fetchingData && <LoadingData />}
      {error && <ErrorMessage error={errorMessage} />}
      {!fetchingData && !error && <h1>Users habits registrations</h1>}
      {!fetchingData && !error && (
        <ul>
          {registrationArray.map((ele, index) => {
            const date = moment
              .utc(ele.registrationFinalDate)
              .format("YYYY-MM-DD");

            const headerObj = {
              title: ele.user.name,
              date: date,
              status: ele.completionStatus,
              statusClass: ele.completionStatus
                .toLowerCase()
                .split(" ")
                .join(""),
            };

            const bodyObj = {
              id: ele._id,
              email: ele.user.email,
              completionPercentage: ele.completionPercentage,
              habitsGoal: ele.userHabitsGoalDayRegistration,
              habitsAchieved: ele.userHabitsAchievedDayRegistration,
              currentStreak: ele.currentStreak,
            };

            return (
              <AccordionHabit header={headerObj} key={index}>
                <HabitElementBody information={bodyObj} />
              </AccordionHabit>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HabitsFeed;
