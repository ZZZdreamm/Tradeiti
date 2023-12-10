import { OfferDto } from "../../models/Offer";
import "./style.scss";

interface Props {
  offer: OfferDto;
}

export function FinalizedOffer({ offer }: Props) {
  return (
    <div>
      <h3>{offer.my_course.course_name}</h3>
      <h5>{offer.my_course.course_id}</h5>
      <h5>{offer.my_course.groups[0].weekday}</h5>
      <h5>
        {offer.my_course.groups[0].start_time} -{" "}
        {offer.my_course.groups[0].end_time}
      </h5>
      <h5>
        {offer.my_course.groups[0].lecturers.map(
          (lecturer: string, index: number) => (
            <span key={index}>{lecturer}</span>
          )
        )}
      </h5>
    </div>
  );
}
