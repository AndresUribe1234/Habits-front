import TableLeaderboard from "./TabletLeaderboard";
import classes from "./../../styles/Leaderboard.module.scss";

const Leaderboard = () => {
  return (
    <div className={classes["leaderboard-container"]}>
      <h1>Leaderboards</h1>
      <h1>Current streak</h1>
      <TableLeaderboard table={"Current streak"} />
      <h1>Longest streak</h1>
      <TableLeaderboard table={"Longest streak"} />
    </div>
  );
};

export default Leaderboard;
