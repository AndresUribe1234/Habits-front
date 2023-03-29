import classes from "./../../styles/TableLeaderboard.module.scss";

const TableLeaderboard = (props) => {
  const table = props.table;
  return (
    <div className={classes["table-container"]}>
      <table className={classes["app-table"]}>
        <thead>
          <tr>
            <th colSpan={"2"}>My current place</th>
            <th>{table}</th>
            <th>Starting Date</th>
            <th>Ending Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={"2"}>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr className={classes["sub-table-header"]}>
            <td>Rank</td>
            <td>Name</td>
            <td>{table}</td>
            <td>Starting Date</td>
            <td>Ending Date</td>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableLeaderboard;
