import { OfferDto } from "../../models/Offer";
import "./style.scss";
import { useSearchParams } from "react-router-dom";

interface Props {
  offer: OfferDto;
}

export function FinalizedOffer({ offer }: Props) {
  const [_, setSearchParams] = useSearchParams();

  const onOfferClick = () => {
    setSearchParams({
      offer_id: offer.offer_id,
      course: offer.my_course.course_id,
      class_type_name: offer.my_course.groups[0].class_type_name,
    });
  };

  return (
    <div className = "finishedDiv" onClick={onOfferClick}>
      <h3>Przedmiot: {offer.my_course.course_name}</h3>
      <h5>ID: {offer.my_course.course_id}</h5>
      <div className="timeContainer">
        <div className="leftSide">
          <h4>Stara grupa:</h4>
          <h5>
          {offer.my_course.groups[0].lecturers.map(
            (lecturer: string, index: number) => (
              <span key={index}>{lecturer}</span>
            )
          )}
        </h5>
        <h5>{offer.my_course.groups[0].weekday}</h5>
        <h5>
          {offer.my_course.groups[0].start_time} -{" "}
          {offer.my_course.groups[0].end_time}
        </h5>
        </div>
        <button className="chatButton">Wyświetl czat</button>
        <div className="rightSide">
          <h4>Nowa grupa:</h4>
        <h5>
          {offer.wanted_course.groups[0].lecturers.map(
            (lecturer: string, index: number) => (
              <span key={index}>{lecturer}</span>
            )
          )}
        </h5>
        <h5>{offer.wanted_course.groups[0].weekday}</h5>
        <h5>
          {offer.wanted_course.groups[0].start_time} -{" "}
          {offer.wanted_course.groups[0].end_time}
        </h5>
        </div>
      </div>

    </div>
  );
}
