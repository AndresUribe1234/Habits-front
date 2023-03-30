import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import classes from "./../../styles/ProfileHabitElement.module.scss";

const ProfileHabitElement = (props) => {
  const deleteHabitHandler = (event) => {
    const habitToDelete = event.currentTarget.dataset.habit;
    props.onDeleteHabit(habitToDelete);
  };

  return (
    <li key={props.habit} className={classes["habit-container"]}>
      <span className={classes["habit-name-placeholder"]}>{props.habit}</span>
      {props.editingProfil && (
        <button
          type="button"
          onClick={deleteHabitHandler}
          data-habit={props.habit}
          className={classes["delete-btn"]}
        >
          <DeleteRoundedIcon />
        </button>
      )}
    </li>
  );
};

export default ProfileHabitElement;
