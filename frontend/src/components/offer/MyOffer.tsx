import { acceptOffer } from "../../apiFunctions/acceptOffer";
import { rejectOffer } from "../../apiFunctions/rejectOffer";
import { removeOffer } from "../../apiFunctions/removeOffer";
import { Offer } from "../../models/Offer";
import { OfferStatus } from "../../models/OfferStatus";
import "./style.scss";

interface Props {
  offer: Offer;
}

export function MyOfferComponent({ offer }: Props) {
  const handleApproveOffer = () => {
    acceptOffer(offer.offer_id).then((res) => {
      console.log(res);
    });
  };
  const handleRemoveOffer = () => {
    removeOffer(offer.offer_id).then((res) => {
      console.log(res);
    });
  };
  const handleRejectOffer = () => {
    rejectOffer(offer.offer_id).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="offer">
      <div className="offer-left">
        <h6>{offer.offer_id}</h6>
        <h6>{offer.course_name}</h6>
        <span>{offer.selled_date_data.lecturer}</span>
        <span>
          {offer.selled_date_data.course_day}{" "}
          {offer.selled_date_data.course_time}
        </span>
      </div>
      <div className="offer-right">
        <p>
          Status:{" "}
          {offer.status === OfferStatus.accepted ? "accepted ✔️" : offer.status}
        </p>
        <button
          className="approveButton"
          onClick={handleApproveOffer}
          disabled={offer.status !== OfferStatus.accepted}
        >
          Zatwierdź ofertę
        </button>
        {offer.status === OfferStatus.accepted && (
          <button className="approveButton" onClick={handleRejectOffer}>
            Odrzuć ofertę
          </button>
        )}
        {offer.status === OfferStatus.pending && (
          <button className="approveButton" onClick={handleRemoveOffer}>
            Wycofaj ofertę
          </button>
        )}
      </div>
    </div>
  );
}
