import { useContext, useEffect, useState } from "react";
import AuthContext from "@/store/auth-context";
import classes from "./../../styles/Habits.module.scss";
import AccordionMuiHabitElemnet from "./AccordionMuiHabitElement";
import Link from "next/link";

const Habits = () => {
  const authCtx = useContext(AuthContext);
  const [registrationArray, setRegistrationArray] = useState([]);

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
    </div>
  );
};

export default Habits;
