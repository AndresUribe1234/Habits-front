import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import classes from "./../../styles/Profile.module.scss";

const ProfileHabitElement = (props) => {
  const deleteHabitHandler = (event) => {
    const habitToDelete = event.currentTarget.dataset.habit;
    props.onDeleteHabit(habitToDelete);
  };

  return (
    <li key={props.habit}>
      <span className={classes["habit-name-placeholder"]}>{props.habit}</span>
      {props.editingProfil && (
        <button
          className={classes["delete-btn"]}
          type="button"
          onClick={deleteHabitHandler}
          data-habit={props.habit}
        >
          <DeleteRoundedIcon />
        </button>
      )}
    </li>
  );
};

export default ProfileHabitElement;
