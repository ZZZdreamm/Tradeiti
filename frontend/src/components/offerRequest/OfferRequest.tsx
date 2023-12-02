import { Offer } from "../../models/Offer";
import "./OfferRequest.scss";

interface Props {
  offerRequest: Offer;
}

export function OfferRequest({ offerRequest }: Props) {
  return (
    <div className="requestDiv">
      <span>{offerRequest.course_name}</span>
      <span className = {offerRequest.status}>
        {offerRequest.status == "accepted" ? "Zaakceptowana" : ""}
        {offerRequest.status == "pending" ? "Oczekuje" : ""}
        {offerRequest.status == "failed" ? "Wycofana / Odrzucona" : ""}
        {offerRequest.status == "requested" ? "Prośba wysłana" : ""}
        {offerRequest.status == "finalized" ? "Zakończona" : ""}
        </span>
    </div>
  );
}
