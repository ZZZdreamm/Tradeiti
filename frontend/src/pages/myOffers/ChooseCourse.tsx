import { useCallback } from "react";
import { CoursesList } from "../../components/coursesList/CoursesList";
import { MyOffersSteps } from "./MyOffersSteps";
import { CourseDto } from "../../models/Course";
import { useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { getAllCourses } from "../../apiFunctions/getAllCourses";

export function ChooseCourse() {
  const { data: courses } = useQuery("courses", getAllCourses);
  const { setValue } = useFormContext();
  const [_, setSearchParams] = useSearchParams();

  const handleBack = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const handleOnCourseClick = useCallback(
    (course: CourseDto) => {
      setValue("course", course);
      setSearchParams({
        page: MyOffersSteps.MY_OFFERS_ADD,
        stage: "2",
      });
    },
    [setSearchParams]
  );
  return (
    <>
      <div className="upper">
        <button className="regButton" onClick={handleBack}>
          Powrót
        </button>
        <h3>Wybierz przedmiot</h3>
      </div>
      <div className="coursesBox">
        <CoursesList
          courses={courses}
          handleOnClick={handleOnCourseClick}
        />
      </div>
    </>
  );
}
