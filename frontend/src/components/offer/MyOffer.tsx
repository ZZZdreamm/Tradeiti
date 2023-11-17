import { acceptOffer } from "../../apiFunctions/acceptOffer";
import { discardOffer } from "../../apiFunctions/discardOffer";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Offer } from "../../models/Offer";
import "./style.scss";

interface Props {
  offer: Offer;
}

export function MyOfferComponent({ offer }: Props) {
  const { currentUser } = useCurrentUser();
  const handleApproveOffer = () => {
    acceptOffer(offer.offer_id, currentUser?.id).then((res) => {
      console.log(res);
    });
  };
  const handleDiscardOffer = () => {
    discardOffer(offer.offer_id, currentUser?.id).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="offer">
      <div className="offer-left">
        <h6>{offer.offer_id}</h6>
        <h6>{offer.course_name}</h6>
        <span>{offer.lecturer}</span>
        <span>{offer.start_time}</span>
      </div>
      <div className="offer-right">
        <p>Status: {offer.status === 'accepted' ? 'accepted ✔️' : offer.status}</p>
        <button
          className = "approveButton"
          onClick={handleApproveOffer}
          disabled={offer.status !== 'accepted'}>
            Zatwierdź ofertę</button>
            <button
          className = "approveButton"
          onClick={handleDiscardOffer}
          >{offer.status === 'accepted' ? 'Odrzuć ofertę' : 'Wycofaj ofertę'}
            </button>

      </div>
    </div>
  );
}
