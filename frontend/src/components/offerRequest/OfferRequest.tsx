import { Offer } from "../../models/Offer";
import "./OfferRequest.scss";

interface Props {
  offerRequest: Offer;
}

export function OfferRequest({ offerRequest }: Props) {
  return (
    <div>
      <span>{offerRequest.course_name}</span>
      <span>{offerRequest.status}</span>
    </div>
  );
}
