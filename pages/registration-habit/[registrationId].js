import { useRouter } from "next/router";
import { useState, useEffect, useContext, Fragment } from "react";
import AuthContext from "@/store/auth-context";
import ModifyHabitsForm from "@/components/habits/registration-forms/ModifyHabitsForm";

const UpdateHabitForm = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const [preloadedFormData, setPreloadedFormData] = useState([]);
  const [renderForm, SetRenderForm] = useState(false);

  const habitFormInformation = async (registrationId) => {
    try {
      const objectOptions = {
        headers: {
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/registration/entry/${registrationId}`,
        objectOptions
      );

      const data = await response.json();

      setPreloadedFormData(data);
      if (response.status === 400) {
        throw new Error(data.err);
      }

      SetRenderForm(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.query.registrationId) {
      habitFormInformation(router.query.registrationId);
    }
  }, [router]);

  return (
    <Fragment>
      {renderForm && (
        <ModifyHabitsForm
          data={preloadedFormData.data.entry}
          id={router.query.registrationId}
        />
      )}
    </Fragment>
  );
};

export default UpdateHabitForm;
