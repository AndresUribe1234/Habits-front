import { createContext, useState, useEffect, useContext } from "react";

const HabitsContext = createContext({
  userHabits: [],
  fetchHabitsFxn: function () {},
  userRegistrations: [],
  fetchRegistrationsFxn: function () {},
});

import AuthContext from "./auth-context";

export function HabitsContextProvider(props) {
  const [habits, setHabits] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.authObject.isLogIn === true) {
      fetchRegistrations();
      fetchHabits();
    }
  }, [authCtx.authObject.isLogIn]);

  async function fetchHabits() {
    try {
      const objectOptions = {
        headers: {
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/profile/${authCtx.authObject.user}`,
        objectOptions
      );

      const data = await response.json();

      if (response.status === 200) {
        setHabits(data.data.user.habits);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function fetchRegistrations() {
    try {
      const objectOptions = {
        headers: {
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration/single-user/`,
        objectOptions
      );

      const data = await response.json();

      if (response.status === 200) {
        setRegistrations(data.data.entries);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const context = {
    habits,
    registrations,
    fetchHabitsFxn: fetchHabits,
    fetchRegistrationsFxn: fetchRegistrations,
  };

  return (
    <HabitsContext.Provider value={context}>
      {props.children}
    </HabitsContext.Provider>
  );
}

export default HabitsContext;
