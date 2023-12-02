import { useNavigate } from "react-router-dom";
import { acceptOffer } from "../../apiFunctions/acceptOffer";
import { Button } from "../../common/button/Button";
// import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Offer } from "../../models/Offer";
import "./style.scss";

interface Props {
  offer: Offer;
}

export function OfferComponent({ offer }: Props) {
  const navigate = useNavigate();
  const handleAcceptOffer = () => {
    acceptOffer(offer.offer_id)
      .then((res) => {
        console.log(res);
        alert("Offer acceptance request sent");
        navigate(0);
      })
      .catch(() => {
        alert("Something went wrong");
        navigate(0);
      });
  };
  return (
    <div className="offer">
      <div className="offer-left">
        <p>ID: {"\t"}<b>{offer.offer_id}</b></p>
        <p>Przedmiot: <b>{offer.course_name}</b></p>
        <p>Prowadzący: <b>{offer.selled_date_data.lecturer}</b></p>
        <p>
          Termin: {" "}
          <b>
            {offer.selled_date_data.course_day}
            {" "}
            {offer.selled_date_data.course_time}
          </b>
        </p>
      </div>
      <div className="offer-right">
        <Button className="acceptButton" onClick={handleAcceptOffer}>Akceptuj</Button>
      </div>
    </div>
  );
}
