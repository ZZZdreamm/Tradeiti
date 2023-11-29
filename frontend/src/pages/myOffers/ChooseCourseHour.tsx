import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { MyOffersSteps } from "./MyOffersSteps";
import "./ChooseCourseHour.scss";
import { CourseDateData } from "../../models/CourseDate";
import { CourseHours } from "../../components/hours/CourseHours";
import { mockedCourseDates } from "../../mocks/MockedCourseDates";
import { useFormContext } from "react-hook-form";
import {
  getFromSessionStorage,
  saveInSessionStorage,
} from "../../common/sessionStorage";

export function ChooseCourseHour() {
  const { setValue } = useFormContext();
  const [_, setSearchParams] = useSearchParams();
  const [myHours, setMyHours] = useState<CourseDateData[]>([]);
  const [opponentHours, setOpponentHours] = useState<CourseDateData[]>([]);
  const [choosenMyHour, setChoosenMyHour] = useState<CourseDateData>(() => {
    const hour = getFromSessionStorage("myHour");
    if (hour) {
      return JSON.parse(hour);
    }
    return undefined;
  });
  const [choosenOpponentHour, setChoosenOpponentHour] =
    useState<CourseDateData>(() => {
      const hour = getFromSessionStorage("opponentHour");
      if (hour) {
        return JSON.parse(hour);
      }
      return undefined;
    });

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
      if (hourType == "myHour") {
        setChoosenMyHour(date);
      } else {
        setChoosenOpponentHour(date);
      }
      setValue(hourType, date);
      saveInSessionStorage(hourType, JSON.stringify(date));
    },
    []
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
              choosenHour={choosenMyHour}
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
              choosenHour={choosenOpponentHour}
            />
          </div>
        </div>
      </article>
      <div className="lower">
        <button
          type="button"
          className="regButton"
          onClick={handleSaving}
          disabled={!choosenMyHour || !choosenOpponentHour}
        >
          Zapisz
        </button>
      </div>
    </>
  );
}
