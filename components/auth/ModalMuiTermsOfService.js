import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TermsContent from "../Other/TermsContent";
import classes from "./../../styles/ModalMuiTermsOfService.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",
  minHeight: "400px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalTermsOfServices(props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.modalVisibility) {
      setOpen(true);
    }
  }, [props.modalVisibility]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.onVisibility();
  };

  const acceptTermsHandler = () => {
    handleClose();
    props.onAcceptTerms();
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
          <div className={classes["terms-container"]}>
            <TermsContent />
          </div>
          <div className={classes["btn-container"]}>
            <button
              className={classes["main-button"]}
              type="button"
              onClick={acceptTermsHandler}
            >
              I AGREE
            </button>
            <button
              className={classes["main-button"]}
              type="button"
              onClick={handleClose}
            >
              DECLINE
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
