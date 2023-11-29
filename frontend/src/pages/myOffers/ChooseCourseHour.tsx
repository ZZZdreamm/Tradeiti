import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { MyOffersSteps } from "./MyOffersSteps";
import "./ChooseCourseHour.scss";
import { CourseDateData } from "../../models/CourseDate";
import { CourseHours } from "../../components/hours/CourseHours";
import { mockedCourseDates } from "../../mocks/MockedCourseDates";
import { useFormContext } from "react-hook-form";
import { saveInSessionStorage } from "../../common/sessionStorage";

export function ChooseCourseHour() {
  const { setValue, watch } = useFormContext();
  const [_, setSearchParams] = useSearchParams();
  const [myHours, setMyHours] = useState<CourseDateData[]>([]);
  const [opponentHours, setOpponentHours] = useState<CourseDateData[]>([]);

  const myHour: CourseDateData = watch("myHour");
  const opponentHour: CourseDateData = watch("opponentHour");

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
    (date: CourseDateData, hourType: string) => {
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
