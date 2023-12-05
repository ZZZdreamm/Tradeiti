import { useNavigate, useSearchParams } from "react-router-dom";
import "./AddOffer.scss";
import { ChooseCourse } from "./ChooseCourse";
import { ChooseCourseHour } from "./ChooseCourseHour";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FinalizeOffer } from "./FinalizeOffer";
import { getDefaultOfferFormValues } from "./DefaultOfferFormValues";
import { useEffect } from "react";
import { MyOffersSteps } from "./MyOffersSteps";
import { OfferCreationDto } from "../../models/OfferCreationDto";
import { addOffer } from "../../apiFunctions/addOffer";
import { FormOffer } from "../../models/form/FormOffer";

export function AddOffer() {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: getDefaultOfferFormValues(),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const stage = searchParams.get("stage");

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormOffer> = (values) => {
    const createdOffer: OfferCreationDto = {
      course_id: values.course.course_id,
      selled_date_data: {
        start_time: values.myHour.start_time,
        end_time: values.myHour.end_time,
        lecturers: values.myHour.lecturers,
        weekday: values.myHour.weekday,
      },
      exchanged_date_data: {
        start_time: values.opponentHour.start_time,
        end_time: values.opponentHour.end_time,
        lecturers: values.opponentHour.lecturers,
        weekday: values.opponentHour.weekday,
      },
    };
    console.log(createdOffer);
    addOffer(createdOffer)
      .then((response) => {
        console.log(response);
        alert("Oferta została dodana");
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
        alert("Wystąpił błąd");
        navigate(0);
      });
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
