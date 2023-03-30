import React from "react";
import classes from "./../../styles/HabittusHome.module.scss";
import Link from "next/link";

function Footer() {
  return (
    <footer className={classes["footer"]}>
      <p className={classes["footer-text"]}>
        &copy; 2023 Habittus App. All Rights Reserved.
      </p>
      <p className={classes["footer-text"]}>
        <Link href={"/termsofservice"}>Terms of service</Link>
      </p>
    </footer>
  );
}

export default Footer;
