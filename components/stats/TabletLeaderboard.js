import classes from "./../../styles/TableLeaderboard.module.scss";

const TableLeaderboard = (props) => {
  console.log(props);
  const table = props.table;
  const dataObject = props.dataObj;
  const streak = dataObject.streak;
  const dateBeg = dataObject.strDateBeg;
  const dateEnd = dataObject.strDateEnd;
  const data = dataObject.data;

  const fractionRanking = `${dataObject.ranking}/${dataObject.numberUsers}`;
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
            <td colSpan={"2"}>{fractionRanking}</td>
            <td>{streak}</td>
            <td>{dateBeg}</td>
            <td>{dateEnd}</td>
          </tr>
          <tr className={classes["sub-table-header"]}>
            <td>Rank</td>
            <td>Name</td>
            <td>{table}</td>
            <td>Starting Date</td>
            <td>Ending Date</td>
          </tr>
          {data.map((ele, index) => {
            return (
              <tr
                key={index}
                className={index % 2 === 1 ? classes["odd-row"] : ""}
              >
                <td>{ele.ranking}</td>
                <td>{ele.name}</td>
                <td>
                  {table === "Current streak"
                    ? ele.currentStreak
                    : ele.longestStreak}
                </td>
                <td>{ele.streakBegString}</td>
                <td>{ele.streakEndString}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableLeaderboard;
