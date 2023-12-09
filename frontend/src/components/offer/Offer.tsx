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
        alert("Offer acceptance request sent");
        navigate(0);
      })
      .catch(() => {
        alert("Something went wrong");
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
          Przedmiot: <b>{offer.my_course.course_name}</b>
        </p>
        <p>
          Prowadzący:{" "}
          <b>
            {offer.my_course.groups[0].lecturers.map((lecturer, index) => (
              <span key={index}>{lecturer}</span>
            ))}
          </b>
        </p>
        <p>
          Termin:{" "}
          <b>
            {offer.my_course.groups[0].weekday},{" "}
            {offer.my_course.groups[0].start_time}-
            {offer.my_course.groups[0].end_time}
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
