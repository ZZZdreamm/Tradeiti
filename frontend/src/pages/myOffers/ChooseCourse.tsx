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
import { GroupDto } from "../../models/GroupDto";

export function ChooseCourse() {
  const { data: courses } = useQuery("courses", getAllCourses);
  const { setValue, reset } = useFormContext();
  const [_, setSearchParams] = useSearchParams();

  const handleBack = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const handleOnCourseClick = useCallback(
    (course: CourseDto, choosenGroup: GroupDto) => {
      reset({
        course: "",
        group: "",
        myHour: "",
        opponentHour: "",
      });
      removeMultipleValuesFromSessionStorage(["myHour", "opponentHour"]);
      setValue("course", {
        course_id: course.course_id,
        course_name: course.course_name,
      });
      setValue("group", choosenGroup);
      saveInSessionStorage("course", JSON.stringify(course));
      saveInSessionStorage("group", JSON.stringify(choosenGroup));
      setSearchParams({
        page: MyOffersSteps.MY_OFFERS_ADD,
        course: course.course_id,
        class_type_name: choosenGroup.class_type_name,
        stage: "2",
      });
    },
    [setSearchParams, setValue, reset]
  );
  return (
    <>
      <div className="upper">
        <button className="regButton" type="button" onClick={handleBack}>
          Powrót
        </button>
        <h3>Wybierz przedmiot</h3>
        <div></div>
      </div>
      <CoursesList courses={courses} handleOnClick={handleOnCourseClick} />
    </>
  );
}
