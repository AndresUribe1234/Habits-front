import AddHabitForm from "@/components/habits/AddHabitForm";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import PleaseLogIn from "@/components/layout/PleaseLogIn";

const AddHabits = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return <PleaseLogIn />;
  }

  return <AddHabitForm />;
};

export default AddHabits;
