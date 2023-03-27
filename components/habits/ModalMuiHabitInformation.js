import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import classes from "./../../styles/ModalMuiAddHabbitSettings.module.scss";
import moment from "moment";
import tz from "moment-timezone";
import HabitElementBody from "./HabitElementBody";

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const status = props.status;
  const data = props.data;
  console.log(data);

  React.useEffect(() => {
    if (props.status) {
      setOpen(true);
    }
  }, [status]);

  const date = moment.utc(data.registrationFinalDate).format("YYYY-MM-DD");

  const bodyObj = {
    id: data._id,
    email: data.user.email,
    completionPercentage: data.completionPercentage,
    habitsGoal: data.userHabitsGoalDayRegistration,
    habitsAchieved: data.userHabitsAchievedDayRegistration,
    currentStreak: data.currentStreak,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={classes["add-habit-form"]}>
            <div>
              <span>Date</span>
              <span>{date}</span>
            </div>
            <div>
              <HabitElementBody information={bodyObj} />
            </div>

            <div>
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
