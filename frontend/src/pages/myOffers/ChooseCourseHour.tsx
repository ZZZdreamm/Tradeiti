import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import { MyOffersSteps } from "./MyOffersSteps";
import "./ChooseCourseHour.scss";
import { CourseDateData } from "../../models/CourseDate";
import { CourseHours } from "../../components/hours/CourseHours";
import { useFormContext } from "react-hook-form";
import { saveInSessionStorage } from "../../common/sessionStorage";
import { useQuery } from "react-query";
import { getAllCourses } from "../../apiFunctions/getAllCourses";
import { getCourseDateFromCourses } from "./GetCourseDateFromCourses";
import { getCourseGroups } from "../../apiFunctions/getCourseGroups";
import { Loader } from "../../common/loader/Loader";

export function ChooseCourseHour() {
  const { setValue, watch } = useFormContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: courses } = useQuery("courses", getAllCourses);
  const courseId = searchParams.get("course") ?? "";
  const courseClassType = searchParams.get("class_type_name") ?? "";
  const { data: allCourseGroups } = useQuery(
    ["allCourseHours", courseId, courseClassType],
    () => getCourseGroups(courseId)
  );
  const myCourseHour = getCourseDateFromCourses(
    courses,
    courseId,
    courseClassType
  );
  const allClassHours = allCourseGroups?.data
    .filter((group) => group.class_type_name === courseClassType)
    .map((group) => {
      const hour: CourseDateData = {
        weekday: group.weekday,
        start_time: group.start_time,
        end_time: group.end_time,
        lecturers: group.lecturers,
      };
      return hour;
    });

  const myHour: CourseDateData = watch("myHour");
  const opponentHour: CourseDateData = watch("opponentHour");

  const handleBack = useCallback(() => {
    setSearchParams({
      page: MyOffersSteps.MY_OFFERS_ADD,
      stage: "1",
    });
  }, [setSearchParams]);

  const handleChoosingHour = useCallback(
    (date: CourseDateData | null, hourType: string) => {
      setValue(hourType, date);
      saveInSessionStorage(hourType, JSON.stringify(date));
    },
    [setValue, saveInSessionStorage]
  );

  const handleSaving = useCallback(() => {
    setSearchParams({
      page: MyOffersSteps.MY_OFFERS_ADD,
      stage: "3",
    });
  }, [setSearchParams]);

  return (
    <>
      <div className="upper">
        <button className="regButton" onClick={handleBack}>
          Powrót
        </button>
        <h3>Wybierz godziny przedmiotu</h3>
        <div></div>
      </div>
      <article>
        {allClassHours && myCourseHour ? (
          <>
            <div>
              <h5>Twoja godzina</h5>
              <div className="hours">
                <CourseHours
                  dates={myCourseHour}
                  handleChooseDate={handleChoosingHour}
                  hourType="myHour"
                />
              </div>
            </div>
            <div>
              <h5>Godzina oponenta</h5>
              <div className="hours">
                <CourseHours
                  dates={allClassHours}
                  handleChooseDate={handleChoosingHour}
                  hourType="opponentHour"
                />
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </article>
      <div className="lower">
        <button
          type="button"
          className="regButton"
          onClick={handleSaving}
          disabled={!myHour || !opponentHour}
        >
          Zapisz
        </button>
      </div>
    </>
  );
}
