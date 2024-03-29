import classes from "./../../styles/LoadingData.module.scss";

const LoadingData = () => {
  return (
    <div className={classes["loading-container"]}>
      <div className={classes.spinner}></div>
      <p>Loading data...</p>
    </div>
  );
};

export default LoadingData;
