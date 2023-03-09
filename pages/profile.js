import { useContext, useState, useRef } from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";
import classes from "./../styles/Profile.module.scss";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModalMuiAddHabitSettings from "./../components/habits/ModalMuiAddHabitSettings";

const DUMMY_HABITS = ["run", "read", "study"];
const DUMMY_NAME = "Mariana";

const Profile = () => {
  const [editingProfil, setEditingProfile] = useState(false);
  const [habits, setHabits] = useState(DUMMY_HABITS);
  const [name, setName] = useState(DUMMY_NAME);
  const nameRef = useRef();

  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return (
      <h1>
        Please <Link href={"/login"}>Log in</Link> in order to have acces to the
        app content
      </h1>
    );
  }

  const editProfileHandler = () => {
    setEditingProfile((prev) => !prev);
  };

  const addHabitHandler = (newHabbit) => {
    setHabits((prev) => [...prev, newHabbit]);
  };

  const deleteHabitHandler = (event) => {
    const habitToDelete = event.currentTarget.dataset.habit;
    const newHabitsArray = habits.filter((ele) => ele !== habitToDelete);
    setHabits([...newHabitsArray]);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const nameEntered = nameRef.current.value;
    setName(nameEntered);
    setEditingProfile(false);
    console.log("form sent");
    console.log(habits, nameEntered);
  };

  return (
    <form className={classes["profile-container"]} onSubmit={formSubmitHandler}>
      <div className={classes["name-container"]}>
        <span>Name</span>
        {!editingProfil ? (
          <p>{name}</p>
        ) : (
          <input ref={nameRef} defaultValue={name}></input>
        )}
      </div>
      <div className={classes["habits-container"]}>
        <ul>
          <span>Habits</span>
          {habits.map((ele) => (
            <li key={ele}>
              <span className={classes["habit-name-placeholder"]}>{ele}</span>
              {editingProfil && (
                <button
                  className={classes["delete-btn"]}
                  type="button"
                  onClick={deleteHabitHandler}
                  data-habit={ele}
                >
                  <DeleteRoundedIcon />
                </button>
              )}
            </li>
          ))}
          <div className={classes["btn-container"]}>
            {editingProfil && (
              <ModalMuiAddHabitSettings
                onAddHabit={addHabitHandler}
                data={habits}
              />
            )}
          </div>
        </ul>
      </div>
      <div className={classes["btn-container"]}>
        {editingProfil && <button type="submit">Submit</button>}
        <button type="button" onClick={editProfileHandler}>
          {!editingProfil ? "Edit" : "Cancel"}
        </button>
      </div>
    </form>
  );
};

export default Profile;
