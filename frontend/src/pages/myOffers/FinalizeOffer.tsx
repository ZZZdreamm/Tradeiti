import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { MyOffersSteps } from "./MyOffersSteps";
import "./FinalizeOffer.scss"

export function FinalizeOffer() {
  const { getValues } = useFormContext();
  const [_, setSearchParams] = useSearchParams();
  const values = getValues();

  const handleBack = useCallback(() => {
    setSearchParams({
      page: MyOffersSteps.MY_OFFERS_ADD,
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
        <ul className = 'offerDataList'>
          <li><b></b>ID przedmiotu:  <b>{values.course.course_id}</b></li>
          <li>Nazwa przedmiotu: <b>{values.course.course_name}</b></li>
          <div className="exchangeHours">
          <li>
            <b>Oddajesz:</b> <br /> <br />
            {values.myHour.course_day} <br />
            {values.myHour.course_time}
          </li>
          <div className="arrowAnim"></div>
          <li>
            <b>Otrzymasz:</b> <br /><br />
            {values.opponentHour.course_day}<br />
            {values.opponentHour.course_time}
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
