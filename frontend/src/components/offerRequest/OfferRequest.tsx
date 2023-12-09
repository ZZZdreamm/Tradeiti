import { OfferDto } from "../../models/Offer";
import { OfferStatus } from "../../models/OfferStatus";
import "./OfferRequest.scss";

interface Props {
  offerRequest: OfferDto;
}

export function OfferRequest({ offerRequest }: Props) {
  return (
    <div className="requestDiv">
      <span>{offerRequest.my_course.course_name}</span>
      <span className={offerRequest.state}>
        {offerRequest.state == OfferStatus.Request_sent && "Prośba wysłana"}
        {offerRequest.state == OfferStatus.Completed && "Zaakceptowana"}
      </span>
    </div>
  );
}
