import { rejectOffer } from "../../apiFunctions/rejectOffer";
import { removeOffer } from "../../apiFunctions/deleteOffer";
import { OfferDto } from "../../models/Offer";
import { OfferStatus } from "../../models/enums/OfferStatus";
import "./style.scss";
import { acceptOffer } from "../../apiFunctions/acceptOffer";

interface Props {
  offer: OfferDto;
}

export function MyOfferComponent({ offer }: Props) {
  const handleApproveOffer = () => {
    acceptOffer(offer.offer_id, offer.state).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };
  const handleRemoveOffer = () => {
    removeOffer(offer.offer_id).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };
  const handleRejectOffer = () => {
    rejectOffer(offer.offer_id).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };
  return (
    <div className="offer">
      <div className="offer-left">
        <h6>{offer.my_course.course_id}</h6>
        <h6>{offer.my_course.course_name}</h6>
        <div className="offer-left-lecturers">
          {offer.my_course.groups[0].lecturers.map(
            (lecturer: string, index: number) => (
              <span key={index}>{lecturer}</span>
            )
          )}
        </div>
        <span>
          {offer.my_course.groups[0].weekday}{" "}
          {offer.my_course.groups[0].start_time}-{" "}
          {offer.my_course.groups[0].end_time}
        </span>
      </div>
      <div className="offer-right">
        <p>
          Status:{" "}
          {offer.state === OfferStatus.REQUEST_SENT
            ? "Prośba wysłana ✔️"
            : offer.state === OfferStatus.PENDING
              ? "Oczekuje ⏰"
              : offer.state}
        </p>
        <button
          className="approveButton"
          onClick={handleApproveOffer}
          disabled={offer.state !== OfferStatus.REQUEST_SENT}
        >
          Zatwierdź ofertę
        </button>
        {offer.state === OfferStatus.REQUEST_SENT && (
          <button className="approveButton" onClick={handleRejectOffer}>
            Odrzuć ofertę
          </button>
        )}
        {offer.state === OfferStatus.PENDING && (
          <button className="approveButton" onClick={handleRemoveOffer}>
            Wycofaj ofertę
          </button>
        )}
      </div>
    </div>
  );
}
