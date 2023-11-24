import { useCallback } from "react";
import { CoursesList } from "../../components/coursesList/CoursesList";
import { MockedCourses } from "../../mocks/MockedCourses";
import { MyOffersSteps } from "./MyOffersSteps";
import { Course } from "../../models/Course";
import { useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";

export function ChooseCourse() {
  const { setValue } = useFormContext();
  const [_, setSearchParams] = useSearchParams();

  const handleBack = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const handleOnCourseClick = useCallback(
    (course: Course) => {
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
          courses={MockedCourses}
          handleOnClick={handleOnCourseClick}
        />
      </div>
    </>
  );
}
