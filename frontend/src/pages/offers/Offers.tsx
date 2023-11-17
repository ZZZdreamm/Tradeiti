import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { OffersList } from "../../components/offer/OffersList";
import { SearchTable } from "../../components/searchTable/SearchTable";
import { mockedOffers } from "../../mocks/MockedOffers";
import "./style.scss";

const searchTableInputsLabels = [
  { label: "Offer ID", input: "offer_id" },
  { label: "Course name", input: "course_name" },
  { label: "Lecturer", input: "lecturer" },
  { label: "Start time", input: "start_time" },
];

const Offers = () => {
  return (
    <div className="offers">
      <SearchTable inputsLabels={searchTableInputsLabels} />
      <OffersList offers={mockedOffers} />
    </div>
  );
};

export const PrivateOffers = withPrivateRoute(Offers);
