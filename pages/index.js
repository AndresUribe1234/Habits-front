import Head from "next/head";
import React, { useContext, useEffect } from "react";
import AuthContext from "@/store/auth-context";
import { loggedInFxn } from "./../util/helperFxn";

export default function Home() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const authObject = loggedInFxn();
    if (authObject && authObject.loggedIn) {
      authCtx.logInFnx(true);
      authCtx.tokenFnx(authObject.token);
      authCtx.userFnx(authObject.user);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home page</h1>
    </React.Fragment>
  );
}
