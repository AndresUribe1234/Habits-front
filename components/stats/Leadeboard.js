import TableLeaderboard from "./TabletLeaderboard";
import classes from "./../../styles/Leaderboard.module.scss";
import { useEffect, useState, Fragment, useContext } from "react";
import ErrorMessage from "../Other/ErrorMessage";
import LoadingData from "../Other/LoadingData";
import AuthContext from "@/store/auth-context";

const Leaderboard = () => {
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tableData, setTableData] = useState([]);

  const authCtx = useContext(AuthContext);

  const fetchLeaderboardsInformation = async function () {
    try {
      const objectOptions = {
        headers: {
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/get-leaderboards`,
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

      setTableData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeaderboardsInformation();
  }, []);

  return (
    <Fragment>
      {!fetchingData && !error && (
        <div className={classes["leaderboard-container"]}>
          <h1 className={classes["page-title"]}>Leaderboards</h1>
          <div className={classes["table-container"]}>
            <TableLeaderboard
              table={"Current streak"}
              dataObj={{
                data: tableData.currentStreakTop10,
                numberUsers: tableData.numUsers,
                ranking: tableData.rankigCurrent,
                user: tableData.user,
                streak: tableData.user.currentStreak,
                strDateBeg: tableData.user.currentStreakBegString,
                strDateEnd: tableData.user.currenttStreakEndString,
              }}
            />
          </div>
          <div className={classes["table-container"]}>
            <TableLeaderboard
              table={"Longest streak"}
              dataObj={{
                data: tableData.longestStreakTop10,
                numberUsers: tableData.numUsers,
                ranking: tableData.rankigLongest,
                user: tableData.user,
                streak: tableData.user.longestStreak,
                strDateBeg: tableData.user.longestStreakBegString,
                strDateEnd: tableData.user.longestStreakEndString,
              }}
            />
          </div>
        </div>
      )}
      {fetchingData && <LoadingData />}
      {error && <ErrorMessage error={errorMessage} />}
    </Fragment>
  );
};

export default Leaderboard;
