import React from "react";
import classes from "./../../styles/HabittusHome.module.scss";
import Link from "next/link";

function Footer() {
  return (
    <footer class={classes["footer"]}>
      <p class={classes["footer-text"]}>
        &copy; 2023 Habittus App. All Rights Reserved.
      </p>
      <p class={classes["footer-text"]}>
        <Link href={"/termsofservice"}>Terms of service</Link>
      </p>
    </footer>
  );
}

export default Footer;
