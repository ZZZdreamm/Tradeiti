import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { MyOffersSteps } from "./MyOffersSteps";
import "./FinalizeOffer.scss";

export function FinalizeOffer() {
  const { getValues } = useFormContext();
  const [_, setSearchParams] = useSearchParams();
  const values = getValues();

  const handleBack = useCallback(() => {
    setSearchParams({
      page: MyOffersSteps.MY_OFFERS_ADD,
      course_id: values.course.course_id,
      class_type_name: values.course.class_type_name,
      stage: "2",
    });
  }, [setSearchParams]);

  return (
    <>
      <div className="upper">
        <button className="regButton" onClick={handleBack}>
          Powrót
        </button>
        <h3>Podsumowanie oferty</h3>
        <div></div>
      </div>
      {values.course && values.myHour && values.opponentHour && (
        <ul className="offerDataList">
          <li>
            <b></b>ID przedmiotu: <b>{values.course.course_id}</b>
          </li>
          <li>
            Nazwa przedmiotu: <b>{values.course.course_name}</b>
          </li>
          <div className="exchangeHours">
            <li>
              <b>Oddajesz:</b> <br /> <br />
              {values.myHour.weekday} <br />
              {values.myHour.start_time} - {values.myHour.end_time}
            </li>
            <div className="arrowAnim"></div>
            <li>
              <b>Otrzymasz:</b> <br />
              <br />
              {values.opponentHour.weekday}
              <br />
              {values.opponentHour.start_time} - {values.opponentHour.end_time}
            </li>
          </div>
        </ul>
      )}
      <div className="lower">
        <button className="regButton" type="submit">
          Stwórz ofertę
        </button>
      </div>
    </>
  );
}
