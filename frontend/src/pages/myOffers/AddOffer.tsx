import { useSearchParams } from "react-router-dom";
import "./AddOffer.scss";
import { ChooseCourse } from "./ChooseCourse";
import { ChooseCourseHour } from "./ChooseCourseHour";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FinalizeOffer } from "./FinalizeOffer";
import { getDefaultOfferFormValues } from "./DefaultOfferFormValues";
import { useEffect } from "react";
import { MyOffersSteps } from "./MyOffersSteps";

export function AddOffer() {
  const methods = useForm({
    defaultValues: getDefaultOfferFormValues(),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const stage = searchParams.get("stage");

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<any> = (values) => {
    console.log(values);
  };


  useEffect(() => {
    const path = window.location.href;
    const values = methods.getValues();
    if (!path.includes("stage=1") && !values.course) {
      setSearchParams({
        page: MyOffersSteps.MY_OFFERS_ADD,
        stage: "1",
      });
    } else if (
      path.includes("stage=3") &&
      (!values.myHour || !values.opponentHour)
    ) {
      setSearchParams({
        page: MyOffersSteps.MY_OFFERS_ADD,
        stage: "2",
      });
    }
  }, [methods.getValues()]);

  return (
    <FormProvider {...methods}>
      <form className="addOffer" onSubmit={handleSubmit(onSubmit)}>
        {stage == "1" && <ChooseCourse />}
        {stage == "2" && <ChooseCourseHour />}
        {stage == "3" && <FinalizeOffer />}
      </form>
    </FormProvider>
  );
}
