import { acceptOffer } from "../../apiFunctions/acceptOffer";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Offer } from "../../models/Offer";
import "./style.scss";

interface Props {
  offer: Offer;
}

export function OfferComponent({ offer }: Props) {
  const { currentUser } = useCurrentUser();
  const handleAcceptOffer = () => {
    acceptOffer(offer.offer_id, currentUser?.id).then((res) => {
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
        <button className="" onClick={handleAcceptOffer}>
          Accept offer
        </button>
      </div>
    </div>
  );
}
