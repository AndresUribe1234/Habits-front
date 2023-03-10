import { useEffect, useContext } from "react";
import AuthContext from "@/store/auth-context";
import MainNavigation from "./MainNavigation";
import { loggedInFxn } from "@/util/helperFxn";

function Layout(props) {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const authObject = loggedInFxn();
    const fetchUser = async function () {
      try {
        const objectOptions = {
          headers: {
            Authorization: "Bearer " + authObject.token,
          },
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NODE_URL}/api/users/profile/${authObject.user}`,
          objectOptions
        );

        const data = await response.json();

        authCtx.habitsFnx(data.data.user.habits);
        authCtx.nameFnx(data.data.user.name);
      } catch (err) {
        console.log(err);
      }
    };

    if (authObject && authObject.loggedIn) {
      authCtx.logInFnx(true);
      authCtx.tokenFnx(authObject.token);
      authCtx.userFnx(authObject.user);
      fetchUser();
    }
  }, []);

  return (
    <div>
      <MainNavigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
