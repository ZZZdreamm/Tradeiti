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
import { createOffer } from "../../apiFunctions/createOffer";
import { FormOffer } from "../../models/form/FormOffer";
import { clearSessionStorage } from "../../common/sessionStorage";

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
      my_course: {
        course_id: values.course.course_id,
        course_name: values.course.course_name,
        groups: [
          {
            group_number: values.myHour.group_number,
            class_type_name: values.myHour.class_type_name,
            weekday: values.myHour.weekday,
            start_time: values.myHour.start_time,
            end_time: values.myHour.end_time,
            lecturers: values.myHour.lecturers,
          },
        ],
      },
      wanted_course: {
        course_id: values.course.course_id,
        course_name: values.course.course_name,
        groups: [
          {
            group_number: values.opponentHour.group_number,
            class_type_name: values.opponentHour.class_type_name,
            weekday: values.opponentHour.weekday,
            start_time: values.opponentHour.start_time,
            end_time: values.opponentHour.end_time,
            lecturers: values.opponentHour.lecturers,
          },
        ],
      },
    };
    console.log(createdOffer);
    createOffer(createdOffer)
      .then((response) => {
        console.log(response);
        alert("Oferta została dodana");
        clearSessionStorage();
        navigate("/myOffers");
      })
      .catch((error) => {
        console.log(error);
        alert("Wystąpił błąd");
        clearSessionStorage();
        navigate("/offers");
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
