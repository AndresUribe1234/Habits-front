import { useContext, useState, useRef } from "react";
import AuthContext from "@/store/auth-context";
import classes from "./../../styles/ProfileForm.module.scss";
import ModalMuiAddHabitSettings from "./ModalMuiAddHabitSettings";
import ProfileHabitElement from "./ProfileHabitElement";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const [editingProfil, setEditingProfile] = useState(false);
  const [habitsBackupArray, setHabitsBackupArray] = useState(
    authCtx.authObject.habits
  );
  const nameRef = useRef();

  const userName = authCtx.authObject.name;

  const habitsArray = authCtx.authObject.habits;

  const profileName = userName ? userName : "User has not entered his name";

  const editProfileHandler = () => {
    setEditingProfile((prev) => !prev);
    setHabitsBackupArray(habitsArray);
  };

  const cancelFormHandler = () => {
    setEditingProfile((prev) => !prev);
    authCtx.habitsFnx(habitsBackupArray);
  };

  const addHabitHandler = (newHabbit) => {
    authCtx.habitsFnx([...habitsArray, newHabbit]);
  };

  const deleteHabitHandler = (habit) => {
    const newHabitsArray = habitsArray.filter((ele) => ele !== habit);
    authCtx.habitsFnx(newHabitsArray);
  };

  const updateUserData = async (userName, habitsArray) => {
    try {
      const objectOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
        body: JSON.stringify({ name: userName, habits: habitsArray }),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/profile/${authCtx.authObject.user}`,
        objectOptions
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const nameEntered = nameRef.current.value;
    authCtx.nameFnx(nameEntered);
    setEditingProfile(false);
    updateUserData(nameEntered, authCtx.authObject.habits);
  };

  return (
    <form className={classes["profile-container"]} onSubmit={formSubmitHandler}>
      <div className={classes["name-container"]}>
        <h3 className={classes["field-placeholder"]}>Name</h3>
        {!editingProfil ? (
          <p>{profileName}</p>
        ) : (
          <input ref={nameRef} defaultValue={userName}></input>
        )}
      </div>
      <div className={classes["habits-container"]}>
        <ul>
          <h3 className={classes["field-placeholder"]}>Habits</h3>
          {habitsArray.map((ele) => (
            <ProfileHabitElement
              habit={ele}
              editingProfil={editingProfil}
              onDeleteHabit={deleteHabitHandler}
              key={ele}
            />
          ))}
          {editingProfil && (
            <ModalMuiAddHabitSettings
              onAddHabit={addHabitHandler}
              data={habitsArray}
            />
          )}
        </ul>
      </div>
      <div className={classes["btn-container"]}>
        {editingProfil && <button type="submit">Submit</button>}
        {editingProfil && (
          <button type="button" onClick={cancelFormHandler}>
            Cancel
          </button>
        )}
        {!editingProfil && (
          <button type="button" onClick={editProfileHandler}>
            Edit
          </button>
        )}
      </div>
    </form>
  );
};
export default ProfileForm;
