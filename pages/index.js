import Head from "next/head";
import React, { useContext } from "react";
import AuthContext from "@/store/auth-context";
import HabittusHome from "@/components/home/HabittussHome";
import { useRouter } from "next/router";

export default function Home() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  if (authCtx.authObject.isLogIn) {
    router.push("/myprogress");
  }

  return (
    <React.Fragment>
      <Head>
        <title>Habittus App</title>
        <meta name="description" content="Home page for the habittus app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!authCtx.authObject.isLogIn && <HabittusHome />}
    </React.Fragment>
  );
}
