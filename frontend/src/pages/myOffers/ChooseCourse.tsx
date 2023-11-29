import { useCallback } from "react";
import { CoursesList } from "../../components/coursesList/CoursesList";
import { MyOffersSteps } from "./MyOffersSteps";
import { CourseDto } from "../../models/Course";
import { useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { getAllCourses } from "../../apiFunctions/getAllCourses";
import {
  removeMultipleValuesFromSessionStorage,
  saveInSessionStorage,
} from "../../common/sessionStorage";

export function ChooseCourse() {
  const { data: courses } = useQuery("courses", getAllCourses);
  const { setValue, reset } = useFormContext();
  const [_, setSearchParams] = useSearchParams();

  const handleBack = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const handleOnCourseClick = useCallback(
    (course: CourseDto) => {
      reset({
        course: "",
        myHour: "",
        opponentHour: "",
      });
      removeMultipleValuesFromSessionStorage(["myHour", "opponentHour"]);
      setValue("course", course);
      saveInSessionStorage("course", JSON.stringify(course));
      setSearchParams({
        page: MyOffersSteps.MY_OFFERS_ADD,
        stage: "2",
      });
    },
    [setSearchParams, setValue, reset]
  );
  return (
    <>
      <div className="upper">
        <button className="regButton" onClick={handleBack}>
          Powrót
        </button>
        <h3>Wybierz przedmiot</h3>
      </div>
      <CoursesList courses={courses} handleOnClick={handleOnCourseClick} />
    </>
  );
}
