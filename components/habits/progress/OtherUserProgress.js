import { useRouter } from "next/router";
import classes from "./../../../styles/OtherUserProgress.module.scss";
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/store/auth-context";
import LoadingData from "@/components/Other/LoadingData";
import UserStats from "@/components/stats/UserStats";
import Calendar from "@/components/graphics/Calendar";
import BarChartRechart from "@/components/graphics/RechartsBarChart";
import ErrorMessage from "@/components/Other/ErrorMessage";

const OtherUserProgress = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const [registrationArray, setRegistrationArray] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(router.query.userId);

  useEffect(() => {
    setUserId(router.query.userId);

    if (userId) {
      fetchAllRegistration();
      fetchUser();
    }
  }, [router, userId]);

  const backHandler = () => {
    router.back();
  };

  const fetchAllRegistration = async function () {
    try {
      const objectOptions = {
        headers: {
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration/single-user/${userId}`,
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
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/profile/id/${userId}`,
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

  return (
    <div className={classes["user-progess-container"]}>
      {!fetchingData && !error && (
        <h1 className={classes["user-name"]}>{`${userData.name} progress`}</h1>
      )}
      {!fetchingData && !error && (
        <section>
          <h1>Stats</h1>
          <UserStats data={userData} />
        </section>
      )}
      {!fetchingData && !error && (
        <section>
          <h1>Habits Calendar</h1>
          <Calendar data={registrationArray} />
        </section>
      )}
      {!fetchingData && !error && (
        <section className={classes["graph-section"]}>
          <h1>Last 30 days completion percentage progress</h1>
          <BarChartRechart data={registrationArray} />
        </section>
      )}
      {!fetchingData && (
        <button onClick={backHandler} className={classes["back-btn"]}>
          Back to login page
        </button>
      )}
      {fetchingData && <LoadingData />}
      {error && <ErrorMessage error={errorMessage} />}
    </div>
  );
};

export default OtherUserProgress;
