import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import classes from "./../../styles/ProfileForm.module.scss";
import ModalMuiAddHabitSettings from "./ModalMuiAddHabitSettings";
import ProfileHabitElement from "./ProfileHabitElement";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const [editingProfil, setEditingProfile] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [habitsBackupArray, setHabitsBackupArray] = useState(
    authCtx.authObject.habits
  );
  const [uniqueHabits, setUniqueHabits] = useState([]);
  const nameRef = useRef();

  const userName = authCtx.authObject.name;

  const habitsArray = authCtx.authObject.habits;

  const profileName = userName ? userName : "User has not entered his name";

  useEffect(() => {
    getUniqueHabits();
  }, []);

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

      if (response.status === 200) {
        setEditingProfile(false);
        setError(false);
      }
      if (response.status !== 200) {
        setError(true);
        setErrorMessage(data.err);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUniqueHabits = async (userName, habitsArray) => {
    try {
      const objectOptions = {
        headers: {
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration/unique-habits`,
        objectOptions
      );
      const data = await response.json();

      if (response.status === 200) {
        setUniqueHabits(data.data.uniqueHabits);
      }
      if (response.status !== 200) {
        console.log(data.err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const nameEntered = nameRef.current.value;
    authCtx.nameFnx(nameEntered);

    updateUserData(nameEntered, authCtx.authObject.habits);
  };

  return (
    <div className={classes["profile-container"]}>
      <h1>My Profile</h1>
      <form onSubmit={formSubmitHandler}>
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
                suggestions={uniqueHabits}
              />
            )}
          </ul>
        </div>
        {error && (
          <p className={classes["err-message"]}>{`Error: ${errorMessage}`}</p>
        )}
        <div className={classes["btn-container"]}>
          {editingProfil && <button type="submit">Submit</button>}
          {editingProfil && (
            <button type="button" onClick={cancelFormHandler}>
              Cancel
            </button>
          )}
          {!editingProfil && (
            <button type="button" onClick={editProfileHandler}>
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default ProfileForm;
