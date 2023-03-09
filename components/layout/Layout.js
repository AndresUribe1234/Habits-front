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

        return data;
      } catch (err) {
        console.log(err);
      }
    };

    if (authObject && authObject.loggedIn) {
      authCtx.logInFnx(true);
      authCtx.tokenFnx(authObject.token);
      authCtx.userFnx(authObject.user);
      (async () => {
        const activeUser = await fetchUser();
        authCtx.habitsFnx(activeUser.data.user.habits);
        authCtx.nameFnx(activeUser.data.user.name);
      })();
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
