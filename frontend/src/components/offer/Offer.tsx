import { acceptOffer } from "../../apiFunctions/acceptOffer";
import { Button } from "../../common/button/Button";
// import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Offer } from "../../models/Offer";
import "./style.scss";

interface Props {
  offer: Offer;
}

export function OfferComponent({ offer }: Props) {
  const handleAcceptOffer = () => {
    acceptOffer(offer.offer_id).then((res) => {
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
        <Button onClick={handleAcceptOffer}>Accept offer</Button>
      </div>
    </div>
  );
}
