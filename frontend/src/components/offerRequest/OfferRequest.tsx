import { OfferDto } from "../../models/Offer";
import { OfferStatus } from "../../models/enums/OfferStatus";
import "./OfferRequest.scss";

interface Props {
  offerRequest: OfferDto;
}

export function OfferRequest({ offerRequest }: Props) {
  return (
    <div className="requestDiv">
      <b>{offerRequest.my_course.course_name}</b>
      <span className={offerRequest.state}>
        {offerRequest.state == OfferStatus.REQUEST_SENT && "Prośba wysłana"}
        {offerRequest.state == OfferStatus.COMPLETED && "Zaakceptowana"}
      </span>
    </div>
  );
}
