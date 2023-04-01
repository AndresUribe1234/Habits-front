import classes from "./../../styles/ChangePasswordForm.module.scss";
import { useState } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const ChangePasswordForm = () => {
  const [editVisible, setEditVisible] = useState(true);

  return (
    <form className={classes["form-container"]}>
      <div className={classes["initial-container"]}>
        <h2 className={classes["field-placeholder"]}>Password</h2>
        <input
          value={"12345678"}
          type="password"
          readOnly
          className={classes["data-placeholder"]}
        ></input>
        {editVisible && (
          <button type="button" className={classes["edit-btn"]}>
            <DriveFileRenameOutlineIcon />
          </button>
        )}
      </div>
    </form>
  );
};

export default ChangePasswordForm;
