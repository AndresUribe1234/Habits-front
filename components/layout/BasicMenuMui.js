import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import classes from "./../../styles/MainNavigation.module.scss";
import { useRouter } from "next/router";

export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const componentStyling = {
    fontSize: {
      xs: "16px",
      sm: "16px",
      md: "40px",
      lg: "40px",
      xl: "40px",
    },
    color: "black",
  };

  const router = useRouter();
  const isSettings =
    router.pathname === "/profile" || router.pathname === "/myaccount"
      ? true
      : false;

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={
          !isSettings
            ? componentStyling
            : { ...componentStyling, color: "white" }
        }
      >
        Settings
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} sx={componentStyling}>
          <Link href={"/profile"} className={classes.linksHeader}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={componentStyling}>
          <Link href={"/myaccount"} className={classes.linksHeader}>
            My account
          </Link>
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            handleClose(event);
            props.onLogout();
          }}
          sx={componentStyling}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
