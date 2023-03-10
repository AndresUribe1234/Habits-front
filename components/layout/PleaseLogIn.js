import Link from "next/link";

const PleaseLogIn = () => {
  return (
    <h1>
      Please <Link href={"/login"}>Log in</Link> in order to have access to the
      app content
    </h1>
  );
};

export default PleaseLogIn;
