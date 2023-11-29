import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { MyOffersSteps } from "./MyOffersSteps";

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
      </div>
      {values.course && values.myHour && values.opponentHour && (
        <ul>
          <li>Id przedmiotu: {values.course.course_id}</li>
          <li>Nazwa przedmiotu: {values.course.course_name}</li>
          <li>
            Moja dzien i godzina: {values.myHour.course_day}{" "}
            {values.myHour.course_time}
          </li>
          <li>
            Dzien i godzina oponenta: {values.opponentHour.course_day}{" "}
            {values.opponentHour.course_time}
          </li>
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
