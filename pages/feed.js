import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";

const Feed = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.authObject.isLogIn) {
    return (
      <h1>
        Please <Link href={"/login"}>Log in</Link> in order to have acces to the
        app content
      </h1>
    );
  }

  return (
    <div>
      <h1>Feed page</h1>
      <h1>
        {!authCtx.authObject.user ? "loading..." : authCtx.authObject.user}
      </h1>
      <button
        onClick={() => {
          console.log(authCtx);
        }}
      >
        Console log context
      </button>
    </div>
  );
};

export default Feed;
