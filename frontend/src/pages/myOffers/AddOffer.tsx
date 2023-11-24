import { useSearchParams } from "react-router-dom";
import "./AddOffer.scss";
import { ChooseCourse } from "./ChooseCourse";
import { ChooseCourseHour } from "./ChooseCourseHour";
import { Form, FormProvider, SubmitHandler, useForm } from "react-hook-form";

export function AddOffer() {
  const methods = useForm();
  const [searchParams, _] = useSearchParams();
  const stage = searchParams.get("stage");

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<any> = (values) => {
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <form className="addOffer" onSubmit={handleSubmit(onSubmit)}>
        {stage == "1" && <ChooseCourse />}
        {stage == "2" && <ChooseCourseHour />}
      </form>
    </FormProvider>
  );
}
