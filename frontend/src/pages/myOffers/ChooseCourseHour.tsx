import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { MyOffersSteps } from "./MyOffersSteps";
import "./ChooseCourseHour.scss";
import { CourseDate } from "../../models/CourseDate";
import { CourseHours } from "../../components/hours/CourseHours";
import { mockedCourseDates } from "../../mocks/MockedCourseDates";
import { useFormContext } from "react-hook-form";

export function ChooseCourseHour() {
  const { getValues, setValue } = useFormContext();
  const [_, setSearchParams] = useSearchParams();
  const [myHours, setMyHours] = useState<CourseDate[]>([]);
  const [opponentHours, setOpponentHours] = useState<CourseDate[]>([]);

  useEffect(() => {
    setMyHours(mockedCourseDates);
    setOpponentHours(mockedCourseDates);
  }, []);

  const handleBack = useCallback(() => {
    setSearchParams({
      page: MyOffersSteps.MY_OFFERS_ADD,
      stage: "1",
    });
  }, [setSearchParams]);

  const handleChoosingHour = useCallback(
    (date: CourseDate, hourType: string) => {
      setValue(hourType, date);
    },
    []
  );


  return (
    <>
      <div className="upper">
        <button className="regButton" onClick={handleBack}>
          Powrót
        </button>
        <h3>Wybierz godziny przedmiotu</h3>
      </div>
      <article>
        <div>
          <h5>Twoja godzina</h5>
          <div className="hours">
            <CourseHours
              dates={myHours}
              handleChooseDate={handleChoosingHour}
              hourType="myHour"
            />
          </div>
        </div>
        <div>
          <h5>Godzina oponenta</h5>
          <div className="hours">
            <CourseHours
              dates={opponentHours}
              handleChooseDate={handleChoosingHour}
              hourType="opponentHour"
            />
          </div>
        </div>
      </article>
      <div className="lower">
        <button className="regButton" type="submit">Zapisz</button>
      </div>
    </>
  );
}
