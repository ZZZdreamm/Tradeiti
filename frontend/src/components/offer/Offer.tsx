import { useNavigate } from "react-router-dom";
import { requestOffer } from "../../apiFunctions/requestOffer";
import { Button } from "../../common/button/Button";
import { OfferDto } from "../../models/Offer";
import "./style.scss";
import { useAuthContext } from "../../providers/AuthProvider";

interface Props {
  offer: OfferDto;
}

export function OfferComponent({ offer }: Props) {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const handleAcceptOffer = () => {
    requestOffer(offer.offer_id)
      .then((res) => {
        console.log(res);
        alert("Prośba o akceptację oferty wysłana");
        navigate(0);
      })
      .catch(() => {
        alert("Coś poszło nie tak");
        navigate(0);
      });
  };

  return (
    <div
      className="offer"
      style={{
        backgroundColor:
          offer.owner_username === currentUser?.username
            ? `var(--my-course-color)`
            : `var(--course-color)`,
      }}
    >
      <div className="offer-left">
        <p>
          ID: {"\t"}
          <b>{offer.my_course.course_id}</b>
        </p>
        <p>
          Wystawiający: {"\t"}
          <b>{offer.owner_username}</b>
        </p>
        <p>
          Przedmiot: <b>{offer.my_course.course_name}</b>
        </p>
        <p>
          Prowadzący:{" "}
          <b>
            {offer.my_course.groups[0].lecturers.map((lecturer, index, array) => (
              <span key={index}>{lecturer}
              {index < array.length - 1 && ', '}
              </span>
            ))}
          </b>
        </p>
        <p>
          Oddaję:{" "}
          <b>
            {offer.my_course.groups[0].weekday},{" "}
            {offer.my_course.groups[0].start_time}-
            {offer.my_course.groups[0].end_time},{" "}
            {offer.my_course.groups[0].class_type_name}, {" "}
            {offer.my_course.groups[0].group_number}
          </b>
        </p>
        <p>
          Chcę:{" "}
          <b>
            {offer.wanted_course.groups[0].weekday},{" "}
            {offer.wanted_course.groups[0].start_time}-
            {offer.wanted_course.groups[0].end_time},{" "}
            {offer.wanted_course.groups[0].class_type_name}, {" "}
            {offer.wanted_course.groups[0].group_number}
          </b>
        </p>
      </div>
      <div className="offer-right">
        {offer.owner_username !== currentUser?.username && (
          <Button className="acceptButton" onClick={handleAcceptOffer}>
            Akceptuj
          </Button>
        )}
      </div>
    </div>
  );
}
