import { useContext, useEffect, useState } from "react";
import AuthContext from "@/store/auth-context";
import classes from "./../../../styles/HabitsProfile.module.scss";
import Link from "next/link";
import LoadingData from "./../../Other/LoadingData";
import ErrorMessage from "./../../Other/ErrorMessage";
import Calendar from "./../../graphics/Calendar";
import UserStats from "./../../stats/UserStats";
import BarChart from "./../../graphics/RechartsBarChart";
import ProgressBar from "@/components/graphics/ProgressBar";

const HaitsProfile = () => {
  const authCtx = useContext(AuthContext);
  const [registrationArray, setRegistrationArray] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({});

  const fetchAllRegistration = async function () {
    try {
      const objectOptions = {
        headers: {
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration/single-user/`,
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

  const fetchUser = async function () {
    try {
      const objectOptions = {
        headers: {
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/profile/${authCtx.authObject.user}`,
        objectOptions
      );

      const data = await response.json();

      if (response.status === 200) {
        setUserData(data.data.user);
      }

      if (response.status !== 200) {
        setErrorMessage(data.err);
        setError(true);
        setFetchingData(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllRegistration();
    fetchUser();
  }, []);

  return (
    <div className={classes["myprogress-container"]}>
      {!fetchingData && !error && (
        <>
          <section>
            <h1>Stats</h1>
            <UserStats data={userData} />
          </section>
          <section>
            <h1>Daily Completion Progress</h1>
            <ProgressBar value={60} data={registrationArray[0]} />
          </section>
          <section>
            <Calendar data={registrationArray} />
          </section>
          <section>
            <BarChart data={registrationArray} />
          </section>
          <button>
            <Link
              href={"/registration-habit?from=myprogress"}
              className={classes["btn-link"]}
            >
              Add habits activity
            </Link>
          </button>
        </>
      )}
      {fetchingData && <LoadingData />}
      {error && <ErrorMessage error={errorMessage} />}
    </div>
  );
};

export default HaitsProfile;
