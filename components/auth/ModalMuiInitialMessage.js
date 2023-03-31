import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import classes from "./../../styles/ModalMuiInitialMessage.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",
  minHeight: "200px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: "20px",
};

export default function ModalInitialMessage() {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          <div className={classes["initial-message-container"]}>
            <h2 className={classes["message-heading"]}>
              Welcome to our community!
            </h2>
            <p className={classes["message-paragraph"]}>
              Thank you for creating an account. We're excited to have you join
              us!
            </p>
            <p className={classes["message-paragraph"]}>
              To get started, please click the "Edit Profile" button to complete
              your profile in order to enjoy all the features of the Habittus
              app.
            </p>

            <div className={classes["btn-container"]}>
              <button
                className={classes["main-button"]}
                type="button"
                onClick={handleClose}
              >
                I Understand
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
