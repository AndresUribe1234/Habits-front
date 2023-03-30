import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import classes from "./../../styles/ModalMuiAddHabbitSettings.module.scss";
import HabitAutocomplete from "./AutocompleteHabitEntered";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const [habitAlreadyExist, setHabitAlreadyExist] = React.useState(false);
  const [inputError, setInputError] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getInputHandler = (value) => {
    setInputValue(value);
  };

  const addHabitHandler = () => {
    const habitValueEntered = inputValue.trim();
    const currentHabits = props.data;

    if (currentHabits.includes(habitValueEntered)) {
      setHabitAlreadyExist(true);
      setInputError(true);
      return;
    }

    if (habitValueEntered === "") {
      setHabitAlreadyExist(false);
      setInputError(true);
      return;
    }

    props.onAddHabit(habitValueEntered);
    setHabitAlreadyExist(false);
    setInputError(false);
    handleClose();
  };

  return (
    <div>
      <button onClick={handleOpen} type="button" style={{ marginTop: "10px" }}>
        Add Habit
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={classes["add-habit-form"]}>
            <h2>Add Habit</h2>
            <p>
              Enter your habit. Start typing to see suggestions from what other
              users have entered, or add your own unique habit.
            </p>
            <HabitAutocomplete
              suggestions={props.suggestions}
              onGetInputValue={getInputHandler}
            />
            {inputError && (
              <p>{`${
                habitAlreadyExist ? "You already have this habit. " : ""
              }Please enter valid habit!`}</p>
            )}
            <div>
              <button type="button" onClick={addHabitHandler}>
                Add
              </button>
              <button type="button" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
