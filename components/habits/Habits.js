import HabitElement from "./HabitElement";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";

const DUMMY_HABITS_DAYS = ["won", "won", "lose", "won", "progress"];

const Habits = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <ul>
        {DUMMY_HABITS_DAYS.map((ele) => (
          <HabitElement habit={ele} key={Math.random()} />
        ))}
      </ul>
      <button
        onClick={() => {
          console.log(authCtx.authObject);
        }}
      >
        Context
      </button>
    </div>
  );
};

export default Habits;
