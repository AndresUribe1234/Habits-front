import { useContext, useState, useRef } from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";
import classes from "./../styles/Profile.module.scss";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModalMuiAddHabitSettings from "./../components/habits/ModalMuiAddHabitSettings";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [editingProfil, setEditingProfile] = useState(false);
  const [habitsArrayForm, setHabitsArrayForm] = useState([
    ...authCtx.authObject.habits,
  ]);
  const nameRef = useRef();

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
    setHabitsArrayForm([...authCtx.authObject.habits]);
  };

  const addHabitHandler = (newHabbit) => {
    setHabitsArrayForm((prev) => [...prev, newHabbit]);
  };

  const deleteHabitHandler = (event) => {
    const habitToDelete = event.currentTarget.dataset.habit;
    const newHabitsArray = habitsArrayForm.filter(
      (ele) => ele !== habitToDelete
    );
    setHabitsArrayForm([...newHabitsArray]);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const nameEntered = nameRef.current.value;
    authCtx.nameFnx(nameEntered);
    authCtx.habitsFnx([...habitsArrayForm]);
    setEditingProfile(false);
    console.log("form sent");
  };

  return (
    <form className={classes["profile-container"]} onSubmit={formSubmitHandler}>
      <div className={classes["name-container"]}>
        <span>Name</span>
        {!editingProfil ? (
          <p>
            {authCtx.authObject.name
              ? authCtx.authObject.name
              : "User has not entered his name"}
          </p>
        ) : (
          <input ref={nameRef} defaultValue={authCtx.authObject.name}></input>
        )}
      </div>
      <div className={classes["habits-container"]}>
        <ul>
          <span>Habits</span>
          {habitsArrayForm.map((ele) => (
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
                data={habitsArrayForm}
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
